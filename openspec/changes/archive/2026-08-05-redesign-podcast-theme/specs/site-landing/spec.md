# Delta Specification: Site Landing (`site-landing`)

## Purpose
This delta specification defines the modifications to the site-landing capability to support the new "Detective's Desk" / "Crime Board" visual redesign under the `redesign-podcast-theme` proposal.

## Requirements

| ID | Modified/New | Requirement | RFC 2119 |
|---|---|---|---|
| REQ-SL-D01 | New | MUST load and utilize Google Font `Courier Prime` for typewriter-styled typography throughout the landing page. | MUST |
| REQ-SL-D02 | Modified (REQ-SL-004) | MUST integrate the logo image `/logo.png` in the header and hero sections, utilizing CSS `mix-blend-mode: multiply` and a subtle sepia filter to blend it with the background. | MUST |
| REQ-SL-D03 | Modified (REQ-SL-005) | MUST display episodes within "Case File Folders" featuring interactive tabs for "Libro Relacionado" (book details) and "Informe Forense" (criminology report details). | MUST |
| REQ-SL-D04 | Modified (REQ-SL-007) | MUST render the contact form styled as a "Notepad Page" (typewriter ruled lines, border-bottom input fields) and the social links as a "Crime Board" grid (polaroid style cards, red yarn SVG/CSS connection threads). | MUST |
| REQ-SL-D05 | New | Skeuomorphic elements and polaroid card rotation tilts MUST NOT exceed 5 degrees to preserve grid accessibility. | MUST |
| REQ-SL-D06 | Modified (REQ-SL-008) | On viewports narrower than 768px, the layout MUST collapse rotated/skewed elements into a standard vertical stack and reduce rotations to 0 degrees to prevent horizontal overflow. | MUST |
| REQ-SL-D07 | New | All text elements on textured, paper, or coffee-stain backgrounds MUST maintain a minimum contrast ratio of 4.5:1. | MUST |

## Scenarios

### Scenario 1: Tabbed Case File Folder Interaction
* **Given** a user is viewing an episode Case File Folder
* **When** the user clicks on the "Informe Forense" tab
* **Then** the criminology report details are displayed
* **And** the "Libro Relacionado" book details tab is hidden

### Scenario 2: Mobile Responsive Stacking and Tilt Reset
* **Given** a user is viewing the website on a mobile device (viewport width < 768px)
* **When** the page renders
* **Then** the "Crime Board" polaroids and contact form stack vertically
* **And** all CSS card tilt rotations are reset to 0 degrees to avoid overflow

### Scenario 3: Contact Notepad Typewriter Rendering
* **Given** a user scrolls to the Contact section
* **When** the notepad page is displayed
* **Then** the input fields are shown as dark charcoal text using `Courier Prime` font over horizontal notepad lines
* **And** the text meets the 4.5:1 contrast requirement
