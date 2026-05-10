# People Page Layout Refresh (Design)

## Context
Current people page (`src/pages/[lang]/people/index.astro`) renders:
- Mentor: `grid-2` with `PersonCard` (non-compact)
- Members: `grid-4` with `PersonCard` (`compact`)

Feedback: overall look is not attractive; members cards feel sparse/flat.

## Goal
Adopt a mixed layout (C):
- Mentor remains information-rich and easy to read.
- Members becomes a more visually appealing card wall while still showing enough info to avoid “placeholder” feel.

## Non-goals
- No new data fields required in `people.yaml`.
- No search/filter in this iteration.
- No change to routing / i18n structure.

## Proposed UI
### Mentor section
- Keep 2-column layout (desktop) with detailed cards.
- Slightly improve visual hierarchy:
  - Make the avatar a bit larger.
  - Keep name + title + bio snippet + join year.

### Members section
- Switch to a “poster-like” card grid:
  - Desktop: 3 columns (instead of 4), to give each card more breathing room.
  - Tablet: 2 columns; mobile: 1 column.
- Each member card shows:
  - Larger avatar/photo
  - Name
  - Title/Direction (if present)
  - Join year (if present)

## Implementation Notes
- Extend `PersonCard` with a new variant (e.g. `variant="memberGrid"` or `mode="grid"`) rather than only `compact`.
- Update `src/pages/[lang]/people/index.astro`:
  - Mentor uses `PersonCard` in “mentor/detail” mode.
  - Members uses `PersonCard` in “member grid” mode and uses a new grid class (e.g. `.people-grid`).
- Add minimal CSS in `src/styles/main.css`:
  - `.people-grid` layout rules (3/2/1 columns).
  - Member-card-specific styling (larger avatar, tighter spacing, hover affordance).

## Acceptance Criteria
- `/people/` mentor section remains easy to read and looks more polished.
- Members section becomes less cramped and shows title/year where available.
- No layout regressions on mobile.

