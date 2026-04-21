export type MemberRole = 'wei' | 'director' | 'lead' | 'member';

export type DirectorPosition = 'president' | 'recruitment' | 'communications' | 'computing' | 'ai_infra';

export interface Member {
  id: string;
  name: string;
  nameEn?: string;
  role: MemberRole;
  directorPosition?: DirectorPosition;
  title?: string;
  titleEn?: string;
  bio?: string;
  bioEn?: string;
  photo?: string;
  github?: string;
  email?: string;
  linkedin?: string;
  researchArea?: string;
  year?: string;
}

export const members: Member[] = [
  // Wei (导师)
  {
    id: 'wei',
    name: 'Wei',
    nameEn: 'Wei',
    role: 'wei',
    title: '战略 + 对外 + 选题 + 写作',
    titleEn: 'Strategy + External Relations + Topic Selection + Writing',
    bio: '判断什么值得做。拆解路径。主导论文写作。最终把关质量。对外代表 JCIE。',
    bioEn: 'Determines what is worth doing. Breaks down the path. Leads paper writing. Final quality control. External representative of JCIE.',
    photo: '/images/wei.jpg',
  },
  // Directors (管理层) - 需要填写实际信息
  // {
  //   id: 'director-1',
  //   name: '姓名',
  //   nameEn: 'Name',
  //   role: 'director',
  //   directorPosition: 'president',
  //   title: '统筹运营、例会组织、论文 deadline 追踪',
  //   titleEn: 'Operations, meeting organization, paper deadline tracking',
  //   bio: '简介',
  //   bioEn: 'Bio',
  //   photo: '/images/member-1.jpg',
  // },
  // Lead (项目负责人) - 需要填写实际信息
  // {
  //   id: 'lead-1',
  //   name: '姓名',
  //   nameEn: 'Name',
  //   role: 'lead',
  //   title: '项目负责人',
  //   titleEn: 'Project Lead',
  //   bio: '简介',
  //   bioEn: 'Bio',
  //   researchArea: 'AI for EDA',
  //   photo: '/images/lead-1.jpg',
  // },
  // Member (成员) - 需要填写实际信息
  // {
  //   id: 'member-1',
  //   name: '姓名',
  //   nameEn: 'Name',
  //   role: 'member',
  //   title: '成员',
  //   titleEn: 'Member',
  //   bio: '简介',
  //   bioEn: 'Bio',
  //   researchArea: 'AI for EDA',
  //   year: '大二',
  //   photo: '/images/member-1.jpg',
  // },
];

export function getMembersByRole(role: MemberRole): Member[] {
  return members.filter((m) => m.role === role);
}

export function getDirectorsByPosition(position: DirectorPosition): Member[] {
  return members.filter((m) => m.role === 'director' && m.directorPosition === position);
}

export const directorPositions: { key: DirectorPosition; label: Record<string, string>; description: Record<string, string> }[] = [
  {
    key: 'president',
    label: { zh: 'President', en: 'President' },
    description: { zh: '统筹运营、例会组织、论文 deadline 追踪', en: 'Operations, meeting organization, paper deadline tracking' },
  },
  {
    key: 'recruitment',
    label: { zh: 'Director of Recruitment', en: 'Director of Recruitment' },
    description: { zh: '招新漏斗、面试流程、新人 onboarding', en: 'Recruitment funnel, interview process, new member onboarding' },
  },
  {
    key: 'communications',
    label: { zh: 'Director of Communications', en: 'Director of Communications' },
    description: { zh: '月度培训/讲座组织、对外宣传、内容输出', en: 'Monthly training/lectures, external communications, content output' },
  },
  {
    key: 'computing',
    label: { zh: 'Director of Computing', en: 'Director of Computing' },
    description: { zh: '服务器管理、算力分配、权限管理', en: 'Server management, computing resource allocation, permission management' },
  },
  {
    key: 'ai_infra',
    label: { zh: 'Director of AI Infra', en: 'Director of AI Infra' },
    description: { zh: '开发组织内部 AI 工具，赋能全组', en: 'Develop internal AI tools to empower the team' },
  },
];

export const roleLabels: Record<MemberRole, Record<string, string>> = {
  wei: { zh: '导师', en: 'Advisor' },
  director: { zh: '管理层', en: 'Directors' },
  lead: { zh: '项目负责人', en: 'Project Lead' },
  member: { zh: '成员', en: 'Member' },
};