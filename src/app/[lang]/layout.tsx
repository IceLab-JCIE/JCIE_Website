import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getSiteContent } from '@/content/site';
import { isLocale, Locale, locales } from '@/lib/i18n';

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const content = getSiteContent(lang);
  return {
    title: content.siteConfig.title,
    description: content.siteConfig.description,
    openGraph: {
      title: content.siteConfig.title,
      description: content.siteConfig.description,
      url: `https://jcie.vercel.app/${lang}`,
      siteName: content.siteConfig.name,
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.siteConfig.title,
      description: content.siteConfig.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.12),_transparent_30%),linear-gradient(180deg,_#ffffff_0%,_#f7f9fc_52%,_#eef4f8_100%)]">
      <SiteHeader locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
