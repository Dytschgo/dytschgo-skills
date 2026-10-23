import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateRepo } from '../scripts/check-skills.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-validator-'));
  t.after(() => { assert.equal(path.dirname(root), path.resolve(os.tmpdir())); fs.rmSync(root, { recursive: true, force: true }); });
  const write = (name, text) => { const file = path.join(root, name); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  write('skills/example/SKILL.md', '---\nname: example\ndescription: A focused example skill.\n---\n# Example\n\n[Reference](references/guide.md#use-it)\n');
  write('skills/example/agents/openai.yaml', 'interface:\n  display_name: "Example"\n  short_description: "A focused and useful example skill"\n  default_prompt: "Use $example to complete the task."\n');
  write('skills/example/references/guide.md', '# Guide\n\n## Use it\n\n```md\n[not a real link](missing.md)\n```\n');
  return { root, write };
}

test('valid references and metadata pass; fenced examples are ignored', t => {
  const { root } = fixture(t);
  assert.deepEqual(validateRepo(root), []);
});
test('folder/name mismatch is rejected', t => {
  const { root, write } = fixture(t);
  write('skills/example/SKILL.md', '---\nname: another\ndescription: An example.\n---\n');
  assert.ok(validateRepo(root).some(e => e.includes('name must match')));
});
test('missing references and heading fragments are reported', t => {
  const { root, write } = fixture(t);
  write('README.md', '[Missing](missing.md)\n[Wrong anchor](skills/example/references/guide.md#not-here)\n');
  const errors = validateRepo(root);
  assert.ok(errors.some(e => e.includes('missing local link')));
  assert.ok(errors.some(e => e.includes('missing heading')));
});
test('metadata that invokes another skill fails', t => {
  const { root, write } = fixture(t);
  write('skills/example/agents/openai.yaml', 'interface:\n  display_name: "Example"\n  short_description: "A focused and useful example skill"\n  default_prompt: "Use $another instead."\n');
  assert.ok(validateRepo(root).some(e => e.includes('invoke its own')));
});
test('duplicate or malformed frontmatter fails', t => {
  const { root, write } = fixture(t);
  write('skills/example/SKILL.md', '---\nname: example\nname: example\ndescription: broken: scalar\n---\n');
  const errors = validateRepo(root);
  assert.ok(errors.some(e => e.includes('unique')));
  assert.ok(errors.some(e => e.includes('scalar')));
});
test('routing IDs cannot drift into another document', t => {
  const { root, write } = fixture(t);
  write('skills/astra-orchestrator/references/routing.md', '`gpt-6-luna` and `gpt-6.1-sol`\n');
  write('README.md', 'Old reviewer: gpt-6-sol\n');
  assert.ok(validateRepo(root).some(e => e.includes('IDs belong only')));
});
test('YAML comments and non-string plain descriptions are rejected', t => {
  const { root, write } = fixture(t);
  for (const description of ['# pending description', 'null', 'true', '42']) {
    write('skills/example/SKILL.md', `---\nname: example\ndescription: ${description}\n---\n`);
    assert.ok(validateRepo(root).some(e => e.includes('invalid description')), description);
  }
});
