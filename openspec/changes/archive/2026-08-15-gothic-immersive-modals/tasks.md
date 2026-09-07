# Tasks: Gothic Immersive Modals

### Review Workload Forecast
Estimated lines: ~180 lines
Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Data Setup
- [x] 1.1 Update `MOCK_EPISODES` in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to ensure all episodes have robust values for the `snippet` (text, highlights) and `annotations` (text, position) properties.

## Phase 2: React Core Implementation & Cleanup
- [x] 2.1 Remove layout toggle states, `useEffect` hooks for local storage sync, and `layoutMode` references in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.2 Delete the layout toggle button JSX in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.3 Remove the classic modal rendering logic (`openBookSimple` and `manilaFolder` wrappers) from [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
- [x] 2.4 Update the modal overlay in [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to directly render the `Lectura` (scrapbook) layout for book episodes, and the `Criminalística` (case file) layout for forensic episodes based on the `isBook` condition.

## Phase 3: Scrapbook Styling
- [x] 3.1 Update global theme colors (warm cream paper, dusty blue, deep burgundy) in [globals.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css).
- [x] 3.2 Remove deprecated styles for `.openBookSimple` and associated child selectors in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 3.3 Define styles for the scrapbook container, pages, and book gutter shadow in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 3.4 Style the scrapbook Polaroid wrapper, translucent washi-tape overlay, handwritten cursive annotations, and SVG decorations in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 3.5 Implement CSS for the grey/blue wax seal with a centering icon and double-box-shadow 3D bevel effect in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 4: Detective Case File Styling
- [x] 4.1 Remove old styles for `.manilaFolder` and `.detectiveWallet` in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 4.2 Style the detective case file desktop background, report card sheet, and typewriter typography in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 4.3 Add CSS styles for realistic paperclips, warning stamps, and tan kraft paper notes with tape in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [x] 4.4 Style the red wax seal with relief effects and an embossed central letter in [page.module.css](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).

## Phase 5: Testing
- [x] 5.1 Verify Scenario 4 (layout toggle removed) by checking that no toggle button renders in any open episode detail modal.
- [x] 5.2 Verify Scenario 1 (scrapbook details) by checking the cream page background, polaroid tape, script fonts, and blue/grey wax seal in book episode modals.
- [x] 5.3 Verify Scenario 2 (case file details) by testing that forensic episodes show the desk background, warning stamps, paperclips, and red wax seal.
- [x] 5.4 Verify Scenario 5 & 6 (dismissal and lock) by testing backdrop click, ESC key close, and scrolling body lock on [page.tsx](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx).
