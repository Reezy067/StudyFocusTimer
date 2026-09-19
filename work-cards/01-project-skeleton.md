# Work Card 01 — Project Skeleton

## Goal

Create the smallest runnable Vite/React foundation for Study Focus Timer while preserving every planning file and leaving feature work for later cards.

## Inputs

- `build-status.md`
- `build-blueprint.md`
- `design.md`
- `architecture.md`
- Node, npm, and Git checks recorded by Work Card 00

## Files likely touched

- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.js`
- `.gitignore`
- `src/main.jsx`
- `src/App.jsx`
- `src/styles.css`
- `build-status.md`

## Instructions for the coding agent

1. Re-read the current status, blueprint, design direction, and this card before editing.
2. Scaffold Vite with React inside the existing project folder without deleting or overwriting planning Markdown files, `prompts/`, `templates/`, or `work-cards/`.
3. Pin exact dependency versions in `package.json`; do not use open ranges. Include only React, Vite, and the small build-time service-worker integration required by the blueprint. Add lint tooling only if the chosen Vite setup needs it.
4. Add `dev`, `build`, and `preview` scripts. Use only non-watch validation commands during agent verification.
5. Configure the service-worker build integration for generated app-shell caching with no installable web-app manifest. Full offline proof belongs to Work Card 06.
6. Create a minimal semantic React shell with the project name in a header and a main region containing brief placeholder copy such as “Timer workspace coming next.”
7. Connect one plain CSS entry file with a basic near-black background and readable light text. Do not build the final visual system yet.
8. Ensure `.gitignore` excludes at least `node_modules`, `dist`, local environment files, and common debug logs.
9. Run the install and build checks, record exact results in `build-status.md`, mark only this card complete, set Work Card 02 as current, and stop.

## What not to do

- Do not implement timer modes, countdown logic, session records, editing, deletion, or `localStorage`.
- Do not create fake activity, statistics, sessions, testimonials, or logos.
- Do not add Tailwind, a UI kit, remote fonts, WebGL, 3D, animation libraries, backend code, auth, APIs, databases, or secrets.
- Do not initialize Git or deploy.
- Do not start Work Card 02 in the same turn.

## Done when

- A pinned Vite/React project exists without damaging planning files.
- The required scripts exist and the production build succeeds.
- The browser renders the Study Focus Timer shell and header without errors.
- Service-worker generation is configured but not yet claimed as fully proven offline.
- `build-status.md` records the checks and names Work Card 02 as next.

## Verification steps

1. Confirm all planning Markdown files and folders still exist unchanged except the intended status update.
2. Confirm `package.json` uses exact dependency versions and contains the required scripts.
3. Run the approved package installation command.
4. Run `npm run build` and confirm it exits successfully.
5. Confirm the build output includes the expected application assets and generated service-worker assets.
6. Design check: the baseline shell uses readable dark-theme colors from `design.md` but does not prematurely add visual clutter or unapproved components.

## Localhost test before continuing

After this card, the learner should test:

- Run `npm run dev` manually in the project terminal and open the localhost URL shown by Vite.
- Confirm the Study Focus Timer header and placeholder main content load with no blank screen.
- Refresh once and confirm the shell still loads with no visible error.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after the shell, build, and learner localhost check are recorded. Do not begin static timer layout work until the learner approves Work Card 02.

## Status

Complete — automated checks and learner localhost refresh test passed.
