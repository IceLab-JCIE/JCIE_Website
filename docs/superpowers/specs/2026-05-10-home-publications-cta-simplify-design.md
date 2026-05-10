# Home Publications CTA Simplification (Design)

## Context
On the homepage (`src/pages/[lang]/index.astro`), the “Publications” section originally used a decorative CTA card (`.home-cta`) with an icon and a button.

User feedback: the card/icon feels unnecessary, and a single centered button below the heading looks a bit abrupt.

## Goal
Keep the Publications section heading (title/description) as-is, but replace the CTA card with a single, clickable “view more” action on the right side of the heading title that links to the Publications list page.

## Non-goals
- Do not redesign the Publications page itself.
- Do not change the Publications SectionHeading title/description content.
- Do not introduce new icons/illustrations for this CTA.

## Proposed UI
- Keep the existing `SectionHeading` for Publications.
- Remove the `.home-cta` card block under the heading.
- Do not show a centered button row below the heading.
- Add a right-aligned heading action link:
  - Label: `{p.publications_card_button} →` (localized; reuse existing i18n string)
  - Href: `langPath(lang, "/publications/")`
  - Responsive: on narrow widths, the action can wrap onto the next line while staying associated with the title.

## Implementation Notes
- Extend `src/components/SectionHeading.astro` with optional props:
  - `actionHref?: string`
  - `actionLabel?: string`
- Render the title row as a flex layout when `actionHref && actionLabel` is present.
- Add minimal styling in `src/styles/main.css` for:
  - `.section-title-row` (flex layout + wrap)
  - `.section-title-action` (link styling, hover, focus-visible)
- Update `src/pages/[lang]/index.astro`:
  - Replace the Publications CTA block with just the Publications `SectionHeading` + action props.
  - Remove the centered primary button under the heading.

## Acceptance Criteria
- Publications SectionHeading remains (same title/description).
- No `.home-cta` card and no centered button is displayed under the Publications heading.
- A clickable action link appears to the right of the Publications title and navigates to the localized Publications route.

