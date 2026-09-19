# Work Card 06A — Completion Alerts

## Goal

Add accessible in-page completion popups for all timer modes and optional permission-based browser/system notifications when the timer tab is hidden.

## Inputs

- `project-brief.md`
- `architecture.md`
- `design.md`
- `build-blueprint.md`
- `build-status.md`
- Existing reviewed timer completion behavior

## Files likely touched

- `src/App.jsx`
- `src/components/CompletionNotice.jsx`
- `src/components/CompletionNotice.css`
- `src/utils/browserNotifications.js`
- `build-status.md`

## Instructions for the coding agent

1. Preserve the existing exactly-once timer completion path and session persistence.
2. Add one explicit secondary “Enable notifications” control near the timer controls. Request permission only from this learner gesture, never on page load.
3. Display honest permission text for available, granted, denied, and unsupported states. Permission denial must never block the timer.
4. On Focus, Short Break, or Long Break completion, always show one non-modal in-page notice with mode-specific heading/message and a labelled Dismiss control.
5. Keep the in-page notice visible until dismissed. It must not steal focus, trap the keyboard, or cover essential phone controls.
6. When notification permission is granted and `document.visibilityState` is not `visible`, show a local browser/system notification using an active service-worker registration where available, with a `Notification` constructor fallback.
7. Do not send a system notification while the timer page is visible; the in-page notice is sufficient.
8. Use no server, push subscription, key, account, extra storage key, sound, or notification library.
9. Run completion checks for all three modes, permission states, hidden/visible tab behavior, mobile layout, reduced motion, timer/storage regression, and production build.
10. Update `build-status.md` and stop for learner QA. The final Review Mirror must run again before shipping.

## What not to do

- Do not promise notifications after the browser/site is fully closed.
- Do not request permission automatically or repeatedly.
- Do not add push messaging, service-worker push handlers, VAPID keys, backend/API calls, sound, vibration, or notification spam.
- Do not change timer durations, completion logging rules, session fields, storage key, CRUD, offline caching, or the confirmed visual direction.
- Do not initialize Git, deploy, or begin Work Card 07.

## Done when

- Every completed mode shows exactly one dismissible in-page notice.
- Focus completion still adds one session; break completion still adds none.
- Hidden-tab completion shows a system notification only after permission is granted and the browser supports it.
- Visible-tab completion does not duplicate the in-page notice with a system notification.
- Denied/unsupported permission leaves the timer and in-page notice working.
- Mobile, keyboard, reduced-motion, build, storage, and exactly-once checks pass.

## Verification steps

1. Run `npm run build`.
2. Verify the permission prompt appears only after clicking Enable notifications.
3. Verify granted, denied, and unsupported labels are honest and no state is stored by the app.
4. Complete Focus with the page visible: one in-page notice, no system notification, one saved session.
5. Complete each break: one mode-specific in-page notice and no saved session.
6. With permission granted and the timer tab hidden, complete a mode and verify one system notification plus the retained in-page notice for return.
7. Dismiss the in-page notice by mouse and keyboard without moving unrelated focus.
8. Check 320–390px widths and reduced motion.
9. Recheck timer race handling, one storage key, edit/delete/refresh persistence, and production offline shell.
10. Design check: notification control and completion notice follow `design.md` mood, contrast, one-primary-action rule, mobile gutters, focus, and reduced motion.

## Localhost test before continuing

After this card, the learner should test:

- Click Enable notifications and choose Allow.
- Start a timer, use the approved console fast-forward, switch to another tab/application, and confirm the system notification appears.
- Return to the timer and confirm the in-page completion notice remains until Dismiss is selected.
- Repeat one break completion and confirm it does not add a study session.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and describe what you see.

## Stop condition

Stop after learner QA. Rerun the final Review Mirror before Work Card 07 shipping.

## Status

Complete — automated/browser checks and learner browser/OS notification test passed.
