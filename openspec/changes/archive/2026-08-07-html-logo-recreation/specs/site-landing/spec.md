# Delta Specification: Site Landing (`site-landing`)

## Purpose
Refactor the landing page's Hero section to replace the static image logo with a live, vector-like, interactive HTML/CSS/SVG component (`InteractiveLogo`) that scales proportionally using container queries without layout distortion or text wrapping.

## MODIFIED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-004 | The Hero section MUST display a live, vector-like HTML/CSS/SVG interactive component (`InteractiveLogo`) centered in the banner area, instead of a static logo image. | MUST |

## ADDED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-017 | The `InteractiveLogo` component MUST reconstruct the entire brand logo composition exactly ("tal cual"), including:<br>1. Double-circle container borders.<br>2. "team" script overlaps.<br>3. "SUPERNOVA" serif with a star inside the letter "O".<br>4. Slogan footer and taglines.<br>5. Celestial constellation, crescent moon, stars.<br>6. Fingerprint SVG and mini handdrawn heart.<br>7. Books stacked spine-out, coffee mug with custom lettering, and gold leafy branch.<br>8. Evidence folder, pinned handwritten note, and Polaroid city photo.<br>9. Center microphone with horizontal soundwaves. | MUST |
| REQ-SL-018 | The `InteractiveLogo` component MUST scale proportionally and responsively using Container Queries and `cqw` units, maintaining its layout structure without text wrapping or overflow across desktop and mobile viewports. | MUST |

## ADDED & MODIFIED Scenarios

### Scenario 7 (Modified): Live HTML Logo Hero Rendering
* **Given** a user loads the landing page
* **When** the Hero section is rendered
* **Then** the `InteractiveLogo` component is displayed centered instead of a static logo image
* **And** it renders all exact composition elements including double-circle borders, script overlaps, "SUPERNOVA" serif, and all individual visual assets (books, mug, folder, Polaroid, microphone, soundwaves)

### Scenario 12 (Added): Proportional Responsive Scaling of HTML Logo
* **Given** a user is viewing the website on a viewport of any size
* **When** the container width changes
* **Then** the `InteractiveLogo` scales proportionally and responsively using container queries and `cqw` units
* **And** the component maintains its layout structure without text wrapping or overflow
