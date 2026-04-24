export type MemberRole = 'wei' | 'director' | 'lead' | 'member';

export type DirectorPosition =
  | 'president'
  | 'recruitment'
  | 'communications'
  | 'computing'
  | 'ai_infra';

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
  // Advisor (导师)
  {
    id: 'wei',
    name: '\u90A2\u709C', // 邢炜
    nameEn: 'Wei Xing',
    role: 'wei',
    title: '\u5BFC\u5E08',
    titleEn: 'Advisor',
    bio: 'JCIE \u5BFC\u5E08\u3002',
    bioEn: 'Advisor of JCIE.',
  },

  // Leads (项目负责人)
  { id: 'lead-kaiqi', name: '\u51EF\u671F', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 凯期
  { id: 'lead-qinxin', name: '\u6C81\u5FC3', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 沁心
  { id: 'lead-zhuohua', name: '\u5353\u94E7', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 卓铧
  { id: 'lead-baowen', name: '\u5B9D\u6587', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 宝文
  { id: 'lead-jinghai', name: '\u9756\u6D77', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 靖海
  { id: 'lead-jiazhan', name: '\u4F73\u5C55', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 佳展
  { id: 'lead-bohao', name: '\u535A\u8C6A', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 博豪
  { id: 'lead-xixi', name: '\u7199\u66E6', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, // 熙曦

  // Directors (管理层) - TODO: fill real info
  // {
  //   id: 'director-1',
  //   name: 'Name',
  //   role: 'director',
  //   directorPosition: 'president',
  // },

  // Members (成员) - TODO: fill real info
  // {
  //   id: 'member-1',
  //   name: 'Name',
  //   role: 'member',
  // },
];

export function getMembersByRole(role: MemberRole): Member[] {
  return members.filter((m) => m.role === role);
}

export function getDirectorsByPosition(position: DirectorPosition): Member[] {
  return members.filter((m) => m.role === 'director' && m.directorPosition === position);
}

export const directorPositions: {
  key: DirectorPosition;
  label: Record<string, string>;
  description: Record<string, string>;
}[] = [
  {
    key: 'president',
    label: { zh: 'President', en: 'President' },
    description: {
      zh: '\u7EDF\u7B79\u8FD0\u8425\u3001\u4F8B\u4F1A\u7EC4\u7EC7\u3001\u8BBA\u6587 deadline \u8DDF\u8FDB',
      en: 'Operations, meeting organization, paper deadline tracking',
    },
  },
  {
    key: 'recruitment',
    label: { zh: 'Director of Recruitment', en: 'Director of Recruitment' },
    description: {
      zh: '\u62DB\u65B0\u6F0F\u6597\u3001\u9762\u8BD5\u6D41\u7A0B\u3001\u65B0\u4EBA onboarding',
      en: 'Recruitment funnel, interview process, new member onboarding',
    },
  },
  {
    key: 'communications',
    label: { zh: 'Director of Communications', en: 'Director of Communications' },
    description: {
      zh: '\u6708\u5EA6\u57F9\u8BAD/\u8BB2\u5EA7\u7EC4\u7EC7\u3001\u5BF9\u5916\u5BA3\u4F20\u3001\u5185\u5BB9\u8F93\u51FA',
      en: 'Monthly training/lectures, external communications, content output',
    },
  },
  {
    key: 'computing',
    label: { zh: 'Director of Computing', en: 'Director of Computing' },
    description: {
      zh: '\u670D\u52A1\u5668\u7BA1\u7406\u3001\u7B97\u529B\u5206\u914D\u3001\u6743\u9650\u7BA1\u7406',
      en: 'Server management, computing resource allocation, permission management',
    },
  },
  {
    key: 'ai_infra',
    label: { zh: 'Director of AI Infra', en: 'Director of AI Infra' },
    description: {
      zh: '\u5F00\u53D1\u7EC4\u5185 AI \u5DE5\u5177\uFF0C\u8D4B\u80FD\u5168\u7EC4',
      en: 'Develop internal AI tools to empower the team',
    },
  },
];

export const roleLabels: Record<MemberRole, Record<string, string>> = {
  wei: { zh: '\u5BFC\u5E08', en: 'Advisor' },
  director: { zh: '\u7BA1\u7406\u5C42', en: 'Directors' },
  lead: { zh: 'Lead', en: 'Project Lead' },
  member: { zh: '\u6210\u5458', en: 'Member' },
};

