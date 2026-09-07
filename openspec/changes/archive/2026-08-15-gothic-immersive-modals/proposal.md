# Proposal: gothic-immersive-modals

## Intent
To elevate the episode detail modals into a premium, immersive gothic scrapbook (Lectura) and confidential case file (Criminalística) aesthetic. We are removing the classic layout and layout toggle to commit fully to this cohesive, thematic visual experience.

## Scope
### In Scope
- Removal of `layoutMode` toggle and all classic modal layouts within `src/app/page.tsx`.
- Implementation of "Lectura" modal view (scrapbook, polaroids, vintage cream paper, cursive notes, wax seal) in `src/app/page.tsx`.
- Implementation of "Criminalística" modal view (dark folder, paperclips, red stamps, kraft paper notes, red wax seal) in `src/app/page.tsx`.
- Modal styling updates in `src/app/page.module.css`.
- Global theme updates in `src/app/globals.css` (burgundy, matte black, vintage cream, typewriter/script fonts).

### Out of Scope
- Changes to audio playback logic.
- Adding new episodes or editing episode data.

## Capabilities
### New Capabilities
- `openspec/specs/ui/gothic_theme.md`

### Modified Capabilities
- `openspec/specs/ui/episode_modals.md`
- `openspec/specs/ui/global_theme.md`

## Approach
1. In `src/app/page.tsx`, remove all state logic and UI related to the layout toggle.
2. Update global CSS variables in `src/app/globals.css` for colors (burgundy/black/cream) and typography (monospace/script).
3. Refactor the Lectura modal markup inside `src/app/page.tsx` to use a two-page scrapbook layout with visual assets, styled via `src/app/page.module.css`.
4. Refactor the Criminalística modal markup inside `src/app/page.tsx` to use a case file layout, styled via `src/app/page.module.css`.

## Affected Areas
| Area | Impact | Description |
|---|---|---|
| `src/app/page.tsx` | High | Removal of toggle logic; complete redesign of Lectura and Criminalística inline modal layouts. |
| `src/app/page.module.css` | High | New layout and thematic styles for the modals. |
| `src/app/globals.css` | Medium | New color variables and typography imports. |

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| Asset availability (wax seals, sketches) | Medium | Use pure CSS / SVG fallbacks or lightweight generic assets. |
| Readability issues with script fonts | Medium | Provide legible fallback fonts and maintain high contrast. |

## Rollback Plan
Revert the commit containing these changes to restore the `layoutMode` state, classic layout views in `src/app/page.tsx`, and previous `src/app/globals.css` / `src/app/page.module.css` styles.

## Success Criteria
- [ ] `layoutMode` toggle is removed.
- [ ] Lectura modal displays scrapbook styling with polaroid and wax seal.
- [ ] Criminalística modal displays case file styling with stamps and paperclips.
- [ ] Global styling reflects the new gothic/detective color palette and typography.
