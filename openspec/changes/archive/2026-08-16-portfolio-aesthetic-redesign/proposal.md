# Proposal: Portfolio Aesthetic Redesign

## Intent
Redesign the Team Supernova podcast landing page layout and visual identity to match the elegant pastel portfolio style and clean layout of the Helena Moore reference image.

## Scope

### In Scope
- Rebuilding `src/app/globals.css` with a soft pastel color system and root styles.
- Rebuilding `src/app/page.module.css` with clean layout grids, soft-shadow cards, and arched frames.
- Refactoring `src/app/page.tsx` from the 2-column detective desk layout to a vertical, linear portfolio flow: Hero -> About/Stats -> Featured Work (3 columns for the 3 episodes) -> Tools/Skills & Quote -> Contact & Footer.
- Adding Playfair Display font in `src/app/layout.tsx` to replace Cinzel.
- Rebuilding modals (episode details, dossier) with a clean pastel paper style (removing wood, stamps, paperclips, wax seals).
- Displaying the logo `/logo.png` inside the main arch frame.
- Using Edgar Allan Poe's quote in the quote block: "Deep into that darkness peering, long I stood there wondering, fearing, doubting..."
- Cleaning up ContactForm to match the pastel theme.

### Out of Scope
- Introducing Tailwind CSS (stick with existing CSS Modules).
- Changing the underlying page logic, states, or episode data.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `site-landing`: Redefine layout and visual design (replacing the two-column detective-desk mockup layout with a linear, clean, pastel portfolio layout).

## Approach
1. Load `Playfair Display` in `src/app/layout.tsx`.
2. Update global color variables in `src/app/globals.css` for the pastel palette.
3. Restructure `src/app/page.tsx` into vertical sections.
4. Add arch and modern grid styles in `src/app/page.module.css`.
5. Stylize `ContactForm` and modals with simple pastel backgrounds.

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| [`src/app/globals.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css) | Modified | Soft pastel variables and root styles. |
| [`src/app/layout.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx) | Modified | Playfair Display font integration. |
| [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) | Modified | Vertical JSX hierarchy, quote update, and logo placement. |
| [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) | Modified | Flex/Grid layouts, soft shadows, arched frames. |
| [`src/components/ContactForm.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) | Modified | Flat pastel design updates. |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Responsive styling mismatch | Low | Use media queries in CSS modules to collapse grids on mobile. |
| Broken skeuomorphic modal components | Medium | Convert dossier/receipt layouts into modern clean tables/lists. |

## Rollback Plan
Run:
```bash
git checkout -- src/app/globals.css src/app/layout.tsx src/app/page.tsx src/app/page.module.css src/components/ContactForm.tsx
```

## Dependencies
- None

## Success Criteria
- [ ] Website loads with Playfair Display and pastel theme.
- [ ] Page layout displays a vertical linear flow.
- [ ] Modals styled with clean pastel sheet layouts (no wax seals/wood).
- [ ] Zero Tailwind CSS dependency added.

## Proposal Question Round

### Key Assumptions
1. **Logo Framing**: The `/logo.png` image will be rendered inside the main arch frame with clean borders, replacing any skeuomorphic detective-desk logo elements.
2. **Quote Location**: Edgar Allan Poe's quote will be placed in a dedicated prominent quote block between the Tools/Skills section and the Contact form.
3. **Modals Style**: Criminology warning stamps, paperclips, wax seals, and retro paper layouts will be entirely removed from the details and dossier modals, replaced with a single clean, flat pastel paper design.
4. **Color Palette**: The palette will use soft pastel tones (e.g. sage/rose/cream/charcoal) with high contrast text (>4.5:1) instead of wood grain gradients.

### Proposed Questions for Refinement
1. Are there specific hex codes or color names you prefer for the pastel color system?
2. Do you want the logo `/logo.png` to have any filter (like sepia or grayscale) or should it render in its original colors?
3. Should the font size and styling of Edgar Allan Poe's quote use Montserrat or a stylized serif/script mix?
4. How should the episode modals display case metrics (like height, weight, tropes) now that we are removing dossier and folder skeuomorphism?
