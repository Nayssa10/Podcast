# Proposal: Criminology Cards Folder Redesign

## Intent
Create a custom vintage folder-style card component for criminology/forensic episodes on the landing page, making them visually distinct from the minimal book episodes.

## Scope

### In Scope
- Create `src/components/ForensicFolderCard.tsx` as a skeuomorphic mini folder:
  - Tab on the right edge with "TOP SECRET" vertical stamp.
  - Pinned sticky note with episode number in Monsieur La Doulaise font.
  - Polaroid cover image mockup.
  - Integrated `AudioPlayer` and "Saber más" details button.
- Create `src/components/ForensicFolderCard.module.css` for styling: kraft gradient (#d6c5b3), yellow note, white polaroid borders, pushpin, and responsive grid layout.
- Modify `src/app/page.tsx` to conditionally render `ForensicFolderCard` for `ep.type === "forensic"` and current minimal card for `ep.type === "book"`.

### Out of Scope
- Modifying styling of book episodes (remain minimal).
- Altering landing page main grid container structure (except preventing grid cards from clipping the right-aligned folder tab).

## Capabilities

### New Capabilities
- `forensic-folder-card`: Skeuomorphic folder card for forensic/criminology episodes.

### Modified Capabilities
- `site-landing`: Integrate the new card into the episodes grid on the landing page.

## Approach
Introduce `ForensicFolderCard` and its CSS module. Switch layouts in `src/app/page.tsx`'s grid loop based on episode type. Adjust CSS constraints to ensure tabs are fully visible on all viewports.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/ForensicFolderCard.tsx` | New | Component implementing the vintage folder UI. |
| `src/components/ForensicFolderCard.module.css` | New | Skeuomorphic folder styles. |
| `src/app/page.tsx` | Modified | Import component and switch rendering based on `ep.type`. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Folder tab gets clipped in the grid container | Med | Ensure card margins, overflow settings, and padding allow the tab to extend. |
| Tab or rotation causes horizontal overflow on mobile | Med | Reset rotations to 0 and stack elements under 768px. |

## Rollback Plan
Delete new component files (`src/components/ForensicFolderCard.tsx` and `src/components/ForensicFolderCard.module.css`) and discard changes in `src/app/page.tsx` using `git checkout`.

## Dependencies
- Font resources: `Monsieur La Doulaise` (already imported/available on site).

## Success Criteria
- [ ] Forensic episodes render as vintage kraft folders with right-aligned "TOP SECRET" tabs and canary yellow sticky notes.
- [ ] Book episodes retain their minimal/clean card layout.
- [ ] Grid cards don't clip folder tabs on responsive layouts down to 320px.

## Proposal Question Round
1. **Interactive Elements**: Should the pinned sticky note or Polaroid cover image have hover tilts/lifts (not exceeding 5 degrees/10px) matching other skeuomorphic elements on the site?
2. **Tab Stamping**: Is there a specific font or style to use for the "TOP SECRET" vertical stamp (e.g., Courier Prime/typewriter-style)?
3. **Responsive Display**: On screens under 768px, should the folder card's tab remain visible, or does it collapse/hide to save screen width?
