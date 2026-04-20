'use client';

import { FormEvent, useState } from 'react';

type FormStatus =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

const inputClass =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-700/10';

const labelClass = 'text-sm font-semibold text-slate-800';

export function ApplicationForm() {
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '提交后我们会通过邮件收到你的申请。',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ type: 'loading', message: '正在提交申请...' });

    const response = await fetch('/api/apply', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus({
        type: 'error',
        message: result.message ?? '提交失败，请稍后重试，或直接发邮件到 baowen435@gmail.com。',
      });
      return;
    }

    form.reset();
    setStatus({
      type: 'success',
      message: result.message ?? '申请已提交，我们会尽快查看。',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-cyan-700/15 bg-cyan-50 p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">Application form</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-950">Apply to JCIE</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          请用真实、简短的方式介绍自己。我们更关心你做过什么、想做什么，以及能不能自驱推进。
        </p>
      </div>

      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="mt-8 grid gap-5">
        <label className={labelClass}>
          Name / 姓名
          <input className={inputClass} name="name" required placeholder="你的名字" />
        </label>

        <label className={labelClass}>
          Email / 联系邮箱
          <input className={inputClass} name="email" type="email" required placeholder="you@example.com" />
        </label>

        <label className={labelClass}>
          School / Major / Year
          <input className={inputClass} name="profile" placeholder="例如：SZU CS, 大一 / 大二" />
        </label>

        <label className={labelClass}>
          What have you done?
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            name="background"
            required
            placeholder="写你做过的项目、代码、论文复现、课程项目、比赛或其他能说明能力的东西。"
          />
        </label>

        <label className={labelClass}>
          Why do you want to join JCIE?
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            name="motivation"
            required
            placeholder="真实说明你为什么想来，以及你希望在 JCIE 做什么。"
          />
        </label>

        <label className={labelClass}>
          Links / GitHub / Portfolio
          <input className={inputClass} name="links" placeholder="GitHub、个人主页、项目链接等，可选" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.type === 'loading' ? 'Submitting...' : 'Submit application'}
        </button>
        <a
          href="mailto:baowen435@gmail.com?subject=%E3%80%90Join%20JCIE%E3%80%91%E4%BD%A0%E7%9A%84%E5%90%8D%E5%AD%97"
          className="inline-flex items-center justify-center rounded-full border border-cyan-700/20 bg-white px-6 py-3 text-sm font-semibold text-cyan-900 shadow-sm transition hover:border-cyan-800"
        >
          Email instead
        </a>
      </div>

      <p
        className={`mt-5 text-sm leading-7 ${
          status.type === 'error'
            ? 'text-red-700'
            : status.type === 'success'
              ? 'text-emerald-700'
              : 'text-slate-600'
        }`}
      >
        {status.message}
      </p>
    </form>
  );
}
