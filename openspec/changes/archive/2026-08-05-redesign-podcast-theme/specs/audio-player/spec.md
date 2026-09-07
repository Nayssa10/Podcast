# Delta Specification: Audio Player Widget (`audio-player`)

## Purpose
This delta specification defines styling modifications to the audio-player capability to ensure visual integration with the new Case File Folders under the `redesign-podcast-theme` proposal.

## Requirements

| ID | Modified/New | Requirement | RFC 2119 |
|---|---|---|---|
| REQ-AP-D01 | Modified (REQ-AP-005) | The audio player container MUST be styled to match the Case File Folders, utilizing the `Courier Prime` typewriter font and a textured paper background. | MUST |
| REQ-AP-D02 | New | The audio player widget MUST fit entirely within the tabbed panels of the Case File Folder without causing horizontal or vertical overflow. | MUST |

## Scenarios

### Scenario 1: Case File Folder Theme Integration
* **Given** an episode track is selected and displayed within a folder tab panel
* **When** the audio player widget is rendered
* **Then** it displays with a textured paper background matching the folder interior
* **And** it utilizes the `Courier Prime` typewriter typography for track details and timing indicators
