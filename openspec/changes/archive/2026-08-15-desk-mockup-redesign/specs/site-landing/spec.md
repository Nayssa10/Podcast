</Delta for site-landing>
## ADDED Requirements

### Requirement: Viewport Dashboard Grid

The system MUST render the site-landing page as a single-viewport dashboard layout on desktop screens. The layout MUST utilize a 2-column grid (matching the Kotomi grid structure) with Left and Right columns. The design MUST fit within a single screen viewport without requiring vertical scrolling on desktop resolutions.

#### Scenario: Desktop Dashboard Layout
- GIVEN a user views the landing page on a desktop device
- WHEN the page renders
- THEN the layout is constrained to a single viewport height without scrolling
- AND it displays a 2-column grid containing Left and Right content areas

### Requirement: Component Mapping Rules

The system MUST organize UI components according to specific mapping rules within the single-viewport dashboard grid:
- The Header MUST contain a search bar mockup pill and navigation pill links.
- The Left Column MUST contain a dome-shape header banner, a tagline card with a play button, an episodes pill list, and an extra info description.
- The Right Column MUST contain an About info block, a vertical card slider, category stats pills, and a co-host card grid.

#### Scenario: Correct Component Placement
- GIVEN a user views the desktop dashboard layout
- WHEN the components render
- THEN the Header displays the search bar and navigation pills
- AND the Left Column displays the dome banner, tagline, episodes list, and extra info
- AND the Right Column displays the About block, slider, category stats, and co-hosts

### Requirement: Interactive Actions

The system MUST provide interactive elements within the dashboard to access content dynamically without leaving the single-viewport context.

#### Scenario: Episode Playback and Details
- GIVEN a user interacts with the episodes pill list in the Left Column
- WHEN they click on an episode pill
- THEN the selected episode begins audio playback OR opens the episode details modal

#### Scenario: Investigator Dossier Access
- GIVEN a user interacts with the co-host card grid in the Right Column
- WHEN they click on a co-host avatar
- THEN a detailed investigator dossier is displayed

#### Scenario: Contact Form Access
- GIVEN a user interacts with the contact button
- WHEN they click the button
- THEN a Guest Check contact form modal overlay opens

### Requirement: Mobile Responsiveness and Motion Settings

The system MUST adapt the dashboard grid into a stacked layout for mobile devices (max-width: 992px) and respect reduced motion preferences.

#### Scenario: Mobile Viewport Stacking
- GIVEN a user views the site on a mobile device (width <= 992px)
- WHEN the viewport resizes to mobile breakpoints
- THEN the 2-column grid collapses into a single-column vertical stack
- AND the single-viewport constraint is removed, allowing vertical scrolling

#### Scenario: Prefers-Reduced-Motion Handling
- GIVEN a user has prefers-reduced-motion enabled in their system
- WHEN they interact with dynamic elements on the dashboard
- THEN all decorative animations and complex transitions are disabled
