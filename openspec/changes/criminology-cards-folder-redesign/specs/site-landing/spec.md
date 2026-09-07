# Delta Specification: Criminology Cards Folder Redesign (site-landing)

## ADDED Requirements

### Requirement: REQ-SL-039 - Load Google Font "Satisfy"
The system MUST load and register the Google Font "Satisfy" to make it available for the cursive text elements of the landing page.

#### Scenario: Load Satisfy Font
- GIVEN the landing page is loaded
- WHEN the assets are requested
- THEN the Google Font "Satisfy" MUST be loaded and registered by the application

## MODIFIED Requirements

### Requirement: REQ-SL-013
Episodes of type `forensic` MUST render using the `ForensicFolderCard` component, while episodes of type `book` MUST render using the standard minimal card.
On desktop viewports, episodes MUST display in a 3-column vertical grid layout, collapsing to a single-column list layout on mobile viewports.
BOTH types of vertical cards MUST display the episode title in the cursive Google Font "Satisfy", with no cover image (arched photo frame, polaroid-framed cover image, or episodeCover) and no description or preview text.
(Previously: Episode cards MUST render as uniform pastel cards with arched covers and outline buttons, without rotation.)

#### Scenario: Card Rendering for Forensic Episodes
- GIVEN the episode list contains an episode of type "forensic"
- WHEN the episode grid is rendered
- THEN the episode card MUST be rendered using the ForensicFolderCard component

#### Scenario: Card Rendering for Book Episodes
- GIVEN the episode list contains an episode of type "book"
- WHEN the episode grid is rendered
- THEN the episode card MUST be rendered using the standard minimal card

#### Scenario: Desktop Grid Layout
- GIVEN the application is viewed on a desktop viewport (width >= 1024px)
- WHEN the episodes grid is rendered
- THEN the episodes grid MUST display in a 3-column vertical layout
- AND both types of cards MUST render vertically

#### Scenario: Mobile Grid Layout
- GIVEN the application is viewed on a mobile viewport (width < 768px)
- WHEN the episodes grid is rendered
- THEN the episodes grid MUST collapse to a single-column list layout

#### Scenario: Card Font, Cover, and Description Restrictions
- GIVEN an episode card is rendered
- WHEN the card displays
- THEN the episode title MUST be rendered in the cursive Google Font "Satisfy"
- AND the card MUST NOT render any cover image or description/preview text

### Requirement: REQ-SL-016
Cards MUST maintain uniform height and display: episode number, date, clamped title, AudioPlayer, and a "Saber más" button.
(Previously: Cards MUST maintain uniform height and display: episode number, date, clamped title, clamped preview, AudioPlayer, and a "Saber más" button.)

#### Scenario: Compact Mini Folder Card Contents
- GIVEN a user views an episode card in the grid
- WHEN the card is rendered
- THEN it displays uniform height, the episode number, date, clamped title, AudioPlayer, and a "Saber más" button
