# Tasks: Cosmic Book Modal

## Review Workload Forecast
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Data Setup
- [x] 1.1 Update `MOCK_EPISODES` array in [`page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) with romance-thriller `snippet` and margin `annotations` fields.

## Phase 2: Core Implementation
- [x] 2.1 Add `layoutMode` state and a mount `useEffect` hook to sync the layout selection from `localStorage` in [`page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.2 Add dynamic markup highlighting helper `renderHighlightedSnippet` in [`page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.3 Add the toggle button `styles.layoutToggleBtn` inside the modal wrapper in [`page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.4 Conditionally render Classic vs Gothic layouts based on `layoutMode` and episode type inside the modal in [`page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).

## Phase 3: Scrapbook Styling
- [x] 3.1 Define CSS classes for book page texture, Polaroid card, metal binder clip, and cream highlights in [`page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 3.2 Define CSS classes for margin annotations utilizing cursive script fonts, positional percentage offsets, and rotation in [`page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 4: Detective Styling
- [x] 4.1 Define CSS classes for simulated leather folder, SIU badge plaque, and loose stacked case sheets in [`page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 4.2 Define CSS rules for monospace typewriter typography and multi-sheet overlapping offsets in [`page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 5: Testing
- [x] 5.1 Verify Scenario 13: Open modal, click toggle button, and confirm immediate layout swap.
- [x] 5.2 Verify Scenario 14: Open Lectura modal, confirm polaroid with clip (left) and book page with highlight and script annotations (right).
- [x] 5.3 Verify Scenario 15: Open Criminalística modal, check dark leather texture, SIU badge, and overlapping typewriter pages.
- [x] 5.4 Verify Scenario 16: Change layout to Gothic, close modal, open another, and verify it opens in Gothic. Reload page to confirm persistence.
