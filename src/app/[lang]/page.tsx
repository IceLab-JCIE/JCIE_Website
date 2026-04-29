import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getPageContent } from '@/content/pages';
import { getAlumni } from '@/content/alumni';
import { isLocale, Locale } from '@/lib/i18n';
import type { Alumni, Publication } from '@/data/members';

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
  const alumni = await getAlumni();
  const featuredAlumni = [...alumni].sort((a, b) => {
    const publicationDiff = getPublicationCount(b) - getPublicationCount(a);
    if (publicationDiff !== 0) return publicationDiff;

    const latestYearDiff = getLatestPublicationYear(b) - getLatestPublicationYear(a);
    if (latestYearDiff !== 0) return latestYearDiff;

    return (b.nameEn || b.name).localeCompare(a.nameEn || a.name);
  });

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

      {/* Outstanding Members */}
      {featuredAlumni.length > 0 && (
        <section className="mb-16">
          <SectionHeading
            eyebrow={locale === 'zh' ? '成果' : 'Achievements'}
            title={locale === 'zh' ? '优秀成员' : 'Outstanding Members'}
            description={locale === 'zh' ? '已毕业成员的去向与成果' : 'Alumni destinations and achievements'}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredAlumni.map((member, index) => (
              <AlumniCard key={member.id} member={member} locale={locale} rank={index} />
            ))}
          </div>
        </section>
      )}

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

function getPublicationCount(member: Alumni) {
  return member.publications?.length ?? 0;
}

function getLatestPublicationYear(member: Alumni) {
  if (!member.publications || member.publications.length === 0) return 0;
  return Math.max(...member.publications.map((publication) => publication.year));
}

function AlumniCard({ member, locale, rank }: { member: Alumni; locale: Locale; rank: number }) {
  const name = locale === 'zh' ? member.name : (member.nameEn || member.name);
  const destination = locale === 'zh' ? member.destination : (member.destinationEn || member.destination);
  const destinationLabel = locale === 'zh' ? '去向' : 'Destination';
  const publicationsLabel = locale === 'zh' ? '发表论文' : 'Publications';
  const publicationCount = getPublicationCount(member);
  const publicationCountLabel = locale === 'zh' ? `${publicationCount} 篇` : `${publicationCount} papers`;
  const topTag = locale === 'zh' ? '高产成员' : 'Top Contributor';
  const latestYear = getLatestPublicationYear(member);
  const latestYearText = latestYear > 0 ? (locale === 'zh' ? `最新 ${latestYear}` : `Latest ${latestYear}`) : '';

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full bg-slate-100/80 blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          {rank < 2 && (
            <span className="mb-2 inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
              {topTag}
            </span>
          )}
          <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          {publicationCountLabel}
        </span>
      </div>
      {destination && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span className="font-medium text-slate-500">{destinationLabel}：</span>
          <span className="text-sm text-slate-700">{destination}</span>
        </div>
      )}
      {publicationCount > 0 && (
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/75 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-500">{publicationsLabel}</h4>
            {latestYearText && <span className="text-xs text-slate-500">{latestYearText}</span>}
          </div>
          <ul className="mt-2 space-y-2">
            {(member.publications ?? []).map((pub, index) => (
              <PublicationItem key={index} publication={pub} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function PublicationItem({ publication }: { publication: Publication }) {
  const content = (
    <span className="text-sm text-slate-700">
      {publication.title}
      <span className="ml-2 text-slate-500">
        — {publication.venue}, {publication.year}
      </span>
    </span>
  );

  if (publication.link) {
    return (
      <li>
        <Link href={publication.link} className="hover:text-slate-900" target="_blank" rel="noopener noreferrer">
          {content}
        </Link>
      </li>
    );
  }

  return <li>{content}</li>;
}

