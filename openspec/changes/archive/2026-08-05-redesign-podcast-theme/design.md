# Technical Design: Visual Redesign for team SUPERNOVA (`redesign-podcast-theme`)

## Technical Approach
We will implement high-fidelity skeuomorphism using pure CSS to provide an immersive "Detective's Desk" / "Crime Board" aesthetic. By avoiding heavy images and relying on CSS gradients, transforms, filters, and standard inline SVGs, we preserve page performance, visual fidelity, and responsiveness. Next.js state will handle interactive tab switching for case file folders.

## Architecture Decisions

| Feature | Tradeoffs / Alternatives | Decision & Rationale |
| :--- | :--- | :--- |
| **Font Loading** | System monospace vs. Google Fonts load. | Load `Courier_Prime` from Google Fonts in `src/app/layout.tsx` and expose it as `--font-courier`. Ensures a consistent typewriter look on all user platforms. |
| **Logo Styling** | Standard image vs. CSS blending. | Apply `filter: sepia(0.35) contrast(1.1) brightness(0.95); mix-blend-mode: multiply;` to `/logo.png`. Integrates the image seamlessly into the crema `#F9F6F0` background. |
| **Case File Folders** | Flat cards vs. interactive tabs. | Track `activeTab` per episode in `src/app/page.tsx` ('book' \| 'forensic'). Style folder containers using CSS pseudo-elements for paper clips, radial-gradients for coffee stains, and slanted red confidential stamps. |
| **Crime Board Socials** | Linear list vs. absolute polaroid yarn grid. | Place polaroids with rotation under 5° and Monsieur La Doulaise handwritten captions. Connect cards using an overlay SVG container drawing `line` paths representing red yarn thread. |
| **Notepad Contact Form** | Modern boxed inputs vs. ruled paper page. | Style contact form with horizontal notebook lines using CSS `linear-gradient`. Inputs will be styled with transparent backgrounds, border-bottom lines, and `Courier Prime` typewriter text. |

## Data Flow & State
```mermaid
graph TD
    A[User Clicks Episode Tab] --> B{Tab Target?}
    B -->|Libro Relacionado| C[Update activeTab[epId] = 'book']
    B -->|Informe Forense| D[Update activeTab[epId] = 'forensic']
    C --> E[Render Book Details & Audio Player]
    D --> F[Render Forensic Criminology Details]
```

## Interfaces & Contracts

### Episode Tab State
```typescript
interface EpisodeTabState {
  [episodeIndex: number]: 'book' | 'forensic';
}
```

### Mock Episode Schema Extensions
```typescript
interface ExtendedEpisode {
  title: string;
  description: string;
  url: string;
  duration: string;
  date: string;
  number: string;
  bookDetails: {
    title: string;
    author: string;
    review: string;
  };
  forensicDetails: {
    caseSummary: string;
    evidence: string[];
    investigationNotes: string;
  };
}
```

## File Changes

### 1. `src/app/layout.tsx`
- Load `Courier_Prime` alongside existing fonts.
- Add `${courierPrime.variable}` to the `<html>` tag class list.

### 2. `src/app/globals.css`
- Define `--font-courier` using `var(--font-courier)` within `:root`.
- Add custom global styles for typewriter typography and desk canvas settings.

### 3. `src/app/page.tsx`
- Maintain `activeTabs` state map initialized to `'book'`.
- Update header and hero sections to display `/logo.png` with custom filters.
- Extend `MOCK_EPISODES` with book and forensic details.
- Render interactive tab buttons and panels inside each episode card.
- Build the "Crime Board" section housing Polaroid cards and the SVG connector line overlay.
- Wrap the contact form section inside a notepad layout wrapper.

### 4. `src/app/page.module.css`
- **Case Files**: Add styles for folder tab layout, paper clips (via double border pseudo-elements), coffee stains (`radial-gradient`), and slanted "CONFIDENTIAL" stamps (`transform: rotate(-6deg)`).
- **Crime Board**: Style absolute polaroids with shadow and CSS rotation transforms (<= 5deg). Provide style classes for the absolute-positioned SVG overlay and yarn lines.
- **Notepad Form**: Define ruled paper background `linear-gradient(to bottom, transparent 95%, #E5DDD3 95%)` and `line-height: 2rem`.

### 5. `src/components/ContactForm.tsx`
- Bind input elements to use ruled line typewriter input styles.

### 6. `src/components/AudioPlayer.tsx`
- Adapt container borders, fonts, and colors to blend with the folder interior paper style.

## Testing Strategy
- **Visual Checks**: Ensure skeuomorphic card rotation does not cause horizontal page overflow.
- **Contrast Check**: Validate text readability over coffee stains and yellowed paper (minimum contrast 4.5:1).
- **Responsive Stack**: Check that on viewports < 768px, rotations reset to 0, polaroids stack vertically, and folder tabs scale properly.
