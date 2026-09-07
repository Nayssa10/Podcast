# Specification: Site Landing (`site-landing`)

## Purpose
Define the main page of the team SUPERNOVA website using custom theme colors, layouts, and Google Fonts.

## Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-SL-001 | MUST load Google Fonts: Montserrat, Monsieur La Doulaise, and Playfair Display. | MUST |
| REQ-SL-002 | MUST use soft pastel CSS variables and dark charcoal text with >= 4.5:1 contrast. | MUST |
| REQ-SL-003 | MUST render five vertical sections: Hero, About/Stats, Episode Grid, Habilidades/Quote, Contact/Footer. | MUST |
| REQ-SL-004 | Hero MUST render arched photo frame with logo.png, Playfair Display title, and Nayssa Kristel signature. | MUST |
| REQ-SL-005 | The Episodes grid MUST be constrained to a maximum width of 960px and centered. | MUST |
| REQ-SL-006 | About section MUST display single-host bio and podcast description with stats columns. | MUST |
| REQ-SL-007 | Contact section MUST render inline contact form and minimal link footer. | MUST |
| REQ-SL-008 | On viewports under 768px, the layout MUST collapse rotated elements and the asymmetric collage into a vertical stack and reduce rotations to 0 degrees. | MUST |
| REQ-SL-009 | MUST load and utilize Google Font `Courier Prime` for typewriter-styled typography throughout the landing page. | MUST |
| REQ-SL-010 | Skeuomorphic elements and polaroid card rotation tilts MUST NOT exceed 5 degrees to preserve grid accessibility. | MUST |
| REQ-SL-011 | All text elements on textured, paper, or coffee-stain backgrounds MUST maintain a minimum contrast ratio of 4.5:1. | MUST |
| REQ-SL-012 | The Hero section MUST NOT repeat the text title "TEAM SUPERNOVA" or tagline words below the logo. | MUST |
| REQ-SL-013 | Episode cards MUST render as uniform pastel cards with arched covers and outline buttons, without rotation. | MUST |
| REQ-SL-014 | The landing page MUST support a modal overlay that opens when the "Saber más" button on an episode card is clicked. | MUST |
| REQ-SL-015 | Modal overlay MUST dim page, lock scroll, close on Escape/backdrop click, and render minimal pastel card overlay. | MUST |
| REQ-SL-016 | Cards MUST maintain uniform height and display: episode number, date, clamped title, clamped preview, AudioPlayer, and a "Saber más" button. | MUST |
| REQ-SL-017 | The `InteractiveLogo` component MUST reconstruct the entire brand logo composition exactly ("tal cual"), including:<br>1. Double-circle container borders.<br>2. "team" script overlaps.<br>3. "SUPERNOVA" serif with a star inside the letter "O".<br>4. Slogan footer and taglines.<br>5. Celestial constellation, crescent moon, stars.<br>6. Fingerprint SVG and mini handdrawn heart.<br>7. Books stacked spine-out, coffee mug with custom lettering, and gold leafy branch.<br>8. Evidence folder, pinned handwritten note, and Polaroid city photo.<br>9. Center microphone with horizontal soundwaves. | MUST |
| REQ-SL-018 | The `InteractiveLogo` component MUST scale proportionally and responsively using Container Queries and `cqw` units, maintaining its layout structure without text wrapping or overflow across desktop and mobile viewports. | MUST |
| REQ-SL-020 | In the Gothic Lectura layout, the modal MUST render a scrapbook aesthetic containing a simulated book page with romance-thriller snippets, highlighted text sections, informal handwritten margin notes, and a Polaroid cover secured by metal clip. | MUST |
| REQ-SL-021 | In the Gothic Criminalística layout, the modal MUST render a detective case file aesthetic containing a simulated leather/dark folder/wallet, a metallic SIU (Special Investigations Unit) badge plaque, and loose case file sheets. | MUST |
| REQ-SL-022 | The active layout state (Classic vs. Gothic/Scrapbook) MUST persist across different episode modal openings within the same session. | MUST |
| REQ-SL-023 | In the Lectura modal, the layout MUST render a scrapbook style containing a simulated cream book page with romance-thriller snippets, highlighted text sections, informal handwritten margin notes in script font, a Polaroid cover secured by tape, and a grey/blue wax seal at the bottom. | MUST |
| REQ-SL-024 | In the Criminalística modal, the layout MUST render a light case file style containing a white textured paper sheet pinned with a clip on a light dusty blue/grey desk background, red warning stamps ("WARNING", "SEVERE", "CONFIDENCIAL"), paperclips, and a red wax seal. | MUST |
| REQ-SL-025 | The layout toggle button and the layoutMode state MUST be removed from the modal and page structure. | MUST |
| REQ-SL-026 | All skeuomorphic interactive elements in the desk mockup (such as the clipboard and notebook in the Hero section, and polaroids in the Contact section) MUST support CSS hover transformations. These transformations SHALL NOT exceed a 5-degree tilt or 10px translation. | MUST |
| REQ-SL-029 | The system MUST respect `prefers-reduced-motion` settings by disabling hover magnification, tilt transitions, and animations. | MUST |
| REQ-SL-034 | The system MUST adapt the dashboard grid into a stacked layout for mobile devices (max-width: 992px) and respect reduced motion preferences. | MUST |
| REQ-SL-035 | MUST render Edgar Allan Poe's quote exactly. | MUST |
| REQ-SL-036 | MUST style SVG icons with minimal stroke and pastel colors. | MUST |
| REQ-SL-037 | MUST render modals with flat pastel sheet design. | MUST |
| REQ-SL-038 | MUST arrange sections in a vertical, scrollable linear flow. | MUST |

## Scenarios

### Scenario 1: Font Loading
* **Given** page loads
* **When** render finishes
* **Then** Montserrat, Monsieur La Doulaise, and Playfair Display load

### Scenario 2: Sections Visibility
* **Given** page loaded
* **When** user scrolls
* **Then** views Hero, About/Stats, Episode Grid, Habilidades/Quote, Contact/Footer in order

### Scenario 3: Responsive Viewport Display
* **Given** a user views the website on a mobile device (width < 768px)
* **When** the viewport width decreases
* **Then** the layout adapts responsively without breaking horizontal bounds

### Scenario 4: Tabbed Case File Folder Interaction
* **Given** a user is viewing an episode Case File Folder
* **When** the user clicks on the "Informe Forense" tab
* **Then** the criminology report details are displayed
* **And** the "Libro Relacionado" book details tab is hidden

### Scenario 5: Mobile Stacking and Tilt Reset
* **Given** a user views the site on a mobile device
* **When** the page renders
* **Then** elements stack vertically
* **And** CSS card tilt rotations reset to 0 degrees

### Scenario 6: Contact Rendering
* **Given** Contact viewed
* **When** rendered
* **Then** displays inline form and minimal link footer

### Scenario 7: Hero Rendering
* **Given** page loads
* **When** Hero renders
* **Then** displays arched frame with logo.png, Playfair title, and signature

### Scenario 8: Card Rendering
* **Given** Episode grid viewed
* **When** rendered
* **Then** cards display uniform pastel layout with arched covers, outline buttons, and 0 rotation

### Scenario 9: Mobile Viewport Episode Card Stacking
* **Given** a user views the episodes grid on a mobile device (width < 768px)
* **When** the page renders
* **Then** the episodes grid collapses into a single-column stack
* **And** card rotations are reset to 0 degrees to prevent horizontal overflow

### Scenario 10: Modal Toggle
* **Given** episode clicked
* **When** modal opens
* **Then** dims page, locks scroll, displays minimal pastel card, and closes on Escape/backdrop click

### Scenario 11: Compact Mini Folder Card Contents
* **Given** a user views an episode card in the grid
* **When** the card is rendered
* **Then** it displays uniform height, the episode number, date, clamped title, clamped preview, AudioPlayer, and a "Saber más" button

### Scenario 12: Proportional Responsive Scaling of HTML Logo
* **Given** a user is viewing the website on a viewport of any size
* **When** the container width changes
* **Then** the `InteractiveLogo` scales proportionally and responsively using container queries and `cqw` units
* **And** the component maintains its layout structure without text wrapping or overflow

### Scenario 13: Removal of Layout Toggle
* **Given** a user is viewing an open episode modal
* **When** the modal content is rendered
* **Then** no layout toggle button is present on the interface
* **And** the layout cannot be switched to a classic layout

### Scenario 14: Rendering the annotated page inside the Lectura scrapbook modal
* **Given** a user opens a "Lectura" type episode modal
* **When** the modal overlay is displayed
* **Then** the layout renders a scrapbook style containing a simulated cream book page with romance-thriller snippets
* **And** it displays highlighted text, handwritten margin notes in script font, a Polaroid cover secured by tape, and a grey/blue wax seal at the bottom

### Scenario 15: Rendering the CIA confidential record sheet inside the Criminalística modal
* **Given** a user opens a "Criminalística" type episode modal
* **When** the modal overlay is displayed
* **Then** the layout renders a light case file style containing a white textured paper sheet pinned with a clip on a light dusty blue/grey desk background
* **And** it displays red warning stamps ("WARNING", "SEVERE", "CONFIDENCIAL"), typewriter styled text, and a red wax seal

### Scenario 16: Theme Application
* **Given** site loaded
* **When** styles evaluated
* **Then** uses pastel CSS variables with charcoal text
* **And** all page elements display with a minimum contrast ratio of 4.5:1

### Scenario 17: Backdrop click and Escape key dismissal
* **Given** an episode modal is open
* **When** the user clicks the backdrop area outside the modal or presses Escape
* **Then** the modal overlay closes
* **And** scroll lock on the body is released

### Scenario 18: Backdrop Dimming and Scroll Lock
* **Given** a user opens an episode modal
* **When** the modal is active
* **Then** the background page is dimmed by the backdrop overlay
* **And** scrolling is disabled on the main page viewport

### Scenario 19: Interactive Hover on Hero Clipboard
* **Given** a user is viewing the Hero section
* **When** the user hovers over the clipboard element
* **Then** the element tilts slightly (up to 5 degrees) and lifts (up to 10px translation)

### Scenario 20: Reduced Motion Safe Hover
* **Given** a user has prefers-reduced-motion: reduce enabled
* **When** the user hovers over the clipboard or notebook elements
* **Then** the hover tilt and lift animations are disabled, maintaining static layout positioning

### Scenario 21: About Rendering
* **Given** About section viewed
* **When** rendered
* **Then** displays single-host bio and stats columns in clean layout

### Scenario 22: Quote Display
* **Given** quote block visible
* **When** rendered
* **Then** matches Edgar Allan Poe's text

### Scenario 23: SVG Styling
* **Given** SVG icon rendered
* **When** styles active
* **Then** icon uses thin stroke and pastel fill

### Scenario 24: Modal Render
* **Given** modal opens
* **When** rendered
* **Then** displays flat page with high-contrast text

### Scenario 25: Scroll Flow
* **Given** landing page renders
* **When** scrolling
* **Then** sections display in continuous vertical grid
