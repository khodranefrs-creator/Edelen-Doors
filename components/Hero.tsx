import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[720px] overflow-hidden bg-[#0d1a15] lg:h-[min(900px,calc(100svh-116px))]"
    >
      <Image
        src={site.images.hero}
        alt="Editorial architectural photograph representing the Edelen view"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_42%]"
      />
      {/* Directional wash protects the copy while leaving the view legible on the right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,19,15,0.86) 0%, rgba(7,19,15,0.52) 30%, rgba(7,19,15,0.12) 62%, rgba(7,19,15,0) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(7,19,15,0.80) 0%, rgba(7,19,15,0.30) 32%, rgba(7,19,15,0) 68%)',
        }}
      />

      <div className="container-site relative z-10 flex min-h-[720px] flex-col justify-end pt-28 pb-12 lg:h-full lg:pb-16">
        <div className="max-w-[780px] text-white">
          <div className="mb-7 flex items-center gap-4 text-[11px] font-semibold tracking-[0.24em] text-white/80 uppercase">
            <span className="h-px w-10 bg-white/70" />
            Edelen Doors &amp; Windows · Portland, Oregon
          </div>
          <h1 className="display-title text-[clamp(3.1rem,6.15vw,5.9rem)]">
            The window
            <br />
            makes the view.
          </h1>
          <p className="mt-7 max-w-[560px] text-[17px] leading-relaxed text-white/90 lg:text-[19px]">
            Beautifully crafted windows and doors, thoughtfully selected and professionally installed for the way you live.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="#contact" className="btn-primary !bg-brand !px-7 !py-4 !text-[13px] hover:!bg-brand-deep">
              Free Consultation <ArrowUpRight size={17} aria-hidden />
            </Link>
            <Link
              href="#showroom"
              className="btn-outline !border-white/75 !px-7 !py-4 !text-[13px] text-white hover:!bg-white hover:!text-ink"
            >
              Explore Our Showroom <ArrowDownRight size={17} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/25 pt-6">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] text-white/80 uppercase">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/85" />
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
