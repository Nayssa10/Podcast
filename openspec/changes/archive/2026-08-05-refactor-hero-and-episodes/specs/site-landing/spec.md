# Delta Specification: Site Landing (`site-landing`)

## Purpose
This delta specification defines the modifications to the site-landing capability under the `refactor-hero-and-episodes` proposal, redesigning the Hero layout and converting the episodes list into a compact CSS grid.

## Requirements

| ID | Modified/New | Requirement | RFC 2119 |
|---|---|---|---|
| REQ-SL-D01 | Modified (REQ-SL-004) | The Hero section MUST display `/logo.png` as the main centered visual element, wrapped in a circular centerpiece with vintage borders. | MUST |
| REQ-SL-D02 | New | The Hero section MUST NOT repeat the text title "TEAM SUPERNOVA" or tagline words below the logo. | MUST |
| REQ-SL-D03 | Modified (REQ-SL-005) | The Episodes section MUST display as a responsive grid gallery (3 columns on desktop, collapsing to 1 column on mobile/tablet). | MUST |
| REQ-SL-D04 | New | Each card folder in the gallery MUST have compact padding and margins and adapt to a uniform height layout. | MUST |

## Scenarios

### Scenario 1: Centered Logo Hero Layout
* **Given** a user loads the landing page
* **When** the Hero section is rendered
* **Then** `/logo.png` is displayed centered inside a circular centerpiece with vintage borders
* **And** no repeated title text "TEAM SUPERNOVA" or tagline words appear below the logo

### Scenario 2: Desktop Episode Grid Gallery
* **Given** a user views the landing page on a desktop screen (width >= 768px)
* **When** they scroll to the Episodes section
* **Then** the episodes are displayed in a responsive grid gallery with 3 columns
* **And** all card folders in the grid have uniform height and compact padding

### Scenario 3: Mobile Episode Grid Gallery Collapse
* **Given** a user views the landing page on a mobile device (width < 768px)
* **When** the page renders
* **Then** the episodes gallery collapses into a single-column layout
