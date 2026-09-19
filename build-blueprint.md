# Build Blueprint

## Source Files

This blueprint consolidates the confirmed planning source of truth:

- `project-brief.md`
- `architecture.md`
- `design.md`
- `build-status.md`

If a later implementation detail conflicts with a confirmed planning file, stop and resolve the conflict in the planning files before building further.

## Project Identity

- **Name:** Study Focus Timer
- **Concept:** A Pomodoro-style timer that helps students complete timed focus sessions and see what they studied today.
- **Target user:** A student who wants structured focus time and a simple local record of completed work.
- **Primary action:** Start or resume a Focus 25 session.
- **KDBM Lite stage at blueprint creation:** Spec.

## Build Shape

**Browser-local tool — learner confirmed.**

The product creates and changes one persistent local data type: completed focus sessions. Records remain after refresh in the same browser through `localStorage`. There is no server-side or multi-user behavior.

Apply the browser-local tool guardrails throughout implementation:

- one persistent data list only;
- one real sample item created through the genuine completion flow;
- add, update, and delete behavior;
- same-browser refresh persistence;
- an honest empty state;
- a phone-width check; and
- no backend, account, database, payment, live API, upload, admin, or sync expansion.

## Version-One Promise

A student can select Focus 25, Short Break 5, or Long Break 15; start, pause/resume, and reset the countdown; and automatically record a completed Focus 25 session. The student can see today's real completed sessions, edit an optional subject label, delete a session, and retain the history after refresh in the same browser. After the first successful online visit, the app shell works offline. The interface is calm, responsive, accessible, and original.

Version one is successful only when the real workflow—not seeded or invented activity—proves these promises.

## Scope Lock

### Now

- One responsive single-page timer tool.
- Fixed modes: Focus 25, Short Break 5, and Long Break 15.
- Start, pause/resume, reset, and mode switching.
- A circular visual countdown ring and large `MM:SS` digits.
- Automatic creation of one completed-session record when Focus reaches zero.
- No session record when either break reaches zero.
- One accessible, dismissible in-page completion notice for Focus and both break modes.
- One explicit secondary notification opt-in control; never request permission on page load.
- Best-effort local browser/system notification when permission is granted, the timer tab is hidden, and the browser remains running.
- Today's completed-session count, focused-minute total, and list derived only from local data.
- Four saved fields per session: `id`, `completedAt`, `durationMinutes`, and `subject`.
- Inline editing of the optional subject.
- Confirmed deletion of one session.
- Safe `localStorage` persistence at `study-focus-timer.sessions.v1`.
- Calm empty state with no fabricated sessions.
- Persistent “Saved in this browser” copy and brief “Session saved locally” feedback after add/edit.
- Original CSS-only shifting dark gradient and breathing radial glow.
- Electric-violet accent around `#7C5CFF`, adjusted as needed for contrast.
- Mobile layout, keyboard support, visible focus states, AA text contrast, and reduced-motion behavior.
- App-shell caching for offline use after the first online visit.
- GitHub and Vercel delivery only in the later Ship phase.

### Later

- Custom timer durations.
- A broader history view.
- Statistics, streaks, or advanced analytics based on real data.
- Optional faint drifting particles, only if they remain calm and performant.
- Any other enhancement approved after version one passes review.

### Never

For this KDBM Lite version:

- Login, authentication, user accounts, or permissions.
- Backend services, server functions, or databases.
- Cloud backup, cloud sync, or multi-user behavior.
- Payments, uploads, admin systems, live APIs, or secret keys.
- Server push subscriptions or notification delivery after the browser/site is fully closed.
- An installable-PWA prompt or home-screen installation feature.
- Multiple persistent data tables or lists.
- ThreeUI/KoiStudies code, assets, shaders, identity, or copied components.
- WebGL, 3D engines, heavy animation libraries, or unnecessary dependencies.
- Fake sessions, testimonials, logos, claims, or study statistics.

## Architecture Summary

### Stack

- Vite.
- React.
- Plain CSS.
- Browser `localStorage`.
- Generated service worker/app-shell caching, configured without an installable manifest.

When implementation begins, pin exact dependency versions. Do not install anything during planning.

### Screen structure

1. Compact app identity/header.
2. Mode selector.
3. Hero countdown ring and current-mode label.
4. Start/Pause/Resume/Reset controls.
5. Today's real count and focused minutes.
6. “Saved in this browser” indicator.
7. Today's session list or the confirmed empty state.
8. Non-blocking local-save status region.

### Component responsibilities

- `App`: coordinates mode, countdown, session state, and status feedback.
- `AppHeader`: project identity and concise purpose.
- `ModeSelector`: the three fixed modes and selected-state behavior.
- `TimerPanel`: progress ring, digits, mode, and accessible timer state.
- `TimerControls`: start/resume, pause, and reset actions.
- `TodaySummary`: real count and minutes computed from today's sessions.
- `SessionList`: list/empty-state decision.
- `SessionItem`: display, inline subject editor, and delete request.
- `DeleteSessionDialog`: understandable confirmation and focus handling, if a custom dialog is used.
- `SaveStatus`: persistent local-only label and polite transient feedback.

Components may be combined if that reduces code without combining unrelated responsibilities.

## Data / State / Storage Rules

### Mode constants

Use one immutable configuration:

- `focus`: label `Focus 25`, `1500` seconds.
- `shortBreak`: label `Short Break 5`, `300` seconds.
- `longBreak`: label `Long Break 15`, `900` seconds.

Focus is selected on first load. Selecting another mode pauses the current countdown and resets `remainingSeconds` to the selected mode's full duration. Reset does the same for the current mode. Do not auto-cycle modes.

### Countdown correctness

- Keep `mode`, `remainingSeconds`, and `isRunning` in React memory only.
- On start/resume, calculate an in-memory deadline from the current remaining time.
- During ticks, derive remaining time from the deadline rather than blindly subtracting one each interval; this limits drift and handles background-tab throttling.
- On pause, preserve the derived remaining time and clear the active interval.
- Clear intervals on pause, reset, mode change, completion, and component cleanup.
- Trigger completion once only when remaining time reaches zero, including under React development behavior.
- A completed Focus mode creates one saved session and announces completion.
- A completed break stops at zero but creates no record.
- Active mode/countdown state does not persist across refresh or tab closure.
- Render time as stable, zero-padded `MM:SS` with tabular numerals.
- Derive ring progress from total and remaining seconds; do not use an independent progress timer.

### Completed-session shape

```text
{
  id: string,
  completedAt: ISO date-time string,
  durationMinutes: number,
  subject: string
}
```

Rules:

- Generate a stable local ID, preferably with `crypto.randomUUID()` in supported target browsers.
- Set `completedAt` when a Focus countdown genuinely completes.
- Version one writes `durationMinutes: 25`.
- Start with `subject: ""`; allow a concise optional value to be edited later.
- Trim subject whitespace on save and apply a small documented length limit that keeps the row usable.
- Do not add hidden fields, separate settings data, break records, or a second list.

### Storage behavior

- Key: `study-focus-timer.sessions.v1`.
- Load once during application initialization.
- Treat an absent key as an empty array.
- Validate parsed values enough to prevent malformed storage from crashing rendering.
- If reading or writing storage fails, keep the app usable and show honest local-save feedback; do not claim a save succeeded.
- Persist the complete session array immediately after add, subject update, or delete.
- Never seed fabricated history.
- Filter today's visible list by the browser-local calendar date derived from `completedAt`.
- Keep older valid records in storage even though version one shows today's primary view.
- Sort today's visible records newest first without mutating the stored state array.

### Add, update, and delete

- **Add:** Automatic only when Focus reaches zero; show “Session saved locally” for about two seconds after successful persistence.
- **Update:** Edit the subject inline; provide a visible label, Save, and Cancel. Save updates only that session and shows the same local-save feedback after successful persistence.
- **Delete:** A quiet but explicit Delete action opens a confirmation. Cancel changes nothing. Confirm removes only that item. Do not show the add/edit success wording for a failed operation.

### Empty and proof states

When today's filtered list is empty, show:

- “No focus sessions yet today.”
- “Start Focus 25 when you’re ready.”

Above the history area, show “Saved in this browser” as scope wording, not as proof that the latest write succeeded. Transient save status must reflect actual successful persistence and use a polite live region.

## Design Direction Summary

### Inspiration to translate

Build an original calm, premium, ambient-focus interface. Borrow only the broad feeling: dark distraction-free atmosphere, centered hero timer, generous spacing, restrained translucent depth, tactile controls, and slow peripheral motion.

Do not copy an external design, brand, logo, identity, component, shader, asset, claim, or exact layout. In particular, do not import ThreeUI/KoiStudies material.

### Visual system

- Near-black violet page around `#07060C`.
- Deep charcoal-violet surfaces around `#15121F`.
- Near-white primary text around `#F6F3FF`.
- Lavender-gray supporting text around `#B8B1C8`.
- Electric-violet primary accent around `#7C5CFF`.
- Use dark text around `#0B0715` on the filled accent when that provides stronger contrast.
- Use one restrained semantic destructive color only for delete decisions.
- Validate rendered text and controls for required contrast; adjust suggested values rather than accepting a failing token.

### Layout and components

- Use a centered single column with the timer as the unmistakable hero.
- Place the segmented mode row near the top of the timer.
- Scale the ring fluidly from a phone-safe size to roughly `260–380px`.
- Place controls directly below the ring, with Start/Resume as the only solid primary action.
- Place the real-data summary and history beneath the timer with clear separation.
- Style session items as compact, subtle glass rows; preserve opaque enough backgrounds for reliable text contrast.
- Reveal the labelled subject input inline only after Edit.
- Keep Delete quiet but understandable and never icon-only without an accessible label.
- Keep the empty state small, calm, and copy-led.

### Motion

- Create the background in original plain CSS only.
- Use one slow-shifting dark gradient across the viewport.
- Use one faint breathing radial violet glow behind the timer.
- Prefer long durations and transform/opacity animation.
- No particles in version one.
- Under `prefers-reduced-motion: reduce`, stop ambient animation and retain a polished static composition.

### Mobile and accessibility

- Single column and no horizontal overflow.
- Approximately `16px` small-screen gutters.
- Mode labels must fit or wrap cleanly.
- Timer remains large and readable without pushing essential controls off-screen unnecessarily.
- Interactive targets are approximately `44px` minimum.
- Controls and session actions stack rather than shrink.
- Use semantic markup, labels, headings, buttons, lists, and status regions.
- Support all interactions by keyboard with strong visible violet focus indicators.
- Avoid announcing every timer tick; announce meaningful mode/completion/save changes.
- Save feedback must not steal focus or block mobile input.

## Completion Alert Rules

- Completion messages:
  - Focus: “Focus session complete” / “Time for a break.”
  - Short Break: “Short break complete” / “Ready to focus?”
  - Long Break: “Long break complete” / “Ready for your next focus session?”
- Set one in-page completion notice from the existing exactly-once completion callback for every mode.
- The notice is non-modal, remains until dismissed, uses an accessible alert pattern, and never steals focus.
- Provide one explicit secondary notification opt-in. Request permission only in that click handler and expose honest granted/denied/unsupported text.
- If permission is granted and `document.visibilityState !== 'visible'`, show one local system notification through an existing service-worker registration when available, with `new Notification()` as the fallback.
- Do not show a system notification while the page is visible; do not request permission from timer completion.
- Notification failures are non-fatal and fall back silently to the retained in-page notice.
- Do not persist notification permission in application storage; the browser owns it.
- No push subscription, push event handler, VAPID/server key, backend, API call, sound, vibration, or closed-browser delivery.

## Implementation Rules

- Implement only from the active Work Card after Work Cards are generated and the learner says `Start Work Card 01`.
- Keep feature logic separate enough from presentation to make verification straightforward, but do not introduce unnecessary frameworks or abstraction layers.
- Use React effects with complete cleanup; avoid duplicate intervals, stale closures, and duplicate completion writes.
- Do not derive persistent session state in two places.
- Use functional state updates when the next value depends on the prior value.
- Keep storage access in one small utility or similarly clear boundary.
- Handle malformed storage and unavailable storage without a blank screen.
- Use no remote fonts or required remote assets so first-visit caching can make the app self-contained offline.
- Configure generated app-shell caching for production; do not rely on the development server as offline proof.
- Do not add an installable manifest or claim full offline readiness before a production-build preview test passes.
- Prefer original CSS, SVG, and browser APIs over UI, icon, animation, or 3D libraries.
- If icons are used, keep them minimal and accessible; text labels are preferred for Edit/Delete clarity.
- Do not add automated test files unless the learner explicitly requests them. Use each Work Card's targeted checks and the final proof ladder.
- Keep temporary accelerated timer values out of final code. If used to verify completion efficiently, restore all confirmed durations before marking verification complete.
- Do not initialize Git, deploy, or start Ship tasks during implementation cards unless the current approved card explicitly says so.

## File and Folder Expectations

The implementation may use this small structure; the Setup Work Card may refine names without changing responsibilities:

```text
study-focus-timer/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles.css
│  ├─ components/
│  │  ├─ ModeSelector.jsx
│  │  ├─ TimerPanel.jsx
│  │  ├─ TimerControls.jsx
│  │  ├─ TodaySummary.jsx
│  │  ├─ SessionList.jsx
│  │  ├─ SessionItem.jsx
│  │  └─ DeleteSessionDialog.jsx
│  ├─ hooks/
│  │  └─ useCountdown.js
│  └─ utils/
│     └─ sessionStorage.js
└─ planning markdown files remain at the repository root
```

Keep fewer files if the resulting components would be trivial. Add only the service-worker build configuration required for first-visit offline caching. Do not create a backend, API directory, database schema, authentication area, or second persistent store.

## Work Card Plan

Use the required browser-local sequence:

1. **Work Card 01 — Project Skeleton:** Create the pinned Vite/React foundation, minimal shell, scripts, plain-CSS entry, and generated service-worker build configuration without implementing later features.
2. **Work Card 02 — Static Layout:** Build the complete non-functional timer screen, honest empty state, ambient visual direction, responsive layout, reduced motion, and accessibility baseline.
3. **Work Card 03 — Add Item:** Implement fixed modes, drift-resistant countdown, controls, one-time Focus-only completion, the four-field in-memory session item, and real today summary/list output.
4. **Work Card 04 — Update and Delete Item:** Implement inline optional-subject editing, Save/Cancel, accessible confirmed deletion, and derived empty/summary states without claiming persistence yet.
5. **Work Card 05 — LocalStorage Save and Refresh:** Add safe storage under the one confirmed key, truthful save/error feedback, today filtering, and complete add/edit/delete/refresh proof.
6. **Work Card 06 — Review and Fix:** Run the Review Mirror, make only the single smallest useful fix if needed, and verify build, design, mobile, accessibility, persistence, and production offline behavior.
7. **Work Card 06A — Completion Alerts:** Apply the learner-approved scope change: accessible in-page completion notices plus opt-in hidden-tab local browser notifications for every mode, then rerun affected checks.
8. **Work Card 07 — GitHub and Vercel Proof:** After Completion Alerts learner QA and a fresh final Review Mirror PASS, initialize/push Git, deploy to Vercel, retest the live app, and record the strongest honest proof.

Each card must name exact files, bounded tasks, explicit non-goals, card-specific learner QA, a `design.md` check, and a localhost checkpoint. No card may silently absorb a Later item.

## Review Mirror

After all implementation Work Cards are complete, compare the result against this mirror:

| Intent | Evidence to observe | Failure signal |
| --- | --- | --- |
| Focus timer is the hero | Mode row, ring, digits, and controls dominate the first screen | History, decoration, or branding competes with the timer |
| Timer is correct | Fixed durations, controlled transitions, low drift, one completion | Duplicate records, skipped seconds, stale intervals, or wrong resets |
| One local data list | Only completed focus sessions persist | Breaks, settings tables, or other stored collections appear |
| History is honest | Every count/minute comes from stored sessions | Seeded activity or invented stats appear |
| CRUD requirement is complete | Completion adds; subject edit updates; confirmed delete removes | Any operation is missing or does not persist |
| Persistence is proven | Edited real session remains after refresh in the same browser | UI claims saving without a durable stored record |
| Offline promise is honest | Production app reopens after a first online visit with network disabled | Only the dev server or ordinary HTTP cache appears to work |
| Calm premium design | Restrained violet hierarchy and subtle slow background | Fast motion, excessive glow/glass, particles, or clutter distracts |
| Accessible controls | Keyboard path, focus indicators, labels, AA contrast, reduced motion | Hidden focus, color-only states, rapid motion, low contrast |
| Mobile is usable | No overflow; readable ring; approximately 44px targets; editor fits | Clipped modes, tiny controls, or horizontal scrolling |
| Scope remains locked | No account/backend/API/PWA-install expansion | Unapproved architecture or dependencies appear |

If review reveals multiple issues, choose and make the single smallest useful fix first, verify it, and record the result before expanding the fix scope.

## Proof Ladder

1. **Source proof:** All implementation files match the current approved Work Card and no source file was created during planning.
2. **Install/run proof:** Pinned dependencies install and the approved non-watch validation commands exit successfully.
3. **Timer proof:** All modes display correct durations; start, pause/resume, reset, mode switch, and completion work without duplicate events.
4. **Data proof:** One genuine completed Focus session appears with exactly four fields and real local time.
5. **Update/delete proof:** Subject editing persists; cancel is safe; deletion requires confirmation and removes only the chosen item.
6. **Refresh proof:** The genuine record and edited subject remain after browser refresh in the same browser.
7. **Empty proof:** With no sessions today, the confirmed empty copy appears and no fake metrics are shown.
8. **Design proof:** Timer hierarchy, violet system, subtle glass, original gradient/glow, and one primary action match `design.md`.
9. **Accessibility proof:** Keyboard operation, focus visibility, labels, status behavior, contrast, and reduced-motion mode pass manual checks.
10. **Mobile proof:** A phone-width viewport has no horizontal scroll, retains readable digits, and keeps controls/editor comfortably tappable.
11. **Offline proof:** Open the production build online once, disable the network, reopen/refresh, and prove the shell plus local session actions remain usable.
12. **Build proof:** The final production build completes after any temporary accelerated duration has been restored.
13. **Ship proof:** In the later Ship phase only, record GitHub and Vercel URLs or trainer-approved fallback proof.

## 60-Second Explanation Template

> I built **Study Focus Timer** for students who want structured focus sessions and a simple record of what they completed today. It is a **browser-local tool**, so there are no accounts or backend: completed focus sessions are stored in this browser with `localStorage`. The React timer supports Focus 25, Short Break 5, and Long Break 15, and only a genuinely completed focus countdown creates a record. A student can edit the optional subject, delete a session, and refresh to prove it remains. The interface uses an original calm dark theme with an electric-violet timer, a lightweight CSS gradient and breathing glow, mobile-friendly controls, accessible focus states, and reduced-motion support. After the first online visit, a generated service worker keeps the app shell available offline. I proved it with the timer, add/edit/delete, refresh, mobile, accessibility, production-build, and offline checks.

Replace or shorten wording only to match the final verified result; do not claim checks that did not pass.

## Guardrails for the Coding Agent

- Before editing, read `build-status.md`, `build-blueprint.md`, `design.md`, and the current Work Card named in `build-status.md`.
- Implement only the current Work Card.
- Do not jump ahead, combine future cards, or add Later features.
- Stop after running that card's verification steps.
- Update `build-status.md` after each Work Card with completed work, checks, blockers, decisions, and the exact next instruction.
- Do not begin any implementation until the learner says `Start Work Card 01`.
- Do not add backend, auth, accounts, database, payments, API, uploads, admin, or sync behavior; this blueprint does not allow them.
- Do not add secrets, tokens, credentials, or keys to code.
- Do not invent claims, testimonials, logos, activity, study sessions, or real numbers.
- Apply all browser-local tool guardrails: one list, four fields, real add/update/delete behavior, `localStorage`, refresh proof, empty state, and mobile proof.
- If a legacy file uses `Build Mode`, treat it as the same decision as `Build Shape` without stopping or forcing a migration.
- Preserve the confirmed timer durations and restore them after any temporary accelerated verification.
- Keep the active countdown browser-memory-only and persistent history local-only.
- Use original lightweight CSS motion; do not copy external visual work or add particles/WebGL/3D/heavy animation dependencies.
- Respect `prefers-reduced-motion` and verify contrast rather than assuming suggested colors pass.
- Do not add automated test files unless explicitly requested by the learner.
- Do not initialize Git, deploy, or start Review/Ship work unless the active approved Work Card calls for it.
- After verification, stop for the learner's check instead of continuing autonomously to the next card.
