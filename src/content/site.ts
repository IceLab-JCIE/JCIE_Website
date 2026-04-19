export type NavItem = {
  label: string;
  href: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type ResearchArea = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type TimelineStep = {
  title: string;
  description: string;
};

export type UpdateCard = {
  title: string;
  description: string;
  tag: string;
};

export const siteConfig = {
  name: 'SZU-UoS JCIE',
  shortName: 'JCIE',
  tagline: '真实项目、真实论文、真实开源成果',
  title: 'SZU-UoS JCIE | Joint Centre for Innovation & Engineering',
  description:
    'SZU-UoS JCIE 是一个聚焦 AI for EDA 与 AI for LCA 的联合实验室。我们通过真实项目、真实论文与真实开源成果培养能够把想法做成结果的人。',
  url: 'https://example.com',
  contactEmail: 'baowen435@gmail.com',
  applyFormUrl:
    'mailto:baowen435@gmail.com?subject=%E3%80%90Join%20JCIE%E3%80%91%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97',
  githubUrl: '#',
  location: 'Shenzhen, China',
};

export const navigation: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Join Us', href: '/join' },
  { label: 'Mission', href: '/#mission' },
  { label: 'Tracks', href: '/#tracks' },
  { label: 'Process', href: '/#process' },
];

export const hero = {
  eyebrow: 'SZU-UoS Joint Centre',
  title: 'Build meaningful research that survives outside the lab.',
  subtitle:
    '我们是一个做 AI + 工程真实问题研究的联合实验室。学生在这里做真实项目、真实论文和真实开源成果。',
  primaryCta: { label: 'Join JCIE', href: '/join' },
  secondaryCta: { label: 'Explore Research', href: '/research' },
  stats: [
    { value: '2', label: 'research tracks' },
    { value: '1 month', label: 'baseline onboarding window' },
    { value: '0', label: '练手空转期' },
  ] satisfies HeroStat[],
};

export const mission = {
  title: 'Why JCIE exists',
  summary:
    '优秀学生很多，但真正能证明能力的项目、成果和经历并不多。JCIE 希望给有想法、想进步、愿意扛压力的人一条更真实的路径。',
  points: [
    '不把 GPA 当成唯一标准，而是强调真实产出。',
    '不让学生只做边角参与，而是进入真实项目链路。',
    '不把论文当终点，而是把可复现、可开源、可落地的结果当目标。',
  ],
};

export const beliefs: FeatureCard[] = [
  {
    title: 'Research should become something real',
    description: '论文是起点，不是终点。更有价值的是能被复现、被引用、被真正用起来的工作。',
  },
  {
    title: 'Students deserve ownership',
    description: '每个项目都需要学生真实参与、真实负责，而不是只在简历里挂一行经历。',
  },
  {
    title: 'Growth comes with pressure',
    description: 'JCIE 会给支撑，但不会替你做。真正的成长来自把难题扛下来并做出结果。',
  },
];

export const gains: FeatureCard[] = [
  {
    title: 'A paper you truly built',
    description: '从 baseline 到实验到初稿，你参与整个链路，成果能代表你自己。',
  },
  {
    title: 'A tool that can be used',
    description: '代码强调开源与复现，优秀工作会继续被推进并进入真实应用场景。',
  },
  {
    title: 'A story worth telling',
    description: '这不只是经历包装，而是一段你能讲清楚、别人也能问深入的真实经验。',
  },
];

export const researchAreas: ResearchArea[] = [
  {
    slug: 'eda',
    title: 'AI for EDA',
    summary: '用 AI 解决电路设计自动化中的关键问题，关注算法、模型和可落地工具。',
    bullets: [
      'TabPFN 架构模型自研与性能增强',
      'EDA 良率数据库构建与开源',
      'EDA 优化算法引擎开发与开源',
    ],
  },
  {
    slug: 'lca',
    title: 'AI for LCA',
    summary: '用 AI 提升碳足迹评估与生命周期分析的效率、准确性与自动化程度。',
    bullets: [
      'LCA 数据预测与匹配',
      'EPD 智能检索体系',
      'LCI 数据合成框架与 LLM Agent 评估',
    ],
  },
];

export const processSteps: TimelineStep[] = [
  {
    title: 'Start from a real project',
    description: '加入后直接进入项目或 baseline 复现，没有独立的练手环节。',
  },
  {
    title: 'Finish the first-month baseline',
    description: '第一个月的目标是跑通 Lead 已验证的 baseline，并补齐踩坑记录。',
  },
  {
    title: 'Move into core experiments',
    description: '通过后进入核心实验、结果分析、写作与开源整理。',
  },
  {
    title: 'Grow through ownership',
    description: '能独立把项目从 baseline 推到投稿，才是真正的成长与晋升依据。',
  },
];

export const roles: FeatureCard[] = [
  {
    title: 'Wei',
    description: '负责战略、选题、质量把关和对外代表，确保方向和值得做的事情被做成。',
  },
  {
    title: 'Directors',
    description: '负责组织增长、招新、运营、宣传和基础设施，不与研究执行混在一起。',
  },
  {
    title: 'Lead',
    description: '从立项到投稿对项目全程负责，带 Member 跑实验并整理开源。',
  },
  {
    title: 'Member',
    description: '在真实项目中执行实验、复现 baseline、积累记录并逐步承担更大责任。',
  },
];

export const joinChecklist: FeatureCard[] = [
  {
    title: 'You can already start if…',
    description: '你能写 Python、能读英文文献、会用 GitHub，并愿意持续反馈和自驱推进。',
  },
  {
    title: 'What happens after joining',
    description: '一周内完成权限开通、项目分配和首月任务对齐，然后直接进入执行。',
  },
  {
    title: 'What we care about most',
    description: '我们更看结果而非表面投入。有没有真正把事情做出来，比“看起来很努力”更重要。',
  },
];

export const updates: UpdateCard[] = [
  {
    tag: 'Channel',
    title: 'Lab homepage and communication channel',
    description: '主页将作为持续更新的对外入口，后续可承接招新、活动、成果和成员故事。',
  },
  {
    tag: 'Content',
    title: 'Member stories and project progress',
    description: '后续适合持续发布项目启动、baseline 进展、成员成长和阶段性成果。',
  },
  {
    tag: 'Recruitment',
    title: 'Next intake preparation',
    description: '主页也可作为下学期宣传高峰期的基础设施，与海报、PPT、表单统一口径。',
  },
];

export const launchNeeds = [
  '实验室正式联系邮箱',
  '申请表或报名表链接',
  'GitHub / 公众号 / 小红书等官方链接（如有）',
  '实验室 Logo、校徽或联合品牌视觉素材',
  '需要展示的第一批项目、论文或活动内容',
  '最终部署平台与域名方案',
];
