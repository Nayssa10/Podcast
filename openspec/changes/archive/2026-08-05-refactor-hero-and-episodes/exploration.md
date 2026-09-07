# Exploration: Layout Refactoring for Hero and Episodes (`refactor-hero-and-episodes`)

### Current State
1. **Hero Section**: The Hero section currently displays the logo image (`/logo.png`), followed immediately by the text title "team SUPERNOVA" (`h1`) and the tagline text `libros • romance • criminalística` (`.tagline`). Since the `/logo.png` image itself contains the logo design, branding, and taglines inside it, repeating this text right below the logo is redundant. The Call-to-Action (CTA) buttons are located at the bottom, beneath the redundant text.
2. **Episodes Section**: The episodes are stacked vertically in a single column using `display: flex; flex-direction: column` inside the `.episodesList` container. This makes the folders very large and requires extensive vertical scrolling to scan them, which doesn't provide a gallery-like, easy-to-explore overview.

### Affected Areas
- `src/app/page.tsx` — Restructure the Hero section by removing the redundant text titles (`h1`) and taglines, and wrapping the logo image in a stylized frame container. Ensure the buttons are positioned directly below the centered centerpiece.
- `src/app/page.module.css` — Change `.episodesList` to a grid-based gallery layout (3 columns on desktop, 1 on mobile). Style the Hero logo's new frame wrapper (larger, circular shadow, centered, vintage frame). Make the case file folder cards more compact by reducing padding, margin, and font sizes so they fit perfectly in the grid without layout breakage or text overflow.
- `openspec/specs/site-landing/spec.md` — Requirements REQ-SL-004 and REQ-SL-005 will need updates to reflect the new centerpiece logo hero and grid gallery episodes.

---

### Approaches

#### 1. **CSS Grid Gallery & Centered circular Logo Centerpiece**
Transform the episodes list into a CSS Grid (`repeat(3, 1fr)` on desktop, collapsing to 1 column on mobile) and style the folder cards to be compact. In the Hero section, remove the text headings and wrap the logo image in a larger, circular centerpiece frame with subtle border shadows, followed directly by the CTA buttons.
- **Pros:**
  - Directly addresses all user feedback.
  - Improves scannability of the episodes dramatically, showing them in a beautiful gallery-like grid.
  - Keeps the codebase clean, performant, and dependency-free using pure CSS.
  - The Hero section looks cleaner, more professional, and less cluttered.
- **Cons:**
  - Narrower grid columns mean less horizontal space inside the tabbed cards. We must verify that the `AudioPlayer` component and descriptions scale down gracefully.
  - Stamped "Confidencial" markers and other decorative elements (coffee stains, paperclips) must be sized proportionally to avoid visual clutter.
- **Effort:** Medium

#### 2. **Horizontal Slider Carousel & Minimalist Text Hero**
Keep the episodes card sizes large, but put them in a horizontal slider/carousel component. Keep the text elements in the Hero but reduce their size.
- **Pros:**
  - Solves the vertical height problem while preserving the large dimensions of each episode folder.
- **Cons:**
  - Requires adding React state or slider libraries, increasing complexity.
  - Carousels are less discoverable because users have to actively click arrows to find other episodes.
  - Still leaves the redundant text titles in the Hero section.
- **Effort:** Medium-High

---

### Recommendation
We recommend **Approach 1 (CSS Grid Gallery & Centered circular Logo Centerpiece)**. It is highly responsive, improves user experience, maintains the skeuomorphic aesthetic of the podcast, and simplifies the codebase by removing redundant elements.

Detailed implementation path:
1. **Hero:** Remove `<h1 className={styles.heroTitle}>team SUPERNOVA</h1>` and `<div className={styles.tagline}>...</div>` from `page.tsx`. Add a container `.heroLogoFrame` around `<img src="/logo.png" className={styles.heroLogo} />` in `page.tsx`.
2. **Hero CSS:** Style `.heroLogoFrame` as a circular centerpiece (`border-radius: 50%`, double border, soft sepia drop-shadow, size ~260px) and center it on the page.
3. **Episodes Grid CSS:** Redefine `.episodesList` to use `display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px;` on desktop. Set it to `grid-template-columns: 1fr;` inside the mobile media query.
4. **Episodes Cards Compacting CSS:**
   - Reduce `.episodeCard` padding to `2rem 1rem 1rem 1rem` (desktop) and margin-top to `20px`.
   - Reduce `.folderPaper` padding to `1.25rem 1rem` (desktop).
   - Scale down `.episodeTitle` to `1.3rem` and `.episodeText` to `0.85rem` with line clamp if needed.
   - Adjust `AudioPlayer` wrapper spacing to fit within the smaller column bounds.

---

### Risks
- **AudioPlayer Scaling**: The custom `AudioPlayer` widget might look cramped in a ~350px-wide column. We must ensure its flex layouts wrap nicely or shrink properly on smaller screens.
- **Grid Height Asymmetry**: Different description lengths might make cards have different heights. We will use flex alignment (`display: flex; flex-direction: column; justify-content: space-between; height: 100%;`) to keep card heights uniform.

### Ready for Proposal
Yes
