import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/lib/site';

const finishes = [
  { name: 'White', hex: '#F4F3EF' },
  { name: 'Black', hex: '#1C1D1C' },
  { name: 'Bronze', hex: '#6A5236' },
  { name: 'Bark', hex: '#493B31' },
  { name: 'Adobe', hex: '#B08168' },
  { name: 'Steel Gray', hex: '#6C757C' },
];

export default function MilgardFeature() {
  return (
    <section id="milgard" className="milgard-field relative overflow-hidden py-24 text-white lg:py-32">
      <div className="absolute top-0 left-0 h-[3px] w-40 bg-milgard-red" />
      <div className="pointer-events-none absolute -top-40 -right-48 h-[620px] w-[620px] rounded-full bg-milgard-red/10 blur-3xl" />
      <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-5">
            <div className="bg-white px-4 py-3">
              <Image
                src={site.images.milgardLogo}
                alt="Milgard Windows & Doors"
                width={174}
                height={37}
                className="h-[30px] w-auto"
              />
            </div>
            <span className="border-l border-white/25 pl-5 text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              Authorized dealer
            </span>
          </div>

          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-white/60 uppercase">
            The fiberglass collection
          </p>
          <h2 className="display-title text-[clamp(2.6rem,4.3vw,4.4rem)]">C700 Fiberglass Series</h2>
          <p className="mt-6 max-w-[490px] font-display text-[26px] leading-snug text-white">
            Engineered for the 21st century.
          </p>
          <p className="mt-6 max-w-[500px] text-[15.5px] leading-relaxed text-white/70">
            Discover fiberglass windows and patio doors designed to bring lasting performance, refined design and beautiful views into your home.
          </p>

          <div className="mt-10">
            <div className="mb-5 flex items-center gap-4">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">Six exterior finishes</p>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <div className="grid max-w-[460px] grid-cols-3 gap-x-6 gap-y-5">
              {finishes.map((finish) => (
                <div key={finish.name} className="flex items-center gap-3">
                  <span
                    className="h-7 w-7 shrink-0 rounded-full border border-white/25 ring-1 ring-black/20"
                    style={{ backgroundColor: finish.hex }}
                    aria-hidden
                  />
                  <span className="text-[12px] leading-tight text-white/80">{finish.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-white/45">Finish availability varies by location.</p>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-6">
            <Link
              href="https://www.edelendoors.com/c700/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-milgard-red !px-7 !py-4 !text-[13px] hover:!bg-[#9e0f26]"
            >
              Explore Milgard C700 <ArrowUpRight size={16} aria-hidden />
            </Link>
            <Link
              href="https://www.milgard.com/windows/C700"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              Visit Milgard
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-white/5">
              <Image
                src={site.images.milgard}
                alt="Milgard C700 fiberglass window collection in a warm interior setting"
                fill
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover object-[50%_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-milgard-navy/45 to-transparent" />
              <div className="absolute right-0 bottom-0 flex items-center gap-3 bg-milgard-red px-5 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase">
                C700 · Fiberglass
              </div>
            </div>
            <div className="absolute -bottom-7 -left-7 hidden max-w-[270px] border-l-2 border-milgard-red bg-white px-7 py-6 text-ink shadow-xl sm:block">
              <p className="eyebrow !text-[10px]">Windows &amp; patio doors</p>
              <p className="mt-3 font-display text-[20px] leading-snug">One considered collection, inside and out.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
