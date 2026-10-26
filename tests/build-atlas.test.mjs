import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildAtlas } from '../scripts/build-atlas.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-test-'));
  t.after(() => { assert.equal(path.dirname(root), path.resolve(os.tmpdir())); fs.rmSync(root, { recursive: true, force: true }); });
  const write = (name, value) => { const file = path.join(root, name); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value); };
  write('skills/alpha/SKILL.md', '---\nname: alpha\ndescription: "First skill."\n---\n# Dytschgo Alpha\nUse [Beta](../beta/SKILL.md) when required.\n');
  write('skills/beta/SKILL.md', '---\nname: beta\ndescription: "Second skill."\n---\n# Dytschgo Beta\n');
  write('workflows/journeys.json', JSON.stringify({ nodes: [{ id: 'a', slug: 'alpha' }, { id: 'b', slug: 'beta' }], routes: [{ steps: [['a']], extras: ['b'] }] }));
  write('workflows/link-roles.json', '[]');
  write('workflows/atlas-template.html', '<script>const nodes=__NODES__;const edges=__EDGES__;const routes=__ROUTES__;</script>__SOURCE_HASH__');
  return { root, write };
}

test('atlas derives names, descriptions and source links reproducibly', t => {
  const { root, write } = fixture(t);
  const first = buildAtlas(root);
  assert.deepEqual(first, buildAtlas(root));
  assert.equal(first.model.nodes[0].name, 'Alpha');
  assert.equal(first.model.edges[0].kind, 'load');
  assert.equal(first.model.edges[0].line, 6);
  write('skills/beta/SKILL.md', '---\nname: beta\ndescription: "Changed description."\n---\n# Dytschgo Renamed Beta\n');
  const second = buildAtlas(root);
  assert.notEqual(first.model.sourceHash, second.model.sourceHash);
  assert.equal(second.model.nodes[1].name, 'Renamed Beta');
});
test('missing skill coverage and invalid journeys fail rather than silently omit work', t => {
  const { root, write } = fixture(t);
  write('skills/extra/SKILL.md', '# Extra');
  assert.throws(() => buildAtlas(root), /cover every/);
  fs.rmSync(path.join(root, 'skills/extra'), { recursive: true });
  write('workflows/journeys.json', JSON.stringify({ nodes: [{ id: 'a', slug: 'alpha' }, { id: 'b', slug: 'beta' }], routes: [{ steps: [['missing']], extras: ['a'] }] }));
  assert.throws(() => buildAtlas(root), /Unknown journey/);
});
test('classification exceptions distinguish shared guidance and reject stale rules', t => {
  const { root, write } = fixture(t);
  write('workflows/link-roles.json', JSON.stringify([{ source: 'skills/alpha/SKILL.md', target: 'beta', kind: 'reference' }]));
  assert.equal(buildAtlas(root).model.edges[0].kind, 'reference');
  write('skills/alpha/SKILL.md', '---\nname: alpha\ndescription: "First skill."\n---\n# Alpha\n');
  assert.throws(() => buildAtlas(root), /Unused/);
});
test('inbound mentions are excluded and linked shared references are classified', t => {
  const { root, write } = fixture(t);
  write('workflows/link-roles.json', JSON.stringify([{ source: 'skills/alpha/SKILL.md', target: 'beta', kind: 'mention' }]));
  assert.equal(buildAtlas(root).model.edges.length, 0);
  write('workflows/link-roles.json', '[]');
  write('skills/alpha/references/read.md', '[Shared guide](../../beta/references/guide.md)');
  write('skills/beta/references/guide.md', '# Guide');
  assert.equal(buildAtlas(root).model.edges.find(e => e.file.endsWith('read.md')).kind, 'reference');
});
test('embedded source text cannot close the generated script element', t => {
  const { root, write } = fixture(t);
  write('skills/alpha/references/read.md', 'Use [Beta](../../beta/SKILL.md) when text includes </script><img src=x onerror=alert(1)>.');
  const result = buildAtlas(root);
  assert.ok(result.html.includes('\\u003c/script>'));
  assert.equal((result.html.match(/<\/script>/g) ?? []).length, 1);
});

test('every referral condition survives while an inbound mention can be classified per occurrence', t => {
  const { root, write } = fixture(t);
  write('skills/alpha/references/routes.md', 'Use [Beta](../../beta/SKILL.md) to settle the destination.\nUse [Beta](../../beta/SKILL.md) as the fallback.\n[Beta](../../beta/SKILL.md) calls this skill after an interview.\n');
  write('workflows/link-roles.json', JSON.stringify([{ source: 'skills/alpha/references/routes.md', target: 'beta', match: 'calls this skill', kind: 'mention' }]));
  const edges = buildAtlas(root).model.edges.filter(e => e.file.endsWith('routes.md'));
  assert.equal(edges.length, 2);
  assert.deepEqual(edges.map(e => e.line), [1, 2]);
  assert.match(edges[0].when, /destination/);
  assert.match(edges[1].when, /fallback/);
});

test('newline variants produce identical generated output and input fingerprints', t => {
  const { root } = fixture(t);
  const first = buildAtlas(root);
  for (const relative of ['skills/alpha/SKILL.md', 'skills/beta/SKILL.md', 'workflows/atlas-template.html', 'workflows/journeys.json', 'workflows/link-roles.json']) {
    const file = path.join(root, relative);
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('\n', '\r\n'));
  }
  assert.deepEqual(first, buildAtlas(root));
});

test('atlas visible and accessible skill counts follow the source collection', t => {
  const { root, write } = fixture(t);
  write('workflows/atlas-template.html', '<p>__SKILL_COUNT__ skills</p><div aria-label="All __SKILL_COUNT__ skills"></div>');
  assert.equal(buildAtlas(root).html, '<p>2 skills</p><div aria-label="All 2 skills"></div>');
  const collectionRoot = path.resolve(import.meta.dirname, '..');
  const { model, html } = buildAtlas(collectionRoot);
  assert.ok(html.includes(`<strong>${model.nodes.length} skills.`));
  assert.ok(html.includes(`aria-label="All ${model.nodes.length} skills"`));
});
