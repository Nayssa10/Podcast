<Proposal: Cosmic Book Modal>
## Intent
Transform the podcast episode detail modals into a highly thematic, immersive experience by adopting a hybrid Gothic Scrapbook & Detective Case Board aesthetic. This redesign aligns with the podcast's dual theme of romantic-thriller literature and forensic criminology, creating a foundational visual language for future landing page iterations.

## Scope
### In Scope
- Redesign "Lectura" modal to resemble a BookTok-style scrapbook page (real book page, highlighted text, handwritten/emotional margin notes, polaroid photo with metal clip).
- Redesign "Criminalística" modal to resemble a dark detective folder/wallet (metallic SIU badge, case file papers).
- Implement a UI toggle (prop/class-driven) allowing users to switch between the Classic layout and the new Gothic/Scrapbook layout.
- Update CSS with a new color palette (deep burgundy, matte black, vintage cream) and typography (monospace typewriter, elegant script).
### Out of Scope
- Full landing page redesign outside of the modals.
- Backend changes to episode data.
- Audio player component redesign.

## Capabilities
### New Capabilities
- openspec/specs/gothic-scrapbook-theme.md
- openspec/specs/modal-layout-toggle.md
### Modified Capabilities
- openspec/specs/episode-modal-view.md
- openspec/specs/global-theme-vars.md

## Approach
- Add CSS classes for the new color variables, fonts, and specific UI elements (polaroids, clips, badges, handwritten notes).
- Modify `page.tsx` to conditionally render the modal structure based on an active layout state (`classic` vs `gothic`).
- Add a toggle button inside or near the modal to switch the active layout state.
- Create specialized layouts for "Lectura" (scrapbook) and "Criminalística" (detective folder) when the gothic layout is active.

## Affected Areas
| Area | Impact | Description |
|---|---|---|
| `/src/app/page.tsx` | High | Update state to manage layout toggle, implement new modal JSX structures. |
| `/src/app/page.module.css` | High | Add typography, colors, and layout rules for the scrapbook and detective modal variants. |

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| CSS class bloat or conflicts | Medium | Namespace the new theme classes clearly (e.g., `.gothicTheme`) and use local scoping in CSS Modules. |
| Accessibility issues with complex UI | Medium | Ensure semantic HTML structure, proper ARIA labels for decorative elements, and sufficient color contrast. |

## Rollback Plan
Revert changes to `page.tsx` and `page.module.css` via git to restore the original modal layout and styles.

## Success Criteria
- [ ] Modals correctly render the new Gothic/Scrapbook aesthetic.
- [ ] Users can successfully toggle between the Classic and Gothic/Scrapbook layouts.
- [ ] The "Lectura" modal features scrapbook elements (polaroid, margin notes).
- [ ] The "Criminalística" modal features detective elements (badge, case file).
- [ ] New color and typography variables are integrated.
</Proposal: Cosmic Book Modal>
