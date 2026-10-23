import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const script = fileURLToPath(new URL('../scripts/sync-installed-skills.ps1', import.meta.url));
function setup(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-sync-'));
  t.after(() => { assert.equal(path.dirname(base), path.resolve(os.tmpdir())); fs.rmSync(base, { recursive: true, force: true }); });
  const home = path.join(base, 'home'), source = path.join(home, 'source'), root = path.join(home, '.test', 'skills');
  const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
  write(path.join(source, 'skills', 'sample', 'SKILL.md'), '---\nname: sample\ndescription: An example.\n---\n# Sample\n');
  write(path.join(source, 'profiles', 'dytschgo.md'), '# Selected preferences\n');
  write(path.join(root, 'unrelated', 'SKILL.md'), 'private skill remains');
  const runAt = (target, ...args) => spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-SourceRoot', source, '-UserHome', home, '-SkillRoot', target, ...args], { encoding: 'utf8' });
  const run = (...args) => runAt(root, ...args);
  return { base, source, home, root, write, run, runAt };
}
const windows = { skip: process.platform !== 'win32' };

function legacyFixture(t) {
  const f = setup(t);
  const entry = '---\nname: old-sample\ndescription: "Legacy collection skill."\n---\n';
  const metadata = 'interface:\n  display_name: "Dytschgo legacy fixture"\n';
  f.write(path.join(f.root, 'old-sample', 'SKILL.md'), entry);
  f.write(path.join(f.root, 'old-sample', 'agents/openai.yaml'), metadata);
  const sha = text => createHash('sha256').update(text).digest('hex').toUpperCase();
  const migrations = { collection: 'Dytschgo/dytschgo-skills', skills: [{ old: 'old-sample', new: 'sample', entrySha256: sha(entry), metadataSha256: sha(metadata) }] };
  f.write(path.join(f.source, 'migrations/renames.json'), JSON.stringify(migrations));
  return { ...f, migrations };
}

for (const newline of ['LF', 'CRLF']) {
  test(`published ${newline} legacy files migrate without weakening modified-content rejection`, windows, t => {
    const { root, run } = legacyFixture(t);
    if (newline === 'CRLF') for (const relative of ['SKILL.md', 'agents/openai.yaml']) {
      const file = path.join(root, 'old-sample', relative);
      fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('\n', '\r\n'));
    }
    const result = run('-Apply');
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).retired, 1);
    assert.equal(fs.existsSync(path.join(root, 'old-sample')), false);
  });
}

test('rename migration is dry-run-first, preserves activation, backs up legacy and is idempotent', windows, t => {
  const { root, write, run } = legacyFixture(t);
  write(path.join(root, 'old-sample/references/active-profile.md'), 'old selected profile');
  const plan = run();
  assert.equal(plan.status, 0, plan.stderr);
  assert.equal(JSON.parse(plan.stdout).entries.find(e => e.name === 'old-sample').action, 'retire');
  assert.ok(fs.existsSync(path.join(root, 'old-sample')));
  assert.equal(fs.existsSync(path.join(root, 'sample')), false);
  const applied = run('-Apply');
  assert.equal(applied.status, 0, applied.stderr);
  const result = JSON.parse(applied.stdout);
  assert.equal(result.retired, 1);
  assert.equal(fs.existsSync(path.join(root, 'old-sample')), false);
  assert.equal(fs.readFileSync(path.join(root, 'sample/references/active-profile.md'), 'utf8'), '# Selected preferences\n');
  assert.ok(fs.existsSync(path.join(result.backup, 'previous/0/old-sample/SKILL.md')));
  const repeat = run('-Apply');
  assert.equal(repeat.status, 0, repeat.stderr);
  assert.equal(JSON.parse(repeat.stdout).retired, 0);
  assert.equal(JSON.parse(repeat.stdout).updated, 0);
});

test('modified legacy ownership and invalid migration paths fail without writes', windows, t => {
  const { root, source, home, write, run, migrations } = legacyFixture(t);
  write(path.join(root, 'old-sample/SKILL.md'), 'personal changes');
  const modified = run('-Apply');
  assert.notEqual(modified.status, 0);
  assert.match(modified.stderr, /ownership differs/);
  assert.equal(fs.existsSync(path.join(home, 'agent-tools')), false);
  migrations.skills[0].old = '../outside';
  write(path.join(source, 'migrations/renames.json'), JSON.stringify(migrations));
  const traversal = run('-Apply');
  assert.notEqual(traversal.status, 0);
  assert.match(traversal.stderr, /Invalid migration name/);
  assert.equal(fs.readFileSync(path.join(root, 'old-sample/SKILL.md'), 'utf8'), 'personal changes');
});

test('a retirement failure rolls back newly installed names', windows, t => {
  const { base, source, home, root, write } = legacyFixture(t);
  const wrapper = path.join(base, 'retire-failure.ps1');
  write(wrapper, `param($Installer, $Source, $SelectedHome, $Destination)\n$ErrorActionPreference = 'Stop'\nfunction Move-Item {\n[CmdletBinding()] param($LiteralPath, $Destination)\nif ((Split-Path -Leaf $LiteralPath) -eq 'old-sample') { throw 'simulated retirement failure' }\nMicrosoft.PowerShell.Management\\Move-Item -LiteralPath $LiteralPath -Destination $Destination\n}\n& $Installer -SourceRoot $Source -UserHome $SelectedHome -SkillRoot $Destination -Apply\n`);
  const result = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', wrapper, script, source, home, root], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.ok(fs.existsSync(path.join(root, 'old-sample/SKILL.md')));
  assert.equal(fs.existsSync(path.join(root, 'sample')), false);
  assert.equal(fs.readFileSync(path.join(root, 'unrelated/SKILL.md'), 'utf8'), 'private skill remains');
});

test('a new Dytschgo name collision preserves unrelated content', windows, t => {
  const { source, root, write, run } = setup(t);
  fs.renameSync(path.join(source, 'skills/sample'), path.join(source, 'skills/dytschgo-new'));
  write(path.join(source, 'skills/dytschgo-new/SKILL.md'), '---\nname: dytschgo-new\ndescription: "New."\n---\n');
  write(path.join(root, 'dytschgo-new/SKILL.md'), '---\nname: unrelated\n---\npersonal work');
  write(path.join(root, 'dytschgo-new/agents/openai.yaml'), 'interface:\n  display_name: "Personal skill"\n');
  const result = run('-Apply');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /collision needs review/);
  assert.match(fs.readFileSync(path.join(root, 'dytschgo-new/SKILL.md'), 'utf8'), /personal work/);
});
test('dry run leaves installations and backup paths untouched', windows, t => {
  const { home, root, run } = setup(t);
  const result = run('-EnableProfile');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(root, 'sample')), false);
  assert.equal(fs.existsSync(path.join(home, 'agent-tools')), false);
});
test('replace only managed skills, preserve backup and remove stale managed files', windows, t => {
  const { root, write, run } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'old skill');
  write(path.join(root, 'sample', 'obsolete.md'), 'old reference');
  const result = run('-Apply', '-EnableProfile', '-SourceRevision', 'fixture-sha');
  assert.equal(result.status, 0, result.stderr);
  const manifest = JSON.parse(result.stdout);
  assert.equal(manifest.revision, 'fixture-sha');
  assert.equal(fs.readFileSync(path.join(root, 'unrelated', 'SKILL.md'), 'utf8'), 'private skill remains');
  assert.equal(fs.existsSync(path.join(root, 'sample', 'obsolete.md')), false);
  assert.equal(fs.readFileSync(path.join(manifest.backup, 'previous', '0', 'sample', 'obsolete.md'), 'utf8'), 'old reference');
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'references', 'active-profile.md'), 'utf8'), '# Selected preferences\n');
  const recovery = JSON.parse(fs.readFileSync(path.join(manifest.backup, 'recovery.json'), 'utf8'));
  assert.equal(recovery.status, 'complete');
  assert.equal(fs.realpathSync.native(recovery.operations[0].target), fs.realpathSync.native(path.join(root, 'sample')));
  assert.equal(recovery.operations[0].installed, true);
});
test('repeat is idempotent and profile activation survives a later update', windows, t => {
  const { source, root, write, run } = setup(t);
  assert.equal(run('-Apply', '-EnableProfile').status, 0);
  const unchanged = run('-Apply');
  assert.equal(unchanged.status, 0, unchanged.stderr);
  assert.equal(JSON.parse(unchanged.stdout).updated, 0);
  write(path.join(source, 'skills', 'sample', 'new.md'), 'updated source');
  const updated = run('-Apply');
  assert.equal(updated.status, 0, updated.stderr);
  assert.equal(fs.existsSync(path.join(root, 'sample', 'references', 'active-profile.md')), true);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'new.md'), 'utf8'), 'updated source');
  const disabled = run('-Apply', '-DisableProfile');
  assert.equal(disabled.status, 0, disabled.stderr);
  assert.equal(fs.existsSync(path.join(root, 'sample', 'references', 'active-profile.md')), false);
});
test('invalid source aborts before modifying an existing install', windows, t => {
  const { source, root, write, run } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original');
  write(path.join(source, 'skills', 'broken', 'reference.md'), 'no entrypoint');
  const result = run('-Apply');
  assert.notEqual(result.status, 0);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original');
});
test('targets outside the selected home are rejected', windows, t => {
  const { base, run } = setup(t);
  const result = run('-Apply', '-BackupRoot', path.join(base, 'outside'));
  assert.notEqual(result.status, 0);
  assert.equal(fs.existsSync(path.join(base, 'outside')), false);
});
test('linked skill folders are rejected without touching their referent', windows, t => {
  const { base, root, write, run } = setup(t);
  const referent = path.join(base, 'referent');
  write(path.join(referent, 'SKILL.md'), 'unique work');
  fs.symlinkSync(referent, path.join(root, 'sample'), 'junction');
  const result = run('-Apply');
  assert.notEqual(result.status, 0);
  assert.equal(fs.readFileSync(path.join(referent, 'SKILL.md'), 'utf8'), 'unique work');
});
test('trailing separator cannot put backups inside a discovery root', windows, t => {
  const { root, write, runAt } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original');
  const result = runAt(root + path.sep, '-BackupRoot', root, '-Apply');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Backups must be outside/);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original');
});
test('backups inside source skills are rejected before any writes', windows, t => {
  const { source, root, write, run } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original');
  const backup = path.join(source, 'skills', 'sample', 'references', 'backups');
  const result = run('-BackupRoot', backup, '-Apply');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Source and backup roots must not overlap/);
  assert.equal(fs.existsSync(backup), false);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original');
});
test('a linked source ancestor cannot hide source/backup overlap', windows, t => {
  const { source, home, root, write } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original');
  const realParent = path.join(home, 'real-parent');
  fs.mkdirSync(realParent);
  const realSource = path.join(realParent, 'source');
  fs.renameSync(source, realSource);
  const aliasParent = path.join(home, 'source-alias');
  fs.symlinkSync(realParent, aliasParent, 'junction');
  const aliasedSource = path.join(aliasParent, 'source');
  const backup = path.join(realSource, 'skills', 'sample', 'references', 'backups');
  const result = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-SourceRoot', aliasedSource, '-UserHome', home, '-SkillRoot', root, '-BackupRoot', backup, '-Apply'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Linked target or ancestor/);
  assert.equal(fs.existsSync(backup), false);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original');
});
test('a later rename failure restores earlier replacements and retains recovery mapping', windows, t => {
  const { base, source, home, root, write } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original sample');
  write(path.join(root, 'second', 'SKILL.md'), 'original second');
  write(path.join(source, 'skills', 'second', 'SKILL.md'), '---\nname: second\ndescription: Second fixture.\n---\n');
  const wrapper = path.join(base, 'rename-failure.ps1');
  write(wrapper, `param($Installer, $Source, $SelectedHome, $Destination)\n$ErrorActionPreference = 'Stop'\nfunction Move-Item {\n[CmdletBinding()] param($LiteralPath, $Destination)\nif ((Split-Path -Leaf $Destination) -eq 'second' -and $Destination -match 'previous') { throw 'simulated rename failure' }\nMicrosoft.PowerShell.Management\\Move-Item -LiteralPath $LiteralPath -Destination $Destination\n}\n& $Installer -SourceRoot $Source -UserHome $SelectedHome -SkillRoot $Destination -Apply\n`);
  const result = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', wrapper, script, source, home, root], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original sample');
  assert.equal(fs.readFileSync(path.join(root, 'second', 'SKILL.md'), 'utf8'), 'original second');
  const backups = path.join(home, 'agent-tools', 'skill-backups');
  const run = fs.readdirSync(backups)[0];
  const recovery = JSON.parse(fs.readFileSync(path.join(backups, run, 'recovery.json'), 'utf8'));
  assert.equal(recovery.status, 'rolled-back');
  assert.equal(recovery.operations.length, 2);
  assert.ok(recovery.operations.every(operation => fs.realpathSync.native(path.dirname(operation.target)) === fs.realpathSync.native(root)));
});
test('a linked source skills directory is rejected before staging', windows, t => {
  const { source, home, root, write } = setup(t);
  write(path.join(root, 'sample', 'SKILL.md'), 'original');
  const realPacks = path.join(home, 'real-packs');
  fs.renameSync(path.join(source, 'skills'), realPacks);
  fs.symlinkSync(realPacks, path.join(source, 'skills'), 'junction');
  const backup = path.join(realPacks, 'sample', 'references', 'backups');
  const result = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-SourceRoot', source, '-UserHome', home, '-SkillRoot', root, '-BackupRoot', backup, '-Apply'], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Linked target or ancestor/);
  assert.equal(fs.existsSync(backup), false);
  assert.equal(fs.readFileSync(path.join(root, 'sample', 'SKILL.md'), 'utf8'), 'original');
});
