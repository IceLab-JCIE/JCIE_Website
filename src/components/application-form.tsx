'use client';

import Link from 'next/link';
import { getSiteContent } from '@/content/site';
import { Locale } from '@/lib/i18n';

type ApplicationFormProps = { locale: Locale };

const inputClass = 'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-700/10';
const labelClass = 'text-sm font-semibold text-slate-800';

export function ApplicationForm({ locale }: ApplicationFormProps) {
  const content = getSiteContent(locale).applicationForm;
  const emailSubject = locale === 'zh' ? '【加入 JCIE】你的名字' : '[Join JCIE] Your Name';

  return (
    <div className="rounded-[2rem] border border-cyan-700/15 bg-cyan-50 p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">{content.eyebrow}</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-950">{content.title}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{content.intro}</p>
      </div>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-950">{locale === 'zh' ? '邮件申请说明' : 'Email application instructions'}</h3>
        <p className="mt-3 text-base leading-8 text-slate-600">
          {locale === 'zh'
            ? '请发送邮件到 baowen435@gmail.com，标题格式：【加入 JCIE】你的名字'
            : 'Please send an email to baowen435@gmail.com with subject: [Join JCIE] Your Name'}
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          {locale === 'zh'
            ? '邮件内容只需要说三件事：你是谁、你做过什么、你为什么想来。不用套模板，说真实的就好。'
            : 'Just tell us three things in the email: who you are, what you have done, and why you want to join. Be honest and direct.'}
        </p>
        <Link
          href={`mailto:baowen435@gmail.com?subject=${encodeURIComponent(emailSubject)}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-900"
        >
          {content.button}
        </Link>
      </div>
    </div>
  );
}