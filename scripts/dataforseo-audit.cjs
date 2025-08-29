#!/usr/bin/env node
// DataForSEO Labs + SERP quick audit
// Requires env: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
// Writes JSON files under audits/dataforseo/

const fs = require('fs');
const path = require('path');
const https = require('https');

function tryLoadEnvFromDotenv() {
  const candidates = ['.env.local', '.env'];
  for (const file of candidates) {
    try {
      if (fs.existsSync(file)) {
        const txt = fs.readFileSync(file, 'utf8');
        for (const line of txt.split(/\r?\n/)) {
          const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
          if (m) {
            const key = m[1];
            let val = m[2].replace(/^"|"$/g, '').replace(/^'|'$/g, '');
            if (!process.env[key]) process.env[key] = val;
          }
        }
      }
    } catch {}
  }
}

function tryLoadEnvFromConfig() {
  try {
    const home = process.env.HOME || process.env.USERPROFILE;
    const p = path.join(home, '.config', 'dataforseo', 'credentials.json');
    if (fs.existsSync(p)) {
      const obj = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (obj.login && !process.env.DATAFORSEO_LOGIN) process.env.DATAFORSEO_LOGIN = obj.login;
      if (obj.password && !process.env.DATAFORSEO_PASSWORD) process.env.DATAFORSEO_PASSWORD = obj.password;
    }
  } catch {}
}

function tryLoadEnvFromCursorMcp() {
  try {
    const home = process.env.HOME || process.env.USERPROFILE;
    const p = path.join(home, '.cursor', 'mcp.json');
    if (!fs.existsSync(p)) return;
    const obj = JSON.parse(fs.readFileSync(p, 'utf8'));
    const servers = obj?.mcpServers || obj?.servers || obj; // be flexible
    const candidates = Array.isArray(servers) ? servers : Object.values(servers || {});
    for (const s of candidates) {
      const env = s?.env || s?.environment || {};
      if (env.DATAFORSEO_LOGIN && !process.env.DATAFORSEO_LOGIN) process.env.DATAFORSEO_LOGIN = env.DATAFORSEO_LOGIN;
      if (env.DATAFORSEO_PASSWORD && !process.env.DATAFORSEO_PASSWORD) process.env.DATAFORSEO_PASSWORD = env.DATAFORSEO_PASSWORD;
      if (env.DATAFORSEO_USERNAME && !process.env.DATAFORSEO_USERNAME) process.env.DATAFORSEO_USERNAME = env.DATAFORSEO_USERNAME;
      if (env.DATAFORSEO_PASS && !process.env.DATAFORSEO_PASS) process.env.DATAFORSEO_PASS = env.DATAFORSEO_PASS;
    }
  } catch {}
}

tryLoadEnvFromDotenv();
tryLoadEnvFromConfig();
tryLoadEnvFromCursorMcp();

// Normalize alternative env var names
if (!process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_USERNAME) {
  process.env.DATAFORSEO_LOGIN = process.env.DATAFORSEO_USERNAME;
}
if (!process.env.DATAFORSEO_PASSWORD && process.env.DATAFORSEO_PASS) {
  process.env.DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASS;
}

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
if (!LOGIN || !PASSWORD) {
  console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD env.');
  console.error('Set env vars, add them to .env/.env.local, or create ~/.config/dataforseo/credentials.json {"login":"...","password":"..."}');
  process.exit(1);
}

const AUTH = 'Basic ' + Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');
const ROOT_DIR = path.join('audits', 'dataforseo');
fs.mkdirSync(ROOT_DIR, { recursive: true });

function post(pathname, payload) {
  const data = JSON.stringify(payload);
  const opts = {
    method: 'POST',
    hostname: 'api.dataforseo.com',
    path: `/v3/${pathname}`,
    headers: {
      'Authorization': AUTH,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: body });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
    req.write(data);
    req.end();
  });
}

async function main() {
  const domain = process.argv[2] || 'floorplay.agency';
  const location = 2840; // USA
  const language = 'en';

  // 1) Domain ranked keywords (quick wins)
  const ranked = await post('dataforseo_labs/google/domain_ranked_keywords/live', [{
    target: domain,
    location_code: location,
    language_code: language,
    limit: 1000
  }]);
  fs.writeFileSync(path.join(ROOT_DIR, 'domain_ranked_keywords.json'), JSON.stringify(ranked, null, 2));

  // 2) Competitors domain
  const competitors = await post('dataforseo_labs/google/competitors_domain/live', [{
    target: domain,
    location_code: location,
    language_code: language,
    limit: 10
  }]);
  fs.writeFileSync(path.join(ROOT_DIR, 'competitors_domain.json'), JSON.stringify(competitors, null, 2));

  // Prepare domain intersection with top 3 competitors (if available)
  let comps = [];
  try {
    const items = competitors.body?.tasks?.[0]?.result?.[0]?.items || [];
    comps = items.slice(0, 3).map((i) => i.domain);
  } catch {}
  if (comps.length > 0) {
    const intersection = await post('dataforseo_labs/google/domain_intersection/live', [{
      targets: [domain, ...comps],
      location_code: location,
      language_code: language,
      limit: 1000
    }]);
    fs.writeFileSync(path.join(ROOT_DIR, 'domain_intersection.json'), JSON.stringify(intersection, null, 2));
  }

  // 3) SERP checks for target queries
  const queries = [
    'epoxy flooring marketing agency',
    'flooring contractor marketing',
    'epoxy contractor leads',
    'google business profile optimization epoxy'
  ];
  const serpPayload = queries.map((q) => ({
    language_code: language,
    location_code: location,
    keyword: q,
    target: domain,
    depth: 50,
    device: 'desktop'
  }));
  const serp = await post('serp/google/organic/live/advanced', serpPayload);
  fs.writeFileSync(path.join(ROOT_DIR, 'serp_advanced.json'), JSON.stringify(serp, null, 2));

  // 4) Keywords for site and seed keywords
  const kwsForSite = await post('dataforseo_labs/google/keywords_for_site/live', [{
    target: `https://${domain}`,
    location_code: location,
    language_code: language,
    limit: 1000
  }]);
  fs.writeFileSync(path.join(ROOT_DIR, 'keywords_for_site.json'), JSON.stringify(kwsForSite, null, 2));

  const seedKeywords = [
    'epoxy contractor marketing',
    'polyurea marketing',
    'flooring ppc agency',
    'contractor local seo agency'
  ];
  const kwsForKeywords = await post('dataforseo_labs/google/keywords_for_keywords/live', [{
    keywords: seedKeywords,
    location_code: location,
    language_code: language,
    limit: 1000
  }]);
  fs.writeFileSync(path.join(ROOT_DIR, 'keywords_for_keywords.json'), JSON.stringify(kwsForKeywords, null, 2));

  console.log('DataForSEO audit complete. Files written to audits/dataforseo');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
