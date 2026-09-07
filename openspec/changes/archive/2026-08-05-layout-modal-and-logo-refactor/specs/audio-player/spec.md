# Delta Specification: Audio Player Widget (`audio-player`)

## Purpose
Ensure the Audio Player widget renders correctly and scales inside both the compact episode cards and the modal folder panels.

## MODIFIED Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-AP-007 | The Audio Player MUST render correctly and scale inside both the grid cards and the modal folder panels. | MUST |

## MODIFIED Scenarios

### Scenario 5 (Modified): Audio Player Scale inside Cards and Modal Panels
* **Given** an audio player is rendered within an episode card or inside the modal folder panels
* **When** the parent container width changes or adapts to the screen size
* **Then** the player scales correctly to fit the container bounds
* **And** no layout overflow, text clipping, or rendering errors occur
