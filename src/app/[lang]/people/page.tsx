import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { Markdown } from '@/components/markdown';
import { getMembers } from '@/content/members';
import { getSiteContent } from '@/content/site';
import { roleLabels, type Member } from '@/data/members';
import { isLocale, Locale } from '@/lib/i18n';

function withBasePath(href: string, basePath: string) {
  if (!href) return href;
  if (/^https?:\/\//.test(href)) return href;
  if (!href.startsWith('/')) return href;
  if (!basePath || basePath === '/') return href;
  if (href.startsWith(`${basePath}/`)) return href;
  return `${basePath}${href}`;
}

export default async function PeoplePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const members = await getMembers();
  const { siteConfig } = getSiteContent(locale);
  const weiMembers = members.filter((m) => m.role === 'wei');
  const membersList = members.filter((m) => m.role !== 'wei');

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow={locale === 'zh' ? '团队' : 'People'}
        title={locale === 'zh' ? '团队成员' : 'Team Members'}
        description={locale === 'zh' ? '导师 / 成员' : 'Mentor / Members'}
      />

      {/* Wei */}
      {weiMembers.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">{roleLabels.wei[locale]}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {weiMembers.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} basePath={siteConfig.basePath} />
            ))}
          </div>
        </section>
      )}

      {/* Members */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">{roleLabels.member[locale]}</h2>

        {membersList.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membersList.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} basePath={siteConfig.basePath} compact />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? '成员待补充' : 'Members to be added'}</p>
          </div>
        )}
      </section>

      {/* Join CTA */}
      <section className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900">{locale === 'zh' ? '想成为下一个 JCIE 成员' : 'Want to become a JCIE member'}</h2>
        <p className="mt-4 text-sm text-slate-600">
          {locale === 'zh' ? '我们欢迎有想法、愿意自驱的同学' : 'We welcome students with ambition and self-drive'}
        </p>
        <Link href={`/${locale}/join`} className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          {locale === 'zh' ? '申请加入' : 'Apply Now'}
        </Link>
      </section>
    </div>
  );
}

function MemberCard({
  member,
  locale,
  basePath,
  compact = false,
}: {
  member: Member;
  locale: Locale;
  basePath: string;
  compact?: boolean;
}) {
  const name = locale === 'zh' ? member.name : (member.nameEn || member.name);
  const title =
    member.role === 'wei'
      ? (locale === 'zh' ? member.title : (member.titleEn || member.title))
      : roleLabels.member[locale];
  const bio = locale === 'zh' ? member.bio : (member.bioEn || member.bio);
  const photoSrc = member.photo ? withBasePath(member.photo, basePath) : '';

  if (compact) {
    return (
      <article className="rounded-lg border border-slate-200 bg-white p-5">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt={name}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 rounded-lg bg-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-lg font-medium text-slate-400">
            {name.charAt(0)}
          </div>
        )}
        <h3 className="mt-4 text-base font-medium text-slate-900">{name}</h3>
        {member.year && <p className="mt-1 text-xs text-slate-500">{member.year}</p>}
        {member.researchArea && <p className="mt-2 text-xs text-slate-600">{member.researchArea}</p>}
        {member.github && (
          <Link href={member.github} className="mt-3 inline-block text-xs text-slate-500 hover:text-slate-900">
            GitHub
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex gap-4">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt={name}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 rounded-lg bg-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-xl font-medium text-slate-400">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-base font-medium text-slate-900">{name}</h3>
          {title && <p className="mt-1 text-sm text-slate-600">{title}</p>}
          {bio && (
            <div className="text-slate-500 [&>p:first-child]:mt-3 [&>p]:text-sm">
              <Markdown content={bio} />
            </div>
          )}
          <div className="mt-3 flex gap-4">
            {member.github && (
              <Link href={member.github} className="text-xs text-slate-500 hover:text-slate-900">
                GitHub
              </Link>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-xs text-slate-500 hover:text-slate-900">
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}



