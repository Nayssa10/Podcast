# Proposal: HTML/CSS/SVG Brand Logo Recreation

## Intent
Recreate the brand logo illustration as a responsive, interactive vector-like React component using HTML/CSS/SVG in the Hero section, replacing the static `logo.png` image.

## Scope

### In Scope
* **Component structure**: Create `src/components/InteractiveLogo.tsx` and `src/components/InteractiveLogo.module.css`.
* **Proportional scaling**: CSS Container Queries (`container-type: inline-size`) and `cqw` units for all measurements.
* **Double-circle border**: Outer double-circle frame enclosing all elements.
* **Typography**:
  * "team" (Monsieur La Doulaise)
  * "SUPERNOVA" (Cinzel) with inline SVG old-gold star inside "O"
  * Taglines (Montserrat) with horizontal lines
  * Footer slogan "donde cada historia deja una huella" with hand-drawn line and heart.
* **Celestial elements**: Inline SVGs for crescent moon, constellation, and stars.
* **Criminology elements**: Inline SVGs for fingerprint and handwritten heart.
* **Cozy Desk (Bottom-Left)**:
  * 4 vertical CSS books with styled spines ("DARK ROMANCE", "ROMANCE", "HISTORIAS QUE MARCAN", "VERDADES OCULTAS")
  * Dark coffee mug ("just one more chapter") next to a gold leaf branch.
* **Evidence Desk (Bottom-Right)**:
  * Kraft folder ("EVIDENCE"), paper note ("cada detalle cuenta"), polaroid photo (silhouette city scene).
* **Centerpiece**: Inline SVGs for centerpiece microphone and soundwaves.
* **Integration**: Replace static `/logo.png` in `page.tsx` Hero section with `<InteractiveLogo />`.

### Out of Scope
* Replacing the header/navbar logo.
* Modifying background landing page theme/colors outside the Hero logo slot.

## Capabilities Contract

| Capability | Impact / Modifications |
|---|---|
| `site-landing` | **Modified**: Integrate `InteractiveLogo` in the Hero section. Remove static logo image references. |

## Approach
1. **Container Query Base**: Set component wrapper as container container-type. Define sizes in `cqw` to ensure seamless fluid scaling.
2. **Layering & Layout**: Structure elements (Typography, Celestial, Criminology, Cozy Desk, Evidence Desk, Microphone) using standard CSS absolute positioning based on `cqw`.
3. **SVG & CSS Components**: Code custom inline SVGs for complex curves (constellation, fingerprint, microphone, stars) and style books/folders using native CSS features (borders, drop-shadows, vertical text).

## Affected Areas
* `src/components/InteractiveLogo.tsx`
* `src/components/InteractiveLogo.module.css`
* `src/app/page.tsx`

## Risks
* **Font rendering**: Custom fonts might cause layout alignment issues if slow to load. *Mitigation*: Fallback font stacks and explicit letter spacing.

## Success Criteria
* Proportional vector-like scaling under dynamic resizing.
* No text wrapping or overflow.
* Match logo artwork exactly and maintain total component interactivity.
