import Image from 'next/image';
import Reveal from './Reveal';
import { brands } from '@/lib/site';

export default function BrandShowcase() {
  return (
    <section className="border-y border-line bg-paper py-20 lg:py-24" aria-labelledby="brands-title">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-5">Brands we carry</p>
            <h2 id="brands-title" className="display-title text-[clamp(2.1rem,3.2vw,3.3rem)]">
              Names you know. Work we stand behind.
            </h2>
          </div>
          <p className="max-w-[300px] text-[13px] text-ink-soft">
            Visit the showroom to see and compare the products in person.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 divide-x divide-y divide-line border border-line sm:grid-cols-4">
          {brands.map((brand, i) => (
            <Reveal key={brand.name} delay={(i % 4) * 50} className="flex min-h-[128px] items-center justify-center bg-white p-6">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={brand.w}
                  height={brand.h}
                  className="max-h-[54px] w-auto max-w-[150px] object-contain"
                />
              ) : (
                <span className="font-display text-[24px] tracking-[0.08em] text-[#4a4f54]">{brand.name}</span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
