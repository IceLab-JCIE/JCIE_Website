import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getPageContent } from '@/content/pages';
import { getPublications, Publication } from '@/content/publications';
import { isLocale, Locale } from '@/lib/i18n';

function getString(data: Record<string, unknown>, key: string, fallback = '') {
  const v = data[key];
  return typeof v === 'string' ? v : fallback;
}

export default async function PublicationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const [{ data }, pubs] = await Promise.all([getPageContent('publications', locale), getPublications()]);

  const edaPubs = pubs
    .filter((p) => p.area === 'EDA')
    .toSorted((a, b) => (b.year - a.year) || a.venue.localeCompare(b.venue) || a.title.localeCompare(b.title));
  const lcaPubs = pubs
    .filter((p) => p.area === 'LCA')
    .toSorted((a, b) => (b.year - a.year) || a.venue.localeCompare(b.venue) || a.title.localeCompare(b.title));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow={getString(data, 'eyebrow', locale === 'zh' ? '论文' : 'Publications')}
        title={getString(data, 'title', locale === 'zh' ? '发表论文' : 'Published Papers')}
        description={getString(data, 'description')}
      />

      {/* AI for EDA */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">AI for EDA</h2>
        {edaPubs.length > 0 ? (
          <div className="mt-6 space-y-4">
            {edaPubs.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? 'EDA 论文待补充' : 'EDA publications to be added'}</p>
          </div>
        )}
      </section>

      {/* AI for LCA */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">AI for LCA</h2>
        {lcaPubs.length > 0 ? (
          <div className="mt-6 space-y-4">
            {lcaPubs.map((pub) => (
              <PublicationCard key={pub.id} pub={pub} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? 'LCA 论文待补充' : 'LCA publications to be added'}</p>
          </div>
        )}
      </section>

      {/* Note */}
      <section className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">{getString(data, 'note')}</p>
      </section>
    </div>
  );
}

function PublicationCard({ pub, locale }: { pub: Publication; locale: Locale }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-base font-medium text-slate-900">{pub.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{pub.authors.join(', ')}</p>
          <p className="mt-1 text-xs text-slate-500">
            {pub.venue}, {pub.year}
          </p>
        </div>
        {pub.link && pub.link !== '#' && (
          <Link href={pub.link} className="shrink-0 rounded px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">
            {locale === 'zh' ? '查看' : 'View'}
          </Link>
        )}
      </div>
    </article>
  );
}

