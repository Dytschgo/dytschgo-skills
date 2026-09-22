---
name: imnota
description: Read Imnota prompt bundles (annotated screenshots, notes, drawings, and matching PNGs) and act on the marked elements. Use when the user mentions Imnota, a screenshot bundle, prompt bundle, Picture N / Note N / Marks, or "the screenshot" they prepared for an agent. Works with any coding agent. Prefer Imnota MCP tools when connected; otherwise use the pasted or attached Markdown and PNGs.
---

# Imnota

Treat an Imnota export as a structured brief, not a mysterious image.

Imnota is a local-first desktop app. Users assemble screenshots, Markdown, and drawings, then export matching `.md` + `.png` files (a prompt bundle) for any coding agent.

## Choose the source

1. **MCP connected** (Imnota Settings → Workspace → Allow local agent access is on, and this session has Imnota tools): call `get_latest_bundle`. Use `get_item`, `list_projects`, `list_collection_items`, and `search_saved_text` when you need a specific item. If the tool returns `bundle not prepared`, ask the user to run **Copy Bundle** in Imnota. Do not invent an export.
2. **No MCP**: use the Markdown and PNG files the user pasted, attached, or opened. Do not ask them to re-screenshot unless the files are missing.

Stay inside the user's workspace. Do not request hosted-share tokens, pairing codes, recovery journals, or backup archives.

## Read the brief

- **Picture N** / **Drawing N** are the visual evidence. Matching PNG files use the same numbers.
- **Picture N / Note N** is typed intent. Follow those notes.
- **Picture N / Marks** (arrows, boxes, steps with positions) names the exact control. Prefer marks over guessing from pixels.
- **Visible text** is OCR of the screenshot. Prefer it over re-reading the image when present.
- **Priority** and exclusion sentences are authoritative. Do not "fix" excluded pictures.
- Split bundles (`Bundle 2 of 3`) are one case. Read every bundle before editing.

If notes and marks conflict with a casual chat sentence, ask which one wins only when the edit would be destructive. Otherwise follow the numbered notes and marks.

## Act

Change the code (or design) the brief points at. Do not restyle the whole app because one button is clipped. After the change, say which Picture/Note/Mark you treated as the source of truth.

## Install

```bash
npx skills add https://github.com/Dytschgo/dytschgo-skills --skill imnota
```
