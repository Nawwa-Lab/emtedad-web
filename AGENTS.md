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
