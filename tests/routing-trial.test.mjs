import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareRoutingTrial } from '../scripts/prepare-routing-trial.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
test('selection trial exposes metadata and raw request without preloading bodies or evaluator expectations', () => {
  const trial = prepareRoutingTrial(root, 'retro-explanation');
  assert.equal(trial.catalog.length, 20);
  assert.ok(trial.catalog.every(s => s.name && s.description && s.path.endsWith('SKILL.md')));
  assert.equal(trial.expected, undefined);
  assert.equal(trial.catalog[0].body, undefined);
  assert.equal(trial.request, 'Explain why these changes were made in one of those interactive retro HTML overviews.');
  assert.doesNotMatch(trial.task, /must choose.*dytschgo-retro/i);
});
test('unknown trial IDs fail instead of silently choosing a different case', () => {
  assert.throws(() => prepareRoutingTrial(root, 'not-a-case'), /Unknown routing case/);
});
