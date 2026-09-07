# Tasks: Criminology Cards Folder Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~180 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | size-exception (fits easily in a single commit/PR) |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundations, Literature, and Criminology layout reversion | PR 1 | Applied as a single PR |

## Phase 1: Foundations & Literature Cards

- [ ] 1.1 Keep Satisfy font configurations in [`src/app/layout.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/layout.tsx) and [`src/app/globals.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/globals.css).
- [ ] 1.2 Modify `.episodesGrid` to revert to a 3-column desktop grid layout in [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css).
- [ ] 1.3 Modify `.episodeCard` in [`src/app/page.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.module.css) to revert to a vertical card structure.
- [ ] 1.4 Update [`src/app/page.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/app/page.tsx) to align literature card title (using Satisfy font), AudioPlayer, and details button vertically.

## Phase 2: Criminology Cards Reversion

- [ ] 2.1 Modify [`src/components/ForensicFolderCard.tsx`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ForensicFolderCard.tsx) to revert container wrapper and components to a vertical layout.
- [ ] 2.2 In [`src/components/ForensicFolderCard.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ForensicFolderCard.module.css), position `.stickyNote` absolutely to the top-left (`top: -15px`, `left: 8px`).
- [ ] 2.3 Style `.folderPaper` as a flex column with translucent cream background in [`src/components/ForensicFolderCard.module.css`](file:///home/nayssakristel/Proyectos/Podcast/src/components/ForensicFolderCard.module.css).
- [ ] 2.4 Align title (using Satisfy font), AudioPlayer, and action bar vertically inside the folder paper.
- [ ] 2.5 Style `.paperBottom` as a flex row containing the details button and decorators next to each other at the bottom.

## Phase 3: Verification

- [ ] 3.1 Run Next.js production build compiler command to verify build succeeds without lint or type errors.
- [ ] 3.2 Verify grid layout rendering on desktop and mobile viewports (collapsing to single column <= 768px).
- [ ] 3.3 Verify interactive button/modal behavior for literature cards and folder cards.
