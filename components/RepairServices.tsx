import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/lib/site';

const services = [
  {
    title: 'Window Repair',
    text: 'Sticking sashes, failed seals, broken hardware and fogged glass — assessed by people who know windows.',
  },
  {
    title: 'Door Repair',
    text: 'Alignment, weatherstripping, locks and closing issues for entry, patio and interior doors.',
  },
  {
    title: 'Garage Door Installation',
    text: 'A new door selected for your home, then installed and tuned by our certified craftsmen.',
  },
  {
    title: 'Garage Door Repair',
    text: 'Tune-ups and repairs across brands and models, from a simple adjustment to a complex fix.',
  },
];

export default function RepairServices() {
  return (
    <section id="repairs" className="border-t border-line bg-white py-24 lg:py-32">
      <div className="container-site">
        <Reveal className="mb-14 max-w-[860px]">
          <p className="eyebrow mb-6">Repair &amp; installation</p>
          <h2 className="display-title text-[clamp(2.6rem,4.2vw,4.25rem)]">
            Not every project starts
            <br />
            with something new.
          </h2>
          <p className="mt-7 max-w-[650px] text-[16px] leading-relaxed text-ink-soft">
            From everyday repairs to complete installations, our experienced team helps keep your windows and doors working beautifully.
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
          <Reveal className="relative min-h-[420px] overflow-hidden">
            <Image
              src={site.images.repair}
              alt="Residential window and door service photography"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
            <div className="absolute right-6 bottom-6 bg-white px-6 py-5">
              <p className="eyebrow !text-[10px]">Service &amp; repair</p>
              <p className="mt-2 font-display text-[22px] leading-snug">Local help, done right.</p>
            </div>
          </Reveal>

          <div>
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <div className="group grid grid-cols-[44px_1fr_auto] items-start gap-5 border-b border-line py-7 first:border-t first:border-line">
                  <span className="pt-1 text-[12px] font-semibold tracking-[0.15em] text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[25px] leading-tight transition-colors group-hover:text-brand">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-ink-soft">{service.text}</p>
                  </div>
                  <ArrowUpRight size={18} className="mt-2 text-slate-mid transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand" aria-hidden />
                </div>
              </Reveal>
            ))}
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link href="#contact" className="btn-primary">
                  Request Service Help <ArrowUpRight size={16} aria-hidden />
                </Link>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink hover:text-brand">
                  <Phone size={15} aria-hidden /> Or call {site.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
