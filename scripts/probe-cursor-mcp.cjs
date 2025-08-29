#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
try {
  const p = path.join(process.env.HOME || process.env.USERPROFILE, '.cursor', 'mcp.json');
  const txt = fs.readFileSync(p, 'utf8');
  const obj = JSON.parse(txt);
  const servers = obj?.mcpServers || obj?.servers || obj;
  const items = Array.isArray(servers) ? servers : Object.entries(servers || {}).map(([k,v])=>({name:k, ...v}));
  for (const s of items) {
    const name = s.name || s.id || s.command || 'server';
    const env = s.env || s.environment || {};
    const keys = Object.keys(env || {});
    console.log(`${name}: env keys ->`, keys);
  }
} catch (e) {
  console.error('Could not read ~/.cursor/mcp.json:', e.message);
  process.exit(1);
}

