import Link from 'next/link';
import { navigation, siteConfig } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{siteConfig.shortName}</p>
          <h2 className="text-2xl font-semibold text-white">{siteConfig.tagline}</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-400">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Navigate</h3>
          <div className="mt-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <a href={`mailto:${siteConfig.contactEmail}`} className="transition hover:text-white">
              {siteConfig.contactEmail}
            </a>
            <span>{siteConfig.location}</span>
            <Link href="/join" className="text-cyan-300 transition hover:text-cyan-200">
              Recruitment details
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
