export const languages = ["zh", "en"] as const;
export type Lang = (typeof languages)[number];

export function isLang(v: string): v is Lang {
  return (languages as readonly string[]).includes(v);
}

export function t(lang: Lang, zh: string, en: string): string {
  return lang === "zh" ? zh : en;
}

export const navItems: Array<{ key: string; path: string; labelZh: string; labelEn: string }> = [
  { key: "home", path: "/", labelZh: "首页", labelEn: "Home" },
  { key: "people", path: "/people/", labelZh: "成员", labelEn: "People" },
  { key: "projects", path: "/projects/", labelZh: "项目", labelEn: "Projects" },
  { key: "publications", path: "/publications/", labelZh: "论文", labelEn: "Publications" },
  { key: "news", path: "/news/", labelZh: "动态", labelEn: "News" },
  { key: "join", path: "/join/", labelZh: "加入", labelEn: "Join" },
];

