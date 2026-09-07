# Delta Specification: Audio Player Widget (`audio-player`)

## Purpose
Ensure the Audio Player widget fits and scales correctly inside the newly redesigned compact mini folders.

## MODIFIED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-AP-007 | The Audio Player MUST fit and scale inside the compact mini folders (width ~280px-300px) and the modal folder panels without overflow. | MUST |

## MODIFIED Scenarios

### Scenario 5 (Modified): Audio Player Scale inside Cards and Modal Panels
* **Given** an audio player is rendered within an episode card (width ~280px-300px) or inside the modal folder panels
* **When** the player is loaded
* **Then** the player scales correctly to fit the container bounds
* **And** no layout overflow, text clipping, or rendering errors occur
