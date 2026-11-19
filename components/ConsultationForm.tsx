'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/lib/site';

const projectTypes = [
  'New or replacement windows',
  'Entry or interior doors',
  'Patio or accordion doors',
  'Garage door installation or repair',
  'Window or door repair',
  'Not sure yet',
];

export default function ConsultationForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError('Please complete the required fields before submitting.');
      form.reportValidity();
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <section id="contact" className="bg-brand-deep py-24 text-white lg:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] text-white/60 uppercase">Start a conversation</p>
          <h2 className="display-title text-[clamp(2.7rem,4.4vw,4.6rem)]">Your next view starts here.</h2>
          <p className="mt-7 max-w-[470px] text-[16px] leading-relaxed text-white/75">
            Tell us a little about your project. Our team is ready to help you explore the right windows and doors for your home.
          </p>

          <div className="mt-12 space-y-6 border-t border-white/20 pt-9">
            <a href={site.phoneHref} className="flex items-center gap-4 text-[15px] text-white/90 hover:text-white">
              <Phone size={17} aria-hidden />
              {site.phoneDisplay}
            </a>
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 text-[15px] leading-relaxed text-white/90 hover:text-white"
            >
              <MapPin size={17} className="mt-0.5 shrink-0" aria-hidden />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
              <ArrowUpRight size={14} className="mt-1" aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white p-7 text-ink shadow-[0_30px_70px_-40px_rgba(0,0,0,0.55)] sm:p-10 lg:p-12">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={48} className="text-brand" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-6 font-display text-[32px] leading-tight">Thank you for reaching out.</h3>
                <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-ink-soft">
                  This is a design prototype, so your message was not sent to Edelen Doors &amp; Windows. On the live site, our team would follow up about your project.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-primary mt-8">
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-6">
                  <div>
                    <p className="eyebrow !text-[10px]">Free consultation</p>
                    <h3 className="mt-2 font-display text-[28px] leading-tight">Tell us about your project</h3>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold tracking-[0.04em] text-ink">Name *</span>
                    <input name="name" type="text" required autoComplete="name" placeholder="Your full name" className="field" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold tracking-[0.04em] text-ink">Phone *</span>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      pattern="[0-9+\-\s().]{7,}"
                      placeholder="503-000-0000"
                      className="field"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[12px] font-semibold tracking-[0.04em] text-ink">Email *</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[12px] font-semibold tracking-[0.04em] text-ink">Project Type *</span>
                    <select name="projectType" required defaultValue="" className="field">
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[12px] font-semibold tracking-[0.04em] text-ink">Message *</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what you have in mind..."
                      className="field resize-none"
                    />
                  </label>
                </div>

                {error && <p className="mt-4 text-[13px] text-milgard-red">{error}</p>}

                <button type="submit" className="btn-primary mt-8 w-full !py-4 !text-[13px]">
                  Request a Free Consultation <ArrowUpRight size={16} aria-hidden />
                </button>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-mid">
                  Prototype form — no information is transmitted or stored.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
