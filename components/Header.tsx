'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/97 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-line shadow-[0_8px_28px_-22px_rgba(0,0,0,0.45)]' : 'border-transparent'
      }`}
    >
      <div className="hidden border-b border-line/80 lg:block">
        <div className="container-site flex h-9 items-center justify-between text-[11px] tracking-[0.08em] text-ink-soft">
          <span>Serving Portland homeowners since {site.founded}</span>
          <div className="flex items-center gap-7">
            <span>Mon–Fri 8–5 &nbsp;·&nbsp; Sat 9–12</span>
            <a href={site.phoneHref} className="flex items-center gap-2 font-semibold text-brand hover:underline">
              <Phone size={12} strokeWidth={2.2} aria-hidden />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-[74px] items-center gap-6 lg:h-[80px]">
        <Link href="#top" className="relative block shrink-0" aria-label="Edelen Doors & Windows — home">
          <Image
            src="/assets/image-14.webp"
            alt="Edelen Doors & Windows"
            width={140}
            height={104}
            priority
            className="h-[46px] w-auto lg:h-[52px]"
          />
        </Link>

        <nav aria-label="Primary" className="ml-4 hidden items-center gap-x-[18px] xl:flex 2xl:gap-x-6">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative py-2 text-[12.5px] font-medium whitespace-nowrap text-ink/80 transition-colors hover:text-brand"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:gap-5">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[13px] font-semibold text-ink hover:text-brand lg:flex"
          >
            <Phone size={15} strokeWidth={2} aria-hidden />
            {site.phoneDisplay}
          </a>
          <Link href="#contact" className="btn-primary hidden !px-5 !py-3 sm:inline-flex">
            Free Consultation
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white xl:hidden">
          <div className="container-site grid gap-1 py-5">
            {site.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-3 text-[15px] font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4">
              Free Consultation <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
