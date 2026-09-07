# Tasks - Refactor Hero and Episodes

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium
Estimated changed lines: 150-250 lines
```

## Phase 1: Hero Section Refactor
- [x] Remove redundant `h1` and `.tagline` markup from Hero section in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] Implement `.heroLogoFrame` wrapper around the logo image in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] Style `.heroLogoFrame` with a circular crop, double borders in old-gold/ocre color, and center alignment in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Center and reposition CTA buttons directly underneath centerpiece logo in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) and [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 2: Episodes Section Layout Refactor
- [x] Update `.episodesList` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to use CSS Grid (`display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;`).
- [x] Add tablet responsive media query (under 992px) to transition grid to `grid-template-columns: repeat(2, 1fr); gap: 1.5rem;` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Add mobile responsive media query (under 768px) to transition grid to `grid-template-columns: 1fr;` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Apply `display: flex; flex-direction: column; height: 100%;` to `.episodeCard` and wrappers in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) for uniform heights.

## Phase 3: Episode Card & Component Compacting
- [x] Adjust padding of `.episodeCard` and `.folderPaper` inside [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Resize headings and typewriter details inside cards to fit in a narrow width in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Update [AudioPlayer.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/components/AudioPlayer.module.css) to scale controls row and sliders dynamically, handling narrow viewports (< 350px) without horizontal clipping.

## Phase 4: Verification & Quality Check
- [x] Run type check `pnpm tsc --noEmit`.
- [x] Run build check `pnpm run build`.
- [x] Perform visual verification of layouts at 375px, 768px, and 1200px.
