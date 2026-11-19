import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/site';

const productLinks = [
  { label: 'Windows', href: 'https://www.edelendoors.com/windows/' },
  { label: 'Exterior Doors', href: 'https://www.edelendoors.com/exterior-doors/' },
  { label: 'Interior Doors', href: 'https://www.edelendoors.com/interior-doors/' },
  { label: 'Garage Doors', href: 'https://www.edelendoors.com/garage-doors/' },
  { label: 'Skylights', href: 'https://www.edelendoors.com/skylights/' },
  { label: 'Locks & Hardware', href: 'https://www.edelendoors.com/locks-hardware/' },
];

const serviceLinks = [
  { label: 'Window Repair', href: '#repairs' },
  { label: 'Door Repair', href: '#repairs' },
  { label: 'Garage Door Installation', href: '#repairs' },
  { label: 'Garage Door Repair', href: '#repairs' },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brand bg-[#151a1e] pt-16 text-white lg:pt-20">
      <div className="container-site grid gap-14 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">
        <div>
          <Link href="#top" className="inline-block bg-white p-3" aria-label="Edelen Doors & Windows — home">
            <Image src={site.images.logo} alt="Edelen Doors & Windows" width={140} height={104} className="h-[52px] w-auto" />
          </Link>
          <p className="mt-7 max-w-[340px] text-[14px] leading-relaxed text-white/60">
            Family-owned and serving Portland since {site.founded}. Quality craftsmanship and professional service on windows, doors and garage doors — from selection and installation to repair.
          </p>
          <div className="mt-7 flex gap-5">
            {site.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/60 transition-colors hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">Explore</h3>
          <ul className="space-y-3.5">
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[14px] text-white/75 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">Products &amp; service</h3>
          <ul className="space-y-3.5">
            {[...productLinks.slice(0, 4), ...serviceLinks].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-[14px] text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">Visit &amp; call</h3>
          <a href={site.phoneHref} className="flex items-center gap-3 text-[19px] font-medium text-white hover:text-white/80">
            <Phone size={16} aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href={site.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-start gap-3 text-[14px] leading-relaxed text-white/70 hover:text-white"
          >
            <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}
            </span>
            <ArrowUpRight size={13} className="mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
          <div className="mt-6 border-t border-white/15 pt-6 text-[13px] text-white/60">
            {site.hours.slice(0, 2).map((h) => (
              <p key={h.days} className="flex justify-between gap-6 py-1">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </p>
            ))}
          </div>
          <Link href="#contact" className="btn-primary mt-7 w-full !py-3.5 !text-[12px]">
            Free Consultation
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col justify-between gap-3 py-6 text-[11px] text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Edelen Doors &amp; Windows. All rights reserved.</p>
          <p>Serving Portland homeowners since {site.founded}.</p>
        </div>
      </div>
    </footer>
  );
}
