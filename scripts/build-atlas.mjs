import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const posix = p => p.split(path.sep).join('/');
const readJSON = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const plain = s => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').trim();
const safeJSON = value => JSON.stringify(value).replaceAll('<', '\\u003c');
function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(e => {
    if (e.isSymbolicLink()) throw new Error(`Linked atlas input: ${e.name}`);
    const file = path.join(dir, e.name);
    if (e.isDirectory()) return ['library', 'assets'].includes(e.name) ? [] : markdownFiles(file);
    return e.name.endsWith('.md') ? [file] : [];
  });
}

export function buildAtlas(root) {
  const skillRoot = path.join(root, 'skills');
  const config = readJSON(path.join(root, 'workflows/journeys.json'));
  const overrides = readJSON(path.join(root, 'workflows/link-roles.json'));
  const usedOverrides = new Set();
  const files = markdownFiles(skillRoot);
  const bySlug = new Map();
  const nodes = config.nodes.map(n => {
    if (bySlug.has(n.slug) || !/^[a-z0-9-]+$/.test(n.slug)) throw new Error(`Invalid/duplicate atlas skill: ${n.slug}`);
    const text = fs.readFileSync(path.join(skillRoot, n.slug, 'SKILL.md'), 'utf8');
    const slug = text.match(/^name: (.+)$/m)?.[1];
    const desc = JSON.parse(text.match(/^description: (.+)$/m)?.[1] ?? 'null');
    const title = text.match(/^# (.+)$/m)?.[1];
    if (slug !== n.slug || !title || typeof desc !== 'string') throw new Error(`Invalid atlas metadata: ${n.slug}`);
    const node = { ...n, name: title.replace(/^Dytschgo /, ''), desc };
    bySlug.set(n.slug, node);
    return node;
  });
  const actual = fs.readdirSync(skillRoot, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();
  if (JSON.stringify(actual) !== JSON.stringify([...bySlug.keys()].sort())) throw new Error('Atlas must cover every source skill exactly once');
  const ids = new Set(nodes.map(n => n.id));
  if (ids.size !== nodes.length) throw new Error('Duplicate atlas node ID');
  for (const r of config.routes) {
    for (const id of [...r.steps.map(s => s[0]), r.extras[0]]) if (!ids.has(id)) throw new Error(`Unknown journey skill: ${id}`);
  }
  const edges = [];
  for (const file of files) {
    const source = posix(path.relative(root, file));
    const owner = bySlug.get(posix(path.relative(skillRoot, file)).split('/')[0]);
    let fenced = false;
    for (const [index, line] of fs.readFileSync(file, 'utf8').split(/\r?\n/).entries()) {
      if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
      if (fenced) continue;
      for (const m of line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        if (/^[a-z]+:/i.test(m[1])) continue;
        const target = path.resolve(path.dirname(file), m[1].split('#')[0]);
        const relative = path.relative(skillRoot, target);
        if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error(`Link escapes skills: ${source}`);
        const targetNode = bySlug.get(posix(relative).split('/')[0]);
        if (!targetNode || targetNode.id === owner.id) continue;
        if (!fs.existsSync(target)) throw new Error(`Missing atlas target: ${m[1]}`);
        const overrideIndex = overrides.findIndex(o => o.source === source && o.target === targetNode.slug);
        if (overrideIndex >= 0) usedOverrides.add(overrideIndex);
        const kind = overrideIndex >= 0 ? overrides[overrideIndex].kind : path.basename(target) === 'SKILL.md' ? 'load' : 'reference';
        if (!['load', 'reference', 'mention'].includes(kind)) throw new Error('Invalid link classification');
        if (kind === 'mention') continue;
        const targetFile = posix(path.relative(root, target));
        if (!edges.some(e => e.file === source && e.targetFile === targetFile)) edges.push({ from: owner.id, to: targetNode.id, kind, file: source, targetFile, line: index + 1, when: plain(line) });
      }
    }
  }
  if (usedOverrides.size !== overrides.length) throw new Error('Unused or duplicate atlas link classification');
  const inputs = [...files, 'workflows/journeys.json', 'workflows/link-roles.json', 'workflows/atlas-template.html'].map(f => path.isAbsolute(f) ? f : path.join(root, f)).sort();
  const hash = crypto.createHash('sha256');
  for (const file of inputs) hash.update(posix(path.relative(root, file))).update('\0').update(fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n')).update('\0');
  const sourceHash = hash.digest('hex');
  const model = { sourceHash, nodes, edges, routes: config.routes };
  let html = fs.readFileSync(path.join(root, 'workflows/atlas-template.html'), 'utf8').replaceAll('\r\n', '\n');
  for (const [key, value] of Object.entries({ __NODES__: safeJSON(nodes), __EDGES__: safeJSON(edges), __ROUTES__: safeJSON(config.routes), __SOURCE_HASH__: sourceHash.slice(0, 16) })) html = html.replaceAll(key, value);
  return { model, html };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const { model, html } = buildAtlas(root);
  const outputs = { 'docs/skill-map.json': JSON.stringify(model, null, 2) + '\n', 'docs/skill-atlas.html': html };
  for (const [name, content] of Object.entries(outputs)) {
    const file = path.join(root, name);
    if (process.argv.includes('--check')) {
      if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n') !== content) throw new Error(`Stale generated atlas: ${name}. Run node scripts/build-atlas.mjs`);
    } else { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }
  }
  console.log(`Atlas: ${model.nodes.length} skills, ${model.edges.length} source links, ${model.routes.length} journeys; ${model.sourceHash.slice(0, 16)}`);
}
