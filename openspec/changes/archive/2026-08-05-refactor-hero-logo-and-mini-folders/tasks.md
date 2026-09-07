# Tasks: Refactor Hero Logo and Mini Folders

<!-- Workload Forecast -->
```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium
```

## Phase 1: Hero Logo Layout Update
- [x] Update `.heroLogo` class in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to increase max-width to 700px on desktop and center it.
- [x] Position `.heroCtas` directly under the expanded logo centerpiece in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).

## Phase 2: Episodes List Container Constraint
- [x] Update `.episodesList` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to add a max-width of 960px and center it with `margin: 0 auto;`.

## Phase 3: Mini Manila Folder Cards Implementation
- [x] Restructure episode card markup in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to include mini folder elements: `.miniFolder`, `.miniFolderTab` with label `CASO EP-XX`, `.miniFolderPaper`, `.miniPaperClip`, and `.miniCoffeeStain`.
- [x] Update the card button label to "Saber más" in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] Add mini folder CSS classes (`.miniFolder`, `.miniFolderTab`, `.miniFolderTabLabel`, `.miniFolderPaper`, `.miniPaperClip`, `.miniCoffeeStain`) inside [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Implement CSS styles for mini tabs (top/left offset), mini paperclip (loop outline), and coffee stains (subtle gradient) within card limits in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Set cards and wrappers to flexbox layouts (`display: flex; flex-direction: column; height: 100%; justify-content: space-between;`) to align folder heights uniformly in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 4: Audio Player and Responsive Adjustments
- [x] Verify that the `AudioPlayer` displays cleanly inside the mini folders in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] Add media queries (< 768px) in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to flatten tilts, hide mini coffee stains, and stack items vertically.

## Phase 5: Verification & Quality Check
- [x] Run type checking with `pnpm tsc --noEmit`.
- [x] Run production build validation with `pnpm run build`.
- [x] Perform visual verification of layouts at 375px, 768px, and 1200px.
