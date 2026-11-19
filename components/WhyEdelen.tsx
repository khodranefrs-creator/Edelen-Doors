import Reveal from './Reveal';

const pillars = [
  {
    number: '01',
    title: 'Serving Portland since 1977',
    text: 'Nearly five decades of local experience, and a showroom that has welcomed generations of Portland homeowners.',
  },
  {
    number: '02',
    title: 'Certified craftsmen',
    text: 'Experienced, certified installers who treat your home with care and your project as their own.',
  },
  {
    number: '03',
    title: 'Workmanship you can count on',
    text: 'Our labor is guaranteed for a minimum of one year, alongside the warranties offered by the manufacturers we work with.',
  },
  {
    number: '04',
    title: 'A real place to visit',
    text: 'Compare materials, finishes and hardware in person at our complete door and window showroom on NE 102nd Ave.',
  },
];

export default function WhyEdelen() {
  return (
    <section id="about" className="border-y border-line bg-[#f4f3ef] py-24 lg:py-32">
      <div className="container-site">
        <Reveal className="mb-16 max-w-[780px]">
          <p className="eyebrow mb-6">Why Edelen</p>
          <h2 className="display-title text-[clamp(2.6rem,4.2vw,4.25rem)]">Local experience. Lasting confidence.</h2>
        </Reveal>

        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2 lg:gap-x-24">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 70}>
              <div className="grid grid-cols-[58px_1fr] gap-5 border-t border-[#d5d5cf] pt-7">
                <span className="font-display text-[42px] leading-none text-brand/35">{pillar.number}</span>
                <div>
                  <h3 className="font-display text-[27px] leading-tight">{pillar.title}</h3>
                  <p className="mt-3 max-w-[480px] text-[14.5px] leading-relaxed text-ink-soft">{pillar.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
