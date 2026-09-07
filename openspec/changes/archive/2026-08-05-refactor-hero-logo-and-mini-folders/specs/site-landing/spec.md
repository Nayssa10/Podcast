# Delta Specification: Site Landing (`site-landing`)

## Purpose
Refactor the Hero section logo dimensions, constrain the episodes grid layout width, and redesign the episode cards as compact, skeuomorphic mini Manila folders.

## MODIFIED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-004 | The Hero section MUST display `/logo.png` centered in its full square ratio, scaling up to a maximum width of 650px to 700px on desktop to occupy the banner height/space. | MUST |
| REQ-SL-005 | The Episodes grid MUST be constrained to a maximum width of 960px and centered. | MUST |
| REQ-SL-013 | Each card in the episodes grid MUST be styled as a compact mini Manila Folder (with a tab labeled "CASO EP-XX", a mini CSS paperclip, and a radial coffee stain). | MUST |
| REQ-SL-014 | The landing page MUST support a modal overlay that opens when the "Saber más" button on an episode card is clicked. | MUST |

## ADDED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-016 | Cards MUST maintain uniform height and display: episode number, date, clamped title, clamped preview, AudioPlayer, and a "Saber más" button. | MUST |

## MODIFIED & ADDED Scenarios

### Scenario 7 (Modified): Full Square Logo Hero Layout
* **Given** a user loads the landing page
* **When** the Hero section is rendered
* **Then** `/logo.png` is displayed centered in its full square ratio with no circular borders
* **And** the logo scales up to a maximum width of 650px to 700px on desktop

### Scenario 8 (Modified): Skeuomorphic Mini Folder Grid Card Layouts
* **Given** a user is in the Episodes section
* **When** the episodes grid is rendered
* **Then** the grid is constrained to a maximum width of 960px and centered
* **And** cards are styled as compact mini Manila folders with "CASO EP-XX" tabs, a CSS paperclip, and a coffee stain

### Scenario 10 (Modified): Case Folder Modal Overlay Toggle
* **Given** the user is viewing the episodes grid
* **When** the user clicks "Saber más" on an episode card
* **Then** a modal overlay dims the background page and locks scrolling
* **And** the modal renders the complete skeuomorphic folder

### Scenario 11 (Added): Compact Mini Folder Card Contents
* **Given** a user views an episode card in the grid
* **When** the card is rendered
* **Then** it displays uniform height, the episode number, date, clamped title, clamped preview, AudioPlayer, and a "Saber más" button
