# Project Brief

## Project Identity

- Project name: Study Focus Timer
- Project type: Pomodoro-style study and focus timer
- KDBM Lite stage: Spec

## One-Sentence Concept

A browser-local Pomodoro-style timer that helps students complete timed focus sessions and review a persistent record of what they studied today.

## Target User

A student who wants to focus using timed study sessions and see their completed sessions.

## User Goal

The student can start, pause, and reset a timer; switch between Focus 25, Short Break 5, and Long Break 15; and review completed focus sessions from today.

## Build Shape

Browser-local tool.

The main value comes from creating and changing one local data type—completed focus sessions—and keeping those records after refresh in the same browser.

## Shape Confirmation

Confirmed by the learner.

## Version-One Success

Version one is done enough when:

- a student can start, pause, and reset the countdown;
- the student can switch between a 25-minute focus session, 5-minute short break, and 15-minute long break;
- finishing a focus countdown automatically creates a completed-session record;
- Focus and break completion always show an accessible in-page popup;
- after explicit permission, completion can also show a browser/system notification while the timer tab is hidden and the browser remains open;
- today's completed focus sessions are visible in a list;
- a session can have an optional study subject label that can be edited;
- a session can be deleted;
- completed sessions survive a browser refresh through `localStorage`;
- the app works offline;
- the empty state is friendly and useful; and
- the layout works well on a phone.

## Now / Later / Never

### Now

- One data type: completed focus sessions.
- Focus 25, Short Break 5, and Long Break 15 timer modes.
- Start, pause, and reset controls.
- Automatic logging when a focus session finishes.
- Accessible, dismissible in-page completion popup for Focus and both break modes.
- Explicit notification opt-in control; no permission request on page load.
- Permission-based browser/system completion notification when the timer tab is hidden.
- Today's completed-session list.
- Optional editable study subject label.
- Delete action for individual session records.
- Browser `localStorage` persistence.
- One real completed session used as the sample item during verification.
- Offline behavior.
- Friendly empty state.
- Responsive mobile layout and accessibility basics.

### Later

- Custom timer durations.
- Session history beyond today's primary view.
- Statistics, streaks, or richer analytics.
- Other enhancements only after version one is checked.

### Never

For this KDBM Lite version:

- Login or user accounts.
- Backend services.
- Databases.
- Cloud or multi-user sync.
- Server push notifications or notification delivery after the browser/site is fully closed.
- Payments, live APIs, uploads, or admin systems.

## Assumptions

- Only completed focus periods are logged; completed breaks are not added to study history.
- Session dates and the meaning of “today” use the student's browser-local date and time.
- Saved history remains on the same browser and device only.
- The refresh-persistence requirement applies to completed session records; preserving an active countdown across a closed tab is outside the confirmed version-one goal.
- In-page completion feedback always works while the page is running.
- System notification visibility depends on browser/operating-system support, HTTPS or localhost, explicit learner permission, and the browser remaining open.
- If permission is denied or unsupported, the app continues normally with the in-page popup only.
- Offline support must not depend on a backend or live API.

## Proof Target

1. Start a focus countdown and prove that it counts down.
2. Pause, resume, and reset successfully.
3. Switch between all three timer modes and verify their durations.
4. Complete a focus session and verify that one real session record appears in today's list.
5. Verify every completed Focus or break mode shows one dismissible in-page notice.
6. After explicitly granting permission, hide the timer tab and verify completion produces one local browser/system notification while the browser remains open.
7. Verify denied or unsupported notification permission still leaves the in-page notice and timer working.
8. Add or edit the completed session's optional study subject label.
9. Refresh and verify that the record and label remain.
10. Delete the record and verify the friendly empty state.
11. Check the layout at a phone-sized viewport.
12. Confirm the built app remains usable offline without a backend.

## Trainer / Learner Notes

- The learner explicitly confirmed the browser-local tool shape.
- Keep the scope to one local session list and one primary timer workflow.
- Implementation and learner QA are complete, including completion alerts.
- Git initialization and deployment remain blocked until the final Review Mirror passes and the learner explicitly starts Work Card 07.
