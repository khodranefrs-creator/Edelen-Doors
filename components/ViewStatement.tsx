import Image from 'next/image';
import Reveal from './Reveal';
import { site } from '@/lib/site';

export default function ViewStatement() {
  return (
    <section className="border-b border-line bg-paper py-20 lg:py-28" aria-labelledby="view-statement-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24">
        <Reveal>
          <div className="mb-8 flex items-center gap-4">
            <span className="eyebrow">Chapter 01</span>
            <span className="h-px w-14 bg-line" />
          </div>
          <h2 id="view-statement-title" className="display-title text-[clamp(2.15rem,3.6vw,3.65rem)] text-ink">
            A home shaped by light.
            <br />
            <span className="text-slate-mid">Framed for the landscape beyond.</span>
          </h2>
          <p className="mt-7 max-w-[540px] text-[15.5px] leading-relaxed text-ink-soft">
            The right window does more than fill a room with daylight. It changes how a home feels — from the first light of morning to the last look outside at dusk.
          </p>
          <div className="mt-9 flex items-center gap-3 text-[12px] font-medium tracking-[0.1em] text-brand uppercase">
            <span className="h-px w-8 bg-brand/50" />
            The art of the view
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-[#e9e7e2] lg:ml-auto">
            <Image
              src={site.images.viewDetail}
              alt="Detail of the architectural photography collection"
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-[50%_45%]"
            />
            <div className="absolute right-0 bottom-0 bg-white px-6 py-5">
              <p className="eyebrow !text-[10px]">Designed around the view</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
