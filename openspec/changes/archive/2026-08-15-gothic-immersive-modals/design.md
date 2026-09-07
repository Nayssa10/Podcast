# Technical Design: Gothic Immersive Modals

## Intent
Transform the episode detail modals into fully immersive, thematic layouts matching the provided designs: a gothic "Lectura" scrapbook and a "Criminalística" case file, fully dropping the old classic/gothic toggle.

## Architecture & Cleanup
- **`src/app/page.tsx` Changes:**
  - **Remove Toggle State & Logic:** Remove the `layoutMode` state, `toggleLayoutMode` function, and all `localStorage` reads/writes related to `supernova-layout-mode`.
  - **Remove Toggle UI:** Delete the toggle button (`Switch to Gothic` / `Switch to Classic`).
  - **Remove Default Views:** Delete the rendering branches for the `classic` layout (`<article className={styles.openBookSimple}>` and `<article className={styles.manilaFolder}>`).
  - **Direct Thematic Rendering:** Based on the episode type (`isBook`), render either the `Lectura` (scrapbook) markup or the `Criminalística` (case file) markup directly within the modal overlay.

## Visual Design & Implementation Details

### Lectura Scrapbook (Book Episodes)
To achieve the realistic open journal mockup:
- **Scrapbook Structure:** The modal will be styled as an open book with `.scrapbookContainer` using rounded corners, off-white/cream paper background (`#F9F6F0`), and stacked page effects via multiple layered box-shadows.
- **Center Gutter:** A `.bookGutter` div running down the center will use a linear gradient (dark to light to dark) with a subtle inset shadow to create depth, mimicking a book's binding.
- **Polaroid Styling:** The Polaroid container will have a crisp white border, slight padding, and a drop shadow (`box-shadow: 0 4px 10px rgba(0,0,0,0.15)`). It will be rotated slightly (`transform: rotate(-2deg)`).
- **Tape Effect:** A `.washiTape` element over the Polaroid will use a semi-transparent white/cream background (`background: rgba(255, 255, 255, 0.7)`), rough edges via CSS clipping or borders, and a slight rotation to look like physical tape.
- **Margin Annotations:** Handwritten notes will use an elegant script font (e.g., `Caveat` or `Dancing Script`). They will be absolutely positioned (`position: absolute`) using percentages (`top: 20%; right: -10%;`) and random slight rotations (`transform: rotate(3deg)`) to look authentically jotted in the margins.
- **Wax Seal:** A grey/blue wax seal (`.waxSealBlue`) will be created using a circular element (`border-radius: 50%`), deep blue/grey color, and double border-shadows for a 3D bevel effect (e.g., `box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)`). A small letter icon or crest will be centered within.
- **SVG Overlay:** A delicate SVG sketch (flower or cassette tape) will be absolutely positioned over the page corner, styled with low opacity (`opacity: 0.15`) to blend like a watermark.

### Criminalística Case File (Forensic Episodes)
To achieve the light case file aesthetic:
- **Desk Background:** The modal backdrop or outer container will use a light blue/grey pastel color (`#D0Dbe5`) as the "desk". A soft grain texture can be achieved via a very subtle, tiled noise background image or a CSS noise filter fallback.
- **Report Card (CIA Style):** The main document (`.reportCard`) will be white (`#FFFFFF`) with a thin, sharp dark border. Content will use a typewriter font (e.g., `Courier Prime`) to mimic official agency typing, structured in clear fields.
- **Realistic Paperclip:** A grey paperclip at the top left will be implemented purely in CSS using a pill-shaped container (`border-radius: 10px`) with a double border configuration and absolute positioning.
- **Warning Stamps:** `.warningStamp` elements will be bold red (`#B22222`), enclosed in red border boxes (`border: 3px solid #B22222`), tilted (`transform: rotate(-5deg)`), and styled with slight opacity/mix-blend-mode to resemble wet ink.
- **Kraft Paper Notes:** Analyst notes will be on a `.kraftNote` element colored tan/brown (`#d4b895`), with a slightly rough box-shadow, taped down (similar washi tape technique as the Polaroid), and featuring handwritten script text.
- **Red Wax Seal:** In the bottom right corner, a red wax seal (`.waxSealRed`) will use crimson/burgundy hues, strong inset shadows to define raised circular wax contours, and an embossed 'R' (or similar logo) in the center.

## CSS Strategy (`src/app/page.module.css`)
- Remove all `.openBookSimple` and `.manilaFolder` styles to clean up CSS payload.
- Update `.gothicScrapbook` and `.detectiveWallet` (renamed to something more fitting like `.caseFileDesktop`) rules to exactly mirror the visual targets described above.
- Introduce new classes for `.kraftNote`, `.waxSeal`, `.washiTape`, and `.warningStamp`.
