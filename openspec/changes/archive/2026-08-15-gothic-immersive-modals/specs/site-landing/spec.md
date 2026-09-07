# Delta Specification: Gothic Immersive Modals (`site-landing`)

This delta specification defines the requirements and behavior changes introduced by the `gothic-immersive-modals` feature, transitioning the episode modals from a toggleable classic/gothic layout to direct, immersive thematic templates using a light, vintage aesthetic.

## Modified Requirements

| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-002 | The system MUST define and use CSS variables for theme colors: warm cream paper (`#F9F6F0`), light dusty blue (`#D0Dbe5`), deep burgundy accents (`#6A2222`), and vintage textures. | MUST |
| REQ-SL-015 | The modal overlay MUST dim the page, lock background scrolling, close on Escape or clicking the backdrop, and render the custom gothic scrapbook layout (for Lectura type) or the light detective case file layout (for Criminalística type) directly. | MUST |

## Added Requirements

| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-023 | In the Lectura modal, the layout MUST render a scrapbook style containing a simulated cream book page with romance-thriller snippets, highlighted text sections, informal handwritten margin notes in script font, a Polaroid cover secured by tape, and a grey/blue wax seal at the bottom. | MUST |
| REQ-SL-024 | In the Criminalística modal, the layout MUST render a light case file style containing a white textured paper sheet pinned with a clip on a light dusty blue/grey desk background, red warning stamps ("WARNING", "SEVERE", "CONFIDENCIAL"), paperclips, and a red wax seal. | MUST |
| REQ-SL-025 | The layout toggle button and the layoutMode state MUST be removed from the modal and page structure. | MUST |

## Removed Requirements

| ID | Requirement / Description | Rationale |
|---|---|---|
| REQ-SL-019 | The modal MUST render a layout toggle control that allows users to switch between the Classic layout and the Gothic/Scrapbook layout. | Deprecated. The system commits fully to the immersive gothic scrapbook and case folder modal styles. |

## Scenarios

### Scenario 1: Rendering the annotated page inside the Lectura scrapbook modal
* **Given** a user opens a "Lectura" type episode modal
* **When** the modal overlay is displayed
* **Then** the layout renders a scrapbook style containing a simulated cream book page with romance-thriller snippets
* **And** it displays highlighted text, handwritten margin notes in script font, a Polaroid cover secured by tape, and a grey/blue wax seal at the bottom

### Scenario 2: Rendering the CIA confidential record sheet inside the Criminalística modal
* **Given** a user opens a "Criminalística" type episode modal
* **When** the modal overlay is displayed
* **Then** the layout renders a light case file style containing a white textured paper sheet pinned with a clip on a light dusty blue/grey desk background
* **And** it displays red warning stamps ("WARNING", "SEVERE", "CONFIDENCIAL"), typewriter styled text, and a red wax seal

### Scenario 3: Theme Color Definition and Application
* **Given** the site finishes loading
* **When** styles are evaluated
* **Then** the system uses CSS variables for warm cream paper, light dusty blue, and deep burgundy accents
* **And** all page elements display with a minimum contrast ratio of 4.5:1

### Scenario 4: Removal of Layout Toggle
* **Given** a user is viewing an open episode modal
* **When** the modal content is rendered
* **Then** no layout toggle button is present on the interface
* **And** the layout cannot be switched to a classic layout

### Scenario 5: Backdrop click and Escape key dismissal
* **Given** an episode modal is open
* **When** the user clicks the backdrop area outside the modal or presses Escape
* **Then** the modal overlay closes
* **And** scroll lock on the body is released

### Scenario 6: Backdrop Dimming and Scroll Lock
* **Given** a user opens an episode modal
* **When** the modal is active
* **Then** the background page is dimmed by the backdrop overlay
* **And** scrolling is disabled on the main page viewport
