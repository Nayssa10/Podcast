# Delta Specification: Cosmic Book Modal (`cosmic-book-modal`)

This delta specification defines the changes and additions to the site landing page modal views, themes, and layout toggle capabilities.

## Modified Requirements

| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-015 | The modal overlay MUST dim the page, lock background scrolling, close on Escape or clicking the backdrop, and render either the Classic layout or the Gothic/Scrapbook layout according to the active layout state. | MUST |

## Added Requirements

| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-019 | The modal MUST render a layout toggle control that allows users to switch between the Classic layout and the Gothic/Scrapbook layout. | MUST |
| REQ-SL-020 | In the Gothic Lectura layout, the modal MUST render a scrapbook aesthetic containing a simulated book page with romance-thriller snippets, highlighted text sections, informal handwritten margin notes, and a Polaroid cover secured by a metal clip. | MUST |
| REQ-SL-021 | In the Gothic Criminalística layout, the modal MUST render a detective case file aesthetic containing a simulated leather/dark folder/wallet, a metallic SIU (Special Investigations Unit) badge plaque, and loose case file sheets. | MUST |
| REQ-SL-022 | The active layout state (Classic vs. Gothic/Scrapbook) MUST persist across different episode modal openings within the same session. | MUST |

## Added Scenarios

### Scenario 13: Toggling Layouts inside the Modal
* **Given** the episode modal is open in the Classic layout
* **When** the user clicks the layout toggle button
* **Then** the modal content transitions to the Gothic/Scrapbook layout view
* **And** the toggle button state updates to indicate the active layout

### Scenario 14: Rendering Annotated Page in Gothic Lectura
* **Given** a "Lectura" episode modal is open in the Gothic/Scrapbook layout
* **When** the modal content is rendered
* **Then** the modal displays a simulated book page with romance-thriller snippets and highlighted text
* **And** it renders handwritten margin notes and a Polaroid cover styled with a metal clip

### Scenario 15: Rendering SIU Badge Folder in Gothic Criminalística
* **Given** a "Criminalística" episode modal is open in the Gothic/Scrapbook layout
* **When** the modal content is rendered
* **Then** the modal displays a dark detective case folder containing loose case file sheets
* **And** a metallic Special Investigations Unit (SIU) badge plaque is visible in the layout

### Scenario 16: Layout Persistence across Openings
* **Given** a user has set the active layout to Gothic/Scrapbook in an open modal
* **When** the user closes the modal and clicks "Saber más" on another episode card
* **Then** the new modal MUST open directly in the Gothic/Scrapbook layout
