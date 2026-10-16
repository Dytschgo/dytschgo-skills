# Agent instructions

## Dylan's Windows test lab

When `%USERPROFILE%\agent-tools\windows-test-lab\README.md` exists on Dylan's
Windows workstation, read it before installing project dependencies, building,
testing, packaging, launching an app, or running UI/browser checks. Use its shared
VM runner with this checkout and the repository's existing commands. Follow its
platform selection, separate guest workspace per checkout, and serialized GUI and
heavy-job rules. Preserve command exit codes and logs.

If that installed lab's runner or required VM is unavailable, report the blocker
instead of running the workload on the host. Explicit user instructions to run on
the host take precedence. Other machines and CI retain their normal workflow.
