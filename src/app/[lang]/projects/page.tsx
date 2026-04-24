import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { isLocale, Locale } from '@/lib/i18n';

export const projectsData = [
  {
    id: 'proj-1',
    title: 'Operator Learning',
    titleZh: '算子学习',
    summary: 'Learning the mapping of partial differential equations using neural operators',
    summaryZh: '利用神经算子学习偏微分方程的映射。',
    area: 'EDA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '凯期',
    github: '#',
  },
  {
    id: 'proj-2',
    title: 'EDA Yield Database Development and Open-Source Release',
    titleZh: 'EDA 良率数据库构建与开源',
    summary: 'Organizing and Open-Sourcing EDA Yield Algorithms, with Future Incorporation of Yield Algorithm Development.',
    summaryZh: 'EDA良率算法整理开源后续加入良率算法开发。',
    area: 'EDA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '博豪',
    github: '#',
  },
  {
    id: 'proj-3',
    title: 'Development and Open-Sourcing of an EDA Optimization Algorithm Engine',
    titleZh: 'EDA 优化算法引擎开发与开源',
    summary: 'Organizing and Open-Sourcing EDA Optimization Algorithms, with Future Incorporation of Optimization Algorithm Development',
    summaryZh: 'EDA优化算法整理开源后续加入优化算法开发。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '沁心',
    github: '#',
  },
  {
    id: 'proj-4',
    title: 'EPD Intelligent Retrieval',
    titleZh: 'EPD 智能检索体系',
    summary: 'Building an LLM-based framework to automatically extract key environmental indicators (e.g., GWP) from unstructured Environmental Product Declarations (EPDs) and construct a structured knowledge base.',
    summaryZh: '构建基于LLM的算法，从非结构化的环境产品声明（EPD）中自动化提取关键环境指标（如 GWP 等），形成结构化知识库。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '凯期',
    github: '#',
  },
  {
    id: 'proj-5',
    title: 'LCI Data Synthesis Framework',
    titleZh: 'LCI 数据合成框架',
    summary: 'Predicting numerical values in ecoinvent tables using a large language model combined with fine-tuned small models; confirmed usable predictions can then be extended to additional unknown datasets.',
    summaryZh: '通过大模型与微调小模型预测ecoinvent表格中的数值，若确定为可用则可扩展到更多未知数据集中。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '靖海',
    github: '#',
  },
  {
    id: 'proj-6',
    title: 'LCI Data Synthesis Framework',
    titleZh: 'LLM Agent 碳足迹自动化评估',
    summary: 'Developing an automated assessment framework based on a large language model agent (LLM Agent). Leveraging the agent’s planning and tool invocation capabilities, it enables an end-to-end workflow from parsing the raw bill of materials (BOM), automatically retrieving and matching environmental databases (e.g., Ecoinvent), to calculating carbon emissions and generating LCA reports, aiming to significantly reduce manual intervention and enhance the timeliness of accounting.',
    summaryZh: '构建基于大语言模型智能体（LLM Agent）的自动化评估框架。利用 Agent 的规划与工具调用能力，实现从原始物料清单（BOM）解析、环境数据库（如 Ecoinvent）自动检索与匹配、到碳排放量计算及 LCA 报告生成的端到端自动化流程，旨在大幅降低人工干预成本并提升核算的实时性。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '凯期、佳展',
    github: '#',
  },
  {
    id: 'proj-7',
    title: 'LCI Optimization',
    titleZh: 'LCA优化',
    summary: 'Integrating large language model agents with operations research optimization techniques into life cycle assessment (LCA) to enable end-to-end automated decision-making, from bill of materials analysis to green material substitution.',
    summaryZh: '将大模型智能体与运筹优化技术引入生命周期评估（LCA），实现从物料清单到绿色材料替代的端到端自动化决策。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '佳展',
    github: '#',
  },
  {
    id: 'proj-8',
    title: 'LCI Data Synthesis Framework',
    titleZh: 'LCA 数据预测与匹配',
    summary: 'Using AI to assist in matching components in LCI inventories with corresponding names and activities in environmental databases (e.g., Ecoinvent).',
    summaryZh: '利用 AI 帮助将 LCI 清单中的组件与环境数据库（Ecoinvent)中的名称及活动进行匹配。',
    area: 'LCA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '宝文',
    github: '#',
  },
  {
    id: 'proj-9',
    title: 'Yield Optimization',
    titleZh: '良率优化',
    summary: 'Yield-Aware Sizing Optimization',
    summaryZh: '在良率基础上进行Sizing优化',
    area: 'EDA',
    status: 'ongoing',
    statusZh: '进行中',
    lead: '宝文',
    github: '#',
  },
];

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const edaProjects = projectsData.filter((p) => p.area === 'EDA');
  const lcaProjects = projectsData.filter((p) => p.area === 'LCA');

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow={locale === 'zh' ? '项目' : 'Projects'}
        title={locale === 'zh' ? '研究项目' : 'Research Projects'}
        description={locale === 'zh' ? '学生从加入第一天就进入真实项目' : 'Students enter real projects from day one'}
      />

      {/* AI for EDA */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">AI for EDA</h2>
        {edaProjects.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {edaProjects.map((proj) => (
              <ProjectCard key={proj.id} proj={proj} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? 'EDA 项目待补充' : 'EDA projects to be added'}</p>
          </div>
        )}
      </section>

      {/* AI for LCA */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">AI for LCA</h2>
        {lcaProjects.length > 0 ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {lcaProjects.map((proj) => (
              <ProjectCard key={proj.id} proj={proj} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">{locale === 'zh' ? 'LCA 项目待补充' : 'LCA projects to be added'}</p>
          </div>
        )}
      </section>

      {/* Process */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900">{locale === 'zh' ? '项目流程' : 'Project Process'}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-sm font-medium text-white">1</div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">{locale === 'zh' ? 'Baseline 复现' : 'Baseline Reproduction'}</h3>
            <p className="mt-2 text-xs text-slate-500">{locale === 'zh' ? '第一个月跑通 Lead 已验证的 baseline' : 'First month: reproduce Lead-verified baseline'}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-sm font-medium text-white">2</div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">{locale === 'zh' ? '核心实验' : 'Core Experiments'}</h3>
            <p className="mt-2 text-xs text-slate-500">{locale === 'zh' ? '进入核心实验、结果分析' : 'Core experiments and analysis'}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-sm font-medium text-white">3</div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">{locale === 'zh' ? '论文写作' : 'Paper Writing'}</h3>
            <p className="mt-2 text-xs text-slate-500">{locale === 'zh' ? '参与初稿撰写，全程参与' : 'Participate in draft writing'}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-sm font-medium text-white">4</div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">{locale === 'zh' ? '开源整理' : 'Open Source'}</h3>
            <p className="mt-2 text-xs text-slate-500">{locale === 'zh' ? '整理代码，开源发布' : 'Organize code and open-source release'}</p>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="mt-16 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900">{locale === 'zh' ? '想参与这些项目' : 'Want to work on these projects'}</h2>
        <p className="mt-4 text-sm text-slate-600">
          {locale === 'zh' ? '加入后直接进入真实项目，我们没有练手期' : 'Join and enter real projects immediately, no sandbox period'}
        </p>
        <Link href={`/${locale}/join`} className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
          {locale === 'zh' ? '申请加入' : 'Apply Now'}
        </Link>
      </section>
    </div>
  );
}

function ProjectCard({ proj, locale }: { proj: typeof projectsData[0]; locale: Locale }) {
  const title = locale === 'zh' ? proj.titleZh : proj.title;
  const summary = locale === 'zh' ? proj.summaryZh : proj.summary;
  const status = locale === 'zh' ? proj.statusZh : proj.status;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${proj.status === 'ongoing' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
            {status}
          </span>
          <h3 className="mt-3 text-base font-medium text-slate-900">{title}</h3>
          <p className="mt-3 text-sm text-slate-600">{summary}</p>
          {proj.lead && <p className="mt-4 text-xs text-slate-500">{locale === 'zh' ? '负责人' : 'Lead'}: {proj.lead}</p>}
        </div>
        {proj.github && proj.github !== '#' && (
          <Link href={proj.github} className="rounded px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">
            GitHub
          </Link>
        )}
      </div>
    </article>
  );
}