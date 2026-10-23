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
