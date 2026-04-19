import { SectionHeading } from '@/components/section-heading';
import { joinChecklist, launchNeeds, siteConfig } from '@/content/site';

export default function JoinPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Join Us"
        title="Apply to SZU-UoS JCIE"
        description="加入后不是旁观，而是进入真实项目。官网这部分也已经预留为后续报名表单、FAQ 和 onboarding 内容的承载页。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-8">
          {joinChecklist.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-8">
          <h2 className="text-2xl font-semibold text-white">Launch checklist</h2>
          <p className="mt-4 text-base leading-8 text-slate-200">
            下面这些信息补齐后，我就可以继续把站点改成正式上线版，而不是占位版。
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-100">
            {launchNeeds.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Email us
            </a>
            <a
              href={siteConfig.applyFormUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Application form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
