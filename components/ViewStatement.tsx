import Image from 'next/image';
import Reveal from './Reveal';
import { site } from '@/lib/site';

export default function ViewStatement() {
  return (
    <section className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-[#101a14] py-24 text-center text-white lg:min-h-[520px]">
      <Image
        src={site.images.view}
        alt="Editorial architectural photograph of a bright, glazed interior"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#08120e]/55" />
      <Reveal className="container-site relative z-10">
        <p className="mb-7 text-[11px] font-semibold tracking-[0.3em] text-white/70 uppercase">The art of the view</p>
        <p className="display-title mx-auto max-w-[900px] text-[clamp(2.2rem,4.2vw,4.1rem)]">
          A home shaped by light. Framed for the landscape beyond.
        </p>
        <div className="mx-auto mt-9 h-px w-16 bg-white/60" />
      </Reveal>
    </section>
  );
}
