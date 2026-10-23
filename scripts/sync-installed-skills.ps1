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

function Assert-UserPath([string]$Path) {
    $full = [IO.Path]::GetFullPath($Path).TrimEnd('\', '/')
    if (-not $full.StartsWith($UserHome + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Target must be strictly inside the selected user home: $full"
    }
    $cursor = $full
    while ($cursor -and $cursor.Length -ge $UserHome.Length) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Linked target or ancestor needs manual review: $cursor" }
        }
        $cursor = Split-Path -Parent $cursor
    }
    return $full
}

function Get-SHA256([string]$File) {
    $stream = [IO.File]::OpenRead($File)
    $algorithm = [Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($algorithm.ComputeHash($stream)).Replace('-', '') }
    finally { $algorithm.Dispose(); $stream.Dispose() }
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
if (-not (Test-Path -LiteralPath $sourceSkills -PathType Container)) { throw 'Source skills directory is missing.' }
$packs = @(Get-ChildItem -LiteralPath $sourceSkills -Directory | Sort-Object Name)
if (-not $packs.Count) { throw 'Source contains no skills.' }
$profileFile = Join-Path $SourceRoot 'profiles/dytschgo.md'
$roots = @($SkillRoot | ForEach-Object { Assert-UserPath $_ } | Sort-Object -Unique)
if (-not $roots.Count) { throw 'No target roots supplied.' }
$BackupRoot = Assert-UserPath $BackupRoot
foreach ($root in $roots) {
    if ($root -eq $SourceRoot -or $root.StartsWith($SourceRoot.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or $SourceRoot.StartsWith($root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Source and installation roots must not overlap.' }
    if ($root -eq $BackupRoot -or $BackupRoot.StartsWith($root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Backups must be outside skill discovery roots.' }
    if ((Test-Path -LiteralPath $root) -and -not (Test-Path -LiteralPath $root -PathType Container)) { throw "Skill root is not a directory: $root" }
    foreach ($other in $roots) {
        if ($root -ne $other -and $root.StartsWith($other.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Target skill roots must not overlap.' }
    }
}

# Complete preflight before creating directories or moving any installation.
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
        $selected = $EnableProfile -or (-not $DisableProfile -and $current.ContainsKey('references/active-profile.md'))
        $expected = Get-FileMap $pack.FullName
        if ($expected.ContainsKey('references/active-profile.md')) { throw 'Source must contain generic skills; select the profile during installation.' }
        if ($selected) {
            if (-not (Test-Path -LiteralPath $profileFile -PathType Leaf)) { throw 'Selected profile is missing from source.' }
            $expected['references/active-profile.md'] = Get-SHA256 $profileFile
        }
        $plan += [pscustomobject]@{ rootIndex = $index; name = $pack.Name; source = $pack.FullName; target = $target; profile = [bool]$selected; changed = -not (Test-MapsEqual $expected $current); expected = $expected }
    }
}
if (-not $Apply) {
    [pscustomobject]@{ applied = $false; revision = $SourceRevision; backupRoot = $BackupRoot; entries = @($plan | Select-Object name, target, profile, changed) } | ConvertTo-Json -Depth 5
    return
}

$run = Join-Path $BackupRoot ((Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N'))
$null = New-Item -ItemType Directory -Path $run -Force
$journal = [Collections.Generic.List[object]]::new()
$recoveryFile = Join-Path $run 'recovery.json'
foreach ($entry in $plan | Where-Object changed) {
    $journal.Add([pscustomobject]@{
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
    $manifest = [pscustomobject]@{ applied = $true; revision = $SourceRevision; source = $SourceRoot; backup = $run; entries = @($plan | Select-Object name, target, profile, changed, expected) }
    $manifest | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $run 'manifest.json') -Encoding UTF8
    Save-Recovery 'complete'
    $manifest | Select-Object applied, revision, backup, @{n='updated';e={@($plan | Where-Object changed).Count}}, @{n='verified';e={$plan.Count}} | ConvertTo-Json
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
