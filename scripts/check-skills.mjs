import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// This collection uses single-line names and JSON-compatible double-quoted
// descriptions/interface strings. Validate that format rather than emulate YAML.
function scalar(value) {
  if (value.startsWith('"')) return JSON.parse(value);
  if (value.startsWith("'")) {
    if (!value.endsWith("'")) throw new Error('unterminated scalar');
    return value.slice(1, -1).replaceAll("''", "'");
  }
  if (!value || /:\s|\s#|^[#\[\]{},&*!|>@`%]/.test(value)
      || /^(?:null|~|true|false|yes|no|on|off|[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)$/i.test(value)) throw new Error('unsupported scalar');
  return value;
}

function prose(text) {
  let fence = null;
  return text.split(/\r?\n/).filter(line => {
    const match = line.match(/^\s*(`{3,}|~{3,})/);
    if (match) {
      if (!fence) fence = match[1][0];
      else if (match[1][0] === fence) fence = null;
      return false;
    }
    return !fence;
  }).join('\n');
}

function anchors(text) {
  const found = new Set();
  const counts = new Map();
  for (const match of prose(text).matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const slug = match[1].trim().toLowerCase().replace(/<[^>]*>/g, '')
      .replace(/[^\p{L}\p{N}_\-\s]/gu, '').replace(/\s/g, '-');
    const count = counts.get(slug) ?? 0;
    found.add(count ? `${slug}-${count}` : slug);
    counts.set(slug, count + 1);
  }
  return found;
}

function filesUnder(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const target = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`symbolic link in collection: ${target}`);
    if (entry.isDirectory()) files.push(...filesUnder(target));
    else files.push(target);
  }
  return files;
}

export function validateRepo(root) {
  root = path.resolve(root);
  const errors = [];
  const fail = (file, message) => errors.push(`${path.relative(root, file)}: ${message}`);
  const skillRoot = path.join(root, 'skills');
  if (!fs.existsSync(skillRoot)) return ['skills directory missing'];
  let files;
  try { files = filesUnder(root); } catch (error) { return [error.message]; }
  const skills = fs.readdirSync(skillRoot, { withFileTypes: true }).filter(e => e.isDirectory());
  if (!skills.length) errors.push('no skills found');
  for (const skill of skills) {
    const file = path.join(skillRoot, skill.name, 'SKILL.md');
    if (!fs.existsSync(file)) { fail(file, 'missing entrypoint'); continue; }
    const text = fs.readFileSync(file, 'utf8');
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!front) { fail(file, 'missing frontmatter'); continue; }
    const fields = {};
    for (const line of front[1].split(/\r?\n/)) {
      const pair = line.match(/^(name|description): (.+)$/);
      if (!pair || fields[pair[1]] !== undefined) { fail(file, 'expected unique name/description fields'); continue; }
      if (pair[1] === 'description' && !pair[2].startsWith('"')) { fail(file, 'invalid description scalar: use a double-quoted string'); continue; }
      try { fields[pair[1]] = scalar(pair[2]); } catch { fail(file, `invalid ${pair[1]} scalar`); }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.name ?? '') || fields.name !== skill.name || fields.name.length > 64) fail(file, 'name must match folder in hyphen-case');
    if (typeof fields.description !== 'string' || !fields.description.trim() || fields.description.length > 1024 || /[<>]/.test(fields.description)) fail(file, 'invalid description');
    if (/^\s*\[TODO:[^\n]*\]\s*$/m.test(prose(text.slice(front[0].length)))) fail(file, 'unfinished scaffold');
    const metadata = path.join(skillRoot, skill.name, 'agents', 'openai.yaml');
    if (!fs.existsSync(metadata)) { fail(metadata, 'missing UI metadata'); continue; }
    const yaml = fs.readFileSync(metadata, 'utf8');
    const block = yaml.match(/^interface:\r?\n((?:[ \t]+[^\r\n]*(?:\r?\n|$))*)/m)?.[1] ?? '';
    const ui = {};
    for (const line of block.split(/\r?\n/).filter(Boolean)) {
      const pair = line.match(/^  ([a-z_]+): (".*")$/);
      if (!pair || ui[pair[1]] !== undefined) { fail(metadata, 'expected unique, quoted interface fields'); continue; }
      try { ui[pair[1]] = scalar(pair[2]); } catch { fail(metadata, 'invalid quoted interface scalar'); }
    }
    if (!ui.display_name?.trim()) fail(metadata, 'missing display name');
    if (!ui.short_description || ui.short_description.length < 25 || ui.short_description.length > 64) fail(metadata, 'short description must be 25–64 characters');
    if (!ui.default_prompt?.includes(`$${skill.name}`)) fail(metadata, 'default prompt must invoke its own skill');
  }
  for (const file of files.filter(f => f.endsWith('.md') && !f.includes(`${path.sep}library${path.sep}`))) {
    const text = prose(fs.readFileSync(file, 'utf8'));
    for (const match of text.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
      const href = match[1].replace(/^<|>$/g, '').split(/\s+"/)[0];
      if (/^[a-z][a-z0-9+.-]*:/i.test(href)) continue;
      const [part, fragment] = href.split('#');
      let target;
      try { target = part ? path.resolve(path.dirname(file), decodeURIComponent(part)) : file; }
      catch { fail(file, `invalid local link ${href}`); continue; }
      const relative = path.relative(root, target);
      if (relative.startsWith('..') || path.isAbsolute(relative)) { fail(file, `link escapes collection: ${href}`); continue; }
      if (!fs.existsSync(target)) { fail(file, `missing local link ${href}`); continue; }
      if (fragment && target.endsWith('.md') && !anchors(fs.readFileSync(target, 'utf8')).has(decodeURIComponent(fragment))) fail(file, `missing heading ${href}`);
    }
  }
  const routing = path.join(skillRoot, 'astra-orchestrator', 'references', 'routing.md');
  if (fs.existsSync(routing)) {
    const ids = [...fs.readFileSync(routing, 'utf8').matchAll(/`(gpt-[\w.-]+)`/g)].map(m => m[1]);
    if (ids.length !== 2 || new Set(ids).size !== 2) fail(routing, 'expected two distinct preferred worker IDs');
    const orchestratorRoot = path.join(skillRoot, 'astra-orchestrator') + path.sep;
    for (const file of files.filter(f => /\.(md|yaml)$/.test(f) && (f.startsWith(orchestratorRoot) || f === path.join(root, 'README.md')) && f !== routing)) {
      if (/\bgpt-\d[\w.-]*/i.test(fs.readFileSync(file, 'utf8'))) fail(file, 'worker IDs belong only in routing.md');
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2] ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const errors = validateRepo(root);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log(`Skill structure, metadata, links, anchors and routing passed: ${root}`);
}
