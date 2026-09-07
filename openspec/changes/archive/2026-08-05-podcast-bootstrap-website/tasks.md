# Tasks - Next.js Podcast Bootstrap Setup

```text
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High
```

## Phase 1: Infrastructure & Bootstrap
- [x] Run `npx create-next-app@latest --help` to check CLI availability and flag support.
- [x] Bootstrap the Next.js app in the current workspace with arguments matching the design spec.
- [x] Verify generated folder structure, `package.json` dependencies, and `tsconfig.json` configurations.

## Phase 2: Design Foundation & Styling
- [x] Create `src/app/globals.css` with CSS variables for fonts, viewport sizing, and branding theme colors (Cream, Dark Brown, Borgoña, Ocre).
- [x] Update `src/app/layout.tsx` to load Google Fonts (Cinzel, Monsieur La Doulaise, Montserrat) and export CSS font variables.

## Phase 3: Component Implementation
- [x] Create interactive Client Component `src/components/AudioPlayer.tsx` matching `AudioPlayerProps` and `Track` interfaces.
- [x] Design styling for player components in `src/components/AudioPlayer.module.css` with theme colors and borders.

## Phase 4: Page Assembly
- [x] Build `src/app/page.tsx` incorporating Hero, Episodes (utilizing `AudioPlayer`), About, and Contact sections.

## Phase 5: Verification & Quality Check
- [x] Run TypeScript compiler (`npx tsc --noEmit`) to verify no static typing errors.
- [x] Spin up local development server to visually inspect layout responsiveness and play controls.
