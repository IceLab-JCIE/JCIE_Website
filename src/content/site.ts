import { Locale, withLocale } from '@/lib/i18n';

type LocalizedString = Record<Locale, string>;

type NavItemDef = { label: LocalizedString; href: string };
type HeroStatDef = { value: LocalizedString; label: LocalizedString };
type FeatureCardDef = { title: LocalizedString; description: LocalizedString };
type ResearchAreaDef = { slug: string; title: LocalizedString; summary: LocalizedString; bullets: LocalizedString[] };
type TimelineStepDef = { title: LocalizedString; description: LocalizedString };
type UpdateCardDef = { tag: LocalizedString; title: LocalizedString; description: LocalizedString };

const siteConfig = {
  name: 'SZU-UoS JCIE',
  shortName: 'JCIE',
  url: 'https://jcie.vercel.app',
  contactEmail: 'baowen435@gmail.com',
  githubUrl: 'https://github.com/Bosco0412/JCIE',
  applyMailto: 'mailto:baowen435@gmail.com?subject=%E3%80%90Join%20JCIE%E3%80%91%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97',
};

const localizedMeta = {
  tagline: { zh: '真实项目、真实论文、真实开源成果', en: 'Real projects, real papers, real open-source output' },
  title: { zh: 'SZU-UoS JCIE｜联合实验室官网', en: 'SZU-UoS JCIE | Joint Centre for Innovation & Engineering' },
  description: {
    zh: 'SZU-UoS JCIE 是一个聚焦 AI for EDA 与 AI for LCA 的联合实验室。我们通过真实项目、真实论文与真实开源成果培养能够把想法做成结果的人。',
    en: 'SZU-UoS JCIE is a joint lab focused on AI for EDA and AI for LCA. We cultivate students who can turn ideas into outcomes through real projects, real papers, and real open-source work.',
  },
  location: { zh: '深圳，中国', en: 'Shenzhen, China' },
};

const navigation: NavItemDef[] = [
  { label: { zh: '关于我们', en: 'About' }, href: '/about' },
  { label: { zh: '成员', en: 'Members' }, href: '/members' },
  { label: { zh: '研究方向', en: 'Research' }, href: '/research' },
  { label: { zh: '加入我们', en: 'Join Us' }, href: '/join' },
  { label: { zh: '使命', en: 'Mission' }, href: '/#mission' },
  { label: { zh: '方向', en: 'Tracks' }, href: '/#tracks' },
  { label: { zh: '路径', en: 'Process' }, href: '/#process' },
];

const hero = {
  eyebrow: { zh: 'SZU-UoS 联合实验室', en: 'SZU-UoS Joint Centre' },
  title: { zh: '把真正有价值的研究做出来。', en: 'Build meaningful research that survives outside the lab.' },
  subtitle: {
    zh: '我们是一个做 AI + 工程真实问题研究的联合实验室。学生在这里做真实项目、真实论文和真实开源成果。',
    en: 'We are a joint lab working on real AI + engineering problems. Students here build real projects, real papers, and real open-source outcomes.',
  },
  primaryCta: { label: { zh: '加入 JCIE', en: 'Join JCIE' }, href: '/join' },
  secondaryCta: { label: { zh: '查看研究方向', en: 'Explore Research' }, href: '/research' },
  snapshotLabel: { zh: '实验室速览', en: 'Lab snapshot' },
  coreLabel: { zh: '核心主张', en: 'Core message' },
  coreText: {
    zh: 'JCIE 不是一个只讲概念的组织。它是一套从加入、复现、实验、写作到开源的完整成长路径。',
    en: 'JCIE is not just a concept. It is a full growth path from joining, reproducing baselines, and running experiments to writing and open-sourcing.',
  },
  stats: [
    { value: { zh: '0', en: '0' }, label: { zh: '练手空转期', en: 'idle training period' } },
    { value: { zh: '1个月', en: '1 month' }, label: { zh: 'Baseline 复现期', en: 'baseline reproduction window' } },
    { value: { zh: '2', en: '2' }, label: { zh: '核心研究方向', en: 'core research tracks' } },
  ] as HeroStatDef[],
};

const mission = {
  title: { zh: 'JCIE 为什么存在', en: 'Why JCIE exists' },
  summary: {
    zh: '优秀学生很多，但真正能证明能力的项目、成果和经历并不多。JCIE 希望给有想法、想进步、愿意扛压力的人一条更真实的路径。',
    en: 'There is no shortage of talented students, but there are far fewer real projects, outcomes, and experiences that can prove ability. JCIE exists to offer a more real path to students with ambition and grit.',
  },
  points: [
    { zh: '不把 GPA 当成唯一标准，而是强调真实产出。', en: 'We do not treat GPA as the only metric; we care about real output.' },
    { zh: '不让学生只做边角参与，而是进入真实项目链路。', en: 'Students are not placed at the edges of a project; they enter the real execution path.' },
    { zh: '不把论文当终点，而是把可复现、可开源、可落地的结果当目标。', en: 'Papers are not the endpoint; reproducible, open, and deployable outcomes are the target.' },
  ] as LocalizedString[],
};

const beliefs: FeatureCardDef[] = [
  { title: { zh: '研究要落到真实世界', en: 'Research should become something real' }, description: { zh: '论文是起点，不是终点。更有价值的是能被复现、被引用、被真正用起来的工作。', en: 'A paper is a starting point, not the finish line. The most valuable work is reproducible, citable, and truly useful.' } },
  { title: { zh: '学生应当拥有真实 ownership', en: 'Students deserve ownership' }, description: { zh: '每个项目都需要学生真实参与、真实负责，而不是只在简历里挂一行经历。', en: 'Students should participate and take real ownership rather than adding a single line to a résumé.' } },
  { title: { zh: '成长来自压力下的执行', en: 'Growth comes with pressure' }, description: { zh: 'JCIE 会给支撑，但不会替你做。真正的成长来自把难题扛下来并做出结果。', en: 'JCIE provides support, but it does not do the work for you. Growth comes from carrying hard problems through to outcomes.' } },
];

const gains: FeatureCardDef[] = [
  { title: { zh: '一篇你真正参与做出的论文', en: 'A paper you truly helped build' }, description: { zh: '从 baseline 到实验到初稿，你参与整个链路，成果能代表你自己。', en: 'From baselines and experiments to the first draft, you participate in the full pipeline and the result can represent you.' } },
  { title: { zh: '一个真的会被用到的工具', en: 'A tool that can be used' }, description: { zh: '代码强调开源与复现，优秀工作会继续被推进并进入真实应用场景。', en: 'Code is built with openness and reproducibility in mind, and strong work can continue into real use cases.' } },
  { title: { zh: '一段真正说得出口的经历', en: 'A story worth telling' }, description: { zh: '这不只是经历包装，而是一段你能讲清楚、别人也能问深入的真实经验。', en: 'This is not just résumé packaging; it is real experience that you can explain clearly and others can ask about deeply.' } },
];

const researchAreas: ResearchAreaDef[] = [
  { slug: 'eda', title: { zh: 'AI for EDA', en: 'AI for EDA' }, summary: { zh: '用 AI 解决电路设计自动化中的关键问题，关注算法、模型和可落地工具。', en: 'Use AI to solve key problems in electronic design automation, with a focus on algorithms, models, and deployable tools.' }, bullets: [{ zh: 'TabPFN 架构模型自研与性能增强', en: 'TabPFN architecture exploration and performance enhancement' }, { zh: 'EDA 良率数据库构建与开源', en: 'EDA yield database construction and open release' }, { zh: 'EDA 优化算法引擎开发与开源', en: 'EDA optimization engine development and open sourcing' }] },
  { slug: 'lca', title: { zh: 'AI for LCA', en: 'AI for LCA' }, summary: { zh: '用 AI 提升碳足迹评估与生命周期分析的效率、准确性与自动化程度。', en: 'Use AI to improve the efficiency, accuracy, and automation of carbon-footprint and life-cycle analysis.' }, bullets: [{ zh: 'LCA 数据预测与匹配', en: 'LCA data prediction and matching' }, { zh: 'EPD 智能检索体系', en: 'EPD intelligent retrieval system' }, { zh: 'LCI 数据合成框架与 LLM Agent 评估', en: 'LCI data synthesis framework and LLM-agent-based evaluation' }] },
];

const processSteps: TimelineStepDef[] = [
  { title: { zh: '从真实项目开始', en: 'Start from a real project' }, description: { zh: '加入后直接进入项目或 baseline 复现，没有独立的练手环节。', en: 'After joining, you enter a real project or baseline reproduction directly; there is no separate sandbox period.' } },
  { title: { zh: '完成第一个月的 Baseline', en: 'Finish the first-month baseline' }, description: { zh: '第一个月的目标是跑通 Lead 已验证的 baseline，并补齐踩坑记录。', en: 'The first-month goal is to run a baseline already verified by the Lead and document key pitfalls.' } },
  { title: { zh: '进入核心实验', en: 'Move into core experiments' }, description: { zh: '通过后进入核心实验、结果分析、写作与开源整理。', en: 'After that, you move into core experiments, analysis, writing, and open-source organization.' } },
  { title: { zh: '通过 ownership 成长', en: 'Grow through ownership' }, description: { zh: '能独立把项目从 baseline 推到投稿，才是真正的成长与晋升依据。', en: 'The real signal of growth is being able to drive a project from baseline to submission independently.' } },
];

const roles: FeatureCardDef[] = [
  { title: { zh: 'Wei', en: 'Wei' }, description: { zh: '负责战略、选题、质量把关和对外代表，确保方向和值得做的事情被做成。', en: 'Responsible for strategy, topic selection, quality control, and external representation.' } },
  { title: { zh: '管理层', en: 'Directors' }, description: { zh: '负责组织增长、招新、运营、宣传和基础设施，不与研究执行混在一起。', en: 'Responsible for lab growth, recruitment, operations, communications, and infrastructure.' } },
  { title: { zh: 'Lead', en: 'Lead' }, description: { zh: '从立项到投稿对项目全程负责，带 Member 跑实验并整理开源。', en: 'Owns a project from kickoff to submission and leads Members through execution and open-source release.' } },
  { title: { zh: 'Member', en: 'Member' }, description: { zh: '在真实项目中执行实验、复现 baseline、积累记录并逐步承担更大责任。', en: 'Executes experiments, reproduces baselines, accumulates documentation, and grows into larger responsibility.' } },
];

const joinChecklist: FeatureCardDef[] = [
  { title: { zh: '如果你已经具备这些，就可以开始', en: 'You can already start if…' }, description: { zh: '你能写 Python、能读英文文献、会用 GitHub，并愿意持续反馈和自驱推进。', en: 'You can write Python, read papers in English, use GitHub, and are willing to think independently and communicate clearly.' } },
  { title: { zh: '加入后会发生什么', en: 'What happens after joining' }, description: { zh: '一周内完成权限开通、项目分配和首月任务对齐，然后直接进入执行。', en: 'Within the first week, access is provisioned, a project is assigned, and the first-month task is aligned.' } },
  { title: { zh: '我们最看重什么', en: 'What we care about most' }, description: { zh: '我们更看结果而非表面投入。有没有真正把事情做出来，比“看起来很努力”更重要。', en: 'We value outcomes over surface-level effort. Actually making things work matters more than looking busy.' } },
];

const updates: UpdateCardDef[] = [
  { tag: { zh: '渠道', en: 'Channel' }, title: { zh: '实验室主页与对外入口', en: 'Lab homepage and external channel' }, description: { zh: '主页将作为持续更新的对外入口，后续可承接招新、活动、成果和成员故事。', en: 'The homepage serves as a durable external entry point for recruitment, activities, outcomes, and member stories.' } },
  { tag: { zh: '内容', en: 'Content' }, title: { zh: '成员故事与项目进展', en: 'Member stories and project progress' }, description: { zh: '后续适合持续发布项目启动、baseline 进展、成员成长和阶段性成果。', en: 'This structure fits future updates on project kickoffs, baseline progress, member growth, and milestones.' } },
  { tag: { zh: '招新', en: 'Recruitment' }, title: { zh: '下一轮招新的基础设施', en: 'Infrastructure for the next intake' }, description: { zh: '主页也可作为下学期宣传高峰期的基础设施，与海报、PPT、表单统一口径。', en: 'The homepage can also support the next recruitment cycle alongside posters, decks, and forms.' } },
];

const joinPanel = {
  eyebrow: { zh: '申请', en: 'Apply' },
  title: { zh: '准备好和我们一起做事了吗？', en: 'Ready to build with us?' },
  description: { zh: '目前采用表单申请。你可以直接提交申请，也可以选择通过邮件联系。', en: 'Applications are handled through a form. You can submit directly here or contact us by email.' },
  primaryLabel: { zh: '填写申请表', en: 'Open application form' },
  secondaryLabel: { zh: '查看研究方向', en: 'View research tracks' },
};

const applicationForm = {
  eyebrow: { zh: '申请表', en: 'Application form' },
  title: { zh: '申请加入 JCIE', en: 'Apply to JCIE' },
  intro: { zh: '请用真实、简短的方式介绍自己。我们更关心你做过什么、想做什么，以及能不能自驱推进。', en: 'Please introduce yourself in a direct and concise way. We care most about what you have done, what you want to do, and whether you can push work forward independently.' },
  fields: {
    name: { zh: '姓名', en: 'Name' }, email: { zh: '联系邮箱', en: 'Email' }, profile: { zh: '学校 / 专业 / 年级', en: 'School / Major / Year' }, background: { zh: '你做过什么？', en: 'What have you done?' }, motivation: { zh: '你为什么想加入 JCIE？', en: 'Why do you want to join JCIE?' }, links: { zh: '链接 / GitHub / 作品集', en: 'Links / GitHub / Portfolio' },
  },
  placeholders: {
    name: { zh: '你的名字', en: 'Your name' }, email: { zh: 'you@example.com', en: 'you@example.com' }, profile: { zh: '例如：SZU 计算机，大一 / 大二', en: 'e.g. SZU CS, Year 1 / Year 2' }, background: { zh: '写你做过的项目、代码、论文复现、课程项目、比赛或其他能说明能力的东西。', en: 'Tell us about projects, code, paper reproductions, coursework, competitions, or anything else that shows what you can do.' }, motivation: { zh: '真实说明你为什么想来，以及你希望在 JCIE 做什么。', en: 'Explain honestly why you want to join and what you hope to do in JCIE.' }, links: { zh: 'GitHub、个人主页、项目链接等，可选', en: 'GitHub, homepage, project links, etc. (optional)' },
  },
  button: { zh: '提交申请', en: 'Submit application' }, loading: { zh: '正在提交...', en: 'Submitting...' }, emailFallback: { zh: '改用邮件申请', en: 'Email instead' }, idleMessage: { zh: '提交后我们会通过邮件收到你的申请。', en: 'Your application will be delivered to us by email after submission.' }, loadingMessage: { zh: '正在提交申请...', en: 'Submitting your application...' }, successMessage: { zh: '申请已提交，我们会尽快查看。', en: 'Application submitted. Thank you!' }, errorMessage: { zh: '提交失败，请稍后重试，或直接发邮件到 baowen435@gmail.com。', en: 'Submission failed. Please try again later, or email baowen435@gmail.com directly.' },
};

function localizeObject(locale: Locale, value: Record<string, LocalizedString>) {
  return Object.fromEntries(Object.entries(value).map(([key, text]) => [key, text[locale]]));
}

export function getSiteContent(locale: Locale) {
  return {
    locale,
    siteConfig: { ...siteConfig, tagline: localizedMeta.tagline[locale], title: localizedMeta.title[locale], description: localizedMeta.description[locale], location: localizedMeta.location[locale] },
    navigation: navigation.map((item) => ({ label: item.label[locale], href: withLocale(locale, item.href) })),
    hero: { eyebrow: hero.eyebrow[locale], title: hero.title[locale], subtitle: hero.subtitle[locale], primaryCta: { label: hero.primaryCta.label[locale], href: withLocale(locale, hero.primaryCta.href) }, secondaryCta: { label: hero.secondaryCta.label[locale], href: withLocale(locale, hero.secondaryCta.href) }, snapshotLabel: hero.snapshotLabel[locale], coreLabel: hero.coreLabel[locale], coreText: hero.coreText[locale], stats: hero.stats.map((item) => ({ value: item.value[locale], label: item.label[locale] })) },
    mission: { title: mission.title[locale], summary: mission.summary[locale], points: mission.points.map((item) => item[locale]) },
    beliefs: beliefs.map((item) => ({ title: item.title[locale], description: item.description[locale] })),
    gains: gains.map((item) => ({ title: item.title[locale], description: item.description[locale] })),
    researchAreas: researchAreas.map((item) => ({ slug: item.slug, title: item.title[locale], summary: item.summary[locale], bullets: item.bullets.map((bullet) => bullet[locale]) })),
    processSteps: processSteps.map((item) => ({ title: item.title[locale], description: item.description[locale] })),
    roles: roles.map((item) => ({ title: item.title[locale], description: item.description[locale] })),
    joinChecklist: joinChecklist.map((item) => ({ title: item.title[locale], description: item.description[locale] })),
    updates: updates.map((item) => ({ tag: item.tag[locale], title: item.title[locale], description: item.description[locale] })),
    joinPanel: { eyebrow: joinPanel.eyebrow[locale], title: joinPanel.title[locale], description: joinPanel.description[locale], primaryLabel: joinPanel.primaryLabel[locale], secondaryLabel: joinPanel.secondaryLabel[locale] },
    applicationForm: { eyebrow: applicationForm.eyebrow[locale], title: applicationForm.title[locale], intro: applicationForm.intro[locale], fields: localizeObject(locale, applicationForm.fields), placeholders: localizeObject(locale, applicationForm.placeholders), button: applicationForm.button[locale], loading: applicationForm.loading[locale], emailFallback: applicationForm.emailFallback[locale], idleMessage: applicationForm.idleMessage[locale], loadingMessage: applicationForm.loadingMessage[locale], successMessage: applicationForm.successMessage[locale], errorMessage: applicationForm.errorMessage[locale] },
    labels: { beliefs: locale === 'zh' ? '理念' : 'Beliefs', outcome: locale === 'zh' ? '收获' : 'Outcome', research: locale === 'zh' ? '研究' : 'Research', process: locale === 'zh' ? '路径' : 'Process', join: locale === 'zh' ? '加入' : 'Join', updates: locale === 'zh' ? '动态' : 'Updates', navigate: locale === 'zh' ? '导航' : 'Navigate', contact: locale === 'zh' ? '联系' : 'Contact', recruitmentDetails: locale === 'zh' ? '申请说明' : 'Recruitment details' },
    sections: {
      beliefsTitle: locale === 'zh' ? '我们相信' : 'What we believe', beliefsDescription: locale === 'zh' ? '成熟实验室主页通常先建立可信的使命与价值观，再展示研究方向和加入路径。' : 'Mature lab homepages usually establish mission and values first, then present research directions and ways to join.',
      researchTitle: locale === 'zh' ? '两条研究主线，一套执行标准' : 'Two research tracks, one execution standard', researchDescription: locale === 'zh' ? '用清晰研究卡片展示方向，是高校实验室网站最常见、也最容易长期扩展的结构。' : 'Clear research cards are one of the most common and extensible structures on academic lab websites.',
      processTitle: locale === 'zh' ? '学生如何在 JCIE 成长' : 'How students grow inside JCIE', processDescription: locale === 'zh' ? '把加入后的路径讲清楚，能显著降低陌生学生的理解成本。' : 'Explaining the path after joining lowers the cognitive load for new visitors.',
      outcomeTitle: locale === 'zh' ? '你能真正获得什么' : 'What students can actually gain', outcomeDescription: locale === 'zh' ? '将学生收益从“招新文案”转成“成果承诺”，更符合 Lab 官网的对外口径。' : 'Framing benefits as outcomes rather than recruitment copy fits a lab homepage better.',
      joinTitle: locale === 'zh' ? '什么样的人适合加入' : 'Who should apply', joinDescription: locale === 'zh' ? '我们不要求一开始就很强，但要求愿意自驱、能反馈、能把事情推进。' : 'We do not expect perfection at the start, but we do expect self-drive, communication, and execution.',
      updatesTitle: locale === 'zh' ? '一个可以持续发布内容的主页' : 'A homepage that can keep publishing', updatesDescription: locale === 'zh' ? '后续可以像成熟 Lab 官网一样，逐步增加新闻、项目、论文和成员故事。' : 'Over time, this can grow into news, projects, papers, and member stories like a mature lab site.',
      aboutTitle: locale === 'zh' ? '我们为什么做 JCIE' : 'Why JCIE', aboutBeliefsTitle: locale === 'zh' ? '工作原则' : 'Working principles', aboutBeliefsDescription: locale === 'zh' ? '我们公开强调真实产出、学生 ownership 和工程化落地，这也是官网内容长期展开的主线。' : 'We emphasize real output, student ownership, and engineering execution as long-term public-facing themes.',
      aboutStructureTitle: locale === 'zh' ? '实验室如何组织' : 'How the lab is organized', aboutStructureDescription: locale === 'zh' ? '主页展示公开版架构，既能解释培养路径，也不会暴露过细的内部管理信息。' : 'The public-facing structure explains growth paths without exposing overly detailed internal operations.',
      researchPageTitle: locale === 'zh' ? '研究方向' : 'Research tracks', researchPageDescription: locale === 'zh' ? '这两个方向都强调真实应用场景、可验证结果和长期可积累的开源/论文成果。' : 'Both directions emphasize real use cases, verifiable results, and long-term open-source/paper output.',
      joinPageTitle: locale === 'zh' ? '申请加入 SZU-UoS JCIE' : 'Apply to SZU-UoS JCIE', joinPageDescription: locale === 'zh' ? '加入后不是旁观，而是进入真实项目。你可以直接填写申请表，内容会自动发送到 JCIE 邮箱。' : 'Joining means entering real projects, not standing on the side. You can submit the form and it will be sent to the JCIE mailbox.',
    },
  };
}
