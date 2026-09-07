<Design: desk-mockup-redesign>
## Technical Approach

Restructure the Podcast landing page into a single-viewport CSS Grid container (`Kotomi Grid`), eliminating vertical scrolling on desktop. We will implement a responsive dashboard layout using Tailwind CSS with custom thematic styles (borders, border-radii) to match the specified aesthetic. Modals will be integrated for interactive details like Contact, Episodes, and Host profiles.

## Architecture Decisions

### Decision: Layout Structure

**Choice**: CSS Grid with `grid-template-columns: 1fr 1fr;` and `gap: 2rem;` for the main content area, with a `height: auto` header.
**Alternatives considered**: Flexbox for columns.
**Rationale**: CSS Grid provides stricter alignment and easier management of complex 2-dimensional layouts required by the Kotomi grid format.

### Decision: Thematic Modals

**Choice**: Use React Portals or a global modal context to render thematic modal overlays (Guest Check pink receipt, Investigator dossiers, Case file dossiers).
**Alternatives considered**: Inline expansion panels.
**Rationale**: Modals better simulate physical "documents" overlaid on a desk, which is the desired aesthetic effect.

## Data Flow

    [Page/Layout] ──→ [Grid Content]
         │            └──→ Banner, Lists, Slider, Profiles
         │
         └──────────→ [Modals Overlay]
                      └──→ Thematic Modals (Contact, Dossiers)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modify | Implement main grid container and unified layout components. |
| `src/app/page.module.css` | Modify | Implement custom utility classes and container styles. |
| `src/app/globals.css` | Modify | Add custom utility classes for fonts, colors, and borders. |
| `src/components/ContactForm.tsx` | Modify | Used for the pink receipt modal. |
| `src/components/InteractiveLogo.tsx` | Modify | Navbar logo with animations. |

## Styling Specifics

- **Grid Template**: Header `auto`, Main `1fr 1fr` with `2rem` gap.
- **Left Column**: Banner gets `border-radius: 20px; border-bottom-right-radius: 120px; overflow: hidden;`.
- **Containers**: Text boxes and pills use `#ffffff` backgrounds, thin terracotta borders, and custom rounded corners.
- **Right Column**: Photos slider displays 3 vertical cards side-by-side.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Modal state management | Test `ModalContext` open/close and type logic. |
| Integration | Component rendering | Verify Left and Right columns render correct children components. |
| UI/E2E | Visual layout | Ensure grid layout stays single-viewport on desktop and stacks correctly on mobile. Verify specific `border-radius` styles are applied. |

## Migration / Rollout

No data migration required. Feature can be developed in a branch and deployed directly once styling is approved.

## Open Questions

- [ ] What are the exact color hex codes for the "pink receipt" and "terracotta borders"?
- [ ] How should the layout degrade on mobile devices (e.g., stacked layout, allow vertical scroll)?
</Design: desk-mockup-redesign>
