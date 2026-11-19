import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Clock3, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/lib/site';

export default function Showroom() {
  return (
    <section id="showroom" className="bg-white py-24 lg:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-24">
        <Reveal className="relative">
          <div className="relative aspect-[5/4] overflow-hidden bg-[#e9e7e2]">
            <Image
              src={site.images.showroom}
              alt="Edelen Doors & Windows showroom display in Portland"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 -bottom-10 hidden w-[42%] border-[8px] border-white shadow-lg sm:block lg:-right-12">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e9e7e2]">
              <Image
                src={site.images.showroomSecondary}
                alt="Windows and doors on display in the Edelen showroom"
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-6 -left-4 hidden bg-brand px-6 py-4 text-white lg:block">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase">Open to the public</p>
            <p className="mt-1 font-display text-[20px]">No appointment needed</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow mb-6">The showroom experience</p>
          <h2 className="display-title text-[clamp(2.6rem,4.2vw,4.25rem)]">
            See it. Touch it.
            <br />
            Experience it.
          </h2>
          <p className="mt-7 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
            Portland&apos;s only complete door and window showroom. Walk in, explore the possibilities and experience the products before making your decision.
          </p>

          <div className="mt-9 inline-flex items-center gap-3 border border-brand/25 bg-brand-soft px-5 py-3 text-[13px] font-medium text-brand">
            <Check size={16} strokeWidth={2.4} aria-hidden />
            No appointment needed — come as you are
          </div>

          <div className="mt-10 grid gap-8 border-t border-line pt-9 sm:grid-cols-2">
            <div>
              <p className="eyebrow !text-[10px] !text-slate-mid">Find us</p>
              <address className="mt-3 flex gap-3 not-italic text-[15px] leading-relaxed text-ink">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </address>
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand hover:underline"
              >
                Get directions <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
            <div>
              <p className="eyebrow !text-[10px] !text-slate-mid">Showroom hours</p>
              <div className="mt-3 flex gap-3">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <ul className="space-y-1.5 text-[14px] text-ink">
                  {site.hours.slice(0, 2).map((h) => (
                    <li key={h.days} className="flex justify-between gap-5">
                      <span className="text-ink-soft">{h.days}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={site.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand hover:underline"
              >
                <Phone size={14} aria-hidden /> {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
