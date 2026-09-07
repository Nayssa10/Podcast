# Proposal: Visual Redesign for team SUPERNOVA (`redesign-podcast-theme`)

## Intent
Elevate visual identity by integrating the brand logo and establishing a custom, immersive "Detective's Desk" / "Crime Board" aesthetic linking books and criminalistics.

## Scope
| In Scope | Out of Scope |
| :--- | :--- |
| • Add Google Font `Courier Prime` for typewriter style text.<br>• Logo placement in Header and Hero using proper blend-modes.<br>• Interactive "Case File Folders" for Episodes with tabs, paper clips, coffee stains (using pure CSS / SVGs).<br>• Folder contents: "Libro Relacionado", "Informe Forense" (criminology details), and the Audio Player.<br>• "Crime Board" style Contact & Socials: Pinned Polaroids with red yarn, and contact form styled as notepad page. | • Real database integration for contact form submissions. |

## Capabilities
* **New Capabilities**: None.
* **Modified Capabilities**:
  * `site-landing`: Refactor index/landing page structure, CSS global/module classes, adding typewriter styling, skeuomorphic desk elements, folders, crime board layout, and logo image.
  * `audio-player`: Restyle container to match the detective desk / case file folder theme.

## Approach
Implement high-fidelity skeuomorphism via pure CSS to maintain performance:
* **Global Canvas**: Add Courier Prime font. Style background/grid to simulate a wooden desk layout.
* **Interactive Folders**: CSS tabs, SVGs for paper clips, radial-gradient/mask CSS for coffee stains, and custom folder layouts.
* **Crime Board**: SVG paths/lines representing red yarn connecting rotated Polaroids.
* **Contact Notepad**: Styled notebook paper grid background with border-bottom inputs.

## Affected Areas
* [layout.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx) (Font load)
* [globals.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css) (Font variable, global theme rules)
* [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) (Logo, section structures, interactive state)
* [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) (Desk, folder, polaroid, yarn styling)
* [AudioPlayer](file:///home/nayssakristel/Proyectos/Podcast/src/components/AudioPlayer.tsx) (Audio widget container styles)
* [ContactForm](file:///home/nayssakristel/Proyectos/Podcast/src/components/ContactForm.tsx) (Input lines, notepad styling)

## Risks & Mitigations
* **Risk**: Skeuomorphic elements and rotations breaking mobile layout.
* **Mitigation**: Media queries (< 768px) to flatten layouts, remove/reduce rotations, and stack components vertically.

## Rollback Plan
* Revert to previous Git commit: `git reset --hard HEAD~1` (or stable pre-change commit).

## Dependencies
* Google Fonts API (Courier Prime font family).

## Success Criteria
* **Layout Integrity**: No horizontal overflow on desktop or mobile.
* **Visual Appeal**: Detective desk theme correctly styled (typewriter font, folders, polaroids, red yarn).
* **Usability**: Interactive folder tabs and audio controls fully functional.
