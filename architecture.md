# Architecture

## Build Shape

Browser-local tool.

The app has one persistent data type: completed focus sessions stored in the same browser. Timer controls and break modes support the core workflow but do not create additional persistent data types.

## Stack Decision

- Vite for the development and production build.
- React for components and client-side state.
- Plain CSS for styling and responsive behavior.
- Browser `localStorage` for completed-session persistence.
- A generated service worker integration for app-shell caching after the first successful online visit.
- No installable-PWA requirement and no backend services.

Package installation and scaffolding are deferred until implementation begins.

## Structure Overview

The app is a single responsive screen with four areas:

1. A compact identity/header area.
2. A timer workspace containing the mode selector, countdown, and controls.
3. A small today summary based on completed focus sessions.
4. Today's completed-session list or its empty state.

Timer state remains in React memory. Completed focus sessions load from `localStorage`, and every add, edit, or delete operation writes the updated list back to storage.

## Component Map

- `App` — owns the selected mode, timer state, and completed-session collection.
- `AppHeader` — presents the product name and short purpose.
- `ModeSelector` — switches among Focus 25, Short Break 5, and Long Break 15.
- `TimerPanel` — presents the active mode and accessible countdown.
- `TimerControls` — provides start/pause, resume, and reset actions.
- `TodaySummary` — reports today's completed-session count and total focused minutes without invented metrics.
- `SessionList` — renders today's completed sessions.
- `SessionItem` — displays one record and provides subject editing and deletion.
- `EmptyState` — guides the student when no focus sessions exist today.

These may be combined where that keeps the implementation simpler; the map describes responsibilities rather than requiring one file per component.

## Data / State Model

### Persistent data type: completed focus session

Each item has four fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Stable locally generated identifier. |
| `completedAt` | ISO date-time string | Completion time used for display and the browser-local “today” filter. |
| `durationMinutes` | number | Focus duration completed; version one records `25`. |
| `subject` | string | Optional editable study subject; an empty string is valid. |

### In-memory timer state

- `mode`: `focus`, `shortBreak`, or `longBreak`.
- `remainingSeconds`: `1500`, `300`, or `900` when reset to the selected mode.
- `isRunning`: whether the countdown is active.

Selecting another mode pauses the timer and resets it to that mode's full duration. Reaching zero stops the countdown. Only reaching zero in Focus mode creates a session record; breaks are never saved as study sessions. Automatic mode cycling and active-timer persistence are not part of version one.

## Completion Alert Logic

- Every completed Focus, Short Break, or Long Break produces one accessible, dismissible in-page notice with mode-specific copy.
- An explicit secondary control requests browser notification permission only after a learner gesture; never request permission on page load.
- When permission is granted and the document is hidden, use the local browser Notification API (or the existing service-worker registration's `showNotification`) to display the same completion outside the timer tab.
- Do not send a system notification while the timer page is visible; the in-page notice is sufficient.
- Denied, dismissed, or unsupported permission must not block the timer or in-page notice.
- The browser controls notification permission. Do not add a second app data store or persist permission state.
- Notifications require localhost/HTTPS and the browser/site to remain running; there is no server push or closed-browser delivery promise.

## Storage Logic

- Storage key: `study-focus-timer.sessions.v1`.
- On startup, read and parse the stored array; use an empty list when the key is absent.
- Guard against malformed stored data so the interface remains usable instead of crashing.
- On a completed Focus 25 countdown, create one session with a local unique ID, current ISO completion time, duration `25`, and blank subject.
- On subject save, update only the matching session and persist the new array.
- On confirmed deletion, remove only the matching session and persist the new array.
- Derive today's list at render time using the student's browser-local calendar date.
- Keep historical records in storage even though version one primarily displays today's records.
- Do not seed invented study history. The real focus session completed during verification is the required sample item.

## User Flow

1. The student opens the app and sees Focus 25 selected.
2. The student may explicitly enable browser notifications and accept or decline the browser permission prompt.
3. If no session is complete today, the app shows: “No focus sessions yet today. Start Focus 25 when you’re ready.”
4. The student may switch timer mode; switching pauses and resets the countdown for that mode.
5. The student starts, pauses/resumes, or resets the countdown.
6. Any completed mode shows an in-page completion notice; a hidden tab also requests a local system notification when permission is granted.
7. A completed focus countdown automatically adds one session; a completed break does not.
8. The today summary and list update immediately.
9. The student may edit and save the session's optional subject label.
10. The student may request deletion and confirm before the record is removed.
11. Refreshing reloads the same saved records from `localStorage`.
12. After one successful online visit and asset caching, the app shell remains available offline in that browser.

## File Expectations

During implementation, expect a small Vite/React project with:

- a single application entry point;
- a focused app component and only the child components that improve clarity;
- one plain-CSS stylesheet or a similarly small CSS structure;
- a small storage utility for safe load/save behavior;
- a timer utility or hook only if it makes interval cleanup and countdown transitions clearer;
- a lightweight completion-notice component and local notification utility; and
- service-worker generation/registration configuration for offline app-shell caching.

## Constraints

- One persistent session list only.
- No more than the four confirmed fields per saved item.
- Fixed version-one durations: Focus 25, Short Break 5, and Long Break 15.
- Completed focus sessions only; do not log breaks.
- Saved data stays in the same browser and device.
- The active countdown does not need to survive refresh or a closed tab.
- Browser/system notifications are local, permission-based, and best-effort while the browser remains open.
- Offline support begins after one successful online visit and does not imply installation.
- Mobile responsiveness, keyboard access, visible focus states, semantic controls, and readable contrast are required.

## Technical Non-Goals

- Login, accounts, authentication, or authorization.
- Backend, database, server-side storage, or cloud/multi-user sync.
- Payments, uploads, admin systems, live APIs, or secret keys.
- Server push notifications, background push subscriptions, or delivery after the browser/site is fully closed.
- Installable-PWA behavior or home-screen installation prompts.
- Custom timer durations, advanced history, streaks, or analytics.
- Multiple persistent data tables or lists.

## Verification Notes

- Prove Focus, Short Break, and Long Break load as 25, 5, and 15 minutes.
- Prove start, pause/resume, reset, and mode-switch reset behavior.
- Prove only a completed Focus countdown creates a record.
- Use one real completed focus session as the sample record; do not display fabricated activity.
- Prove the record has four fields and appears in today's list.
- Edit the optional subject and verify the update immediately.
- Refresh and verify the session and edited subject remain.
- Delete the session through the confirmation flow and verify the empty state returns.
- Check malformed or absent storage does not crash the app.
- Check the primary screen and actions at a phone-sized viewport.
- After the first online visit, disable network access and verify the app shell opens and local session actions remain usable.
- For an efficient implementation check, the internal duration constant may be temporarily shortened and must be restored to 25 minutes before completion is recorded in the build status.
