import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/sync-installed-skills.ps1', import.meta.url));
function setup(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-sync-'));
  t.after(() => { assert.equal(path.dirname(base), path.resolve(os.tmpdir())); fs.rmSync(base, { recursive: true, force: true }); });
  const source = path.join(base, 'source'), home = path.join(base, 'home'), root = path.join(home, '.test', 'skills');
  const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
  write(path.join(source, 'skills', 'sample', 'SKILL.md'), '---\nname: sample\ndescription: An example.\n---\n# Sample\n');
  write(path.join(source, 'profiles', 'dytschgo.md'), '# Selected preferences\n');
  write(path.join(root, 'unrelated', 'SKILL.md'), 'private skill remains');
  const runAt = (target, ...args) => spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-SourceRoot', source, '-UserHome', home, '-SkillRoot', target, ...args], { encoding: 'utf8' });
  const run = (...args) => runAt(root, ...args);
  return { base, source, home, root, write, run, runAt };
}
const windows = { skip: process.platform !== 'win32' };
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
