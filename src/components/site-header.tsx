'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiteContent } from '@/content/site';
import { Locale, switchLocalePath } from '@/lib/i18n';

type SiteHeaderProps = { locale: Locale };

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const content = getSiteContent(locale);
  const targetZh = switchLocalePath(pathname, 'zh');
  const targetEn = switchLocalePath(pathname, 'en');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-slate-950">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-sm">
            JC
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">{content.siteConfig.shortName}</span>
            <span className="text-base font-semibold tracking-tight">{content.siteConfig.name}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {content.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-cyan-800">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-slate-200 bg-slate-50 p-1 sm:flex">
            <Link href={targetZh} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${locale === 'zh' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              中文
            </Link>
            <Link href={targetEn} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${locale === 'en' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              EN
            </Link>
          </div>

          <Link href={`/${locale}/join`} className="inline-flex items-center justify-center rounded-full bg-cyan-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700">
            {locale === 'zh' ? '申请加入' : 'Apply'}
          </Link>
        </div>
      </div>
    </header>
  );
}
