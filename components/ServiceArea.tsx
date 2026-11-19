import Reveal from './Reveal';
import { site } from '@/lib/site';

export default function ServiceArea() {
  return (
    <section className="bg-white py-24 lg:py-28" aria-labelledby="area-title">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow mb-6">Service area</p>
          <h2 id="area-title" className="display-title text-[clamp(2.5rem,4vw,4rem)]">
            Proudly serving the Portland area.
          </h2>
          <p className="mt-7 max-w-[520px] text-[16px] leading-relaxed text-ink-soft">
            From our showroom on NE 102nd Ave, we help homeowners across Portland and the surrounding communities choose, install and care for windows and doors that suit the way they live.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8 text-[13px] text-ink">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> In-person showroom visits
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Installation &amp; service
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#eef0ec]">
            <svg
              viewBox="0 0 640 400"
              role="img"
              aria-label="Abstract regional map of the Portland, Oregon area"
              className="h-full w-full"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d9ded8" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="640" height="400" fill="#eef0ec" />
              <rect width="640" height="400" fill="url(#grid)" opacity="0.75" />
              <g fill="none" stroke="#c3cec4" strokeWidth="1.25" opacity="0.9">
                <path d="M-20 292 C 92 236, 128 322, 232 268 S 388 194, 472 246 S 588 292, 666 232" />
                <path d="M-20 246 C 86 190, 136 276, 240 222 S 392 148, 476 200 S 596 246, 666 186" />
                <path d="M-20 200 C 80 144, 140 230, 246 176 S 396 102, 480 154 S 604 200, 666 140" />
                <path d="M-20 154 C 76 98, 146 184, 252 130 S 400 56, 484 108 S 612 154, 666 94" />
                <path d="M-20 338 C 100 282, 122 368, 228 314 S 384 240, 468 292 S 590 338, 666 278" />
              </g>
              <path d="M-10 330 C 110 286, 190 340, 286 300 S 430 250, 520 286 S 610 292, 660 258" fill="none" stroke="#a9b9c6" strokeWidth="3" opacity="0.85" />
              <g transform="translate(316 176)">
                <circle r="46" fill="#005399" opacity="0.08" />
                <circle r="28" fill="#005399" opacity="0.12" />
                <circle r="7" fill="#005399" />
                <circle r="3" fill="#fff" />
              </g>
              <text x="336" y="166" fill="#1d2328" fontSize="17" fontFamily="Georgia, serif" letterSpacing="2">
                PORTLAND
              </text>
              <text x="336" y="190" fill="#787878" fontSize="11" fontFamily="Arial, sans-serif" letterSpacing="2">
                OREGON
              </text>
              <text x="32" y="368" fill="#8b928c" fontSize="10" fontFamily="Arial, sans-serif" letterSpacing="2.4">
                GREATER PORTLAND AREA
              </text>
            </svg>
            <div className="absolute right-5 bottom-5 bg-white px-5 py-4 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]">
              <p className="eyebrow !text-[9px]">Visit the showroom</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
