# Optional design lookup

The bundled UI/UX Pro Max library preserves the existing searchable design catalogs without adding a second discoverable skill. Use it only when a specific design decision needs supporting research. The core Astra Design workflow works without Python or this lookup.

Resolve the skill's actual directory, then invoke its script by absolute path from any project directory:

```text
python "<astra-design-dir>/library/ui-ux-pro-max/scripts/search.py" "error summary validation" --domain ux
python "<astra-design-dir>/library/ui-ux-pro-max/scripts/search.py" "chip badge overflow" --stack html-tailwind
python "<astra-design-dir>/library/ui-ux-pro-max/scripts/search.py" "editorial readable" --domain typography
```

Use the available Python 3 executable (`python`, `python3`, or `py -3`). No third-party Python packages are needed. If Python is unavailable, continue from the relevant written reference rather than installing a runtime solely for design research.

Search one intent with a short query and an explicit domain or detected stack. Domain choices include `ux`, `style`, `color`, `typography`, `google-fonts`, `icons`, `chart`, `landing`, `product`, `gsap`, `react`, and `web` (the legacy name for app/native guidance). Use `--help` for supported stacks and output options.

For a new visual system where catalog suggestions would help, optionally use:

```text
python "<astra-design-dir>/library/ui-ux-pro-max/scripts/search.py" "museum collection archive" --design-system
```

Check the returned identities and fit before using them. Retry an empty or irrelevant query once with a narrower phrase or explicit category, then proceed with clearly identified general reasoning if no useful match is found. Generated design systems are candidates; they do not override the brief, current tokens, or native platform conventions.

Catalogs contain historical examples and recommendations, including broad style defaults, timing suggestions, and framework snippets. Check current official documentation for version-sensitive APIs, package exports, browser support, or standards before implementation. Do not treat a dated provenance record as current verification or catalog contrast claims as measurements of the rendered UI.

The search and design-system modes are read-only by default. Avoid `--persist` unless a design record is part of the requested work. If used, pass an explicit project `--output-dir`, inspect existing records first, and do not use `--force` to discard decisions that should be preserved. Do not persist unreviewed output or private data in a public repository.

Catalog maintenance can run the bundled integrity validator:

```text
python "<astra-design-dir>/library/ui-ux-pro-max/scripts/validate_data.py"
```

It checks dataset contracts and internal consistency; it does not prove recommendation quality or current API accuracy. See [source notes](../SOURCES.md) for provenance and redistribution notices.
