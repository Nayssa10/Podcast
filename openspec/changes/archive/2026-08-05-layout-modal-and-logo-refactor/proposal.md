# Proposal: Layout, Modal & Logo Refactor

## Intent
Standardize the episodes grid to display compact cards and introduce a modal overlay to display the full, interactive skeuomorphic case folder, while removing the circular cropping from the logo image in the Hero section.

## Scope

### In Scope
- **Hero Logo**: Remove `.heroLogoFrame`. Render `/logo.png` in its full square ratio with `mix-blend-mode: multiply` and sepia filters (centered, max-width 450px).
- **Episode Cards Grid**: Refactor grid in `page.tsx` and `page.module.css` to display uniform, standard cards containing:
  - Episode number & date
  - Title (clamped to 2 lines)
  - Typewriter preview text (clamped to 3 lines)
  - `AudioPlayer` widget
  - "Ver Expediente" button to launch the modal.
- **Client-Side Modal**:
  - Modal overlay (`background-color: rgba(46, 30, 28, 0.6)`) that dims background and locks body scroll.
  - Close handlers: click overlay, press Escape key, or click typewriter close button ("X / CERRAR").
  - Inside modal, render full skeuomorphic "Manila Case Folder" (folder tab, CSS paperclip, radial coffee stains, slanted "CONFIDENTIAL" stamp, active tab switching state, book info, forensic reports, and inline `AudioPlayer`).

### Out of Scope
- Global state management (redux/zustand).
- Routing changes.
- Modifying About or Contact sections.

## Capabilities Contract

| Capability | Impact / Modifications |
|---|---|
| `site-landing` | **Modified**: Refactor episode list to compact grid cards. Add React client-side modal component and close mechanics. Update Hero section logo sizing and filters. |
| `audio-player` | **Modified**: Ensure the player fits and renders correctly in both compact grid cards and the modal-contained Manila folder. |

## Approach
1. **Layout & Grid Update**: Apply CSS Grid/Flexbox to `src/app/page.module.css` for a uniform-height episode cards grid. Add line clamping to title and preview paragraph.
2. **Hero Logo**: Remove circular framing and update CSS to display `/logo.png` centered with a sepia filter.
3. **Modal Component**: Add `selectedEpisode` state in `src/app/page.tsx`. Lock body scroll by toggling class on `document.body` during mount/unmount of open modal. Register `keydown` event listener for Escape key.
4. **Skeuomorphic Folder Placement**: Transfer existing folder markup/staining details into the Modal.

## Affected Areas
- `src/app/page.tsx`
- `src/app/page.module.css`
- `openspec/specs/site-landing/spec.md` (to document updated specs)

## Risks & Mitigations
- **Audio Overlap**: Multiple players could play simultaneously. *Mitigation*: Pause players on modal state change or rely on normal HTML5 behavior.
- **Scroll Lock Leak**: Lock state might persist if component unmounts unexpectedly. *Mitigation*: Use clean-up function in React `useEffect`.

## Rollback & Success Criteria

### Rollback Plan
- Revert commits on `layout-modal-and-logo-refactor` branch.

### Success Criteria
- Grid cards are uniform in height and details.
- Clicking "Ver Expediente" triggers modal with Manila folder.
- Escape key, overlay click, or close button dismisses modal and restores scroll.
- Hero logo displays square ratio without circular frame.
