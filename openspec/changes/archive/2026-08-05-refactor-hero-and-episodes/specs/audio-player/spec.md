# Delta Specification: Audio Player Widget (`audio-player`)

## Purpose
This delta specification defines the layout modifications to the audio-player capability under the `refactor-hero-and-episodes` proposal, ensuring it fits inside the new compact episode cards.

## Requirements

| ID | Modified/New | Requirement | RFC 2119 |
|---|---|---|---|
| REQ-AP-D01 | Modified (REQ-AP-007) | The Audio Player widget MUST scale down and fit inside the compact folder grid cards (max width 350px) without layout overflow or text clipping. | MUST |

## Scenarios

### Scenario 1: Audio Player Scale Down in Card Grid
* **Given** an episode card is rendered in the grid
* **When** the user views the Audio Player widget inside a card (max width 350px)
* **Then** the audio player scales down to fit within the container
* **And** no layout overflow or text clipping occurs within the player
