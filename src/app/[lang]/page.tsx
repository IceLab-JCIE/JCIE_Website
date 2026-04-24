import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getPageContent } from '@/content/pages';
import { isLocale, Locale } from '@/lib/i18n';

function getString(data: Record<string, unknown>, key: string, fallback = '') {
  const v = data[key];
  return typeof v === 'string' ? v : fallback;
}

function getStringArray(data: Record<string, unknown>, key: string) {
  const v = data[key];
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const { data } = await getPageContent('home', locale);

  const heroTitle = getString(data, 'hero_title');
  const heroLead = getString(data, 'hero_lead');
  const heroCtaPrimary = getString(data, 'hero_cta_primary', locale === 'zh' ? '申请加入' : 'Apply Now');
  const heroCtaSecondary = getString(data, 'hero_cta_secondary', locale === 'zh' ? '查看成员' : 'Meet the Team');

  const overviewEyebrow = getString(data, 'overview_eyebrow', locale === 'zh' ? '概览' : 'Overview');
  const overviewTitle = getString(data, 'overview_title');
  const overviewDescription = getString(data, 'overview_description');

  const missionTitle = getString(data, 'mission_title', locale === 'zh' ? '我们为什么存在' : 'Why we exist');
  const missionBody = getString(data, 'mission_body');

  const beliefsTitle = getString(data, 'beliefs_title', locale === 'zh' ? '我们相信' : 'What we believe');
  const beliefsItems = getStringArray(data, 'beliefs_items');

  const researchEyebrow = getString(data, 'research_eyebrow', locale === 'zh' ? '研究' : 'Research');
  const researchTitle = getString(data, 'research_title', locale === 'zh' ? '研究方向' : 'Research Tracks');
  const researchDescription = getString(data, 'research_description');

  const trackEdaTitle = getString(data, 'track_eda_title', 'AI for EDA');
  const trackEdaDescription = getString(data, 'track_eda_description');
  const trackEdaItems = getStringArray(data, 'track_eda_items');

  const trackLcaTitle = getString(data, 'track_lca_title', 'AI for LCA');
  const trackLcaDescription = getString(data, 'track_lca_description');
  const trackLcaItems = getStringArray(data, 'track_lca_items');

  const publicationsEyebrow = getString(data, 'publications_eyebrow', locale === 'zh' ? '成果' : 'Outputs');
  const publicationsTitle = getString(data, 'publications_title', locale === 'zh' ? '论文发表' : 'Publications');
  const publicationsDescription = getString(data, 'publications_description');
  const publicationsCardText = getString(
    data,
    'publications_card_text',
    locale === 'zh' ? '论文列表详见 Publications 页面' : 'See Publications page for the full list'
  );
  const publicationsCardButton = getString(data, 'publications_card_button', locale === 'zh' ? '查看论文' : 'View Publications');

  const joinCtaTitle = getString(data, 'join_cta_title', locale === 'zh' ? '准备好加入了吗' : 'Ready to join');
  const joinCtaBody = getString(data, 'join_cta_body');
  const joinCtaButton = getString(data, 'join_cta_button', locale === 'zh' ? '申请加入' : 'Apply Now');

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="relative mb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-grid-pattern opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="pointer-events-none absolute -inset-24 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.14),transparent_60%),radial-gradient(circle_at_82%_35%,rgba(20,184,166,0.12),transparent_55%)]" />
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-10 shadow-[0_40px_100px_-80px_rgba(2,6,23,0.65)] backdrop-blur-md sm:p-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">{heroTitle}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">{heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/join`} className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                {heroCtaPrimary}
              </Link>
              <Link href={`/${locale}/people`} className="rounded-lg border border-slate-300/80 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-slate-400">
                {heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-16">
        <SectionHeading eyebrow={overviewEyebrow} title={overviewTitle} description={overviewDescription} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200/70 bg-white/65 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-slate-900">{missionTitle}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{missionBody}</p>
          </div>

          <div className="rounded-lg border border-slate-200/70 bg-white/65 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-slate-900">{beliefsTitle}</h3>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              {beliefsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="mb-16">
        <SectionHeading eyebrow={researchEyebrow} title={researchTitle} description={researchDescription} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-semibold text-slate-900">{trackEdaTitle}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{trackEdaDescription}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              {trackEdaItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-semibold text-slate-900">{trackLcaTitle}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">{trackLcaDescription}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              {trackLcaItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Publications Preview */}
      <section className="mb-16">
        <SectionHeading eyebrow={publicationsEyebrow} title={publicationsTitle} description={publicationsDescription} />

        <div className="mt-10">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-slate-600">{publicationsCardText}</p>
            <Link href={`/${locale}/publications`} className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              {publicationsCardButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">{joinCtaTitle}</h2>
        <p className="mt-4 text-base text-slate-600">{joinCtaBody}</p>
        <Link href={`/${locale}/join`} className="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800">
          {joinCtaButton}
        </Link>
      </section>
    </div>
  );
}

