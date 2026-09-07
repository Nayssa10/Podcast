## Exploration: layout-modal-and-logo-refactor

### Current State
* **Hero Logo**: The logo is currently wrapped in a circular crop frame (`.heroLogoFrame`) with a double border, which restricts it from showing its full square aspect ratio.
* **Episodes Section**: The episodes are rendered directly on the main page as full skeuomorphic Manila Case Folders. Each card is tall and contains all detail sections (interactive tabs for "Libro Relacionado" and "Informe Forense", full descriptions, forensic details, physical evidence list, confidential stamp, and audio player). This creates visual clutter and high cognitive load on initial load.
* **Modal**: There is currently no modal component or overlay. All forensic details and full descriptions are displayed directly in the grid items.

### Affected Areas
* [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) — Modify the TSX structure of the Hero section to remove `.heroLogoFrame` and render the centered logo directly. Update the episodes container to render a grid of compact, standardized cards, and add React state logic to handle modal open/close transitions and modal tab state.
* [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) — Remove `.heroLogoFrame` styles and adjust `.heroLogo` properties for a responsive centered display. Implement new styles for uniform compact grid cards. Add classes for the modal overlay (dimming effect), modal container, scrollable folder body, close buttons, and adjust media queries for responsiveness.

### Approaches

1. **Vanilla React State with Re-used CSS Modules (Recommended)**
   * *Description*: Manage the open/close state of the modal using client-side React state (`activeEpisodeIndex: number | null`). Reuse the existing skeuomorphic folder CSS selectors, converting them to modal-compatible classes (e.g. `.modalEpisodeCard` and `.modalFolderPaper` with scrolling and overlay styling).
   * *Pros*:
     * Zero external dependencies.
     * High style reusability (we preserve the CSS paper clip, radial coffee stains, slanted stamp, and folder tabs without rewriting their complex logic).
     * Minimal performance overhead.
   * *Cons*:
     * Focus trapping and body scroll locking must be handled manually (using simple React effects).
   * *Effort*: Low to Medium.

2. **Headless Dialog Component (e.g., Radix UI / Headless UI)**
   * *Description*: Install a headless library to handle modal interactions, accessibility (WAI-ARIA, Esc closing, focus trapping), and layer it with the custom skeuomorphic stylesheet.
   * *Pros*:
     * Robust accessibility and keyboard navigation out of the box.
     * Built-in backdrop overlays and portal rendering.
   * *Cons*:
     * Introduces external packages to a simple single-page podcast site.
     * Increases bundle size.
   * *Effort*: Medium.

### Recommendation
We recommend **Approach 1 (Vanilla React State with Re-used CSS Modules)**. Since the podcast page is currently lightweight, styling-focused, and dependency-free, handling the modal state through React state is clean, efficient, and keeps the project size small. Keyboard listeners (`Escape` key) and page scroll lock (`overflow: hidden` on `document.body`) can be easily implemented with standard React `useEffect` hooks.

### Risks
* **Text Overflow on Compact Cards**: Standardized card heights (e.g. `480px`) require limiting the text length of the title and typewriter preview description to prevent overflowing out of the card. This will be handled using CSS line-clamping (`-webkit-line-clamp`) or Javascript truncation.
* **Modal Responsiveness**: Skeuomorphic elements like the slanted "CONFIDENTIAL" stamp, coffee stains, and paper clips must scale correctly on smaller devices. We need to ensure that the modal uses a flexible width (e.g., `max-width: 90%` or similar) and supports inner-sheet scrolling so content is never cut off on mobile.
* **Scroll-Locking**: Failing to lock the background body scroll while the modal is open can degrade the user experience. We must ensure `overflow: hidden` is applied dynamically to the body when a case file is active.

### Ready for Proposal
Yes
