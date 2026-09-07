# Tasks - Redesign Podcast Theme

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High
```

## Phase 1: Foundation
- [x] Load Google Font `Courier Prime` and expose `--font-courier` variable in [layout.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx).
- [x] Define `--font-family-monospace` variable, custom scrollbars, and typewriter canvas overrides in [globals.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css).

## Phase 2: Component & Form Redesign
- [x] Style text input fields in [ContactForm.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) to match typewriter typography and ruled notebook bottom-line design.
- [x] Update [AudioPlayer.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/components/AudioPlayer.tsx) and [AudioPlayer.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/components/AudioPlayer.module.css) with new theme borders, textured background, and color accents.

## Phase 3: Episode Folder & State Implementation
- [x] Restructure mock data in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to provide detailed book sections and forensic chemistry/investigation reports.
- [x] Implement local React active tab tracking state ('book' | 'forensic') for each episode card in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
 
## Phase 4: Theme Assembly & CSS
- [x] Implement the "Detective's Desk" / "Crime Board" grid layouts and styles in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) and [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] Embed the `/logo.png` logo into the navigation bar and hero headers, applying standard CSS multiply blend modes and vintage filters.
- [x] Build skeuomorphic paper clips, radial coffee stains, Polaroid rotations, handwritten font tags, and absolute red yarn lines connecting cards.
- [x] Write responsive media queries (< 768px) to flatten all card rotations, reset overlaps, and stack sections cleanly on mobile screens.

## Phase 5: Verification & Quality Check
- [x] Verify static type safety across all files using the TypeScript compiler (`npx tsc --noEmit`).
- [x] Execute production build pipeline (`npm run build`) to ensure successful compilation and optimized bundling.
- [x] Visually verify responsive layout scaling, text contrast ratios, theme blend filters, and custom player functionality.
