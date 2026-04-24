import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { Markdown } from '@/components/markdown';
import { getNewsPost, getNewsPosts } from '@/content/news';
import { isLocale, Locale, locales } from '@/lib/i18n';

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of locales) {
    const posts = await getNewsPosts(lang);
    for (const post of posts) params.push({ lang, slug: post.slug });
  }
  return params;
}

export default async function NewsPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const post = await getNewsPost(locale, slug);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading eyebrow={locale === 'zh' ? '动态' : 'News'} title={post.title} description={post.date} />

      <div className="mt-6">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          {locale === 'zh' ? '← 返回动态' : '← Back to News'}
        </Link>
      </div>

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
        <Markdown content={post.body} />
      </section>
    </div>
  );
}
