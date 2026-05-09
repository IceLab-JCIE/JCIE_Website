import type { Lang } from "./i18n";

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${path.replace(/^\/+/, "")}`;
}

export function stripBase(pathname: string): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  if (!base || base === "/") return pathname;
  if (!pathname.startsWith(base)) return pathname;
  const stripped = pathname.slice(base.length);
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function langPath(lang: Lang, path: string): string {
  const inner = path.startsWith("/") ? path : `/${path}`;
  return withBase(`/${lang}${inner}`);
}

