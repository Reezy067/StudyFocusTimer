# Design Direction

## Design Inspiration URL

Custom fallback direction supplied by the learner: a calm, premium “ambient focus” dark theme.

No DesignMD URL or external brand is being used. The direction is inspiration for an original interface, not a clone target.

## What We Borrow

Borrow only broad design qualities:

- a dark, distraction-free atmosphere;
- a centered timer as the unmistakable hero;
- spacious composition and strong visual hierarchy;
- one consistent vivid accent;
- subtle depth through restrained translucent surfaces and soft shadows;
- slow ambient motion that supports focus rather than demanding attention; and
- a tactile but uncluttered control style.

The background feeling will be created from original plain CSS: a slow-shifting dark gradient and a soft breathing radial glow behind the timer.

## What We Do Not Copy

- No ThreeUI or KoiStudies code, shaders, components, assets, or identity.
- No external brand, logo, layout replica, marketing claim, or private identity.
- No WebGL, 3D engine, heavy animation library, or copied visual asset.
- No fake testimonials, fake activity, or fake statistics.
- No photographs or decorative assets that do not serve the focus workflow.
- No drifting particles in version one; faint particles remain optional later polish only.

## Visual Mood

Calm, dark, focused, premium, ambient.

The interface should feel quiet and intentional rather than futuristic or game-like. The timer is the brightest and most visually important object. Motion remains slow, low-opacity, and peripheral.

Suggested visual tokens for implementation, subject to contrast verification:

- Page background: near-black violet-black around `#07060C`.
- Raised surface: deep charcoal-violet around `#15121F`, with restrained translucency where readability remains reliable.
- Primary text: near-white around `#F6F3FF`.
- Muted text: soft lavender-gray around `#B8B1C8`.
- Primary accent: electric violet around `#7C5CFF`; adjust slightly lighter when a specific use needs stronger contrast.
- Accent-button text: dark ink around `#0B0715` when this produces stronger contrast than white.
- Destructive feedback: a muted accessible rose used only for deletion states, not as a competing brand accent.

## Layout Rules

- Use one single-page, centered column with a comfortable maximum content width and generous side padding.
- Keep the compact project identity/header above the main timer without competing with it.
- Place the short mode selector directly above or near the timer ring.
- Make the circular countdown ring the hero, approximately `260–380px` across on larger screens, scaling fluidly with the viewport.
- Center large timer digits within the ring and show the current mode in nearby supporting text.
- Place Start, Pause/Resume, and Reset controls immediately beneath the timer.
- Keep one clear primary action: Start or Resume is the only solid electric-violet action in the timer controls.
- Place the real-data Today summary and completed-session history below the timer workspace with clear vertical separation.
- Keep the session history narrower enough for comfortable reading and editing.
- Do not add sidebars, dashboard grids, promotional sections, or secondary navigation.

## Color / Contrast Rules

- Use a deep near-black base and near-white text; do not rely on translucency alone for separation.
- Use electric violet around `#7C5CFF` consistently for ring progress, the active mode, visible focus rings, and the primary action.
- Adjust the accent shade or its foreground color where needed so text and meaningful controls meet WCAG AA.
- Body text and control labels must reach at least a `4.5:1` contrast ratio against their rendered backgrounds.
- Large timer digits and meaningful non-text UI boundaries must remain clearly visible; aim for at least `3:1` for required graphical controls and states.
- Glass surfaces must retain readable opaque or near-opaque fallbacks and must not disappear into the animated background.
- Do not communicate running, paused, selected, saved, or destructive states by color alone; pair color with text, shape, or iconography.

## Typography Feel

- Use a clean, confident system sans-serif stack so typography remains fast and available offline.
- Use large, highly legible timer digits with tabular numerals to prevent width shifting during countdown.
- Keep headings concise and moderately weighted rather than oversized.
- Use comfortable line height for explanatory, empty-state, and session text.
- Keep labels in normal title or sentence case; avoid excessive uppercase and wide letter spacing.

## Component Style

### Ambient background

- Cover the entire viewport with a CSS-only dark gradient that shifts slowly over a long duration.
- Place one soft radial electric-violet glow behind the timer and animate its opacity/scale with a gentle breathing rhythm.
- Keep motion low-opacity and use long, smooth cycles; nothing may flash, strobe, jump, or move rapidly.
- Prefer opacity and transform animation for performance.
- Do not add particles in version one.

### Mode selector

- Present Focus 25, Short Break 5, and Long Break 15 as one compact segmented row.
- Make the selected mode obvious through violet emphasis plus a filled/tinted shape or border—not color alone.
- Preserve clear hover, active, keyboard-focus, and disabled states.

### Timer and controls

- Use a clean circular track with electric-violet progress and a subtle glow, while keeping the timer digits crisp.
- Make Start/Resume a solid accent button with a high-contrast foreground.
- Style Pause and Reset as quieter outline or ghost controls.
- Use rounded corners, subtle pressed states, and soft shadows without exaggerated pill shapes or excessive glow.

### Today summary and save visibility

- Show only real values derived from locally stored completed sessions, such as today's count and focused minutes.
- Place a subtle muted “Saved in this browser” label above or beside the history heading.
- The wording must never imply cloud backup or synchronization.
- After a session is added or its subject is saved, show a gentle “Session saved locally” status for about two seconds.
- Put transient save feedback in an accessible polite live region. It should not steal focus or block controls.

### Completion alerts

- Place a quiet secondary “Enable notifications” control near the timer controls; it must never compete with Start/Resume.
- Show permission state in plain language: enabled, blocked, unsupported, or available to enable.
- On every completed mode, show one original in-page notice above other content at the lower-right on wide screens and within phone gutters on mobile.
- Use a compact dark glass panel with a violet edge/glow, clear mode-specific heading, short next-step message, and a labelled Dismiss button.
- The notice is important but non-modal: use an accessible alert/status pattern without stealing focus, trapping the keyboard, or covering the timer controls.
- Keep the notice visible until dismissed so a learner returning from another application can still see it.
- System notification permission must be requested only from the explicit control; denied or unsupported states fall back to the in-page notice.
- No sound, flashing, bouncing, aggressive animation, fake urgency, or notification spam.
- Under reduced motion, the notice appears without animated movement.

### Session list and editing

- Display each session as a compact, subtly translucent glass row with reliable contrast over the background.
- Keep completion time and duration immediately visible.
- Show the optional subject when present; use calm placeholder copy when it is blank.
- An explicit Edit action reveals an inline subject input inside the same row, near the subject text.
- Give the input a visible label, clear Save and Cancel actions, and a violet focus ring.
- Keep Delete as a quiet text-plus-icon or clearly labelled text action, not an ambiguous icon-only control.
- Require confirmation before deletion; use restrained destructive styling only where the decision is being made.

### Empty state

- Use a small calm panel within the history area rather than a large illustration.
- Primary copy: “No focus sessions yet today.”
- Supporting copy: “Start Focus 25 when you’re ready.”
- Do not insert sample statistics or fabricated session cards into the empty state.

## Mobile Rules

- Use a single column at phone width with no horizontal scrolling.
- Keep the first screen focused on mode selection, the timer ring, and the primary controls.
- Scale the timer ring down fluidly while keeping it visually dominant and the digits easily readable.
- Allow the mode selector to fit or wrap cleanly without clipped labels.
- Make controls full-width-friendly and give every interactive target a minimum size of about `44px` by `44px`.
- Stack timer controls when needed rather than shrinking tap targets.
- Stack session-row content and actions cleanly on narrow screens; the inline editor must remain within the viewport.
- Keep page gutters around `16px` on small screens and increase spacing progressively on larger screens.
- Ensure the animated gradient and glow cover the viewport without causing overflow or scroll jank.
- Keep save feedback clear without covering the timer controls or mobile keyboard content.

## Accessibility Basics

- Use semantic headings, buttons, list markup, labels, and status regions.
- Support complete keyboard operation for modes, timer controls, Edit, Save, Cancel, Delete, and confirmation.
- Provide a highly visible electric-violet focus indicator on every interactive element.
- Meet WCAG AA contrast for body text and meaningful controls.
- Give the timer an accessible name and expose meaningful time/state text without creating a screen-reader announcement every second.
- Announce important events such as timer completion and successful local save through a polite status region.
- Keep deletion confirmation understandable and return focus sensibly after editing or deletion.
- Respect `prefers-reduced-motion`: stop the shifting gradient and breathing animation, remove animated transitions that are not essential, and retain a polished static background.
- Do not use rapid motion, flashing, or sound-dependent feedback.

## Anti-Slop Rules

- No fake logos.
- No fake testimonials.
- No fake stats; every displayed study count or minute total must come from local session data.
- No “lorem ipsum” in final proof.
- One clear primary action: start or resume the focus session.
- The full workflow must remain readable and usable at phone width.
- No random decorative blobs, gradients, glows, or icons that conflict with the calm ambient direction.
- No excessive glassmorphism, blur, glow, rounded cards, or nested containers.
- No large hero marketing copy, generic productivity slogans, or unnecessary feature badges.
- Background animation must stay subtle, purposeful, and performant—never gimmicky.
- No particles in version one.
- No cloned branding, content, identity, code, shaders, or assets.

## Design Verification Checklist

- [ ] The timer is the visual hero and the first clear task is starting Focus 25.
- [ ] The background uses only the original CSS shifting gradient and breathing radial glow.
- [ ] Motion is slow, faint, non-distracting, and smooth on laptop and phone.
- [ ] Reduced-motion preference produces a polished static background.
- [ ] Electric violet is used consistently as the single primary accent.
- [ ] Body copy, controls, and meaningful graphical states meet their required contrast ratios.
- [ ] Timer digits are large, readable, and do not shift width during countdown.
- [ ] Start/Resume is visually primary; Pause and Reset remain secondary.
- [ ] Session rows show real time and duration data with subtle glass styling.
- [ ] Edit opens an accessible inline subject editor with Save and Cancel.
- [ ] Delete is quiet but discoverable and requires confirmation.
- [ ] The history area says “Saved in this browser” without implying sync.
- [ ] Add and edit actions trigger a gentle, accessible “Session saved locally” message for about two seconds.
- [ ] The empty state uses the confirmed calm copy and contains no fabricated activity.
- [ ] The layout is single-column, overflow-free, and comfortably tappable on a phone.
- [ ] No fake branding, statistics, testimonials, placeholder copy, copied assets, or decorative clutter appears.
- [ ] Optional drifting particles remain deferred to Later.
