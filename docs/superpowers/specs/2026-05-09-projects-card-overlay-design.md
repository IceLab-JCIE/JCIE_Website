# Projects Card Overlay (Remove Inner White Content Panel)

Date: 2026-05-09

## Goal

On the projects page, remove the inner white "glass" content panel inside each project card, and place text directly on top of the card background art, while keeping readability.

Constraints:

- Keep the outer card container (rounded corners, border, hover, background art).
- Do not change component markup (CSS-only approach).
- Readability is ensured via a subtle gradient scrim plus text shadow.
- Scrim intensity may vary slightly by project area (EDA vs LCA).

## Current State

- Each card uses `.project-card` as an outer container with background and border.
- `.project-card-content` adds a semi-opaque white panel with border, blur, and shadow.

## Proposed Changes (CSS Only)

1. Remove the inner panel styling from `.project-card-content`:
   - Remove `background`, `border`, `backdrop-filter`, `box-shadow`.
   - Keep spacing via existing `margin` and `padding` so layout does not collapse.

2. Add a full-card scrim using a pseudo-element:
   - Implement `::after` on `.project-card` (or `::before` if needed), positioned absolute and respecting border-radius.
   - Use a light vertical gradient (top mostly transparent; bottom slightly darker).
   - Scrim strength set via CSS variables and adjusted for `.project-card--blue` and `.project-card--teal`.
   - On hover, slightly increase scrim opacity rather than reintroducing a panel.

3. Improve text contrast:
   - Add `text-shadow` to title, summary, and lead lines inside `.project-card`.
   - Override `.muted` color within `.project-card` to a brighter value appropriate for overlay text.

4. Preserve existing badges/chips/buttons:
   - Keep current badge/chip/button styling unless contrast issues appear.
   - If needed, apply minimal scoped overrides inside `.project-card` only.

## Acceptance Criteria

- No inner white content panel appears inside any project card.
- Text remains readable across both light and complex background art, including on mobile.
- Hover feedback remains, but uses scrim/contrast changes instead of a white content panel.

