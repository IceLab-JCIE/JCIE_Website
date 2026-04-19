# SZU-UoS JCIE Website

A reusable Next.js + Tailwind website scaffold for the SZU-UoS JCIE joint lab.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Entry Points

Update lab content in:

- `src/content/site.ts`

Key pages:

- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/research/page.tsx`
- `src/app/join/page.tsx`

Shared layout/components:

- `src/app/layout.tsx`
- `src/components/site-header.tsx`
- `src/components/site-footer.tsx`
- `src/components/section-heading.tsx`

## Before Launch

Replace placeholders in `src/content/site.ts`:

- `siteConfig.url`
- `siteConfig.contactEmail`
- `siteConfig.applyFormUrl`
- `siteConfig.githubUrl`

## Deployment

Recommended: Vercel.

```bash
npm run build
```

Then connect the repo to Vercel and set the production domain.
