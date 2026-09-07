# Technical Design: Cosmic Book Modal (`cosmic-book-modal`)

This document outlines the architecture, data flow, and file changes required to implement the immersive Gothic Scrapbook & Detective Case Board theme for the episode detail modals.

## Technical Approach

We will enhance the existing client-side `Home` component to support dynamic modal theme switching.
- **Toggle State & Persistence**: Introduce a React state variable `layoutMode: 'classic' | 'gothic'`. To avoid hydration mismatch during SSR, initialize it to `'classic'` and sync from `localStorage` in a mount `useEffect`.
- **Thematic Scrapbook Layout**: When `layoutMode` is `'gothic'` and the episode is a `Lectura` (book type), render a scrapbook layout containing a Polaroid cover with a metal clip on the left page, and a simulated book page containing highlighted text snippets and cursive margin annotations on the right page.
- **Thematic Detective Layout**: When `layoutMode` is `'gothic'` and the episode is a `Criminalística` (forensic type), render a dark leather folder containing loose typewriter case file sheets and a metallic Special Investigations Unit (SIU) badge plaque.

---

## Architecture Decisions

| Option | Tradeoff | Decision |
|---|---|---|
| **State Storage** | `localStorage` provides persistent state but can cause Next.js SSR hydration mismatch if read during initialization. | React State with post-mount sync via `useEffect` from `localStorage`. |
| **Snippet Rendering** | Custom regex replacement vs pre-split arrays. | Dynamic RegExp helper in `page.tsx` to highlight specified substrings. |
| **Styling Assets** | SVG images vs pure CSS gradients for leather/metallic textures. | Pure CSS using gradients, shadows, and borders to keep asset footprint at zero. |

---

## Data Flow

```
+-------------------------------------------------+
|            Root State (Home / page.tsx)         |
|  - selectedEpisodeIndex (number | null)         |
|  - activeTab ('book' | 'forensic')              |
|  - layoutMode ('classic' | 'gothic') <------+   |
+-------------------------------------------------+   |
                         |                            |
                         v                            |
          +-------------------------------+           |
          |       Episode Modal           |           |
          +-------------------------------+           |
                         |                            |
            +------------+------------+               |
            |                         |               |
            v                         v               |
     [Classic Layout]          [Gothic Layout]        |
     - Book pages              - Scrapbook            |
     - Manila folder           - Detective folder     |
            |                         |               |
            +------------+------------+               |
                         |                            |
                         v                            |
              [Layout Toggle Button] -----------------+
              (Triggers toggleLayoutMode)
```

---

## Interfaces / Contracts

We will update the `Episode` data model (implicit inside `MOCK_EPISODES` array) to support romance-thriller snippets and handwritten margin annotations:

```typescript
interface Snippet {
  text: string;
  highlights?: string[];
}

interface Annotation {
  text: string;
  position: string; // Vertical percentage offset (e.g. "15%")
}

interface Episode {
  number: string;
  date: string;
  title: string;
  type: "book" | "forensic";
  description: string;
  url: string;
  duration: string;
  bookDetails: {
    title: string;
    author: string;
    description: string;
    coverIcon: string;
  };
  forensicDetails: {
    criminologyDetails: string;
    keyPhysicalEvidence: string[];
    forensicFocus: string;
  };
  snippet?: Snippet;
  annotations?: Annotation[];
}
```

---

## File Changes

### 1. `src/app/page.tsx`
- **Data Insertion**: Inject mock romance-thriller `snippet` and margin `annotations` fields into the three items in `MOCK_EPISODES`.
- **Layout State Hook**: Add `layoutMode` state inside the `Home` component.
- **Sync Hook**: Use a mount-effect to sync `layoutMode` from `localStorage.getItem("supernova-layout-mode")`.
- **Highlight Helper**: Implement a helper function `renderHighlightedSnippet(text: string, highlights: string[])` to wrap matches in `<mark className={styles.gothicHighlight}>`.
- **Modal Toggle**: Add a button `styles.layoutToggleBtn` inside the modal overlays allowing real-time layout swapping.
- **Thematic Views**: Inside the modal wrapper, conditionally render either the Classic elements (`.openBookSimple`, `.manilaFolder`) or the Gothic elements based on `layoutMode`.

### 2. `src/app/page.module.css`
- **Toggle Control Styles**: Position and style the layout switcher button.
- **Scrapbook Theme Styles**:
  - `.gothicPolaroid`: Polaroid white border and box-shadow.
  - `.metalClip`: Metal binder clip at the top of the polaroid using silver gradients.
  - `.gothicSnippetContainer`: Stylized book page font and line height.
  - `.gothicHighlight`: Deep cream highlight marker color.
  - `.marginAnnotation`: Positioned using `top` percentage, styled with `font-family: var(--font-family-script)` and rotated slightly.
- **Detective Theme Styles**:
  - `.detectiveWallet`: Deep dark brown leather texture (`radial-gradient` + grainy box-shadow).
  - `.siuBadge`: Metallic bronze plaque with raised double border and gold lettering.
  - `.looseSheet`: Stacked layout sheets using offsets and subtle rotations.

---

## Testing Strategy

Since no automated test runner is configured, follow this manual verification plan:

1. **Layout Switching**: Open a modal and click the toggle button. Check that it swaps layouts instantly.
2. **Gothic Lectura layout**: Toggle EP 02 to Gothic. Verify:
   - Polaroid cover with a realistic metal clip on the left.
   - Highlighted text and cursive notes in the margin of the right page.
3. **Gothic Criminalística layout**: Toggle EP 01 to Gothic. Verify:
   - Dark folder background and SIU badge.
   - Typewriter font details on overlapping sheets of paper.
4. **State Persistence**: Enable Gothic layout, close the modal, and open another episode card. Verify that it opens directly in the Gothic layout. Reload the page and verify persistence.
