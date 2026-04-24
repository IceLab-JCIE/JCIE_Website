import { promises as fs } from 'node:fs';
import path from 'node:path';
import { contentPath, readMarkdownFile } from '@/content/markdown';

export type PublicationArea = 'EDA' | 'LCA';

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  area: PublicationArea;
  link?: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

export async function getPublications(): Promise<Publication[]> {
  const dir = contentPath('publications');
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = entries
    .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')))
    .map((e) => path.join(dir, e.name));

  const pubs: Publication[] = [];

  for (const file of files) {
    const { data } = await readMarkdownFile(file);

    const id = typeof data.id === 'string' ? data.id : path.basename(file).replace(/\.mdx?$/, '');
    const title = typeof data.title === 'string' ? data.title : '';
    const venue = typeof data.venue === 'string' ? data.venue : '';
    const year = typeof data.year === 'number' ? data.year : Number(data.year);
    const area = data.area === 'LCA' ? 'LCA' : 'EDA';
    const authors = isStringArray(data.authors) ? data.authors : [];
    const link = typeof data.link === 'string' ? data.link : undefined;

    if (!id || !title || !venue || !Number.isFinite(year) || authors.length === 0) continue;
    pubs.push({ id, title, venue, year, area, authors, link });
  }

  return pubs;
}

