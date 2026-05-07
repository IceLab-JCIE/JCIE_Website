# Hugo Site (JCIE Website)

This folder contains the Hugo implementation intended for GitHub Pages deployment under:

`https://icelab-jcie.github.io/JCIE_Website/`

## What To Edit (Maintenance)

- Site-wide info: `data/site.yaml`
- Projects (single file): `data/projects.yaml`
- Publications (single file): `data/publications.yaml`
- News posts (one file per post, per language): `content/news/*.zh.md` and `content/news/*.en.md`
- People (single file): `data/people.yaml`
- Join page: `content/join/_index.zh.md` and `content/join/_index.en.md`

Images:

- People photos: `static/people/*` (referenced as `/people/<file>.png`)

## XLSX Import (Optional)

If you prefer maintaining `people/publications/projects` in a single XLSX, import it into Hugo data files:

```bash
python scripts/import_xlsx.py path/to/data.xlsx --root .
```

Sheets required: `people`, `publications`, `projects`.

GitHub Pages build:

- If `xlsx/site.xlsx` exists in the repo, GitHub Actions will automatically run the import step before `hugo --minify`.

## Local Preview

Install Hugo (extended) and run:

```bash
hugo server
```

## Deployment

GitHub Actions builds Hugo from repo root and deploys `./public` to GitHub Pages.
