'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, switchLocalePath } from '@/lib/i18n';

type SiteHeaderProps = { locale: Locale };

const navItems = [
  { href: '', labelZh: '概览', labelEn: 'Overview' },
  { href: '/people', labelZh: '成员', labelEn: 'People' },
  { href: '/news', labelZh: '动态', labelEn: 'News' },
  { href: '/publications', labelZh: '论文', labelEn: 'Publications' },
  { href: '/projects', labelZh: '项目', labelEn: 'Projects' },
  { href: '/join', labelZh: '加入', labelEn: 'Join' },
];

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const currentPath = pathname.replace(`/${locale}`, '').replace('/', '') || '';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/65 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            JC
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-slate-500">SZU-UoS</span>
            <span className="text-lg font-semibold text-slate-900">JCIE</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = currentPath === item.href.replace('/', '');
            const href = item.href ? `/${locale}${item.href}` : `/${locale}`;
            return (
              <Link
                key={item.href}
                href={href}
                className={`text-sm font-medium transition ${isActive ? 'text-slate-900 border-b-2 border-slate-900 pb-1' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {locale === 'zh' ? item.labelZh : item.labelEn}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <Link
              href={switchLocalePath(pathname, 'zh')}
              className={`rounded px-3 py-1.5 text-xs font-medium transition ${locale === 'zh' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              中文
            </Link>
            <Link
              href={switchLocalePath(pathname, 'en')}
              className={`rounded px-3 py-1.5 text-xs font-medium transition ${locale === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
