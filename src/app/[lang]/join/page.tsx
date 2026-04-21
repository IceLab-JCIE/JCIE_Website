import { notFound } from 'next/navigation';
import { ApplicationForm } from '@/components/application-form';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale } from '@/lib/i18n';

export default async function JoinPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const content = getSiteContent(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading eyebrow={content.labels.join} title={content.sections.joinPageTitle} description={content.sections.joinPageDescription} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]"><div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">{content.joinChecklist.map((item) => (<article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-lg font-semibold text-slate-950">{item.title}</h2><p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p></article>))}</div><ApplicationForm locale={locale} /></div>
    </div>
  );
}
