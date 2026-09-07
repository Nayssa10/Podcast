## Exploration: Hero Logo and Mini Manila Folder Episodes Grid Refactoring

### Current State
1. **Hero Section Logo**: The centerpiece logo image (`/logo.png`) has a maximum width of `450px`, leaving excessive empty space on its sides on desktop displays.
2. **Episodes Grid**: The list of episodes is rendered using flat cards styled via the `.episodeCard` class in a 3-column layout. The grid spans the full width of the parent container without any constraints on larger screens. Additionally, the flat cards do not mirror the Manila folder aesthetics of the details modal.

### Affected Areas
- [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) — Needs markup updates to structure each episode card as a mini Manila folder with a tab, paperclip, coffee stain, and typewriter elements. Button text needs to be changed to "Saber más".
- [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) — Needs styling updates to scale the hero logo (`max-width: 700px` on desktop) and new classes for the mini Manila folder (`.miniFolder`, `.miniFolderTab`, `.miniFolderPaper`, etc.) with compact padding (`1.25rem`) and font sizes. Also needs a `max-width: 960px` constraint for the `.episodesList` container.

### Approaches

1. **Approach 1: Mutate and Overload Existing Card Classes**
   - Attempt to repurpose existing `.episodeCard` classes to morph them into Manila folders, adjusting padding and height dynamically.
   - **Pros**:
     - Keeps markup class names unchanged in `src/app/page.tsx`.
   - **Cons**:
     - Harder to separate full-size folder modal styling from the mini-folder grid card styling, increasing CSS complexity and risk of layout regressions.
     - Hard to customize responsive behavior separately.
   - **Effort**: Medium

2. **Approach 2: Create Dedicated Mini Folder Styling Classes (Recommended)**
   - Introduce dedicated mini folder selectors (`.miniFolder`, `.miniFolderPaper`, `.miniFolderTab`, `.miniPaperClip`, `.miniCoffeeStain`) in `src/app/page.module.css` and use them in the episodes grid loop in `src/app/page.tsx`.
   - **Pros**:
     - Complete separation of concerns: card grid mini folders won't conflict with modal full-size folders.
     - Easy implementation of folder tab decorations, coffee stains, paperclips, and responsive resets.
     - Highly maintainable and visually clean.
   - **Cons**:
     - Adds a few new CSS rules.
   - **Effort**: Low-Medium

### Recommendation
We recommend **Approach 2**. Defining clean, dedicated classes for the compact folders gives us granular control over paddings, typography, and skeuomorphic elements (like the mini paperclip and coffee stains) without risking layout breaking in the details modal. It also makes responsive scaling and rotation adjustments simple.

### Risks
- **Grid Overflow on Mobile**: With typewriter font (monospace) on descriptions and a 1-column layout on mobile, the height could stretch if text is too long. We will mitigate this using CSS line clamping (`-webkit-line-clamp`) or restricting description line lengths.

### Ready for Proposal
Yes
