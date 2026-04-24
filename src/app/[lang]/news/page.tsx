import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getPageContent } from '@/content/pages';
import { getNewsPosts } from '@/content/news';
import { isLocale, Locale } from '@/lib/i18n';

function getString(data: Record<string, unknown>, key: string, fallback = '') {
  const v = data[key];
  return typeof v === 'string' ? v : fallback;
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const [{ data }, posts] = await Promise.all([getPageContent('news', locale), getNewsPosts(locale)]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading eyebrow={getString(data, 'eyebrow')} title={getString(data, 'title')} description={getString(data, 'description')} />

      <section className="mt-10 space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    <Link href={`/${locale}/news/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  {post.date && <p className="mt-1 text-xs text-slate-500">{post.date}</p>}
                  {post.summary && <p className="mt-3 text-sm leading-7 text-slate-600">{post.summary}</p>}
                </div>
                <Link href={`/${locale}/news/${post.slug}`} className="shrink-0 rounded px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">
                  {locale === 'zh' ? '阅读' : 'Read'}
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? '动态待补充' : 'News to be added'}</p>
          </div>
        )}
      </section>
    </div>
  );
}

