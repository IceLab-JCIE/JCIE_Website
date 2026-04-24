import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { members, roleLabels, directorPositions } from '@/data/members';
import { isLocale, Locale } from '@/lib/i18n';

export default async function PeoplePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const weiMembers = members.filter((m) => m.role === 'wei');
  const directors = members.filter((m) => m.role === 'director');
  const leads = members.filter((m) => m.role === 'lead');
  const membersList = members.filter((m) => m.role === 'member');

  const groupedDirectors = Object.values(
    directors.reduce((acc, director) => {
      const key = director.nameEn || director.name;
      (acc[key] ||= []).push(director);
      return acc;
    }, {} as Record<string, typeof directors>)
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow={locale === 'zh' ? '团队' : 'People'}
        title={locale === 'zh' ? '团队成员' : 'Team Members'}
        description={locale === 'zh' ? '导师 → 管理层 → 负责人 → 成员' : 'Advisor → Directors → Lead → Member'}
      />

      {/* Wei */}
      {weiMembers.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">{roleLabels.wei[locale]}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {weiMembers.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Directors */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">{roleLabels.director[locale]}</h2>
        <p className="mt-2 text-sm text-slate-500">
          {locale === 'zh' ? '负责组织增长，不负责具体研究项目' : 'Responsible for organizational growth, not research projects'}
        </p>

        {/* Director Positions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {directorPositions.map((pos) => (
            <div key={pos.key} className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-medium text-slate-900">{pos.label[locale]}</h3>
              <p className="mt-2 text-xs text-slate-500">{pos.description[locale]}</p>
            </div>
          ))}
        </div>

        {directors.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {groupedDirectors.map((group) => (
              <DirectorCard key={group[0]?.id ?? 'director'} directors={group} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? '管理层成员待补充' : 'Directors to be added'}</p>
          </div>
        )}
      </section>

      {/* Leads */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">{roleLabels.lead[locale]}</h2>
        <p className="mt-2 text-sm text-slate-500">
          {locale === 'zh' ? '从立项到投稿对项目全程负责' : 'Owns projects from kickoff to submission'}
        </p>

        {leads.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {leads.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? 'Lead 成员待补充' : 'Leads to be added'}</p>
          </div>
        )}
      </section>

      {/* Members */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">{roleLabels.member[locale]}</h2>
        <p className="mt-2 text-sm text-slate-500">
          {locale === 'zh' ? '在真实项目中跑实验，支撑 Lead' : 'Runs experiments in real projects, supporting Leads'}
        </p>

        {membersList.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membersList.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} compact />
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

function MemberCard({ member, locale, compact = false }: { member: typeof members[0]; locale: Locale; compact?: boolean }) {
  const name = locale === 'zh' ? member.name : (member.nameEn || member.name);
  const title = locale === 'zh' ? member.title : (member.titleEn || member.title);
  const bio = locale === 'zh' ? member.bio : (member.bioEn || member.bio);

  if (compact) {
    return (
      <article className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-medium text-slate-400">
          {name.charAt(0)}
        </div>
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
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-xl font-medium text-slate-400">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-slate-900">{name}</h3>
          {title && <p className="mt-1 text-sm text-slate-600">{title}</p>}
          {bio && <p className="mt-3 text-sm text-slate-500">{bio}</p>}
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

function DirectorCard({ directors, locale }: { directors: typeof members; locale: Locale }) {
  const base = directors[0];
  if (!base) return null;

  const name = locale === 'zh' ? base.name : (base.nameEn || base.name);
  const titles = Array.from(
    new Set(
      directors
        .map((d) => (locale === 'zh' ? d.title : (d.titleEn || d.title)))
        .filter((t): t is string => Boolean(t && t.trim()))
    )
  );

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-xl font-medium text-slate-400">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-slate-900">{name}</h3>
          {titles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {titles.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
