#!/usr/bin/env node
// Lightweight crawler: fetch sitemap(s), then fetch pages and extract SEO data.
// No external deps; uses basic regex parsing for targeted tags.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.argv[2] || 'https://floorplay.agency';
const LIMIT = parseInt(process.argv[3] || '200', 10);
const OUT = process.argv[4] || path.join('audits', 'firecrawl', 'crawl.json');

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'SEO-Audit/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error('timeout'));
    });
  });
}

function extractXmlLocs(xml) {
  const locs = [];
  const regex = /<loc>([^<]+)<\/loc>/gim;
  let m;
  while ((m = regex.exec(xml))) locs.push(m[1].trim());
  return locs;
}

function isSitemapIndex(xml) {
  return /<sitemapindex[\s>]/i.test(xml);
}

function metaContent(html, nameOrProp) {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${nameOrProp}["'][^>]*>`, 'i');
  const m = html.match(re);
  if (!m) return null;
  const tag = m[0];
  const c = tag.match(/content=["']([^"']*)["']/i);
  return c ? c[1] : null;
}

function linkHref(html, rel) {
  const re = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*>`, 'i');
  const m = html.match(re);
  if (!m) return null;
  const tag = m[0];
  const h = tag.match(/href=["']([^"']*)["']/i);
  return h ? h[1] : null;
}

function extractJsonLdTypes(html) {
  const out = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const json = m[1].trim();
    try {
      const obj = JSON.parse(json);
      const types = [];
      if (Array.isArray(obj)) {
        obj.forEach((o) => o && o['@type'] && types.push(o['@type']));
      } else if (obj && obj['@type']) {
        types.push(obj['@type']);
      }
      out.push(...types.flat());
    } catch {}
  }
  return out;
}

function countH1(html) {
  const matches = html.match(/<h1[\s>]/gi);
  return matches ? matches.length : 0;
}

async function gatherUrls() {
  const sitemapIndexUrl = new URL('/sitemap-index.xml', ROOT).toString();
  const urls = new Set();
  try {
    const idx = await get(sitemapIndexUrl);
    if (idx.status >= 200 && idx.status < 300) {
      const locs = extractXmlLocs(idx.body);
      if (isSitemapIndex(idx.body)) {
        for (const sm of locs) {
          try {
            const smRes = await get(sm);
            if (smRes.status >= 200 && smRes.status < 300) {
              extractXmlLocs(smRes.body).forEach((u) => urls.add(u));
            }
          } catch {}
        }
      } else {
        locs.forEach((u) => urls.add(u));
      }
    }
  } catch {}
  // Fallback: root
  if (urls.size === 0) urls.add(new URL('/', ROOT).toString());
  return Array.from(urls).slice(0, LIMIT);
}

async function auditUrl(url) {
  try {
    const res = await get(url);
    const html = res.body || '';
    const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [null, null])[1];
    const description = metaContent(html, 'description');
    const robots = metaContent(html, 'robots');
    const canonical = linkHref(html, 'canonical');
    const og = {
      title: metaContent(html, 'og:title'),
      description: metaContent(html, 'og:description'),
      image: metaContent(html, 'og:image'),
      url: metaContent(html, 'og:url'),
      type: metaContent(html, 'og:type'),
      site_name: metaContent(html, 'og:site_name')
    };
    const twitter = {
      card: metaContent(html, 'twitter:card'),
      title: metaContent(html, 'twitter:title'),
      description: metaContent(html, 'twitter:description'),
      image: metaContent(html, 'twitter:image'),
      url: metaContent(html, 'twitter:url')
    };
    const h1Count = countH1(html);
    const jsonLdTypes = extractJsonLdTypes(html);
    return {
      url,
      status: res.status,
      title: title ? title.trim() : null,
      description,
      robots,
      canonical,
      h1Count,
      og,
      twitter,
      jsonLdTypes,
    };
  } catch (e) {
    return { url, error: e.message };
  }
}

async function main() {
  const urls = await gatherUrls();
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.error(`Fetching [${i + 1}/${urls.length}]: ${url}`);
    const r = await auditUrl(url);
    results.push(r);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ root: ROOT, fetched: results.length, results }, null, 2));
  console.log(`Wrote ${results.length} results to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

