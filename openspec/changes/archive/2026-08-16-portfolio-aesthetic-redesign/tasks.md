# Tasks: Portfolio Aesthetic Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1200 lines |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation & Form) -> PR 2 (Page Layout & Modals) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Set up base fonts, global colors, and style contact form | PR 1 | Base branch; edits [globals.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css), [layout.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx), [ContactForm.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) |
| 2 | Restructure page layout, modals, and rewrites page.module.css | PR 2 | Depends on PR 1; edits [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx), [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) |

## Phase 1: Foundation

- [x] 1.1 Update [`src/app/globals.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css) to define pastel color variables and clean body baseline styles.
- [x] 1.2 Edit [`src/app/layout.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx) to load Playfair_Display Google Font via `next/font/google` and attach it to root.

## Phase 2: Core Components

- [x] 2.1 Refactor [`src/components/ContactForm.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) styling, removing notepad rings/receipt header for a flat minimal form.
- [x] 2.2 Verify contact form visual integration with the new theme variables.

## Phase 3: Page Layout & Visual Overhaul

- [x] 3.1 Restructure JSX in [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) into a vertical linear layout (Hero -> About -> Featured -> Quote -> Contact -> Footer).
- [x] 3.2 Add logo `/logo.png` inside the main arch frame within [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 3.3 Completely rewrite [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) for flex/grid structures, arched frames, and clean borders.

## Phase 4: Modal Overhauls

- [x] 4.1 Update episode details and dossier React modal markup in [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to use unified minimalist card layout.
- [x] 4.2 Restyle modal container in [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to remove wax seals, wood, and paperclips.

## Phase 5: Verification

- [x] 5.1 Perform manual visual alignment checks on desktop and mobile viewports.
- [x] 5.2 Test audio player controls inside the new featured work layout to ensure track streaming still functions.
