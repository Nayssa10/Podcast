# Specification: Audio Player Widget (`audio-player`)

## Purpose
Custom React audio player widget embedded inside the Episodes list.

## Requirements
| ID | Requirement | RFC 2119 |
|---|---|---|
| REQ-AP-001 | MUST display the current active track title. | MUST |
| REQ-AP-002 | MUST allow the user to play and pause the active track. | MUST |
| REQ-AP-003 | MUST allow scrubbing/seeking of the active track progress. | MUST |
| REQ-AP-004 | MUST update and show the active track progress via a progress bar. | MUST |
| REQ-AP-005 | MUST be styled to match the Case File Folders, utilizing the `Courier Prime` typewriter font and a textured paper background. | MUST |
| REQ-AP-006 | SHOULD handle audio load and playback errors gracefully. | SHOULD |
| REQ-AP-007 | The Audio Player MUST fit and scale inside the compact mini folders (width ~280px-300px) and the modal folder panels without overflow. | MUST |

## Scenarios

### Scenario 1: Track Playback Control
* **Given** an episode track is selected and loaded
* **When** the user clicks the play/pause button
* **Then** the audio playback toggles between playing and paused states
* **And** the play/pause button icon updates accordingly

### Scenario 2: Progress Tracking and Scrubbing
* **Given** a track is currently playing
* **When** the track time updates or the user seeks on the progress bar
* **Then** the visual progress bar and time indicator reflect the new track position

### Scenario 3: Active Track Title Display
* **Given** a user selects a track from the Episodes list
* **When** the track starts loading or playing
* **Then** the audio player widget displays the correct track title

### Scenario 4: Case File Folder Theme Integration
* **Given** an episode track is selected and displayed within a folder tab panel
* **When** the audio player widget is rendered
* **Then** it displays with a textured paper background matching the folder interior
* **And** it utilizes the `Courier Prime` typewriter typography for track details and timing indicators

### Scenario 5: Audio Player Scale inside Cards and Modal Panels
* **Given** an audio player is rendered within an episode card (width ~280px-300px) or inside the modal folder panels
* **When** the player is loaded
* **Then** the player scales correctly to fit the container bounds
* **And** no layout overflow, text clipping, or rendering errors occur

