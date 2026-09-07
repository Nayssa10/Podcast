# Tasks: HTML Logo Recreation

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High
```

## Phase 1: InteractiveLogo Component Shell
- [x] Create `src/components/InteractiveLogo.tsx` React component shell.
- [x] Add outer wrapper container, inner double-circle border, and set up typography styling.
- [x] Create `src/components/InteractiveLogo.module.css` with container query configs (`container-type: inline-size` on `.logoWrapper` and `.logoInner`).

## Phase 2: Logo Typography and Slogans
- [x] Implement overlapping "team" (using Monsieur La Doulaise font) and "SUPERNOVA" (using Cinzel font) text elements.
- [x] Implement inline SVG star inside the "O" of "SUPERNOVA".
- [x] Add taglines "LIBROS • ROMANCE • CRIMINALÍSTICA" with decorative border lines.
- [x] Add slogan "donde cada historia deja una huella" with hand-drawn underline SVG and inline heart.
- [x] Implement centered SVG microphone graphic along with horizontal soundwaves.

## Phase 3: Top and Bottom Graphic Elements
- [x] Implement top-left celestial elements (moon, constellation, stars) using inline SVGs.
- [x] Implement top-right criminology elements (fingerprint path SVG, heart) using inline SVGs.
- [x] Implement bottom-left Cozy Desk elements: 4 vertical CSS books with styled cover borders/vertical spines, a coffee mug showing coffee surface/typewriter text, and a golden leaf branch SVG.
- [x] Implement bottom-right Evidence Desk elements: Kraft folder styled with tabs/borders, pinned typewriter note card, and Polaroid photo frame with a silhouette city scene SVG.

## Phase 4: Integration & Styles Clean-up
- [x] Import and replace the static `/logo.png` image with `<InteractiveLogo />` in the Hero section of `src/app/page.tsx`.
- [x] Remove `.heroLogo` and other unused styles in `src/app/page.module.css`.

## Phase 5: Verification & Quality Check
- [x] Run typescript checking with `pnpm tsc --noEmit`.
- [x] Run production build using `pnpm run build`.
- [x] Perform visual verification of proportional scaling between 200px and 800px width.
