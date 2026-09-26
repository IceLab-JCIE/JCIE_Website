# Astro Site (JCIE Website)

For editors and agents, start with [CONTENT_GUIDE.md](CONTENT_GUIDE.md). The repository also includes a shared `jcie-site-editor` skill under `.agents/skills/` for natural-language content updates.

This folder contains the Astro implementation intended for GitHub Pages deployment under:

`https://icelab-jcie.github.io/JCIE_Website/`

## What To Edit (Maintenance)

- Site-wide info: `data/site.yaml`
- People, projects, and publications: `xlsx/site.xlsx`
- Content Zone posts and videos (one file per entry, per language): `src/content/news/zh/*.md` and `src/content/news/en/*.md`
- Outstanding alumni profiles: `src/content/alumni/zh/*.md` and `src/content/alumni/en/*.md`
- Join page: `src/content/join/zh.md` and `src/content/join/en.md`

Images:

- People photos: `public/people/*` (referenced as `/people/<file>.png`)

## XLSX Import

People, publications, and projects are maintained in one XLSX and imported into the site's data files:

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
