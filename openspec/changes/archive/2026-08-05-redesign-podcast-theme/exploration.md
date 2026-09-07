# Exploration: Visual Redesign for team SUPERNOVA Podcast Page (`redesign-podcast-theme`)

### Current State
The current website uses a minimalist, modern, clean-cut aesthetic. The colors are crema/marfil background (`#F9F6F0`), dark brown (`#2E1E1C`), borgoña (`#6A2222`), and ocre (`#C28D5D`).
- **Logo**: Not integrated yet, only raw text "SUPERNOVA" in the header and footer.
- **Episodes**: Rendered as simple flat cards with a left border and standard fonts. No interactive expansion or sub-details (no book details or forensic reports).
- **Contact & Socials**: The contact form is a clean white card, and social links are standard styled border-buttons. There is no skeuomorphic desk or crime board theme.
- **Typography**: Uses Cinzel for headings, Monsieur La Doulaise for script elements, and Montserrat for sans-serif text. Lacks monospace typewriter fonts for a forensic or typewriter feel.

### Affected Areas
- [layout.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx) — Add Courier Prime typewriter font import and class variable.
- [globals.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css) — Define monospace font family variable and desk/crime board general utilities.
- [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) — Restructure sections: add logo to navbar & hero, expand mock episode data with books/forensics, implement folders expansion, convert contact & socials to a crime board.
- [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) — Add complex styling classes for folders, paper clips, coffee stains, polaroids, typewriter papers, and red thread effects.
- [ContactForm.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) — Restructure inputs and styling to match the typewriter sheet style.

---

### Approaches

#### 1. **High-Fidelity Skeuomorphism (Tactile Desk & Crime Board)**
Transform the podcast landing page into an interactive visual desk and crime board experience using advanced Vanilla CSS.
- **Pros:**
  - Highly immersive, unique design that perfectly matches the podcast's focus (Books + Romance + Criminology).
  - Uses CSS gradients, border-radius tricks, and box shadows to avoid heavy images, maintaining fast load times.
  - Interactive folders feel satisfying to open, simulating leafing through real cases.
  - Polaroid style and handwritten text on the "crime board" create a strong atmospheric feel.
- **Cons:**
  - Writing complex CSS shapes (like the paper clip or coffee stain) takes careful layout tuning.
  - Responsive alignment is harder to maintain for heavily rotated cards and desk mats.
- **Effort:** Medium-High

#### 2. **Flat Semi-Skeuomorphic Retro**
A simpler redesign that keeps a clean, modern grid but replaces elements with retro-styled borders, monospace fonts, and logo filters.
- **Pros:**
  - Easier to implement and fully responsive by default.
  - Keeps layout clean and less cluttered.
- **Cons:**
  - Lacks the tactile and playful feel of a "detective's desk" or "crime board."
  - Might feel like a generic retro website rather than a dedicated criminologist/romance themed podcast.
- **Effort:** Low-Medium

#### 3. **Asset-Heavy Multimedia Design**
Use custom raster or vector images (wood backgrounds, realistic coffee cups, metallic clip photos, pinned threads) to construct the desk and board.
- **Pros:**
  - Can look photo-realistic.
- **Cons:**
  - Significantly increases page load time (poor performance).
  - Designing/licensing matching assets is time-consuming.
  - Poor accessibility and scaling behavior.
- **Effort:** High

---

### Recommendation
We recommend **Approach 1 (High-Fidelity Skeuomorphism via Pure CSS)**. It offers the best compromise: full thematic immersion without sacrificing site speed. By writing clever CSS modules and combining them with Google's `Courier_Prime` font, we can build:
1. **Logo Integration**: Use `mix-blend-mode: multiply` and a subtle sepia filter to embed `/logo.png` naturally into the cream background, preventing harsh white edges.
2. **Interactive Case Files**: Tabbed folders with pure CSS paper clips, a rotated coffee stain background, typewriter-ruled writing paper inside, and forensic-style reports with slanted red "CONFIDENTIAL" stamps.
3. **Crime Board & Typewriter Form**: Red SVG connectors linking polaroids with handwritten captions, and a contact form styled as a spiral notepad page with dashed input lines.

---

### Risks
- **Accessibility & Contrast**: Monospace typewriter text on coffee-stained sheets can suffer from poor contrast. We will ensure sufficient color contrast ratios (e.g. using dark charcoal colors for typewriter text).
- **Responsive Layout**: Desk structures can break on narrow viewports. We will implement media queries that collapse folders into vertical lists and remove extreme card rotations on mobile.

### Ready for Proposal
Yes
