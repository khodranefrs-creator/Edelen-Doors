import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[660px] overflow-hidden bg-[#0d1a15] lg:h-[min(860px,calc(100svh-116px))]">
      <Image
        src={site.images.hero}
        alt="Editorial architectural photograph representing the Edelen view"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07130f]/90 via-[#07130f]/58 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07130f]/60 via-transparent to-[#07130f]/20" />

      <div className="container-site relative z-10 flex min-h-[660px] flex-col justify-center py-20 lg:h-full lg:py-0">
        <div className="max-w-[760px] text-white">
          <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold tracking-[0.24em] text-white/75 uppercase">
            <span className="h-px w-10 bg-white/70" />
            Edelen Doors &amp; Windows · Portland, Oregon
          </div>
          <h1 className="display-title text-[clamp(3.1rem,6.6vw,6.2rem)]">
            The window
            <br />
            makes the view.
          </h1>
          <p className="mt-8 max-w-[570px] text-[17px] leading-relaxed text-white/85 lg:text-[19px]">
            Beautifully crafted windows and doors, thoughtfully selected and professionally installed for the way you live.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="#contact" className="btn-primary !bg-brand !px-7 !py-4 !text-[13px] hover:!bg-brand-deep">
              Free Consultation <ArrowUpRight size={17} aria-hidden />
            </Link>
            <Link
              href="#showroom"
              className="btn-outline !border-white/70 !px-7 !py-4 !text-[13px] text-white hover:!bg-white hover:!text-ink"
            >
              Explore Our Showroom <ArrowDownRight size={17} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 lg:absolute lg:bottom-12 lg:left-[max(32px,calc((100vw-1320px)/2))] lg:right-[max(32px,calc((100vw-1320px)/2))] lg:mt-0">
          <div className="flex items-center gap-3 text-[12px] tracking-[0.12em] text-white/75 uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
            Serving Portland homeowners since {site.founded}
          </div>
          <a
            href={site.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[12px] text-white/80 transition-colors hover:text-white"
          >
            <MapPin size={14} aria-hidden />
            {site.address.line1}, {site.address.line2}
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
