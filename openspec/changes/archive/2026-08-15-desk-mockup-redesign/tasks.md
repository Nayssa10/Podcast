<Tasks: desk-mockup-redesign>
## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 250 - 350 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Not needed |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

## Phase 1: Foundation
- [x] 1.1 Update `src/app/globals.css` with CSS colors, typeface variables, background, and terracotta border utilities.
- [x] 1.2 Modify `src/app/page.module.css` to define the baseline styles for the container.

## Phase 2: Header & Dashboard Structure
- [x] 2.1 Update `src/app/page.tsx` layout to use a single-viewport CSS Grid container (`1fr 1fr` columns).
- [x] 2.2 Add Navbar and Q-Search bar mockup into the header section.
- [x] 2.3 Set up 2-column layout template wrappers for the left and right columns.
- [x] 2.4 Integrate `src/components/InteractiveLogo.tsx` within the header layout.

## Phase 3: Left Column Components
- [x] 3.1 Implement Dome banner script title with specific border-radius styling (`border-bottom-right-radius: 120px`).
- [x] 3.2 Create the tagline card component featuring a play button.
- [x] 3.3 Add the episodes list pills component to the left column structure.
- [x] 3.4 Integrate extra info text with `#ffffff` backgrounds and terracotta borders.

## Phase 4: Right Column Components
- [x] 4.1 Build the About text block in the right column.
- [x] 4.2 Create the 3 vertical cards side-by-side component for the Photos slider.
- [x] 4.3 Add category pills underneath the About text block.
- [x] 4.4 Implement co-host profiles avatars section.
- [x] 4.5 Update `src/components/ContactForm.tsx` so it can be used inside the thematic modals.

## Phase 5: Verification & Accessibility
- [x] 5.1 Audit component semantics and ensure proper HTML5 tag usage.
- [x] 5.2 Verify responsiveness (single-viewport on desktop, stacked layout on mobile).
- [x] 5.3 Ensure `prefers-reduced-motion` fallbacks are present for interactive elements.
- [x] 5.4 Perform a contrast audit, specifically for the terracotta and pink colors against their backgrounds.
</Tasks: desk-mockup-redesign>
