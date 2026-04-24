import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const content = getSiteContent(locale);

  const overviewTitleZh = '我们是谁';
  const overviewTitleEn = 'Who We are';
  const overviewDescZh = 'JCIE 是深圳大学与谢菲尔德大学联合成立的研究中心，聚焦 AI + 工程真实问题。学生在这里做真实项目、真实论文和真实开源成果。';
  const overviewDescEn = 'JCIE is a joint research centre between Shenzhen University and University of Sheffield, focused on AI + engineering real-world problems. Students here build real projects, real papers, and real open-source outcomes.';

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="relative mb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-grid-pattern opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="pointer-events-none absolute -inset-24 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.14),transparent_60%),radial-gradient(circle_at_82%_35%,rgba(20,184,166,0.12),transparent_55%)]" />
        <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-10 shadow-[0_40px_100px_-80px_rgba(2,6,23,0.65)] backdrop-blur-md sm:p-12">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            {locale === 'zh' ? '把真正有价值的研究做出来' : 'Build meaningful research that survives outside the lab'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {locale === 'zh'
              ? '我们是一个做 AI + 工程真实问题研究的联合实验室。学生在这里做真实项目、真实论文和真实开源成果。'
              : 'We are a joint lab working on real AI + engineering problems. Students here build real projects, real papers, and real open-source outcomes.'}
          </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/join`} className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              {locale === 'zh' ? '申请加入' : 'Apply Now'}
              </Link>
              <Link href={`/${locale}/people`} className="rounded-lg border border-slate-300/80 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-slate-400">
              {locale === 'zh' ? '查看成员' : 'Meet the Team'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-16">
        <SectionHeading eyebrow={locale === 'zh' ? '概览' : 'Overview'} title={locale === 'zh' ? overviewTitleZh : overviewTitleEn} description={locale === 'zh' ? overviewDescZh : overviewDescEn} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <div className="rounded-lg border border-slate-200/70 bg-white/65 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-slate-900">{locale === 'zh' ? '我们为什么存在' : 'Why we exist'}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {locale === 'zh'
                ? '优秀学生很多，但真正能证明能力的项目、成果和经历并不多。我们希望给有想法、想进步、愿意扛压力的人一条更真实的路径。'
                : 'There is no shortage of talented students, but far fewer real projects and experiences that prove ability. We offer a more real path to students with ambition and grit.'}
            </p>
          </div>

          {/* Beliefs */}
          <div className="rounded-lg border border-slate-200/70 bg-white/65 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-slate-900">{locale === 'zh' ? '我们相信' : 'What we believe'}</h3>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              <li>{locale === 'zh' ? '论文是起点，不是终点' : 'Papers are a starting point, not the finish line'}</li>
              <li>{locale === 'zh' ? '学生应当拥有真实 ownership' : 'Students deserve real ownership'}</li>
              <li>{locale === 'zh' ? '成长来自压力下的执行' : 'Growth comes from execution under pressure'}</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Research Areas */}
      <section className="mb-16">
        <SectionHeading eyebrow={locale === 'zh' ? '研究' : 'Research'} title={locale === 'zh' ? '研究方向' : 'Research Tracks'} description={locale === 'zh' ? '两个核心方向，有真实应用场景、做出来会被用到' : 'Two core tracks with real applications and measurable impact'} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-semibold text-slate-900">AI for EDA</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {locale === 'zh' ? '用 AI 解决电路设计自动化中的关键问题' : 'Using AI to solve key problems in electronic design automation'}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'TabPFN 架构模型自研与性能增强' : 'TabPFN architecture exploration'}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'EDA 良率数据库构建与开源' : 'EDA yield database construction'}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'EDA 优化算法引擎开发与开源' : 'EDA optimization engine development'}
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-semibold text-slate-900">AI for LCA</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {locale === 'zh' ? '用 AI 提升碳足迹评估与生命周期分析的效率' : 'Using AI to improve carbon footprint and life cycle analysis efficiency'}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'LCA 数据预测与匹配' : 'LCA data prediction and matching'}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'EPD 智能检索体系' : 'EPD intelligent retrieval system'}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                {locale === 'zh' ? 'LLM Agent 碳足迹自动化评估' : 'LLM-agent carbon footprint evaluation'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Publications Preview */}
      <section className="mb-16">
        <SectionHeading eyebrow={locale === 'zh' ? '成果' : 'Outputs'} title={locale === 'zh' ? '论文发表' : 'Publications'} description={locale === 'zh' ? '已在 DAC、ICCAD、NeurIPS 等顶会发表' : 'Published at DAC, ICCAD, NeurIPS and other top venues'} />

        <div className="mt-10">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-slate-600">{locale === 'zh' ? '论文列表详见 Publications 页面' : 'See Publications page for the full list'}</p>
            <Link href={`/${locale}/publications`} className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              {locale === 'zh' ? '查看论文' : 'View Publications'}
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">{locale === 'zh' ? '准备好加入了吗' : 'Ready to join'}</h2>
        <p className="mt-4 text-base text-slate-600">
          {locale === 'zh' ? '我们欢迎有想法、愿意自驱、能扛压力的同学' : 'We welcome students with ambition, self-drive, and grit'}
        </p>
        <Link href={`/${locale}/join`} className="mt-6 inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800">
          {locale === 'zh' ? '申请加入' : 'Apply Now'}
        </Link>
      </section>
    </div>
  );
}
