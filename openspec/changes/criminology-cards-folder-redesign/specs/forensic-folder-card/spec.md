# Forensic Folder Card Specification (`forensic-folder-card`)

## Purpose

Define the requirements and behavior of the `ForensicFolderCard` component, which displays a vertical folder mockup container representing a criminology case file for episodes of type `forensic`.

## Requirements

### Requirement: REQ-FFC-001 - Folder Container and Layout
The component MUST render a vertical container mockup styled with a kraft paper color and texture, using a vertical card layout (`flex-direction: column`). The container MUST display the folder header at the top, which contains the absolute overlapping stickyNote. Below the folder header, the container MUST display the folderPaper insert (using a semi-transparent white/cream overlay to blend with the kraft folder background). The folderPaper insert MUST contain the episode title in the cursive Google Font "Satisfy", the playback controls (compact AudioPlayer), and a bottom action bar. The bottom action bar MUST place the details button ("Saber más") on the left, and the magnifying glass SVG and EVIDENCE stamp on the right.

#### Scenario: Vertical Container Structure
- GIVEN the ForensicFolderCard is rendered
- WHEN the layout is evaluated
- THEN the card displays as a vertical container (`flex-direction: column`) styled with kraft paper
- AND the folder header is displayed at the top, containing the absolute overlapping stickyNote
- AND the folderPaper insert displays below the header containing the Satisfy title, playback controls, and bottom action bar

#### Scenario: Bottom Action Bar Layout
- GIVEN the ForensicFolderCard is rendered
- WHEN the action area at the bottom of the folderPaper insert is drawn
- THEN the details button ("Saber más") is positioned on the left
- AND the magnifying glass SVG and EVIDENCE stamp are positioned on the right

### Requirement: REQ-FFC-002 - Folder Tab
The component MUST render a right-aligned folder tab with the text "TOP SECRET" stamped vertically.

#### Scenario: Tab Rendering
- GIVEN the ForensicFolderCard is rendered
- WHEN the folder tab is drawn
- THEN it is aligned to the right side of the container
- AND it contains the text "TOP SECRET" oriented vertically

### Requirement: REQ-FFC-003 - Sticky Note
The component MUST render a left-aligned, absolute canary yellow sticky note (rotated at -3 degrees) pinned with a pushpin graphic, containing the episode number in Monsieur La Doulaise cursive font. The sticky note MUST overlap the top edge of the folder card container.

#### Scenario: Sticky Note Rendering
- GIVEN the ForensicFolderCard is rendered
- WHEN the sticky note is drawn
- THEN it is colored canary yellow and rotated at -3 degrees
- AND it is left-aligned and absolutely positioned, overlapping the top edge of the card container
- AND it is pinned with a pushpin graphic
- AND it displays the episode number in Monsieur La Doulaise font

### Requirement: REQ-FFC-004 - Title Font and Clamping
The component MUST display the episode title in the cursive Google Font "Satisfy" instead of serif. The title MUST be clamped to prevent card overflow.

#### Scenario: Title Font and Clamping
- GIVEN the ForensicFolderCard component is rendered
- WHEN the episode data is displayed
- THEN the title MUST use the cursive Google Font "Satisfy"
- AND the title MUST be clamped to prevent overflow

### Requirement: REQ-FFC-005 - Controls and Navigation
The component MUST render the compact AudioPlayer and a "Saber más" button. The "Saber más" button MUST be highly visible and properly sized, using a dark high-contrast border and layout styling that prevents horizontal squishing in the card's flex layout.

#### Scenario: Action Controls Rendering
- GIVEN the ForensicFolderCard is rendered
- WHEN the user views the card
- THEN a compact AudioPlayer is rendered
- AND a clickable "Saber más" button is displayed
- AND the "Saber más" button has a dark high-contrast border
- AND the "Saber más" button maintains its proper size without horizontal squishing in the flex layout

### Requirement: REQ-FFC-006 - Magnifying Glass SVG
The component MUST render a small, clean vector SVG magnifying glass on the folderPaper insert surface inside the bottom action bar on the right.

#### Scenario: Magnifying Glass Rendering
- GIVEN the ForensicFolderCard component is rendered
- WHEN the action area at the bottom is drawn
- THEN a small vector SVG magnifying glass is rendered inside the bottom action bar on the right

### Requirement: REQ-FFC-007 - Evidence Stamp
The component MUST render a small "EVIDENCE" typewriter text stamp inside a red distressed border inside the bottom action bar on the right, positioned next to the magnifying glass.

#### Scenario: Evidence Stamp Rendering
- GIVEN the ForensicFolderCard component is rendered
- WHEN the action area at the bottom is drawn
- THEN a small "EVIDENCE" typewriter text stamp is rendered inside a red distressed border next to the magnifying glass
