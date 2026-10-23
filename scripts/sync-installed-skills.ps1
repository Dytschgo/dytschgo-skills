[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string[]]$SkillRoot,
    [string]$SourceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$UserHome = [Environment]::GetFolderPath('UserProfile'),
    [string]$BackupRoot,
    [string]$SourceRevision = 'not-recorded',
    [switch]$EnableProfile,
    [switch]$DisableProfile,
    [switch]$Apply
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
if ($EnableProfile -and $DisableProfile) { throw 'Choose EnableProfile or DisableProfile, not both.' }
$SourceRoot = [IO.Path]::GetFullPath($SourceRoot).TrimEnd('\', '/')
$UserHome = [IO.Path]::GetFullPath($UserHome).TrimEnd('\', '/')
if (-not $BackupRoot) { $BackupRoot = Join-Path $UserHome 'agent-tools/skill-backups' }
$BackupRoot = [IO.Path]::GetFullPath($BackupRoot).TrimEnd('\', '/')

function Assert-UnlinkedAncestors([string]$Path) {
    $cursor = $Path
    while ($cursor) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Linked target or ancestor needs manual review: $cursor" }
        }
        $cursor = Split-Path -Parent $cursor
    }
}

function Assert-UserPath([string]$Path) {
    $full = [IO.Path]::GetFullPath($Path).TrimEnd('\', '/')
    if (-not $full.StartsWith($UserHome + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Target must be strictly inside the selected user home: $full"
    }
    Assert-UnlinkedAncestors $full
    return $full
}

function Get-SHA256([string]$File) {
    $stream = [IO.File]::OpenRead($File)
    $algorithm = [Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($algorithm.ComputeHash($stream)).Replace('-', '') }
    finally { $algorithm.Dispose(); $stream.Dispose() }
}

function Get-OwnershipSHA256([string]$File) {
    # Ownership accepts the published LF and Windows-checkout CRLF forms.
    # Copy, backup and installed-file verification remain byte-exact.
    $encoding = [Text.UTF8Encoding]::new($false, $true)
    $text = $encoding.GetString([IO.File]::ReadAllBytes($File)).Replace("`r`n", "`n")
    $algorithm = [Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($algorithm.ComputeHash($encoding.GetBytes($text))).Replace('-', '') }
    finally { $algorithm.Dispose() }
}

function Get-FileMap([string]$Directory) {
    $map = @{}
    if (-not (Test-Path -LiteralPath $Directory)) { return $map }
    $base = Get-Item -LiteralPath $Directory -Force
    if (-not $base.PSIsContainer -or ($base.Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw "Expected an ordinary directory: $Directory" }
    foreach ($item in Get-ChildItem -LiteralPath $Directory -Force -Recurse) {
        if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Linked content needs manual review: $($item.FullName)" }
        if (-not $item.PSIsContainer) {
            $relative = $item.FullName.Substring($Directory.TrimEnd('\', '/').Length + 1).Replace('\', '/')
            $map[$relative] = Get-SHA256 $item.FullName
        }
    }
    return $map
}

function Test-MapsEqual($Left, $Right) {
    if ($Left.Count -ne $Right.Count) { return $false }
    foreach ($key in $Left.Keys) { if (-not $Right.ContainsKey($key) -or $Left[$key] -ne $Right[$key]) { return $false } }
    return $true
}

$sourceSkills = Join-Path $SourceRoot 'skills'
Assert-UnlinkedAncestors $sourceSkills
if (-not (Test-Path -LiteralPath $sourceSkills -PathType Container)) { throw 'Source skills directory is missing.' }
$packs = @(Get-ChildItem -LiteralPath $sourceSkills -Directory | Sort-Object Name)
if (-not $packs.Count) { throw 'Source contains no skills.' }
$profileFile = Join-Path $SourceRoot 'profiles/dytschgo.md'
$roots = @($SkillRoot | ForEach-Object { Assert-UserPath $_ } | Sort-Object -Unique)
if (-not $roots.Count) { throw 'No target roots supplied.' }
$BackupRoot = Assert-UserPath $BackupRoot
if ($BackupRoot -eq $SourceRoot -or $BackupRoot.StartsWith($SourceRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or $SourceRoot.StartsWith($BackupRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Source and backup roots must not overlap.' }
foreach ($root in $roots) {
    if ($root -eq $SourceRoot -or $root.StartsWith($SourceRoot.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or $SourceRoot.StartsWith($root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Source and installation roots must not overlap.' }
    if ($root -eq $BackupRoot -or $BackupRoot.StartsWith($root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Backups must be outside skill discovery roots.' }
    if ((Test-Path -LiteralPath $root) -and -not (Test-Path -LiteralPath $root -PathType Container)) { throw "Skill root is not a directory: $root" }
    foreach ($other in $roots) {
        if ($root -ne $other -and $root.StartsWith($other.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Target skill roots must not overlap.' }
    }
}

# Complete preflight before creating directories or moving any installation.
$migrationFile = Join-Path $SourceRoot 'migrations/renames.json'
$migrations = @()
if (Test-Path -LiteralPath $migrationFile -PathType Leaf) {
    $migrationData = Get-Content -LiteralPath $migrationFile -Raw | ConvertFrom-Json
    if ($migrationData.collection -ne 'Dytschgo/dytschgo-skills') { throw 'Unrecognized migration collection.' }
    $migrations = @($migrationData.skills)
    $seenNames = @{}
    foreach ($migration in $migrations) {
        if ($migration.old -notmatch '^[a-z0-9]+(-[a-z0-9]+)*$' -or $migration.new -notmatch '^[a-z0-9]+(-[a-z0-9]+)*$' -or $migration.old -eq $migration.new) { throw 'Invalid migration name.' }
        if ($seenNames.ContainsKey($migration.old) -or $seenNames.ContainsKey($migration.new)) { throw 'Overlapping migration names.' }
        $seenNames[$migration.old] = $true
        $seenNames[$migration.new] = $true
        if ($migration.entrySha256 -notmatch '^[A-F0-9]{64}$' -or $migration.metadataSha256 -notmatch '^[A-F0-9]{64}$') { throw 'Invalid legacy ownership hashes.' }
        if (-not ($packs.Name -contains $migration.new) -or ($packs.Name -contains $migration.old)) { throw 'Migration must retire a legacy name into an existing source skill.' }
    }
}
$legacy = @()
for ($index = 0; $index -lt $roots.Count; $index++) {
    foreach ($migration in $migrations) {
        $target = Assert-UserPath (Join-Path $roots[$index] $migration.old)
        if (-not (Test-Path -LiteralPath $target)) { continue }
        $current = Get-FileMap $target
        if (-not $current.ContainsKey('SKILL.md') -or -not $current.ContainsKey('agents/openai.yaml') -or (Get-OwnershipSHA256 (Join-Path $target 'SKILL.md')) -ne $migration.entrySha256 -or (Get-OwnershipSHA256 (Join-Path $target 'agents/openai.yaml')) -ne $migration.metadataSha256) {
            throw "Legacy skill ownership differs; preserve and review before migrating: $target"
        }
        $legacy += [pscustomobject]@{ rootIndex = $index; name = $migration.old; nextName = $migration.new; target = $target; profile = $current.ContainsKey('references/active-profile.md') }
    }
}
$plan = @()
for ($index = 0; $index -lt $roots.Count; $index++) {
    foreach ($pack in $packs) {
        if ($pack.Name -notmatch '^[a-z0-9]+(-[a-z0-9]+)*$') { throw "Invalid skill folder: $($pack.Name)" }
        $entrypoint = Join-Path $pack.FullName 'SKILL.md'
        if (-not (Test-Path -LiteralPath $entrypoint -PathType Leaf)) { throw "Missing entrypoint: $($pack.Name)" }
        $front = Get-Content -LiteralPath $entrypoint -Raw
        if ($front -notmatch ('(?m)^name: ' + [regex]::Escape($pack.Name) + '\r?$')) { throw "Skill name differs from folder: $($pack.Name)" }
        $target = Assert-UserPath (Join-Path $roots[$index] $pack.Name)
        $current = Get-FileMap $target
        $priorProfile = @($legacy | Where-Object { $_.rootIndex -eq $index -and $_.nextName -eq $pack.Name -and $_.profile }).Count -gt 0
        $selected = $EnableProfile -or (-not $DisableProfile -and ($current.ContainsKey('references/active-profile.md') -or $priorProfile))
        if ($current.Count -and $pack.Name.StartsWith('dytschgo-')) {
            $targetEntry = Get-Content -LiteralPath (Join-Path $target 'SKILL.md') -Raw
            $targetMetadata = Get-Content -LiteralPath (Join-Path $target 'agents/openai.yaml') -Raw
            if ($targetEntry -notmatch ('(?m)^name: ' + [regex]::Escape($pack.Name) + '\r?$') -or $targetMetadata -notmatch '(?m)^  display_name: "Dytschgo ') { throw "New-name collision needs review: $target" }
        }
        $expected = Get-FileMap $pack.FullName
        if ($expected.ContainsKey('references/active-profile.md')) { throw 'Source must contain generic skills; select the profile during installation.' }
        if ($selected) {
            if (-not (Test-Path -LiteralPath $profileFile -PathType Leaf)) { throw 'Selected profile is missing from source.' }
            $expected['references/active-profile.md'] = Get-SHA256 $profileFile
        }
        $plan += [pscustomobject]@{ action = 'install'; rootIndex = $index; name = $pack.Name; source = $pack.FullName; target = $target; profile = [bool]$selected; changed = -not (Test-MapsEqual $expected $current); expected = $expected }
    }
}
foreach ($entry in $legacy) {
    $plan += [pscustomobject]@{ action = 'retire'; rootIndex = $entry.rootIndex; name = $entry.name; source = $null; target = $entry.target; profile = $entry.profile; changed = $true; expected = @{} }
}
if (-not $Apply) {
    [pscustomobject]@{ applied = $false; revision = $SourceRevision; backupRoot = $BackupRoot; entries = @($plan | Select-Object action, name, target, profile, changed) } | ConvertTo-Json -Depth 5
    return
}

$run = Join-Path $BackupRoot ((Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N'))
$null = New-Item -ItemType Directory -Path $run -Force
$journal = [Collections.Generic.List[object]]::new()
$recoveryFile = Join-Path $run 'recovery.json'
foreach ($entry in $plan | Where-Object changed) {
    $journal.Add([pscustomobject]@{
        action = $entry.action
        target = $entry.target
        saved = Join-Path $run ("previous/$($entry.rootIndex)/$($entry.name)")
        staged = Join-Path $run ("stage/$($entry.rootIndex)/$($entry.name)")
        existed = [bool](Test-Path -LiteralPath $entry.target)
        oldMoved = $false
        installed = $false
        phase = 'planned'
    })
}
function Save-Recovery([string]$Status) {
    $state = [pscustomobject]@{ status = $Status; revision = $SourceRevision; source = $SourceRoot; operations = @($journal.ToArray()) }
    $bytes = [Text.UTF8Encoding]::new($false).GetBytes(($state | ConvertTo-Json -Depth 6))
    $temporary = Join-Path $run 'recovery.next.json'
    $stream = [IO.File]::Open($temporary, [IO.FileMode]::Create, [IO.FileAccess]::Write, [IO.FileShare]::None)
    try { $stream.Write($bytes, 0, $bytes.Length); $stream.Flush($true) } finally { $stream.Dispose() }
    if ([IO.File]::Exists($recoveryFile)) { [IO.File]::Replace($temporary, $recoveryFile, [NullString]::Value) }
    else { [IO.File]::Move($temporary, $recoveryFile) }
}
Save-Recovery 'prepared'
try {
    foreach ($entry in $plan | Where-Object changed) {
        $null = Assert-UserPath $entry.target
        $operation = $journal | Where-Object { $_.target -eq $entry.target } | Select-Object -First 1
        $staged = $operation.staged
        $saved = $operation.saved
        if ($entry.action -eq 'retire') {
            $null = New-Item -ItemType Directory -Path (Split-Path -Parent $saved) -Force
            $operation.phase = 'moving-previous'
            Save-Recovery 'running'
            Move-Item -LiteralPath $entry.target -Destination $saved
            $operation.oldMoved = $true
            $operation.phase = 'retired'
            Save-Recovery 'running'
            continue
        }
        $operation.phase = 'staging'
        Save-Recovery 'running'
        $null = New-Item -ItemType Directory -Path $staged -Force
        Get-ChildItem -LiteralPath $entry.source -Force | ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination $staged -Recurse -Force }
        if ($entry.profile) {
            $referenceDir = Join-Path $staged 'references'
            $null = New-Item -ItemType Directory -Path $referenceDir -Force
            Copy-Item -LiteralPath $profileFile -Destination (Join-Path $referenceDir 'active-profile.md')
        }
        if (-not (Test-MapsEqual $entry.expected (Get-FileMap $staged))) { throw "Staging verification failed: $($entry.name)" }
        if (Test-Path -LiteralPath $entry.target) {
            $null = New-Item -ItemType Directory -Path (Split-Path -Parent $saved) -Force
            $operation.phase = 'moving-previous'
            Save-Recovery 'running'
            Move-Item -LiteralPath $entry.target -Destination $saved
            $operation.oldMoved = $true
            Save-Recovery 'running'
        }
        $null = New-Item -ItemType Directory -Path (Split-Path -Parent $entry.target) -Force
        $operation.phase = 'installing'
        Save-Recovery 'running'
        Move-Item -LiteralPath $staged -Destination $entry.target
        $operation.installed = $true
        $operation.phase = 'installed'
        Save-Recovery 'running'
        if (-not (Test-MapsEqual $entry.expected (Get-FileMap $entry.target))) { throw "Installed hash verification failed: $($entry.name)" }
    }
    $manifest = [pscustomobject]@{ applied = $true; revision = $SourceRevision; source = $SourceRoot; backup = $run; entries = @($plan | Select-Object action, name, target, profile, changed, expected) }
    $manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $run 'manifest.json') -Encoding UTF8
    Save-Recovery 'complete'
    $manifest | Select-Object applied, revision, backup, @{n='updated';e={@($plan | Where-Object { $_.changed -and $_.action -eq 'install' }).Count}}, @{n='retired';e={@($plan | Where-Object { $_.action -eq 'retire' }).Count}}, @{n='verified';e={@($plan | Where-Object { $_.action -eq 'install' }).Count}} | ConvertTo-Json
} catch {
    $failure = $_
    $rollbackErrors = @()
    for ($index = $journal.Count - 1; $index -ge 0; $index--) {
        $operation = $journal[$index]
        try {
            $null = Assert-UserPath $operation.target
            if ($operation.installed -and (Test-Path -LiteralPath $operation.target)) {
                $failed = Join-Path $run ("failed/$index")
                $null = New-Item -ItemType Directory -Path (Split-Path -Parent $failed) -Force
                Move-Item -LiteralPath $operation.target -Destination $failed
            }
            if ($operation.oldMoved) { Move-Item -LiteralPath $operation.saved -Destination $operation.target }
            $operation.phase = 'rolled-back'
        } catch { $rollbackErrors += $_.Exception.Message }
    }
    try { Save-Recovery $(if ($rollbackErrors.Count) { 'rollback-needs-review' } else { 'rolled-back' }) } catch { $rollbackErrors += $_.Exception.Message }
    if ($rollbackErrors.Count) { throw "Installation failed: $failure. Rollback needs review: $($rollbackErrors -join '; '). Backups: $run" }
    throw "Installation failed; prior installations restored. $failure. Evidence: $run"
}
