import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Locale } from '@/lib/i18n';
import { contentPath, readMarkdownFile } from '@/content/markdown';

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  body: string;
};

function slugFromFilename(filename: string) {
  const base = filename.replace(/\.mdx?$/, '');
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function dateFromFilename(filename: string) {
  const match = /^(\d{4}-\d{2}-\d{2})-/.exec(filename);
  return match?.[1] ?? '';
}

export async function getNewsPosts(locale: Locale): Promise<NewsPost[]> {
  const dir = contentPath('news', locale);
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = entries
    .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')))
    .map((e) => e.name);

  const posts: NewsPost[] = [];
  for (const name of files) {
    const absPath = path.join(dir, name);
    const { data, body } = await readMarkdownFile(absPath);
    const slug = slugFromFilename(name);
    const title = typeof data.title === 'string' ? data.title : slug;
    const date = typeof data.date === 'string' ? data.date : dateFromFilename(name);
    const summary = typeof data.summary === 'string' ? data.summary : undefined;
    posts.push({ slug, title, date, summary, body });
  }

  return posts.toSorted((a, b) => (b.date || '').localeCompare(a.date || '') || a.slug.localeCompare(b.slug));
}

export async function getNewsPost(locale: Locale, slug: string): Promise<NewsPost | null> {
  const posts = await getNewsPosts(locale);
  const match = posts.find((p) => p.slug === slug);
  return match ?? null;
}

