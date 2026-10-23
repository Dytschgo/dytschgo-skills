#!/usr/bin/env bash
# Last-resort loop when a person has to click.
# Copy, edit the steps, and run. The agent runs it; the person answers.
# Usage: bash hitl-loop.template.sh
# step "<instruction>" waits for Enter.
# capture VAR "<question>" stores the answer. It prints back, so capture
# observations only. Leave signing in as a step, not a capture.

set -euo pipefail

step() {
  printf '\n>>> %s\n' "$1"
  read -r -p "    [Enter when done] " _
}

capture() {
  local var="$1" question="$2" answer
  printf '\n>>> %s\n' "$question"
  read -r -p "    > " answer
  printf -v "$var" '%s' "$answer"
}

# --- edit below ---------------------------------------------------------

step "Open the app and sign in yourself."

capture ERRORED "Did the failing action throw? (y/n)"

capture ERROR_MSG "Paste the error message, or 'none'."

# --- edit above ---------------------------------------------------------

printf '\n--- captured ---\n'
printf 'ERRORED=%s\n' "${ERRORED:-}"
printf 'ERROR_MSG=%s\n' "${ERROR_MSG:-}"
