# Work Card 03 — Add Item

## Goal

Implement the fixed timer modes and genuine add behavior: exactly one completed-session item is created when a Focus countdown reaches zero.

## Inputs

- `build-status.md`
- `build-blueprint.md`
- `architecture.md`
- `design.md`
- `work-cards/03-add-item.md`
- Approved static screen from Work Card 02

## Files likely touched

- `src/App.jsx`
- `src/components/ModeSelector.jsx`
- `src/components/TimerPanel.jsx`
- `src/components/TimerControls.jsx`
- `src/components/TodaySummary.jsx`
- `src/components/SessionList.jsx`
- `src/components/SessionItem.jsx`
- `src/hooks/useCountdown.js`
- `src/styles.css`
- `build-status.md`

## Instructions for the coding agent

1. Define one immutable mode configuration: Focus 25/1500 seconds, Short Break 5/300 seconds, and Long Break 15/900 seconds.
2. Implement mode selection. Focus is the initial mode; switching modes pauses and resets the countdown to the chosen full duration.
3. Implement start, pause/resume, and reset. Use an in-memory deadline to derive remaining time and reduce interval drift, with complete cleanup on pause, reset, mode change, completion, and unmount.
4. Keep all timer state in React memory. Refreshing may reset the active countdown.
5. Prevent duplicate completion callbacks, intervals, and session items, including during React development behavior.
6. On genuine Focus completion only, append one in-memory session with exactly `id`, `completedAt`, `durationMinutes: 25`, and `subject: ""`. Use a stable local ID and real current time.
7. On break completion, stop at zero and create no session.
8. Derive today's visible list, count, and focused-minute total from the in-memory sessions using the browser-local date. Sort visible rows newest first without mutating state.
9. Render real session time and duration in a compact row. Do not expose edit/delete yet.
10. Keep screen-reader output useful: label the timer and announce meaningful completion, but do not create a live announcement every second.
11. For efficient agent verification only, the internal Focus duration may be temporarily shortened to complete the real flow. Restore `1500` seconds before final build verification and record that restoration.
12. Do not add `localStorage` yet. Update `build-status.md`, mark only this card complete, set Work Card 04 as current, and stop.

## What not to do

- Do not add a manual “completed session” shortcut, seeded item, fake history, or fabricated count.
- Do not persist sessions, show “Session saved locally,” or claim refresh survival yet.
- Do not implement subject editing, deletion, custom durations, automatic mode cycling, sounds, notifications, or active-timer persistence.
- Do not weaken or remove the approved design and accessibility rules.
- Do not initialize Git, deploy, or start Work Card 04.

## Done when

- All three fixed modes display and reset correctly.
- Start, pause/resume, reset, and mode switching work without timer drift or stale intervals.
- One genuine Focus completion creates exactly one four-field session.
- Break completion creates no session.
- Today's count, minutes, and list derive only from real in-memory records.
- Final source durations are restored to 25/5/15.
- `build-status.md` points to Work Card 04.

## Verification steps

1. Run the relevant lint command if configured, then run `npm run build`.
2. Verify initial Focus time is `25:00`, Short Break is `05:00`, and Long Break is `15:00`.
3. Verify start counts down, pause preserves time, resume continues, reset restores the selected duration, and mode switching pauses/resets.
4. Complete one Focus flow—using a temporary internal short duration only during agent verification if needed—and confirm exactly one real session row, count `1`, and `25` focused minutes.
5. Complete a temporarily accelerated break during agent verification and confirm no session is added.
6. Confirm the temporary duration changes are removed and a fresh build still succeeds.
7. Design check: functional mode states, timer progress, controls, real session row, empty-state transition, and mobile layout continue to follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Start Focus, pause it, resume it, and reset it; confirm the displayed time behaves correctly.
- Switch through all three modes and confirm each shows the right full duration and switching stops the prior countdown.
- Confirm the agent's genuine completion check produced exactly one row and no duplicate; alternatively, allow Focus 25 to complete and observe the same result.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop once genuine Focus-only add behavior and restored production durations are verified. Do not add edit/delete or persistence before learner approval.

## Status

Complete — automated/browser checks and learner localhost interaction test passed.
