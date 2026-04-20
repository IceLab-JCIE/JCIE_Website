import { ApplicationForm } from '@/components/application-form';
import { SectionHeading } from '@/components/section-heading';
import { joinChecklist } from '@/content/site';

export default function JoinPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="Join Us"
        title="Apply to SZU-UoS JCIE"
        description="加入后不是旁观，而是进入真实项目。你可以直接填写申请表，内容会自动发送到 JCIE 邮箱。"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          {joinChecklist.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>

        <ApplicationForm />
      </div>
    </div>
  );
}
