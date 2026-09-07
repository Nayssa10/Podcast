## Intent

Restructure the entire Podcast landing page layout into a single, unified aesthetic dashboard container based exactly on the Kotomi profile grid distribution, replacing the current vertically scrolling sections.

## Scope

### In Scope
- Single-viewport aesthetic dashboard container.
- Layout Distribution matching Kotomi grid (Left and Right columns).
- Header with pill search bar (`Q buscar episodios...`) and navbar links.
- Left Column: Dome-shaped banner, Tagline/CTA panel with play button, Episodes block (3 latest episodes as pill rows), Metadata block (description and read more).
- Right Column: About Us intro, Photos Slider (3 vertical cards), Category pills, Hosts profiles (3 vertical cards with round avatars).
- Modals for Contact form (Guest Check pink receipt), Host profiles (investigator dossiers), and Episodes (case file dossiers / guest checks).

### Out of Scope
- Backend changes or new content creation.
- Adjustments beyond the specified Kotomi grid layout distribution.

## Capabilities

### New Capabilities
- `dashboard-layout`: A single-viewport aesthetic container organizing all content into the specified Left/Right grid.
- `modal-overlays`: Custom thematic modal designs (Guest Check receipt, investigator dossiers, case files).

### Modified Capabilities
- `landing-page`: Refactored to fit into the new dashboard layout instead of vertically scrolling sections.

## Approach

Implement a CSS Grid/Flexbox based single-viewport dashboard layout. Divide the main container into a Header, Left Column, and Right Column matching the Kotomi profile screenshot. Use thematic styling for modals to match the requested aesthetic (Guest Check, investigator dossiers). 

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Modified | Restructure landing page layout |
| `src/components/Header.tsx` | Modified | Update search and nav |
| `src/components/LeftColumn.tsx` | New | Create left column components |
| `src/components/RightColumn.tsx` | New | Create right column components |
| `src/components/Modals/` | New | Thematic modal components |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Responsiveness on smaller screens | High | Implement fallback scrolling or stacked grid for mobile/tablet sizes. |
| Performance with complex modals | Low | Lazy load modal contents. |

## Rollback Plan

Revert the commit introducing the new dashboard layout components and restore the previous vertically scrolling page layout in git.

## Dependencies

- Existing podcast content and assets.

## Success Criteria

- [ ] The landing page fits within a single viewport on desktop.
- [ ] Layout matches the Kotomi profile grid exactly (Left/Right column distribution).
- [ ] All specified thematic modals open correctly with the required styles.
