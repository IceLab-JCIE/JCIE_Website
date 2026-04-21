import { notFound } from 'next/navigation';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale } from '@/lib/i18n';

export default async function ResearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const content = getSiteContent(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading eyebrow={content.labels.research} title={content.sections.researchPageTitle} description={content.sections.researchPageDescription} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">{content.researchAreas.map((area) => (<article key={area.slug} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-2xl font-semibold text-slate-950">{area.title}</h2><p className="mt-4 text-base leading-8 text-slate-600">{area.summary}</p><ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">{area.bullets.map((bullet) => (<li key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">{bullet}</li>))}</ul></article>))}</div>
    </div>
  );
}
