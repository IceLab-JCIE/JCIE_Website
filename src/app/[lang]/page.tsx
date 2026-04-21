import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const content = getSiteContent(locale);

  return (
    <div>
      <section className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-18 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-cyan-700/15 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.hero.eyebrow}</span>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{content.hero.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{content.hero.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={content.hero.primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-900">{content.hero.primaryCta.label}</Link>
            <Link href={content.hero.secondaryCta.href} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-cyan-700 hover:text-cyan-800">{content.hero.secondaryCta.label}</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.hero.snapshotLabel}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6"><div className="text-3xl font-semibold text-slate-950">{stat.value}</div><div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">{stat.label}</div></div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-cyan-700/15 bg-cyan-50 p-6"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.hero.coreLabel}</p><p className="mt-3 text-base leading-8 text-slate-700">{content.hero.coreText}</p></div>
        </div>
      </section>
      <section id="mission" className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.navigation[3].label} title={content.mission.title} description={content.mission.summary} /><div className="mt-10 grid gap-6 lg:grid-cols-3">{content.mission.points.map((point) => (<div key={point} className="rounded-3xl border border-slate-200 bg-white p-6 text-base leading-8 text-slate-700 shadow-sm">{point}</div>))}</div></section>
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.labels.beliefs} title={content.sections.beliefsTitle} description={content.sections.beliefsDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-3">{content.beliefs.map((item) => (<article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold text-slate-950">{item.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p></article>))}</div></section>
      <section id="tracks" className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.labels.research} title={content.sections.researchTitle} description={content.sections.researchDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-2">{content.researchAreas.map((area) => (<article key={area.slug} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><h3 className="text-2xl font-semibold text-slate-950">{area.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{area.summary}</p><ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">{area.bullets.map((bullet) => (<li key={bullet} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">{bullet}</li>))}</ul></article>))}</div></section>
      <section id="process" className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.labels.process} title={content.sections.processTitle} description={content.sections.processDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-2"><div className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">{content.processSteps.map((step, index) => (<div key={step.title} className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-800 text-sm font-semibold text-white">{index + 1}</div><div><h3 className="text-lg font-semibold text-slate-950">{step.title}</h3><p className="mt-2 text-base leading-8 text-slate-600">{step.description}</p></div></div>))}</div><div className="grid gap-4">{content.roles.map((role) => (<article key={role.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-semibold text-slate-950">{role.title}</h3><p className="mt-3 text-base leading-8 text-slate-600">{role.description}</p></article>))}</div></div></section>
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.labels.outcome} title={content.sections.outcomeTitle} description={content.sections.outcomeDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-3">{content.gains.map((gain) => (<article key={gain.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold text-slate-950">{gain.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{gain.description}</p></article>))}</div></section>
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><div className="grid gap-6 lg:grid-cols-[1fr_1fr]"><div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><SectionHeading eyebrow={content.labels.join} title={content.sections.joinTitle} description={content.sections.joinDescription} /><div className="mt-8 space-y-4">{content.joinChecklist.map((item) => (<article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><h3 className="text-lg font-semibold text-slate-950">{item.title}</h3><p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p></article>))}</div></div><div className="rounded-[2rem] border border-cyan-700/15 bg-cyan-50 p-8"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.joinPanel.eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{content.joinPanel.title}</h2><p className="mt-4 text-base leading-8 text-slate-700">{content.joinPanel.description}</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href={`/${locale}/join`} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-900">{content.joinPanel.primaryLabel}</Link><Link href={`/${locale}/research`} className="inline-flex items-center justify-center rounded-full border border-cyan-700/20 bg-white px-6 py-3 text-sm font-semibold text-cyan-900 shadow-sm transition hover:border-cyan-800">{content.joinPanel.secondaryLabel}</Link></div></div></div></section>
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8"><SectionHeading eyebrow={content.labels.updates} title={content.sections.updatesTitle} description={content.sections.updatesDescription} /><div className="mt-10 grid gap-6 lg:grid-cols-3">{content.updates.map((item) => (<article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-800">{item.tag}</span><h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p></article>))}</div></section>
    </div>
  );
}
