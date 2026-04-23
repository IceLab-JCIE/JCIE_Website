import Link from 'next/link';
import { getSiteContent } from '@/content/site';
import { Locale } from '@/lib/i18n';

type SiteFooterProps = { locale: Locale };

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = getSiteContent(locale);

  return (
    <footer className="border-t border-slate-200/70 bg-white/65 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-xs font-semibold text-white">
              JC
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-900">JCIE</span>
              <span className="ml-2 text-sm text-slate-500">SZU-UoS Joint Centre</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a href={`mailto:${content.siteConfig.contactEmail}`} className="hover:text-slate-900">
              {content.siteConfig.contactEmail}
            </a>
            <Link href={content.siteConfig.githubUrl} className="hover:text-slate-900">
              GitHub
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          {locale === 'zh' ? '深圳大学 - 谢菲尔德大学 联合创新与工程中心' : 'Shenzhen University - University of Sheffield Joint Centre for Innovation & Engineering'}
        </div>
      </div>
    </footer>
  );
}
