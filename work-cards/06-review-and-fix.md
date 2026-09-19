# Work Card 06 — Review and Fix

## Goal

Run the Review Mirror against the complete local build, make only the single smallest useful fix if needed, and prove the integrated app—including production offline behavior—is ready to ship.

## Inputs

- `project-brief.md`
- `design.md`
- `build-blueprint.md`
- `build-status.md`
- `prompts/07-review-mirror.md`
- `work-cards/06-review-and-fix.md`
- Completed implementation from Work Cards 01–05

## Files likely touched

- Only source or configuration files required by the single smallest useful fix
- `build-status.md`

Do not assume a source edit is needed when the result already passes.

## Instructions for the coding agent

1. Read all inputs and inspect the current app before changing anything.
2. Run the Review Mirror exactly: return `PASS`, `NEEDS FIX`, or `REDRAFT`; identify the top one to three issues; name the single smallest useful fix.
3. Check project goal, browser-local guardrails, main flow, phone readability, `design.md`, honest content, original identity, one clear primary action, and complete add/update/delete/save/refresh behavior.
4. Check timer correctness: fixed 25/5/15 durations, pause/resume/reset, mode resets, low-drift calculation, one completion event, Focus-only logging, and no temporary accelerated value left behind.
5. Check the one storage key and four-field model. Confirm no fake data, second list, account/backend/API behavior, or unapproved Later feature exists.
6. Run the relevant lint command if configured and `npm run build`.
7. Serve the production build with the approved preview command. Visit it online once so generated service-worker assets cache the app shell, then simulate offline and verify the app reopens/refreshes and local add/edit/delete behavior remains available. Do not use the development server as offline proof.
8. Check keyboard operation, visible focus, semantic labels, useful non-spammy status announcements, AA contrast, reduced motion, approximately `44px` targets, and no phone-width overflow.
9. If the result is `NEEDS FIX`, implement only the named smallest fix, rerun the affected checks, and review again. Do not redesign or bundle unrelated fixes. If the result is `REDRAFT`, stop and ask the learner/trainer before broad changes.
10. When the final result is `PASS`, update `build-status.md` to the Ship stage, mark this card complete, set Work Card 07 as current, record proof honestly, and stop for the learner's shipping approval.

## What not to do

- Do not redesign the project or add new features during review.
- Do not add particles, custom durations, analytics, broader history, install prompts, backend, auth, database, API, sync, or secrets.
- Do not create fake sessions or claim checks that were not observed.
- Do not initialize Git, push, deploy, or start Work Card 07 before the learner's check.
- Do not make more than the single smallest useful fix per review cycle.

## Done when

- The Review Mirror ends in an honestly evidenced `PASS`.
- Build, timer, CRUD, persistence, empty-state, design, accessibility, mobile, and production offline checks pass.
- Any temporary verification duration is absent from final source.
- Any fix was bounded to the single smallest useful change and rechecked.
- `build-status.md` records evidence and points to Work Card 07.

## Verification steps

1. Record the Review Mirror result, top issues, and smallest fix decision.
2. Run the configured lint command if present and run `npm run build`.
3. Prove all mode and timer transitions plus one-time Focus-only completion.
4. Prove a genuine session can be added, edited, refreshed, deleted, and refreshed again under the one storage key.
5. Prove empty and populated states show no fabricated content.
6. Check the full keyboard path, focus return, contrast, reduced motion, and meaningful status output.
7. Check a phone-sized viewport for readable timer digits, wrapping, tap targets, inline editing, dialog fit, and no horizontal scroll.
8. Open the production preview online once, switch offline, reopen or refresh it, and prove the cached shell plus local operations still work.
9. Confirm no scope-lock violation, secret, copied identity, heavy animation dependency, or temporary timer value remains.
10. Design check: final timer hierarchy, electric-violet visual system, subtle glass rows, original gradient/glow, reduced motion, local-save proof, empty state, and mobile behavior match `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Use the production preview and complete the main timer/session flow, including edit, refresh, and confirmed delete.
- Resize to phone width and navigate every control by keyboard; confirm nothing is clipped and focus is always visible.
- Visit the production preview online once, turn network access off, then refresh or reopen it and confirm the app still works with local data.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

If the result is `REDRAFT`, or offline/core behavior cannot be fixed with one small change, stop and ask the learner/trainer. Otherwise stop after a final `PASS` and hand off to Work Card 07 without shipping yet.

## Status

Complete — final Review Mirror PASS after Completion Alerts learner QA and planning lifecycle correction; production build passed.
