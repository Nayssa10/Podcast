# Design: Criminology Cards Folder Redesign

## Technical Approach

We will revert the landing page episodes section from a horizontal row layout to a 3-column vertical grid layout on desktop, collapsing to a single-column flex list on mobile.
- **Grid Layout**: Revert `.episodesGrid` in `page.module.css` to grid layout with 3 columns.
- **Literature Cards**: Revert standard minimal cards to vertical flow using `.episodeCard`, `.episodeMeta`, `.episodeTitle`, `.playbackControls`, and `.cardOutlineBtn`. Cover image and description are not rendered. Title uses the cursive "Satisfy" font.
- **Forensic Folder Cards**: Revert `ForensicFolderCard` component to a vertical flow. The container hosts an absolute sticky note in the top-left corner (`top: -15px`, `left: 8px`) overlapping the header, and contains the `folderPaper` insert styled with a translucent cream background. Inside the insert, elements stack vertically (title with Satisfy font, playback controls) down to the bottom action bar, which remains a horizontal flex row housing the details button on the left and the stamp/magnifying glass on the right.
- **Responsiveness**: At viewports <= 768px, the grid collapses to a single-column flex layout and card containers resize/collapse cleanly.

## Architecture Decisions

| Option | Tradeoff | Decision |
| :--- | :--- | :--- |
| **Grid Column Count** | 3-column layout provides optimal spacing for vertical cards on desktop without overcrowding, whereas 2-column or list view wastes space. | Revert `.episodesGrid` to `grid-template-columns: repeat(3, 1fr)`. |
| **Folder Card Hierarchy** | Placing `folderHeader` at the top and `folderPaper` below maintains skeuomorphic layout where the tab/note sits at the tab-level, and the inner sheet contains the data. | Implement `.folderHeader` containing the absolute `.stickyNote`, followed by vertical `.folderPaper`. |
| **Card Height Uniformity** | Equal card heights in a grid look clean, but content lengths vary. | Apply `height: 100%` on card containers and `display: flex; flex-direction: column;` to align bottom actions. |

## Data Flow

```
[Episode Data] 
       │
       ├─► [Type: book] ──► .episodeCard (Vertical grid item)
       │                       ├── .episodeTitle (Satisfy Font)
       │                       ├── .playbackControls
       │                       └── .cardOutlineBtn
       │
       └─► [Type: forensic] ► .folderCardContainer (Vertical folder mockup)
                               ├── .folderHeader + .stickyNote (Absolute top-left)
                               └── .folderPaper (Translucent bg)
                                       ├── .paperTitle (Satisfy Font)
                                       ├── .playbackControls
                                       └── .paperBottom (Flex Row: Button & Stamp/Glass)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) | Modify | Revert literature card elements to vertical classes. Remove horizontal styles, ensure Satisfy font is mapped. |
| [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) | Modify | Revert `.episodesGrid` to display grid with 3 columns. Revert book card classes to vertical flex structures. Add max-width 768px collapse rule. |
| [`src/components/ForensicFolderCard.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ForensicFolderCard.tsx) | Modify | Restructure JSX for vertical flow: container wrapper, folder header with sticky note, folder paper insert containing title, playback, and bottom action bar. |
| [`src/components/ForensicFolderCard.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ForensicFolderCard.module.css) | Modify | Revert classes to vertical layout. Define absolute position of `.stickyNote` (`top: -15px`, `left: 8px`). Set translucent background for `.folderPaper`. Style `.paperBottom` as a flex row. Add mobile media query resets. |

## Interfaces / Contracts

### CSS Class Reversions

```css
/* src/app/page.module.css */
.episodesGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.episodeCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.episodeTitle {
  font-family: var(--font-family-satisfy);
}
```

```css
/* src/components/ForensicFolderCard.module.css */
.folderCardContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, hsl(33, 31%, 82%) 0%, hsl(33, 31%, 73%) 100%);
  border-left: 12px solid #a89782;
  border-radius: 4px 16px 16px 4px;
  padding: 1.5rem;
}

.stickyNote {
  position: absolute;
  top: -15px;
  left: 8px;
  transform: rotate(-3deg);
  z-index: 10;
}

.folderPaper {
  background-color: rgba(255, 255, 255, 0.45);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.paperBottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Component | Vertical Layout | Verify elements stack vertically inside cards using CSS inspector. |
| Layout | Grid Structure | Confirm desktop displays 3 columns and mobile (<= 768px) displays 1 column. |
| Interaction | Controls | Verify `AudioPlayer` works inside both cards and "Saber más" opens details modal. |

## Migration / Rollout

No database migrations or build-time data conversions required.

## Open Questions

- None.
