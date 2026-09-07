## Exploration: criminology-cards-folder-redesign

### Current State
Currently, all episode cards (both "book" and "forensic" types) are rendered using a single, unified card structure in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx#L241-L274) with styling from the `.episodeCard` class in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css#L269-L370). 

These cards feature a clean modern design with a white card background, a rounded arch frame for the cover image, simple text meta labels, a compact audio player, and an outline details button. There is no stylistic distinction between the different episode types (`forensic` and `book`).

### Affected Areas
- [src/app/page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) — Needs modification to conditionally render the custom folder structure for forensic episodes, or to load a new specialized card component.
- [src/app/page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) — Needs new CSS styles for the folder background, tab, "CLASSIFIED" stamp, sticky note, Polaroid container, and integrated controls.
- `src/components/ForensicFolderCard.tsx` (Optional) — New component to separate the concerns of rendering forensic folders.
- `src/components/ForensicFolderCard.module.css` (Optional) — New stylesheet corresponding to the specialized card component.

### Approaches

#### 1. Conditional CSS Styling & Markup inside `page.tsx`
Apply conditional class names (e.g. `styles.forensicFolderCard`) directly inside the existing `.map()` loop in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx#L241) and adjust HTML structure conditionally depending on `ep.type === "forensic"`.
- **Pros:**
  - Avoids creating new files in the component tree.
  - Keeps all main page content mapping logic in a single file.
- **Cons:**
  - Bloats `page.tsx` with complex conditional JSX branching.
  - Increases the size of `page.module.css`, which is already over 850 lines long.
  - Harder to isolate, test, and maintain as the layout differs radically from the standard book card.
- **Effort:** Medium

#### 2. Dedicated specialized card component (`ForensicFolderCard`)
Extract the card structure for forensic episodes into a standalone component under `src/components/ForensicFolderCard.tsx` and styling in `src/components/ForensicFolderCard.module.css`.
- **Pros:**
  - **Encapsulation**: Separates complex layout calculations (such as absolute rotation/tilts for polaroids and sticky notes) from the main page view.
  - **Maintainability**: Keeps `page.tsx` readable and easy to follow.
  - **Styling isolation**: Keeps folder-specific styles out of `page.module.css` to prevent selector pollution.
- **Cons:**
  - Adds two new files (`ForensicFolderCard.tsx` and `ForensicFolderCard.module.css`) to the project.
- **Effort:** Medium

### Recommendation
We recommend **Approach 2 (Dedicated specialized card component)**. Designing a mini kraft folder with multiple layered visual items (tabs, vertical stamps, tilted sticky notes, polaroids) requires a distinct DOM hierarchy. Isolating this complexity in a separate React component prevents code clutter in `page.tsx` and allows us to focus entirely on the forensic folder design guidelines.

#### Proposed Folder Design Details:
- **Folder Container**: Warm kraft gradient background (`#e2bca4` to `#cd9c73`), thick subtle shadow, left spine-like border (`border-radius: 4px 16px 16px 4px`).
- **Tab & Stamp**: Absolute position on the right edge (safely inset in the card grid) with red distressed ink stamp style reading "CLASSIFIED" rotated 90 degrees in Courier font.
- **Sticky Note**: Canary yellow absolute block rotated -3° with a simulated red pushpin (`:before` pseudo-element) displaying the episode number in the handwritten Monsieur La Doulaise font.
- **Polaroid Image**: Tucked behind/beside the note, tilted 2°, featuring a white frame with thick bottom padding containing the handwritten episode subtitle or date.
- **Controls Integration**: The AudioPlayer and details button are housed on a sub-container designed to look like a ruled "index card" paper sheet sliding into the folder pocket.

### Risks
- **Grid Layout Constraints**: Absolute items like the folder tab on the right side could overflow and get clipped by parent containers.
  - *Mitigation*: Ensure parent grids have `overflow: visible` or apply a right margin/padding offset within the grid items to allow space for the tab.
- **Responsive Scaling**: The overlapping folder aesthetics (tilted polaroid, sticky note) might look crowded on small screen sizes.
  - *Mitigation*: Use media queries to simplify the folder card on mobile devices (e.g. reduce angles, hide decorative tab, or stack elements vertically).

### Ready for Proposal
Yes — The folder redesign concept is clear and can be implemented via a dedicated component with custom CSS variables. The orchestrator should proceed with writing the design specification and implementation task list for user approval.
