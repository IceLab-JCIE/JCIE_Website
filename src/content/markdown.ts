import { promises as fs } from 'node:fs';
import path from 'node:path';

export type FrontmatterData = Record<string, unknown>;

function parseScalar(raw: string): unknown {
  const value = raw.trim();
  if (!value) return '';

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;

  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

  return value;
}

export function parseFrontmatter(source: string): { data: FrontmatterData; body: string } {
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized };
  }

  const lines = normalized.split('\n');
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) return { data: {}, body: normalized };

  const fmLines = lines.slice(1, endIndex);
  const body = lines.slice(endIndex + 1).join('\n').replace(/^\n+/, '');

  const data: FrontmatterData = {};

  for (let i = 0; i < fmLines.length; i++) {
    const line = fmLines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const match = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!match) continue;

    const key = match[1];
    const rest = match[2] ?? '';

    if (rest.trim() === '') {
      const list: unknown[] = [];
      while (i + 1 < fmLines.length) {
        const next = fmLines[i + 1];
        const itemMatch = /^\s*-\s+(.*)$/.exec(next);
        if (!itemMatch) break;
        list.push(parseScalar(itemMatch[1] ?? ''));
        i++;
      }
      data[key] = list;
      continue;
    }

    data[key] = parseScalar(rest);
  }

  return { data, body };
}

export async function readMarkdownFile(absPath: string): Promise<{ data: FrontmatterData; body: string }> {
  const source = await fs.readFile(absPath, 'utf8');
  return parseFrontmatter(source);
}

export function contentPath(...segments: string[]) {
  return path.join(process.cwd(), 'src', 'content', ...segments);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeHref(href: string) {
  const v = href.trim();
  if (!v) return '#';
  if (v.startsWith('/') || v.startsWith('#')) return v;
  if (v.startsWith('mailto:')) return v;
  if (v.startsWith('https://') || v.startsWith('http://')) return v;
  return '#';
}

function inlineMarkdownToHtml(text: string) {
  let out = escapeHtml(text);

  out = out.replace(/`([^`]+)`/g, (_m, code) => {
    return `<code class="rounded bg-slate-100 px-1.5 py-0.5 text-[0.85em] text-slate-800">${escapeHtml(String(code))}</code>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');

  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, href) => {
    const safeHref = sanitizeHref(String(href));
    const safeLabel = escapeHtml(String(label));
    return `<a class="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500" href="${escapeHtml(
      safeHref
    )}">${safeLabel}</a>`;
  });

  return out;
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let paragraph: string[] = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim();
    if (text) {
      html += `<p class="mt-4 text-sm leading-7 text-slate-600">${inlineMarkdownToHtml(text)}</p>`;
    }
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html += '</ul>';
    inList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2] ?? '';
      const tag = `h${level}`;
      const cls =
        level === 1
          ? 'mt-10 text-2xl font-semibold tracking-tight text-slate-900'
          : level === 2
            ? 'mt-10 text-lg font-semibold text-slate-900'
            : 'mt-8 text-base font-semibold text-slate-900';
      html += `<${tag} class="${cls}">${inlineMarkdownToHtml(text)}</${tag}>`;
      continue;
    }

    const listMatch = /^-\s+(.*)$/.exec(line.trim());
    if (listMatch) {
      flushParagraph();
      if (!inList) {
        html += '<ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">';
        inList = true;
      }
      html += `<li>${inlineMarkdownToHtml(listMatch[1] ?? '')}</li>`;
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  return html;
}

