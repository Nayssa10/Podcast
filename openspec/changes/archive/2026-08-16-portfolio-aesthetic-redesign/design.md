# Technical Design: Portfolio Aesthetic Redesign

## Technical Approach
The Team Supernova podcast landing page will be refactored from a dual-column skeuomorphic detective's desk layout to a single-column, clean, vertical portfolio layout inspired by modern minimalist designs. The implementation will preserve current Next.js App Router conventions and React logic, styling solely via CSS Modules without external CSS framework dependencies.

## Architecture Decisions

| Area | Option | Tradeoff | Decision |
|---|---|---|---|
| Style Framework | Tailwind CSS vs. CSS Modules | Tailwind adds bundle dependencies and alters build settings. CSS Modules use standard CSS syntax, keeping zero-dependency performance. | CSS Modules (preserve existing patterns). |
| Typography | Google Font via `next/font/google` vs. Local/Static Fonts | Static fonts require asset hosting. `next/font/google` offers optimized font delivery out-of-the-box. | Use `next/font/google` to import `Playfair_Display`. |
| Layout Pattern | Split dashboard vs. Vertical flow | Split dashboard has poor mobile adaptability. Vertical scroll is linear, highly responsive, and editorial. | Vertical linear scroll flow (5 sections). |
| Component Modals | Skeuomorphic (Dossiers/Receipts) vs. Uniform clean modal | Skeuomorphic components (paperclips, seals, fingerprints) require complex CSS/HTML. Flat minimal card cards simplify maintainability. | Single clean pastel modal card style for all modals. |

## Data Flow
User interactions toggle overlay states or select tracks in the landing page, which streams data to the modified components:
```
  [User Action] ──→ Toggles Modal State / Selected Episode Index
         │
         ├──→ Opens Unified Pastel Modal Card (Episode Details / Contact / Bio)
         └──→ Selected Episode Track ──→ src/components/AudioPlayer.tsx (Playback Control)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/globals.css` | Modify | Define soft pastel CSS variables (`cream-beige`, `dark-charcoal`, `dust-rose`, `sage-green`, `lavender-gray`, `thin-border`), update font family, remove wood texture background, apply general body baseline styles. |
| `src/app/layout.tsx` | Modify | Import `Playfair_Display` from `next/font/google`, define the variable `--font-playfair`, and append it to the body class list. |
| `src/app/page.tsx` | Modify | Reorganize page markup to follow a linear vertical layout (Navbar, Hero with arched logo wrapper, About card with stats columns, Featured Work with 3-column arched card layout, Skills SVG icons row, Poe Quote section, Contact form with inline styling, minimal Footer). Simplify modal triggers. |
| `src/app/page.module.css` | Modify | Completely rewrite styles to support vertical flow: flex/grid alignments, arched frames (`border-radius: 150px 150px 0 0` / aspect ratios), clean horizontal About stats columns, minimal outline button states, SVG icon styling, simple modal wrapper without seals or paperclips. |
| `src/components/ContactForm.tsx` | Modify | Remove notepad rings, receipt headers, and scattered petals. Re-style as a flat, minimal inline form fitting the pastel theme. |

## Interfaces / Contracts

```typescript
// No new APIs or interfaces are introduced.
// The existing MOCK_EPISODES structure is preserved.
// AudioPlayer properties remain unchanged:
interface Track {
  title: string;
  description: string;
  url: string;
  duration: string;
}
```

## Styling Strategy & Code Snippets

### Arched Frames CSS Pattern
Used for the Hero image wrapper and Episode cover images:
```css
.archFrame {
  border-radius: 150px 150px 0 0;
  border: 1px solid var(--color-border);
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background-color: var(--color-bg);
}
```

### Palette CSS Variables (`src/app/globals.css`)
```css
:root {
  --color-bg: #FAF8F5;          /* cream-beige */
  --color-text: #2E2E2E;        /* dark charcoal */
  --color-accent-1: #D4B2A7;    /* dust rose */
  --color-accent-2: #C1C7BD;    /* sage green */
  --color-accent-3: #D5D2DC;    /* lavender gray */
  --color-border: #E6E3DE;      /* thin pastel borders */
  
  --font-family-serif: var(--font-playfair), Georgia, serif;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual Regression | Color variables, Font loading, Arched frames, Navbar alignment | Manual rendering inspection across Desktop & Mobile viewports. |
| Integration | Modal backdrop clicks, track selections | Verify that clicking episode plays, modal opens and closes correctly on ESC/outside click. |
| Component | Contact Form submission | Test form field validations and simulated submit delay behavior. |

## Migration / Rollout
No data migration required. Redesign will be rolled out as a single frontend code release.

## Open Questions
- [ ] Should the stats numbers (`3+`, `30+`, `20+`) have fixed text labels (e.g. "Episodios", "Minutos", "Temas Analizados"), or should they be dynamically customizable?
- [ ] Should the arched logo wrapper in the Hero section display the original full-color `/logo.png` or apply grayscale filters?
