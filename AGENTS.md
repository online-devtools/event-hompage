# Repository Guidelines

These notes keep contributors aligned on how the Christmas 2025 event homepage is organized and shipped. Reference them before opening a PR.

## Project Structure & Module Organization
Primary source lives in `src/`. `App.tsx` coordinates UI state, `main.tsx` mounts React, and `components/` holds reusable React Three Fiber pieces (`ChristmasScene`, `CardModal`, `GuestBook`, etc.) paired with plain CSS files. Keep three-dimensional primitives inside `components/` and share constants (colors, strings) through `src/constants/`. Global styles (`App.css`, `index.css`) contain layout rules, while build artifacts go to `dist/` after `npm run build`. Avoid editing `node_modules/` and regenerate type declarations via `tsconfig*.json` if TypeScript settings change.

## Build, Test & Development Commands
Use `npm install` once to sync dependencies. `npm run dev` launches Vite with hot reload at `http://localhost:5173`. `npm run build` runs `tsc` type-checking followed by the production bundle; fix type errors before committing. `npm run preview` serves the built assets locally to validate deployment output. Run `npx tsc --noEmit` if you only need a fast type sanity check.

## Coding Style & Naming Conventions
All code is TypeScript + React 18. Prefer functional components with hooks, keep component files in PascalCase (`Snowfall.tsx`) and reference accompanying styles using the same basename (`Snowfall.css`). Indent with two spaces, place named imports before relative CSS imports, and keep JSX props on new lines when they exceed 80 characters. Store derived values in memoized helpers instead of rehydrating scene assets in render. When adding linting or formatting tooling, wire it through `npm run lint` but keep the defaults lightweight.

## Testing Guidelines
Automated tests are not yet configured; prioritize visual and interaction testing. When adding features, verify flows by running `npm run dev`, creating example cards, guestbook entries, and ornaments, then refreshing to ensure `localStorage` persistence. Any new utility or hook should include a Vitest suite under `src/__tests__/` or colocated `*.test.ts(x)` files once the test harness lands—mirror the component name (`ChristmasScene.test.tsx`) and target both success and failure states. Document manual test steps in the PR until automated coverage exists.

## Commit & Pull Request Guidelines
Follow the existing history: write sentence-case, descriptive commit subjects (“Refactor App component to simplify state management”) and keep them scoped to one concern. For pull requests, include: intent summary, screenshots or short clips for visual tweaks, steps to reproduce bugs and validation steps (`npm run dev`, `npm run build`). Link related issues, call out schema or asset changes, and confirm that type checks pass. Request review from a maintainer familiar with the 3D scene before merging.

## Security & Configuration Tips
The app relies on `localStorage`; never log or commit user submissions. Keep large textures or models in `public/` once introduced and reference them relatively so Vite can hash them. Environment-specific secrets are not required, but if you introduce APIs, use `.env` files ignored by git and document the keys here.
