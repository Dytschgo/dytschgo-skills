# Agent instructions

## Dylan's Windows test lab

Choose the verification environment from the target, not the host OS. This repo
contains instructions and maintenance scripts: run its lightweight structural,
Node and PowerShell checks directly or in normal CI. Websites and browser checks
also use their normal local or CI workflow; they do not require this Windows VM.

For Windows-native apps, installers, or Windows-specific compatibility checks,
read `%USERPROFILE%\agent-tools\windows-test-lab\README.md` when available and
use its shared runner. Follow its workspace isolation and queue rules, preserving
exit codes and logs. If a required platform runner is unavailable, report that
specific limitation. Explicit user instructions take precedence.
