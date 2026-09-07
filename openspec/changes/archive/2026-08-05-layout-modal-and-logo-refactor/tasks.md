# Tasks: Layout, Modal, and Logo Refactor

<!-- Workload Forecast -->
```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium
```

## Phase 1: Hero Logo Section Refactor
- [x] Remove circular `.heroLogoFrame` container in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) and mount `/logo.png` directly inside the Hero layout.
- [x] Update `.heroLogo` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) for square aspect ratio, centering, and max-width of 450px.

## Phase 2: Episodes Gallery Grid and Compact Cards
- [x] Modify [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to render compact cards for episodes instead of full case folders.
- [x] Add title (clamp to 2 lines) and preview description (clamp to 3 lines using webkit-box-orient) to the compact card.
- [x] Integrate metadata, `AudioPlayer` component, and a "Ver Expediente" button inside the compact card markup.
- [x] Add CSS flexbox rules in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to establish uniform card heights.

## Phase 3: Modal Overlay Implementation
- [x] Add `activeEpisodeIndex: number | null` state and body scroll toggle (`overflow: hidden`) on index activation in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] Add Escape key window event listener using `useEffect` to close the active episode modal.
- [x] Add `.modalOverlay` and `.modalWrapper` HTML structure to conditionally render the full manila folder when `activeEpisodeIndex !== null`.
- [x] Render the typewriter-styled Close button ("X / CERRAR") to clear `activeEpisodeIndex` state.

## Phase 4: Styling and Responsive Adjustments
- [x] Style `.modalOverlay` and `.modalWrapper` backdrops, positioning, and scrolling in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Add CSS media queries (< 768px) to scale down manila folder rotations and positioning for mobile screens.

## Phase 5: Verification & Quality Check
- [x] Run typescript verification with `pnpm tsc --noEmit`.
- [x] Run next production build validation via `pnpm run build`.
- [x] Verify escape key, modal scroll lock, and layout scaling manually.
