# Work Card 05 — LocalStorage Save and Refresh

## Goal

Persist the one completed-session list safely in the same browser and prove add, edit, delete, and refresh behavior with honest local-only feedback.

## Inputs

- `build-status.md`
- `build-blueprint.md`
- `architecture.md`
- `design.md`
- `work-cards/05-localstorage-save-refresh.md`
- Add/update/delete behavior from Work Cards 03–04

## Files likely touched

- `src/App.jsx`
- `src/components/SessionItem.jsx`
- `src/components/SessionList.jsx`
- `src/components/TodaySummary.jsx`
- `src/components/SaveStatus.jsx`
- `src/utils/sessionStorage.js`
- `src/styles.css`
- `build-status.md`

## Instructions for the coding agent

1. Create one small storage boundary using the exact key `study-focus-timer.sessions.v1`.
2. Load once during app initialization. Treat a missing key as an empty list and validate parsed entries enough to prevent malformed data from crashing the app.
3. Accept only the confirmed four-field session shape: string `id`, valid string `completedAt`, numeric `durationMinutes`, and string `subject`. Do not create a second storage key or data table.
4. Persist the complete updated array immediately after genuine Focus completion, successful subject save, and confirmed deletion.
5. Keep the interface usable when storage reading or writing fails. Show honest failure feedback and never announce a successful local save when the write failed.
6. Filter today's visible records using the browser-local calendar date, keep older valid records stored, and sort the visible copy newest first without mutating stored state.
7. Place the muted wording “Saved in this browser” above or beside history. It describes storage scope and must not imply cloud sync.
8. After a successful add or subject update, show “Session saved locally” in a polite status region for about two seconds. It must not steal focus or cover essential mobile controls.
9. Ensure confirmed deletion persists and the approved empty state returns when today's list becomes empty.
10. Create the required real sample through the genuine Focus-completion flow. For efficient agent verification, temporarily shorten the internal duration, complete the flow, persist the resulting real event, and restore `1500` seconds before final build verification. Never ship a manual add shortcut or seeded record.
11. Run persistence, malformed-storage, build, and browser checks. Update `build-status.md`, mark only this card complete, set Work Card 06 as current, and stop.

## What not to do

- Do not use IndexedDB, cookies, a backend, a database, cloud sync, accounts, or another local list.
- Do not persist active countdown state or break completions.
- Do not seed sample JSON, fabricate timestamps, or expose a permanent debug/add button.
- Do not say data is backed up or synced.
- Do not initialize Git, deploy, perform the final review, or start Work Card 06.

## Done when

- Genuine completed Focus sessions load and save under the one confirmed key.
- Subject edits and confirmed deletion persist after refresh.
- Missing or malformed storage does not blank or crash the app.
- Successful add/edit shows brief truthful feedback; failed writes do not.
- Today's filter, count, minutes, and empty state remain derived from valid real data.
- Final timer durations are restored to 25/5/15.
- `build-status.md` points to Work Card 06.

## Verification steps

1. Run the relevant lint command if configured, then run `npm run build`.
2. Clear only `study-focus-timer.sessions.v1` and confirm the approved empty state appears.
3. Complete one genuine Focus flow, using a temporary internal short duration only for agent verification; verify one four-field item is written under the exact key.
4. Edit its subject to `Biology`, wait for “Session saved locally,” refresh, and verify the same real item and subject remain.
5. Confirm the persistent copy says “Saved in this browser” and never suggests account or cloud sync.
6. Cancel one deletion and refresh to prove the item remains; then confirm deletion, refresh again, and prove it stays removed.
7. Put malformed data in only the confirmed key, reload, and confirm the app stays usable with honest feedback; restore a clean state afterward.
8. Restore Focus to `1500` seconds, confirm Break values remain `300`/`900`, and run the build again.
9. Design check: local-save label, gentle toast, real session list, inline update/delete controls, empty state, accessible statuses, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Add a real session through Focus completion, edit its subject, refresh the browser, and confirm the session still appears.
- Cancel one delete, then confirm deletion and refresh; confirm the correct item remains or stays removed after each action.
- Confirm the app says data is saved in this browser only and the brief save message disappears after about two seconds.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after same-browser add → edit → refresh → delete → refresh persistence is proven and recorded. Do not begin final review or shipping.

## Status

Complete — automated/browser checks and learner persistence test passed.
