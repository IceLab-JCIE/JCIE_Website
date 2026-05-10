# Home Publications CTA Simplification (Design)

## Context
On the homepage (`src/pages/[lang]/index.astro`), the “Publications” section currently uses a decorative CTA card (`.home-cta`) with a left icon and supporting text plus a right-side link button.

The user feedback is that the icon looks unattractive, and the CTA card itself is unnecessary.

## Goal
Keep the Publications section heading (title/description) as-is, but replace the CTA card with a single primary button that links to the Publications list page.

## Non-goals
- Do not redesign the Publications page itself.
- Do not change the SectionHeading content.
- Do not introduce new icons/illustrations.

## Proposed UI
- Keep the existing `SectionHeading` for Publications.
- Remove the `.home-cta` card block under the heading.
- Add a simple button row below the heading:
  - One centered primary button: “查看更多论文” / “View More Publications” (existing i18n string `p.publications_card_button`)
  - Link target remains `/publications/` via `langPath(lang, "/publications/")`.

## Implementation Notes
- Update `src/pages/[lang]/index.astro` to remove the `home-cta` markup and replace with a lightweight wrapper (e.g. `<div style="margin-top:18px; text-align:center;"> ... </div>`).
- Reuse existing `btn btn-primary` styles; avoid adding new CSS unless spacing needs it.

## Acceptance Criteria
- Homepage shows Publications SectionHeading unchanged.
- Beneath it, only one primary button is displayed (no card, no icon).
- Button navigates to the correct localized publications route.

