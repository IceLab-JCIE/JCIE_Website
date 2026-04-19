import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import {
  beliefs,
  gains,
  hero,
  joinChecklist,
  mission,
  processSteps,
  researchAreas,
  roles,
  updates,
} from '@/content/site';

export default function Home() {
  return (
    <div>
      <section className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            {hero.eyebrow}
          </span>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{hero.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm">
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <div className="text-3xl font-semibold text-white">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Core message</p>
            <p className="mt-3 text-base leading-8 text-slate-200">
              JCIE 不是一个只讲概念的组织。它是一套从加入、复现、实验、写作到开源的完整成长路径。
            </p>
          </div>
        </div>
      </section>

      <section id="mission" className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Mission" title={mission.title} description={mission.summary} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mission.points.map((point) => (
            <div key={point} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-base leading-8 text-slate-200">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Beliefs"
          title="What we believe"
          description="主页文案基于 JCIE 的愿景、招新文档与 SOP 提炼，适合长期复用和持续更新。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {beliefs.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tracks" className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Research"
          title="Two research tracks, one execution standard"
          description="先把方向讲清，再把路径做实。JCIE 当前以 AI for EDA 与 AI for LCA 为核心研究主线。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {researchAreas.map((area) => (
            <article key={area.slug} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold text-white">{area.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{area.summary}</p>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                {area.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="How students grow inside JCIE"
          description="从第一天起接触的就是真实工作。框架上已经为后续扩展详情页和动态页预留了结构。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/60 p-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-slate-950">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-base leading-8 text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4">
            {roles.map((role) => (
              <article key={role.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-300">{role.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Outcome"
          title="What students can actually gain"
          description="这部分适合作为招新主页的核心转化区，也方便以后拆成独立的 recruitment 页面。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {gains.map((gain) => (
            <article key={gain.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <h3 className="text-xl font-semibold text-white">{gain.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{gain.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <SectionHeading
              eyebrow="Join"
              title="Who should apply"
              description="我们不要求一开始就很强，但要求愿意自驱、能反馈、能把事情推进。"
            />
            <div className="mt-8 space-y-4">
              {joinChecklist.map((item) => (
                <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Next step</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Ready to build with us?</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              当前站点已经为后续扩展 About、Research、Join Us、News 等页面保留了统一组件和内容结构。你现在可以先上线主页，再逐步填充案例与动态内容。
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                Open recruitment page
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                View research tracks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Updates"
          title="A homepage that can keep publishing"
          description="不是做一个静态海报页，而是做一个后续可持续更新的实验室官网入口。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {updates.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{item.tag}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
