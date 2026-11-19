import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { productCategories } from '@/lib/site';

const spans = [
  'lg:col-span-7 lg:aspect-[16/10]',
  'lg:col-span-5 lg:aspect-[4/3]',
  'lg:col-span-5 lg:aspect-[4/3]',
  'lg:col-span-7 lg:aspect-[16/9]',
  'lg:col-span-4 lg:aspect-[4/3]',
  'lg:col-span-4 lg:aspect-[4/3]',
  'lg:col-span-4 lg:aspect-[4/3]',
  'lg:col-span-8 lg:aspect-[16/8]',
  'lg:col-span-4 lg:aspect-[4/3]',
];

export default function ProductCollection() {
  return (
    <section className="bg-paper py-24 lg:py-32" aria-labelledby="collection-title">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[720px]">
            <p className="eyebrow mb-6">The collection</p>
            <h2 id="collection-title" className="display-title text-[clamp(2.6rem,4.2vw,4.25rem)]">
              Every opening, considered.
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-relaxed text-ink-soft">
            One showroom, one local team, and a complete range of windows and doors for the way you live.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {productCategories.map((item, index) => {
            const external = 'external' in item && item.external;
            return (
              <Reveal key={item.id} delay={(index % 3) * 70} className={spans[index]}>
                <Link
                  id={item.id}
                  href={item.href}
                  {...(external || item.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group relative block h-full min-h-[260px] overflow-hidden bg-[#e8e6e1]"
                  aria-label={`Explore ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={index === 0 ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw'}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1712]/85 via-[#0d1712]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 lg:p-7">
                    <div className="max-w-[340px] text-white">
                      <h3 className="font-display text-[25px] leading-tight lg:text-[28px]">{item.title}</h3>
                      <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                        {item.description}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/60 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                      <ArrowUpRight size={17} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
