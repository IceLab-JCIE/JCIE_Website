import { markdownToHtml } from '@/content/markdown';

export function Markdown({ content }: { content: string }) {
  const html = markdownToHtml(content);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

