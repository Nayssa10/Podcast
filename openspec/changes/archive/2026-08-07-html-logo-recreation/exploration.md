## Exploration: Brand Logo Recreation in HTML/CSS/SVG

### Current State
Currently, the website displays the brand logo using a static, transparent PNG file (`public/logo.png`) in two key locations: the header (`src/app/page.tsx:L101`) and the hero section (`src/app/page.tsx:L119`). This relies on a rasterized image, which cannot be styled dynamically, animate on hover, scale perfectly crisp at high resolutions without pixelation, or load with CSS custom properties.

### Affected Areas
- `src/app/page.tsx` — Replace the static `/logo.png` image inside the Hero section with the newly created responsive, interactive HTML/CSS/SVG composition.
- `src/app/page.module.css` — Introduce styling rules for the header logo and alignment wrappers if needed.
- `src/components/InteractiveLogo.tsx` — Create a modular, reusable React component encapsulating the entire SVG/HTML structure of the brand logo for easy maintenance.
- `src/components/InteractiveLogo.module.css` — Implement dedicated component styles, utilizing CSS Container Queries to guarantee absolute responsiveness when resized.

### Approaches

1. **Approach 1: Single Complex SVG Graphic**
   - **Description**: Recreate the entire logo inside a single inline SVG file, including text nodes using SVG `<text>`, shapes for the books/coffee/folder/microphone, and celestial details.
   - **Pros**: 
     - Scales perfectly with vector logic using `viewBox` without layout breakages.
     - Self-contained and easy to place anywhere like an image.
     - Text is machine-readable for SEO.
   - **Cons**: 
     - Writing detailed UI components like styled CSS books, coffee mug, manila folder, and polaroid in raw SVG shapes (`<rect>`, `<path>`) is extremely tedious and verbose.
     - Loses the flexibility of Next.js CSS Modules for layout and text styling.
   - **Effort**: High

2. **Approach 2: Pure HTML/CSS Grid with Media Queries**
   - **Description**: Layout all logo elements using HTML divs, flexbox, and CSS grids, styling each element individually and repositioning them at different screen sizes with media queries.
   - **Pros**:
     - Easy to build and style standard elements like books, mugs, and folders using CSS borders, box shadows, and writing-modes.
     - Very clean HTML markup.
   - **Cons**:
     - Hard to maintain the exact logo composition ("tal cual"). Media queries would wrap text or rearrange elements, breaking the logo structure.
     - Scaling down cleanly is difficult because font sizes and positions do not scale in lockstep with the outer circle container.
   - **Effort**: Medium

3. **Approach 3: Component-Container-Query Hybrid (HTML/CSS + Inline SVG)**
   - **Description**: Build the logo as a structured React component (`InteractiveLogo`) where the outer layout is set up with HTML divs and styled using CSS Container Queries (`cqw` units) for all measurements. Elements like the fingerprint, microphone, celestial lines, stars, and handwritten strokes are embedded as precise inline SVGs.
   - **Pros**:
     - Scales 100% proportionally like a vector image thanks to `cqw` (Container Query Width) units, without needing any JavaScript resize listeners.
     - Allows leveraging standard HTML/CSS for elements where it is superior (e.g. book spines with `writing-mode`, folder cards with box-shadows, polaroid frames).
     - Allows inline SVGs for complex organic curves (fingerprint, crescent moon, microphone, branches).
     - Interactive and hoverable (individual elements like the coffee mug steam or microphone soundwaves can animate on hover).
   - **Cons**:
     - Requires modern browser support for Container Queries (supported by all major modern browsers: Chrome 105+, Safari 16+, Firefox 110+).
   - **Effort**: Medium

### Recommendation
We recommend **Approach 3 (Component-Container-Query Hybrid)**. It provides the best of both worlds: the pixel-perfect styling, vertical text layouts, and clean flexboxes of standard HTML/CSS, combined with the organic paths of inline SVGs (for the fingerprint, moon, microphone, and branches). By declaring the main wrapper as a container (`container-type: inline-size`), all child sizes, borders, and margins can be defined in `cqw` (container width units), ensuring the entire composition shrinks and expands perfectly in lockstep while remaining fully interactive.

### Risks
- **Font Availability**: The design relies heavily on Monsieur La Doulaise and Cinzel. If these fonts fail to load or mismatch, the overlapping typography alignment might shift.
- **Browser Compatibility**: Older browsers might not support CSS Container Queries, causing layout issues unless fallback styles are defined.
- **Performance**: Heavy usage of inline SVGs and complex CSS filters/shadows in a single component could theoretically impact paint performance on low-end devices, though negligible at this scale.

### Ready for Proposal
Yes
