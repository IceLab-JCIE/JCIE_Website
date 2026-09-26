---
name: jcie-site-editor
description: Use when an editor asks what the JCIE website agent can do, or asks to add, revise, remove, preview, or publish JCIE website content.
---

# JCIE site editor

Use the repository's `CONTENT_GUIDE.md` as the current capability list, editor input guide, and source map. Confirm relevant paths and the deployment workflow in the checkout before changing anything.

## Capability questions

When asked “你能做什么”, “怎么更新网站”, or similar, answer from `CONTENT_GUIDE.md`: supported content operations, what the editor should provide, how publication works, and the boundaries. This is read-only. Do not imply that a file watcher, CMS, or Bilibili upload integration exists.

## Content changes

- Check Git status and current remote branch before editing. Preserve other contributors' changes; use an isolated checkout if necessary.
- Before creating an entry, search for its existing slug, title, and source URL or BV ID. If the same content is already on the publication branch, verify the live page and report it instead of creating a duplicate. Ask which fields to change if the editor wants an update.
- Follow the real source of truth: news, video, and event entries are paired `src/content/news/zh|en/*.md` files with the same slug; outstanding alumni detail pages are paired `src/content/alumni/zh|en/*.md`; people, publications, and projects come from `xlsx/site.xlsx`; homepage and join copy come from `src/content/home/` and `src/content/join/`; site-wide settings come from `data/site.yaml`.
- Keep the editor's supplied title, date, names, links, and claims exact. Ask for missing facts that cannot be verified; a video link alone does not establish the editor's intended site title or display date. If English text is not supplied, translate conservatively and identify it as an agent draft in the handoff. For Bilibili videos, use the BV ID and canonical video URL, without tracking parameters; the repository embeds existing videos but does not upload them.
- Update both language variants when a paired entry changes. For removals, check incoming references and explain that the old URL will return 404 unless a redirect is separately requested and implemented.
- Run the relevant importer or `npm run build`, inspect affected generated routes, and check the exact diff. The build may rewrite generated `data/people.yaml`, `data/publications.yaml`, and `data/projects.yaml`; do not stage those files when the requested change is sourced from `xlsx/site.xlsx`.
- If the editor requests an online update, commit only the intended files, push using a non-forcing workflow to the branch named in `.github/workflows/deploy.yml`, verify the deployment run, and check the live page or removal. If the request is for a draft or preview, leave it unpublished. Report the commit, URL, and any unverified external playback or link behavior.

For design changes, new features, new data pipelines, or bulk extraction from unstructured documents, handle them as separate development tasks. This skill does not grant repository permissions or make unsupported source claims reliable.
