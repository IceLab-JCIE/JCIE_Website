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

export interface Alumni {
  id: string;
  name: string;
  nameEn?: string;
  destination?: string;
  destinationEn?: string;
  publications?: Publication[];
}

export interface Publication {
  title: string;
  venue: string;
  year: number;
  link?: string;
}

export const members: Member[] = [
  // Advisor
  {
    id: 'wei',
    name: '邢炜', 
    nameEn: 'Wei Xing',
    role: 'wei',
    title: '\u5BFC\u5E08',
    titleEn: 'Mentor',
    bio: '邢炜老师，英国谢菲尔德大学数学与统计学院讲师，华威大学博士，前北京航空航天大学助理教授。研究成果发表于 Nature 子刊、NeurIPS、DAC、ICCAD、AAAI、TODAES 等顶级会议与期刊，2025 年入选英国 Manchester Prize 十强。已指导多名深大本科生直博北京大学、北京航空航天大学、香港科技大学等高校。',
    bioEn:
      'Wei Xing is a Lecturer in the School of Mathematics and Statistics at the University of Sheffield. He received his PhD from the University of Warwick and was previously an Assistant Professor at Beihang University. His work has been published in Nature portfolio journals and top venues including NeurIPS, DAC, ICCAD, AAAI, and TODAES. In 2025, he was selected as a Top 10 finalist of the UK Manchester Prize. He has supervised multiple SZU undergraduates for direct PhD admissions at Peking University, Beihang University, HKUST, and other universities.',
  },

  // Directors
  {
    id: 'director-kaiqi',
    name: '黄凯期',
    nameEn: 'Kaiqi Huang',
    role: 'director',
    directorPosition: 'president',
    title: 'President',
    titleEn: 'President',
  },
  {
    id: 'director-baowen-recruitment',
    name: '区宝文',
    nameEn: 'Baowen Ou',
    role: 'director',
    directorPosition: 'recruitment',
    title: 'Director of Recruitment',
    titleEn: 'Director of Recruitment',
  },
  {
    id: 'director-baowen-communications',
    name: '区宝文',
    nameEn: 'Baowen Ou',
    role: 'director',
    directorPosition: 'communications',
    title: 'Director of Communications',
    titleEn: 'Director of Communications',
  },
  {
    id: 'director-jinghai',
    name: '商靖海',
    nameEn: 'Jinghai Shang',
    role: 'director',
    directorPosition: 'computing',
    title: 'Director of Computing',
    titleEn: 'Director of Computing',
  },

  // Leads (椤圭洰璐熻矗浜?
  { id: 'lead-kaiqi', name: '黄凯期', nameEn: 'Kaiqi Huang', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-qinxin', name: '梅沁心', nameEn: 'Qinxin Mei', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-zhuohua', name: '刘卓铧', nameEn: 'Zhuohua Liu', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-baowen', name: '区宝文', nameEn: 'Baowen Ou', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-jinghai', name: '商靖海', nameEn: 'Jinghai Shang', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-jiazhan', name: '刘佳展', nameEn: 'Jiazhan Liu', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-bohao', name: '刘博豪', nameEn: 'Bohao Liu', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 
  { id: 'lead-xixi', name: '周熙曦', nameEn: 'Xixi Zhou', role: 'lead', title: 'Lead', titleEn: 'Project Lead' }, 

  // Directors (绠＄悊灞? - TODO: fill real info
  // {
  //   id: 'director-1',
  //   name: 'Name',
  //   role: 'director',
  //   directorPosition: 'president',
  // },

  // Members (鎴愬憳) - TODO: fill real info
  // {
  //   id: 'member-1',
  //   name: 'Name',
  //   role: 'member',
  // },

  // Members (成员)
  { id: 'member-zhaojunan', name: '招俊安', nameEn: 'Zhao Junan', role: 'member' },
  { id: 'member-maizirui', name: '麦梓睿', nameEn: 'Maizirui Mai', role: 'member' },
  { id: 'member-yuanyizhong', name: '苑艺钟', nameEn: 'Yuan Yizhong', role: 'member' },
  { id: 'member-tanghaohao', name: '唐浩浩', nameEn: 'Tang Haohao', role: 'member' },
  { id: 'member-zhuzexi', name: '朱则熹', nameEn: 'Zhu Zexi', role: 'member' },
  { id: 'member-xuyipeng', name: '徐一鹏', nameEn: 'Xu Yipeng', role: 'member' },
  { id: 'member-linweibin', name: '林伟斌', nameEn: 'Lin Weibin', role: 'member' },
  { id: 'member-liaohongshang', name: '廖宏商', nameEn: 'Liao Hongshang', role: 'member' },
  { id: 'member-wangjiyi', name: '王继熠', nameEn: 'Wang Jiyi', role: 'member' },
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
  wei: { zh: '导师', en: 'Mentor' },
  director: { zh: '管理层', en: 'Directors' },
  lead: { zh: 'Lead', en: 'Project Lead' },
  member: { zh: '成员', en: 'Member' },
};
