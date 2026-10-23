import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function prepareRoutingTrial(root, id) {
  const cases = JSON.parse(fs.readFileSync(path.join(root, 'evals/routing-cases.json'), 'utf8')).cases;
  const item = cases.find(c => c.id === id);
  if (!item) throw new Error(`Unknown routing case: ${id}`);
  const catalog = fs.readdirSync(path.join(root, 'skills'), { withFileTypes: true }).filter(e => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name, 'en')).map(e => {
    const file = path.join(root, 'skills', e.name, 'SKILL.md');
    const text = fs.readFileSync(file, 'utf8');
    return { name: e.name, description: JSON.parse(text.match(/^description: (.+)$/m)[1]), path: file };
  });
  return { context: item.context, request: item.request, catalog,
    task: 'This is a selection-only trial. Use the raw context and request to choose the needed skill(s), or direct work if none is needed. You may read selected entrypoints and relevant references. Report selected skill IDs, first useful action, and finish boundary. Do not execute the user task, delegate, mutate files, publish, or install anything. The catalog is available metadata, not a list to load in full.' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const payload = prepareRoutingTrial(root, process.argv[2]);
  const output = process.argv[3];
  if (output) fs.writeFileSync(path.resolve(output), JSON.stringify(payload, null, 2) + '\n');
  else console.log(JSON.stringify(payload, null, 2));
}
