import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Package the shared guide locally so each skill also works when installed alone.
export function buildAuditReferences(root, check = false) {
  const text = fs.readFileSync(path.join(root, 'workflows/substantial-audit.md'), 'utf8').replaceAll('\r\n', '\n');
  const content = '<!-- Generated from workflows/substantial-audit.md; run node scripts/build-audit-references.mjs. -->\n\n' + text;
  for (const skill of ['dytschgo-design', 'dytschgo-verify-setup', 'dytschgo-coordinate']) {
    const file = path.join(root, 'skills', skill, 'references/substantial-audit.md');
    if (check) {
      if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n') !== content) {
        throw new Error(`Stale packaged audit guide: ${skill}. Run node scripts/build-audit-references.mjs`);
      }
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildAuditReferences(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), process.argv.includes('--check'));
  console.log('Shared audit guide: three standalone skill copies match');
}
