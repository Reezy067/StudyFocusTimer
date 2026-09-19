# Work Card 02 — Static Layout

## Goal

Build the complete static single-screen layout and confirmed ambient visual direction without adding timer or session behavior.

## Inputs

- `build-status.md`
- `build-blueprint.md`
- `design.md`
- `work-cards/02-static-layout.md`
- Runnable shell from Work Card 01

## Files likely touched

- `src/App.jsx`
- `src/styles.css`
- `src/components/ModeSelector.jsx`
- `src/components/TimerPanel.jsx`
- `src/components/TimerControls.jsx`
- `src/components/TodaySummary.jsx`
- `src/components/SessionList.jsx`
- `build-status.md`

Use fewer component files when a component would be trivial; keep the responsibilities described in the blueprint.

## Instructions for the coding agent

1. Replace the skeleton placeholder with the confirmed single-column screen: compact header, mode row, hero timer ring, controls, real-data summary area, save-scope label, and history area.
2. Render Focus 25 as the static selected mode with `25:00` in the hero ring. Render Short Break 5 and Long Break 15 as the other mode choices.
3. Render Start as the single solid electric-violet primary action. Render Pause and Reset as quieter secondary controls. Clearly communicate that behavior arrives in later cards; do not fake interaction.
4. Show zero real sessions and zero real focused minutes. Render the confirmed empty copy: “No focus sessions yet today.” and “Start Focus 25 when you’re ready.”
5. Show the honest scope label “Saved in this browser” near the history heading, without showing a success toast before any successful save exists.
6. Implement the original CSS-only dark shifting gradient and faint breathing radial glow behind the timer. Add no particles.
7. Apply the confirmed tokens, spacing, circular-ring hierarchy, restrained glass surfaces, rounded controls, soft shadows, and tabular timer digits.
8. Add responsive rules: single column, roughly `16px` phone gutters, fluid ring size, no horizontal overflow, wrapping/stacking controls, and approximately `44px` interactive targets.
9. Add semantic regions, headings, controls, selected-state text/attributes, and strong visible focus styles. Under `prefers-reduced-motion: reduce`, stop ambient animation and keep a polished static background.
10. Run build and browser checks, update `build-status.md`, mark only this card complete, set Work Card 03 as current, and stop.

## What not to do

- Do not implement countdown intervals, mode switching, session creation, editing, deletion, or storage.
- Do not render sample session cards or invented statistics.
- Do not copy ThreeUI, KoiStudies, another brand, or external code/assets.
- Do not add particles, WebGL, Canvas, 3D, heavy libraries, remote fonts, or an install prompt.
- Do not initialize Git, deploy, or begin Work Card 03.

## Done when

- Every confirmed screen area exists and follows the visual hierarchy in `design.md`.
- The empty state and all displayed values are honest.
- The background uses only the original CSS gradient and breathing glow.
- The screen works at desktop and phone widths without clipping or horizontal scroll.
- Reduced motion produces a static background.
- `build-status.md` records verification and points to Work Card 03.

## Verification steps

1. Run `npm run build` and confirm success.
2. Confirm the first screen visibly prioritizes mode selection, countdown ring, and Start action.
3. Confirm the history area shows only zero values and the approved empty copy.
4. Check keyboard focus is clearly visible on every rendered control.
5. Emulate reduced motion and verify the gradient/glow stop moving.
6. Check a phone-sized viewport for readable digits, approximately `44px` targets, clean wrapping, and no horizontal overflow.
7. Design check: hero timer, violet accent, subtle glass, original ambient background, empty state, focus rings, reduced motion, and mobile stacking follow `design.md`.

## Localhost test before continuing

After this card, the learner should test:

- Run `npm run dev`, open the localhost URL, and confirm the full static timer screen is visible.
- Resize to a phone width and confirm the ring, mode labels, controls, summary, and empty state are not cut off.
- Enable reduced motion in the browser or operating system and confirm the background becomes static.

If all tests pass, reply `continue`.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

Stop after the learner checks the visible static screen. Do not make the controls functional until Work Card 03 is approved.

## Status

Complete — automated/browser checks and learner localhost review passed.
