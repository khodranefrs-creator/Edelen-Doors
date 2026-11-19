import Reveal from './Reveal';
import { reviews } from '@/lib/site';

export default function Reviews() {
  return (
    <section className="bg-white py-24 lg:py-28" aria-labelledby="reviews-title">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-6">In their words</p>
            <h2 id="reviews-title" className="display-title text-[clamp(2.5rem,4vw,4rem)]">
              Trusted by Portland homeowners.
            </h2>
          </div>
          <p className="max-w-[330px] text-[13px] leading-relaxed text-slate-mid">
            Customer reviews published on Edelen&apos;s Milgard C700 page.
          </p>
        </Reveal>

        <div className="grid gap-px bg-line lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={i * 80} className="bg-white">
              <figure className="flex h-full flex-col p-8 lg:p-10">
                <span className="font-display text-[68px] leading-[0.6] text-brand/25" aria-hidden>
                  “
                </span>
                <blockquote className="mt-6 flex-1 font-display text-[22px] leading-[1.45] text-ink lg:text-[24px]">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-9 border-t border-line pt-5">
                  <p className="text-[13px] font-semibold tracking-[0.06em] text-ink">{review.author}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-mid">{review.source}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
