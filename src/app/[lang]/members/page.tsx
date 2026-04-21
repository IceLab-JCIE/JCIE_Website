import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { members, roleLabels, directorPositions } from '@/data/members';
import { isLocale, Locale } from '@/lib/i18n';

export default async function MembersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const weiMembers = members.filter((m) => m.role === 'wei');
  const directors = members.filter((m) => m.role === 'director');
  const leads = members.filter((m) => m.role === 'lead');
  const membersList = members.filter((m) => m.role === 'member');

  const joinTitleZh = '想成为下一个 JCIE 成员';
  const joinTitleEn = 'Want to become the next JCIE member';

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow={locale === 'zh' ? '团队' : 'Team'}
        title={locale === 'zh' ? 'JCIE 成员' : 'JCIE Members'}
        description={locale === 'zh' ? '四个层级，没有更多。每个层级都有明确的职责和成长路径。' : 'Four tiers, no more. Each tier has clear responsibilities and a growth path.'}
      />

      {weiMembers.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-950">{roleLabels.wei[locale]}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {weiMembers.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950">{roleLabels.director[locale]}</h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          {locale === 'zh' ? '负责组织增长，不负责具体研究项目。由现任 Lead 兼任。' : 'Responsible for organizational growth, not specific research projects. Served by current Leads.'}
        </p>
        {directors.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {directors.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">{locale === 'zh' ? '管理层成员待补充' : 'Director members to be added'}</p>
          </div>
        )}
        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {directorPositions.map((pos) => (
            <div key={pos.key} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
              <h3 className="font-semibold text-slate-950">{pos.label[locale]}</h3>
              <p className="mt-2 text-slate-600">{pos.description[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950">{roleLabels.lead[locale]}</h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          {locale === 'zh' ? '对一个项目从立项到投稿全程负责。带 Member 跑实验。整理代码，负责开源。' : 'Owns a project from kickoff to submission. Leads Members through experiments and open-source release.'}
        </p>
        {leads.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {leads.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">{locale === 'zh' ? 'Lead 成员待补充' : 'Lead members to be added'}</p>
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-950">{roleLabels.member[locale]}</h2>
        <p className="mt-3 text-base leading-8 text-slate-600">
          {locale === 'zh' ? '在真实项目里跑实验，支撑 Lead。进来就分配到项目，没有游离期。' : 'Runs experiments in real projects, supporting Leads. Assigned to projects immediately, no idle period.'}
        </p>
        {membersList.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {membersList.map((member) => (
              <MemberCard key={member.id} member={member} locale={locale} compact />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">{locale === 'zh' ? 'Member 成员待补充' : 'Member members to be added'}</p>
          </div>
        )}
      </section>

      <section className="mt-20 rounded-[2rem] border border-cyan-700/15 bg-cyan-50 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{locale === 'zh' ? '加入我们' : 'Join Us'}</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-950">{locale === 'zh' ? joinTitleZh : joinTitleEn}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          {locale === 'zh' ? '我们欢迎有想法、愿意自驱、能扛压力的同学加入。' : 'We welcome students with ambition, self-drive, and grit.'}
        </p>
        <Link href={`/${locale}/join`} className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-900">
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
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {member.photo && (
          <Image src={member.photo} alt={name} width={80} height={80} className="rounded-full object-cover" />
        )}
        {!member.photo && (
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-400">
            {name.charAt(0)}
          </div>
        )}
        <h3 className="mt-4 text-lg font-semibold text-slate-950">{name}</h3>
        {member.year && <p className="text-sm text-slate-500">{member.year}</p>}
        {member.researchArea && <p className="mt-2 text-sm text-cyan-800">{member.researchArea}</p>}
        {member.github && (
          <Link href={member.github} className="mt-3 inline-block text-sm text-slate-600 hover:text-cyan-800">
            GitHub
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-start gap-6">
        {member.photo ? (
          <Image src={member.photo} alt={name} width={120} height={120} className="rounded-2xl object-cover" />
        ) : (
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-slate-100 text-3xl font-semibold text-slate-400">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-950">{name}</h3>
          {title && <p className="mt-2 text-sm font-medium text-cyan-800">{title}</p>}
          {bio && <p className="mt-4 text-base leading-8 text-slate-600">{bio}</p>}
          <div className="mt-4 flex gap-4">
            {member.github && (
              <Link href={member.github} className="text-sm text-slate-600 hover:text-cyan-800">
                GitHub
              </Link>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-sm text-slate-600 hover:text-cyan-800">
                Email
              </a>
            )}
            {member.linkedin && (
              <Link href={member.linkedin} className="text-sm text-slate-600 hover:text-cyan-800">
                LinkedIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}