import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Locale } from '@/lib/i18n';
import { contentPath, FrontmatterData, readMarkdownFile } from '@/content/markdown';

async function fileExists(absPath: string) {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

export async function getPageContent(slug: string, locale: Locale): Promise<{ data: FrontmatterData; body: string }> {
  const mdxPath = contentPath('pages', `${slug}.${locale}.mdx`);
  const mdPath = contentPath('pages', `${slug}.${locale}.md`);

  const absPath = (await fileExists(mdxPath)) ? mdxPath : mdPath;
  if (!(await fileExists(absPath))) {
    throw new Error(`Missing page content: ${path.relative(process.cwd(), absPath)}`);
  }

  return readMarkdownFile(absPath);
}

