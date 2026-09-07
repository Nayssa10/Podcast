# Proposal: Refactor Hero and Episodes

## Intent
Streamline the visual landing page by eliminating redundant title text in favor of the graphic logo, and redesigning the episode list into a compact, gallery-style grid layout.

## Scope
### In Scope
* Remove redundant `h1` ("team SUPERNOVA") and `.tagline` text from the Hero section in `src/app/page.tsx`.
* Render `/logo.png` inside a centered circular centerpiece (`.heroLogoFrame`) with old-gold/ocre double borders and subtle sepia filter blend styles.
* Align the Hero CTA buttons directly underneath the centerpiece logo.
* Convert `.episodesList` to a CSS Grid (`repeat(3, 1fr)` on desktop, collapsing to 1 column on mobile/tablet).
* Compact the styling of episode folders: adjust padding, decrease description margins, and ensure uniform card heights.
* Restructure the `AudioPlayer` layout/margins to fit nicely in compact grid columns.

### Out of Scope
* Modifying the About or Contact sections.
* Modifying audio playback logic or player behavior.

## Capabilities
| Capability | Change Type | Description |
|---|---|---|
| `site-landing` | Modified | Refactor Hero and Episodes layout and styling classes. |
| `audio-player` | Modified | Restyle margins/padding to fit in compact grid columns. |

## Approach
1. **Hero Redesign**:
   * Delete `h1` and `.tagline` from `src/app/page.tsx`.
   * Wrap the image in `.heroLogoFrame` and apply a centered flex layout.
   * Style the frame with a circular shape, ocre/old-gold double borders, and a sepia filter.
   * Move the CTA buttons container directly beneath the logo.
2. **Episodes Grid & Card Compacting**:
   * Redefine `.episodesList` in `src/app/page.module.css` as a grid with `grid-template-columns: repeat(3, 1fr)` for desktop.
   * Collapse to a single column for screens `< 768px` using media queries.
   * Compact card padding, folder margins, and text sizes.
   * Ensure uniform card heights using flexbox (`height: 100%`).
3. **Audio Player Styling**:
   * Tweak padding and margins in `src/components/AudioPlayer.module.css` to prevent layout overflow in narrow columns.

## Affected Areas
* `src/app/page.tsx`
* `src/app/page.module.css`
* `src/components/AudioPlayer.module.css`

## Risks & Mitigation
* **Layout Overflow**: Card descriptions of varying lengths or narrow grid columns may warp layout.
  * *Mitigation*: Set uniform heights (`height: 100%`) and ensure the AudioPlayer shrinks gracefully using responsive styling rules.

## Rollback Plan
* Discard changes using `git checkout` or `git revert`.

## Dependencies
* None.

## Success Criteria
* Zero repeated text titles below the logo.
* Clean 3-column gallery grid display on desktop.
* Clean, responsive layout.
