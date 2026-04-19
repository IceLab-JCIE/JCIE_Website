import { SectionHeading } from '@/components/section-heading';
import { beliefs, mission, roles } from '@/content/site';

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <SectionHeading eyebrow="About" title="Why JCIE" description={mission.summary} />

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {mission.points.map((point) => (
          <article key={point} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-base leading-8 text-slate-200">
            {point}
          </article>
        ))}
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Beliefs"
          title="Working principles"
          description="我们公开强调真实产出、学生 ownership 和工程化落地，这也是官网内容长期展开的主线。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {beliefs.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Structure"
          title="How the lab is organized"
          description="主页上展示公开版架构，既能解释培养路径，也不会暴露过细的内部管理信息。"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {roles.map((role) => (
            <article key={role.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{role.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-300">{role.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
