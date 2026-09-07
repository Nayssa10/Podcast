# Delta Specification: Site Landing (`site-landing`)

## Purpose
Refactor the site landing page to display the hero logo in its full square ratio, structure the episodes grid into compact uniform-height cards with clamped text, and introduce a scroll-locked modal overlay displaying the interactive skeuomorphic case folder.

## MODIFIED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-004 | The Hero section MUST display `/logo.png` centered in its full square ratio, with no circular borders or cropped wrappers, scaling to a maximum width of 450px on desktop. | MUST |
| REQ-SL-005 | The Episodes grid MUST display compact, uniform cards of equal height. Card titles MUST clamp to a maximum of 2 lines, and previews MUST clamp to a maximum of 3 lines. | MUST |

## ADDED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-014 | The landing page MUST support a modal overlay that opens when "Ver Expediente" is clicked. | MUST |
| REQ-SL-015 | The modal overlay MUST dim the page, lock background scrolling, close on Escape or clicking the backdrop, and render the complete skeuomorphic folder (with tabs, clip, stains, stamp). | MUST |

## ADDED & MODIFIED Scenarios

### Scenario 7 (Modified): Full Square Logo Hero Layout
* **Given** a user loads the landing page
* **When** the Hero section is rendered
* **Then** `/logo.png` is displayed centered in its full square ratio with no circular borders
* **And** the logo scales to a maximum width of 450px on desktop

### Scenario 8 (Modified): Compact Uniform Cards Grid
* **Given** a user is in the Episodes section
* **When** the episodes grid is rendered
* **Then** the episodes display as compact, uniform cards of equal height
* **And** card titles clamp to at most 2 lines, and previews clamp to at most 3 lines

### Scenario 10 (Added): Case Folder Modal Overlay Toggle
* **Given** the user is viewing the episodes grid
* **When** the user clicks "Ver Expediente" on an episode card
* **Then** a modal overlay dims the background page and locks scrolling
* **And** the modal renders the complete skeuomorphic folder
* **When** the user presses the Escape key or clicks the backdrop
* **Then** the modal closes and page scrolling is restored
