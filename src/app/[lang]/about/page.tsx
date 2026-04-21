import { notFound } from 'next/navigation';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale } from '@/lib/i18n';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const content = getSiteContent(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading eyebrow={content.navigation[0].label} title={content.sections.aboutTitle} description={content.mission.summary} />
      <section className="mt-12 grid gap-6 lg:grid-cols-3">{content.mission.points.map((point) => (<article key={point} className="rounded-3xl border border-slate-200 bg-white p-6 text-base leading-8 text-slate-700 shadow-sm">{point}</article>))}</section>
      <section className="mt-16"><SectionHeading eyebrow={content.labels.beliefs} title={content.sections.aboutBeliefsTitle} description={content.sections.aboutBeliefsDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-3">{content.beliefs.map((item) => (<article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold text-slate-950">{item.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p></article>))}</div></section>
      <section className="mt-16"><SectionHeading eyebrow={locale === 'zh' ? '结构' : 'Structure'} title={content.sections.aboutStructureTitle} description={content.sections.aboutStructureDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">{content.roles.map((role) => (<article key={role.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-semibold text-slate-950">{role.title}</h3><p className="mt-3 text-base leading-8 text-slate-600">{role.description}</p></article>))}</div></section>
    </div>
  );
}
