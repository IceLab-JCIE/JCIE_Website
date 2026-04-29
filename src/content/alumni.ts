import { promises as fs } from 'node:fs';
import path from 'node:path';
import { contentPath, readMarkdownFile } from '@/content/markdown';
import type { Alumni, Publication } from '@/data/members';

function getString(data: Record<string, unknown>, key: string) {
  const v = data[key];
  return typeof v === 'string' ? v : undefined;
}

function getPublications(data: Record<string, unknown>): Publication[] {
  const v = data.publications;
  if (!Array.isArray(v)) return [];

  return v
    .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
    .map((item) => ({
      title: typeof item.title === 'string' ? item.title : '',
      venue: typeof item.venue === 'string' ? item.venue : '',
      year: typeof item.year === 'number' ? item.year : 0,
      link: typeof item.link === 'string' ? item.link : undefined,
    }))
    .filter((p) => p.title && p.venue && p.year > 0);
}

function filenameToId(filename: string) {
  return filename.replace(/\.mdx?$/, '');
}

export async function getAlumni(): Promise<Alumni[]> {
  const zhDir = contentPath('alumni', 'zh');
  const enDir = contentPath('alumni', 'en');

  // Check if directories exist
  try {
    await fs.stat(zhDir);
  } catch {
    return [];
  }

  const [zhEntries, enEntries] = await Promise.all([
    fs.readdir(zhDir, { withFileTypes: true }),
    fs.readdir(enDir, { withFileTypes: true }).catch(() => [] as import('node:fs').Dirent[]),
  ]);

  const zhFiles = zhEntries
    .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')))
    .map((e) => e.name);

  const enFiles = enEntries
    .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')))
    .map((e) => e.name);

  const map = new Map<string, Alumni>();

  for (const file of zhFiles) {
    const absPath = path.join(zhDir, file);
    const { data } = await readMarkdownFile(absPath);
    const id = (getString(data, 'id') ?? filenameToId(file)).trim();
    if (!id) continue;

    const name = (getString(data, 'name') ?? '').trim();
    if (!name) continue;

    map.set(id, {
      id,
      name,
      destination: getString(data, 'destination')?.trim(),
      publications: getPublications(data),
    });
  }

  for (const file of enFiles) {
    const absPath = path.join(enDir, file);
    const { data } = await readMarkdownFile(absPath);
    const id = (getString(data, 'id') ?? filenameToId(file)).trim();
    if (!id) continue;

    const current = map.get(id);
    if (!current) continue;

    current.nameEn = (getString(data, 'name') ?? '').trim();
    current.destinationEn = getString(data, 'destination')?.trim();

    map.set(id, current);
  }

  return Array.from(map.values()).toSorted((a, b) =>
    (a.nameEn || a.name).localeCompare(b.nameEn || b.name)
  );
}