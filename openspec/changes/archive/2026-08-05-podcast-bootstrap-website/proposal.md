# Proposal: Next.js Podcast Bootstrap Setup for team SUPERNOVA

## Intent
Setup a responsive Next.js App Router project using TypeScript and Vanilla CSS/CSS Modules for the "team SUPERNOVA" podcast.

## Scope

### In Scope
* Next.js App Router initialization with TypeScript.
* Next/font/google configurations for:
  - Cinzel (Serif)
  - Monsieur La Doulaise (Script)
  - Montserrat (Sans-serif)
* CSS Variables for branding colors:
  - Background: Crema/Marfil (`#F9F6F0`)
  - Text: Dark brown/chocolate (`#2E1E1C`)
  - Accent 1 (Romance/Criminalistics): Borgoña/Guinda (`#6A2222`)
  - Accent 2 (Celestial/Cozy): Ocre/Oro viejo (`#C28D5D`)
* Landing sections: Hero, Episodes (list), About, and Contact/Socials.
* Responsive layouts matching style rules.
* Custom Interactive Audio Player component.

### Out of Scope
* Backend hosting or database integration for contact form.
* Audio stream hosting (use local mock assets/URLs).

## Capabilities

### New Capabilities
* **`site-landing`**: The main page showing podcast sections, theme colors, custom typography, and responsive styles.
* **`audio-player`**: Custom audio player matching the SUPERNOVA visual theme.

### Modified Capabilities
* None.

## Approach
* **Framework**: Next.js App Router (v14+) with React Server Components.
* **Styling**: Vanilla CSS and CSS Modules. No third-party styling frameworks.
* **Typography**: Integrated via `next/font/google` in `layout.tsx` to export CSS variables:
  * `--font-cinzel`
  * `--font-monsieur`
  * `--font-montserrat`
* **Color System**: Theme variables declared in `globals.css` and applied across pages.
* **Components**: Custom client-side audio player using HTML `<audio>` elements control flow.

## Affected Areas
* `/package.json` — dependency configuration.
* `/tsconfig.json` — compiler settings.
* `/src/app/` — global styles, layout, and main page.
* `/src/components/` — custom player components.

## Risks

| Risk | Mitigation |
|---|---|
| Script font readability | Use Monsieur La Doulaise only for large accent headings and styling decor. |
| Client-side hydration conflicts | Standardize Audio player state inside standard `"use client"` blocks. |

## Rollback Plan
Since this is an initial bootstrap:
1. Revert git workspace to HEAD (initial commit/empty project).
2. Manually delete generated `src/` folder and configuration files if uncommitted.

## Dependencies
* Next.js, React, React-DOM, TypeScript, standard typography packages.

## Success Criteria
* [ ] System compiles cleanly with TypeScript.
* [ ] Layout successfully implements custom fonts and color palette.
* [ ] Page displays Hero, Episodes, About, and Contact sections correctly.
* [ ] Audio Player plays, pauses, seeks, and controls volume correctly.
