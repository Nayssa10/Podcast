# Delta: site-landing

## ADDED Requirements

### Requirement: REQ-SL-035: Poe Quote
MUST render Edgar Allan Poe's quote exactly.
#### Scenario: Quote Display
- GIVEN quote block visible
- WHEN rendered
- THEN matches Edgar Allan Poe's text

### Requirement: REQ-SL-036: SVG Icon Styling
MUST style SVG icons with minimal stroke and pastel colors.
#### Scenario: SVG Styling
- GIVEN SVG icon rendered
- WHEN styles active
- THEN icon uses thin stroke and pastel fill

### Requirement: REQ-SL-037: Minimal Modal
MUST render modals with flat pastel sheet design.
#### Scenario: Modal Render
- GIVEN modal opens
- WHEN rendered
- THEN displays flat page with high-contrast text

### Requirement: REQ-SL-038: Vertical Scroll Grid
MUST arrange sections in a vertical, scrollable linear flow.
#### Scenario: Scroll Flow
- GIVEN landing page renders
- WHEN scrolling
- THEN sections display in continuous vertical grid

## MODIFIED Requirements

### Requirement: REQ-SL-001
MUST load Google Fonts: Montserrat, Monsieur La Doulaise, and Playfair Display.
(Previously: MUST load Google Fonts: Cinzel, Monsieur La Doulaise, and Montserrat.)
#### Scenario: Font Loading
- GIVEN page loads
- WHEN render finishes
- THEN Montserrat, Monsieur La Doulaise, and Playfair Display load

### Requirement: REQ-SL-002
MUST use soft pastel CSS variables and dark charcoal text with >= 4.5:1 contrast.
(Previously: The system MUST define and use CSS variables for theme colors: light cream-sand background (#F9F6F0), old gold accents, and deep burgundy accents (#6A2222).)
#### Scenario: Theme Application
- GIVEN site loaded
- WHEN styles evaluated
- THEN uses pastel CSS variables with charcoal text

### Requirement: REQ-SL-003
MUST render five vertical sections: Hero, About/Stats, Episode Grid, Habilidades/Quote, Contact/Footer.
(Previously: MUST render four distinct sections: Hero, Episodes, About, and Contact.)
#### Scenario: Sections Visibility
- GIVEN page loaded
- WHEN user scrolls
- THEN views Hero, About/Stats, Episode Grid, Habilidades/Quote, Contact/Footer in order

### Requirement: REQ-SL-004
Hero MUST render arched photo frame with logo.png, Playfair Display title, and Nayssa Kristel signature.
(Previously: The Hero section MUST display a desk mockup featuring a yellow Caution Tape that crosses diagonally behind elements with yellow/black stripes. A separate header MUST display a static logo image and "team supernova".)
#### Scenario: Hero Rendering
- GIVEN page loads
- WHEN Hero renders
- THEN displays arched frame with logo.png, Playfair title, and signature

### Requirement: REQ-SL-006
About section MUST display single-host bio and podcast description with stats columns.
(Previously: The About section MUST display the podcast description and host details styled as a retro newspaper clipping.)
#### Scenario: About Rendering
- GIVEN About section viewed
- WHEN rendered
- THEN displays single-host bio and stats columns in clean layout

### Requirement: REQ-SL-007
Contact section MUST render inline contact form and minimal link footer.
(Previously: The Contact section MUST render Socials polaroids connected by a dotted yarn SVG path on an aged map background.)
#### Scenario: Contact Rendering
- GIVEN Contact viewed
- WHEN rendered
- THEN displays inline form and minimal link footer

### Requirement: REQ-SL-013
Episode cards MUST render as uniform pastel cards with arched covers and outline buttons, without rotation.
(Previously: Episode cards in the Episodes grid MUST support two styles: polaroids and dossier folders. Cards MUST be positioned asymmetrically with rotation angles between -4deg and 4deg to look naturally thrown.)
#### Scenario: Card Rendering
- GIVEN Episode grid viewed
- WHEN rendered
- THEN cards display uniform pastel layout with arched covers, outline buttons, and 0 rotation

### Requirement: REQ-SL-015
Modal overlay MUST dim page, lock scroll, close on Escape/backdrop click, and render minimal pastel card overlay.
(Previously: The modal overlay MUST dim the page, lock background scrolling, close on Escape or clicking the backdrop, and render the custom gothic scrapbook layout (for Lectura type) or the light detective case file layout (for Criminalística type) directly.)
#### Scenario: Modal Toggle
- GIVEN episode clicked
- WHEN modal opens
- THEN dims page, locks scroll, displays minimal pastel card, and closes on Escape/backdrop click

## REMOVED Requirements

### Requirement: REQ-SL-004 (Caution Tape)
(Reason: Diagonal caution tape is deprecated for a clean layout.)
(Migration: Replaced by arched frame with logo.png.)

### Requirement: REQ-SL-027 (Wood Planks)
(Reason: Wood backgrounds are deprecated for flat pastels.)
(Migration: Style backgrounds with soft solid cream/pastels.)

### Requirement: REQ-SL-028 (Magnifying Glass)
(Reason: CSS magnifying glass is deprecated for clean brand typography.)
(Migration: Display static logo.png inside hero arch.)

### Requirement: REQ-SL-030 (Tabbed Host Dashboard)
(Reason: Tabbed navigation is deprecated for a single-host bio with stats.)
(Migration: Single-host bio rendered inline.)

### Requirement: REQ-SL-031, REQ-SL-032, REQ-SL-033 (Single-Viewport Layout)
(Reason: Single-viewport design is deprecated for vertical scroll layout.)
(Migration: Vertical sections scrolling.)

### Requirement: REQ-MODAL-001 (guestCheckModal)
(Reason: Skeuomorphic guest check is deprecated for minimal pastel overlay.)
(Migration: Clean modern pastel modal.)

### Requirement: REQ-MODAL-002 (dossierFolderModal)
(Reason: Skeuomorphic dossier modal is deprecated for minimal pastel overlay.)
(Migration: Clean modern pastel modal.)
