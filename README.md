# Astro Site (JCIE Website)

This folder contains the Astro implementation intended for GitHub Pages deployment under:

`https://icelab-jcie.github.io/JCIE_Website/`

## What To Edit (Maintenance)

- Site-wide info: `data/site.yaml`
- Projects (single file): `data/projects.yaml`
- Publications (single file): `data/publications.yaml`
- News posts (one file per post, per language): `src/content/news/zh/*.md` and `src/content/news/en/*.md`
- People (single file): `data/people.yaml`
- Join page: `src/content/join/zh.md` and `src/content/join/en.md`

Images:

- People photos: `public/people/*` (referenced as `/people/<file>.png`)

## XLSX Import (Optional)

If you prefer maintaining `people/publications/projects` in a single XLSX, import it into Hugo data files:

```bash
python scripts/import_xlsx.py path/to/data.xlsx --root .
```

Sheets required: `people`, `publications`, `projects`.

GitHub Pages build:

- If `xlsx/site.xlsx` exists in the repo, GitHub Actions will automatically run the import step before `npm run build`.

## Local Preview

```bash
npm ci
npm run dev
```

## Deployment

GitHub Actions builds Astro from repo root and deploys `./dist` to GitHub Pages.
