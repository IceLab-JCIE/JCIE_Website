import Link from 'next/link';
import { getSiteContent } from '@/content/site';
import { Locale } from '@/lib/i18n';

type SiteFooterProps = { locale: Locale };

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = getSiteContent(locale);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.siteConfig.shortName}</p>
          <h2 className="text-2xl font-semibold text-slate-950">{content.siteConfig.tagline}</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600">{content.siteConfig.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{content.labels.navigate}</h3>
          <div className="mt-4 flex flex-col gap-3">
            {content.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition hover:text-cyan-800">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{content.labels.contact}</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <a href={`mailto:${content.siteConfig.contactEmail}`} className="transition hover:text-cyan-800">{content.siteConfig.contactEmail}</a>
            <span>{content.siteConfig.location}</span>
            <Link href={`/${locale}/join`} className="font-medium text-cyan-800 transition hover:text-cyan-700">{content.labels.recruitmentDetails}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
