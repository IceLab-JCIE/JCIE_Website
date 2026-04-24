import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { Markdown } from '@/components/markdown';
import { getSiteContent } from '@/content/site';
import { getPageContent } from '@/content/pages';
import { isLocale, Locale } from '@/lib/i18n';

function getString(data: Record<string, unknown>, key: string, fallback = '') {
  const v = data[key];
  return typeof v === 'string' ? v : fallback;
}

export default async function JoinPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const { siteConfig } = getSiteContent(locale);
  const { data, body } = await getPageContent('join', locale);

  const emailSubject = getString(data, 'email_subject_template', locale === 'zh' ? '【加入 JCIE】你的名字' : '[Join JCIE] Your Name');
  const emailButtonLabel = getString(data, 'email_button_label', locale === 'zh' ? '发送申请邮件' : 'Send Application Email');

  const markdown = body.replaceAll('{{contactEmail}}', siteConfig.contactEmail);
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(emailSubject)}`;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow={getString(data, 'eyebrow', locale === 'zh' ? '加入' : 'Join')}
        title={getString(data, 'title', locale === 'zh' ? '申请加入 JCIE' : 'Apply to JCIE')}
        description={getString(data, 'description')}
      />

      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
        <Markdown content={markdown} />
        <div className="mt-8">
          <Link href={mailto} className="inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
            {emailButtonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}

