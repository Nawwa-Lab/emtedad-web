<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working defaults

- Inspect the relevant code and call sites before changing it. If the answer is
  already established by the repository, answer directly.
- Make the smallest coherent change that fulfills the request. Do not refactor,
  reformat, or clean up unrelated code.
- Preserve existing working-tree changes. Treat untracked files as user work
  unless the request explicitly includes them.
- Prefer focused, non-mutating verification such as `npm run lint:check` and
  targeted tests. Do not run auto-fixing `npm run lint` or `npm run format`
  unless explicitly asked.
- Finish with the outcome, files changed, and verification performed. State
  blockers or checks not run plainly.

## HTML design migration

When changing a dashboard UI page, read `designs/manifest.md` first.

- Convert regular CSS declarations from the source HTML to Tailwind utilities on
  the corresponding JSX element; do not add page-specific CSS.
- Reuse existing `components/` modules and the applicable route layout before
  creating an equivalent component or layout.
- Extract a shared component only when at least two approved design rows need it.
- Before using or adding an SVG, inspect `icons/` and reuse a matching
  `@/icons/*.svg` asset. If none matches, stop and request approval; do not add
  or substitute an icon.
- Put visible static text in its feature's locale JSON file. Put cross-domain
  business copy (such as brand, currency, teams, and badges) in the `global`
  namespace in `i18n/dictionary/{ar,en}/global.json`.
- Keep temporary dynamic content in typed route-local `data.ts` fixtures until
  backend integration is explicitly requested.
