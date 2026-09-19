# Work Card 07 — GitHub and Vercel Proof

## Goal

Ship the already-passing app to GitHub and Vercel, verify the live experience, and record the strongest available proof without changing product scope.

## Inputs

- `build-status.md` showing a final Review Mirror `PASS`
- `build-blueprint.md`
- `design.md`
- `prompts/08-github-vercel-proof.md`
- `work-cards/07-github-vercel-proof.md`
- GitHub and Vercel accounts confirmed by Work Card 00

## Files likely touched

- `.gitignore` if a safety correction is required before the first commit
- `build-status.md`

Source files should not change unless deployment exposes a small blocking defect and the learner approves returning to the appropriate review step.

## Instructions for the coding agent

1. Confirm Work Card 06 recorded a local `PASS`. If not, stop and return to review.
2. Re-run `git --version`, Git identity checks, the configured lint command if present, and `npm run build`.
3. Inspect intended repository contents. Confirm `.gitignore` excludes `node_modules`, `dist`, environment files, credentials, and debug logs. Never commit a secret.
4. Initialize Git only now. Stage the intended project and planning files, review the staged diff, and create the first commit with `build: complete kdbm lite project`.
5. Ask the learner to create an empty GitHub repository with no generated README, license, or `.gitignore`, or use an approved authenticated CLI flow if available.
6. Add the learner-provided repository remote, use branch `main`, and push with upstream tracking. Never force-push.
7. In Vercel, import the GitHub repository. Use build command `npm run build` and output directory `dist`; do not add secrets or backend settings.
8. Open the live HTTPS URL and rerun the main flow. Confirm client rendering, local-only storage wording, mobile layout, and first-visit-then-offline behavior in the deployed origin.
9. Record the GitHub URL, Vercel URL, final proof level, and short verified explanation in `build-status.md`. Mark the KDBM Lite stage `Shipped` only after proof exists.
10. If GitHub or Vercel is blocked, record the reason and use the strongest fallback from Prompt 08: GitHub plus localhost recording, or localhost recording plus explanation. Never claim a missing URL exists.
11. If a current KD Showcase/event submission is active, follow only the trainer's current submission instructions.
12. Stop after proof is recorded.

## What not to do

- Do not ship before the local Review Mirror passes.
- Do not force-push, bypass hooks, rewrite history, commit secrets, or expose personal credentials.
- Do not add a backend, database, auth, API, analytics, custom domain, or other feature to make deployment look larger.
- Do not change the confirmed design or add particles during shipping.
- Do not claim strong proof when only fallback proof exists.

## Done when

- The final build succeeds immediately before shipping.
- The intended files are committed without generated dependencies, build output, or secrets.
- The repository is available on GitHub when GitHub is not blocked.
- The app is available on Vercel when Vercel is not blocked.
- The live main flow, phone layout, local persistence, and deployed offline behavior are checked.
- `build-status.md` contains honest URLs/proof, a short explanation, and `Current KDBM Lite stage: Shipped` when appropriate.

## Verification steps

1. Confirm Git version and global identity are present.
2. Confirm working/staged contents exclude secrets, `node_modules`, and `dist`.
3. Run the configured lint command if present and `npm run build`.
4. Confirm the GitHub repository opens at the recorded URL and contains the intended source and planning files.
5. Confirm Vercel used `npm run build` and `dist`, and the live URL loads without a blank screen.
6. On the live origin, run the real timer/session path, edit a subject, refresh to prove origin-local persistence, then confirm deletion.
7. Check phone width, keyboard focus, reduced motion, and first-visit-then-offline behavior on the deployed origin.
8. Design check: the deployed timer hero, ambient dark theme, violet accent, subtle glass rows, save feedback, empty state, and mobile stacking still follow `design.md`.
9. Confirm `build-status.md` records only proof actually obtained.

## Localhost test before continuing

After this card, the learner should test:

- Before publishing, run the production preview once more and confirm it matches the reviewed local build.
- Open both recorded GitHub and Vercel URLs; confirm they are accessible and point to this project.
- On Vercel, test one real local session flow, refresh persistence, phone width, and offline reopening after the first visit.

If all tests pass, reply `continue` to confirm proof is accepted.
If anything fails, reply `fix` and paste the error or describe what you see.

## Stop condition

If credentials, secret exposure, repository ownership, push permissions, or deployment settings are uncertain, stop and ask the learner. Otherwise stop after the strongest honest proof is saved; do not begin another feature cycle.

## Status

Complete — GitHub and Vercel are live; agent and learner live-origin checks passed; Strong proof recorded.
