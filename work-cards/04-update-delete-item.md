# Work Card 04 — Update and Delete Item

## Goal

Let the student update an optional subject inline and delete one completed session through an accessible confirmation flow.

## Inputs

- `build-status.md`
- `build-blueprint.md`
- `design.md`
- `work-cards/04-update-delete-item.md`
- Real in-memory completed-session behavior from Work Card 03

## Files likely touched

- `src/App.jsx`
- `src/components/SessionList.jsx`
- `src/components/SessionItem.jsx`
- `src/components/DeleteSessionDialog.jsx`
- `src/styles.css`
- `build-status.md`

## Instructions for the coding agent

1. Add an explicit Edit action to each real session row. It reveals an inline subject editor in that row.
2. Give the input a visible label, a concise documented maximum length, and clear Save and Cancel controls.
3. Initialize the editor from the current subject. Save trimmed text to only the matching session; an empty subject remains valid. Cancel must restore display mode without changing the record.
4. Keep keyboard focus visible and move/return focus sensibly when entering or leaving edit mode.
5. Add a quiet but clearly labelled Delete action. Do not use an unexplained icon-only control.
6. Require confirmation before deletion using an accessible browser confirmation or small accessible dialog. Cancel changes nothing; confirm removes only the selected item.
7. Ensure summary values and the empty state update from the remaining real sessions.
8. Keep update/delete changes in memory for this card. Do not yet claim browser persistence or show the local-save success message.
9. If no real row remains from Work Card 03, use the genuine Focus-completion flow to create one; never seed or hard-code a fake item.
10. Run the build and interaction checks, update `build-status.md`, mark only this card complete, set Work Card 05 as current, and stop.

## What not to do

- Do not create a separate subjects list or add fields beyond `id`, `completedAt`, `durationMinutes`, and `subject`.
- Do not add `localStorage`, cloud sync, autosuggest, categories, tags, statistics, or bulk deletion.
- Do not claim “Session saved locally” before Work Card 05 provides a successful storage write.
- Do not skip deletion confirmation.
- Do not initialize Git, deploy, or start Work Card 05.

## Done when

- Edit opens a labelled inline subject input in the correct session row.
- Save trims and updates only that row; Cancel leaves its prior value unchanged.
- Delete is discoverable, requires confirmation, and removes only the confirmed row.
- Summary and empty state remain derived from real session state.
- Keyboard and phone-width interactions remain usable.
- `build-status.md` records checks and points to Work Card 05.

## Verification steps

1. Run the relevant lint command if configured, then run `npm run build`.
2. On a genuine session row, choose Edit, enter a subject such as `Biology`, and Save; confirm only that row changes.
3. Reopen Edit, change the text, choose Cancel, and confirm `Biology` remains.
4. Start deletion and choose Cancel; confirm the item remains.
5. Start deletion again and confirm; verify only that item is removed and the empty state returns when appropriate.
6. Use only the keyboard for one edit and one delete-confirmation path; confirm focus remains visible and logical.
7. Check the editor and actions at phone width for overflow and adequate tap targets.
8. Design check: compact glass row, inline input, Save/Cancel, quiet confirmed Delete, empty state, focus rings, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Edit a real completed session to add a subject, save it, then reopen and cancel another change.
- Try Delete once with Cancel and once with confirmation; confirm only the intended record disappears.
- Repeat the edit controls at phone width and confirm no input or button is cut off.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after add/update/delete work correctly in memory. Do not implement persistence or claim refresh survival until Work Card 05 is approved.

## Status

Complete — automated/browser checks and learner localhost CRUD review passed.
