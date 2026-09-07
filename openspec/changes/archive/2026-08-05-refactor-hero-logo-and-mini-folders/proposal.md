# Proposal: Refactor Hero Logo and Mini Manila Folders

## Intent
Address user feedback by enlarging the Hero logo and redesigning the episode list as compact, skeuomorphic mini Manila Folders in a narrowed, centered grid.

## Scope

### In Scope
* **Hero Logo**: Increase `.heroLogo` desktop `max-width` to `700px` (or `650px` on smaller desktop screens).
* **Episode Cards Refactoring**:
  * Style cards as compact, uniform-height Manila Folders (using flexbox).
  * Add folder tab labeled "CASO EP-XX".
  * Add mini CSS paperclip decoration.
  * Add radial CSS coffee stain background.
  * Simplify content: clamped title, clamped preview, AudioPlayer, and "Saber más" button.
* **Episodes Grid**: Limit `.episodesList` container to `960px` max-width to narrow the 3-column layout.

### Out of Scope
* Modifying the full-size folder details modal logic or styling.
* Any changes to the About or Contact sections.
* Modifying audio player core playback behavior or audio logic.

## Capabilities

| Capability | Status | Description |
|---|---|---|
| `site-landing` | Modified | Refactor Hero logo size and episodes list layout to use mini Manila Folders. |
| `audio-player` | Modified | Spacing adjustments inside the mini folders. |

## Approach
* **Dedicated CSS Classes**: Follow Approach 2 from exploration. Add distinct classes (`.miniFolder`, `.miniFolderTab`, etc.) in `src/app/page.module.css` to isolate card styling from modal styling.
* **Flexbox Layout**: Force equal height across cards with `display: flex` and flex alignment.
* **HTML Refactoring**: Update `src/app/page.tsx` episode rendering loop to build the folder structure and update the action button label to "Saber más".

## Affected Areas
* [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx)
* [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css)

## Risks & Mitigation
* **Grid Overflow on Small Screens**: Mono-spaced font may stretch cards vertically.
  * *Mitigation*: Reset tilts/rotations, use CSS line-clamping (`-webkit-line-clamp`) for titles (2 lines) and previews (3 lines), and collapse to single-column layout on viewports `< 768px`.

## Rollback Plan
* Revert git commits targeting `src/app/page.tsx` and `src/app/page.module.css`.

## Dependencies
* None.

## Success Criteria
* Hero logo `max-width` increases to `700px` on desktop.
* Episodes container restricted to `960px` max-width.
* Episode cards display as equal-height mini Manila folders with tabs, paperclips, coffee stains, and "Saber más" button.
* Modal overlay continues to work correctly.
