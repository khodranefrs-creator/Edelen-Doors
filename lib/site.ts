export const site = {
  name: 'Edelen Doors & Windows',
  phoneDisplay: '503-255-6552',
  phoneHref: 'tel:+15032556552',
  email: 'sales@edelendoors.com',
  founded: 1977,
  address: {
    line1: '700 NE 102nd Ave',
    line2: 'Portland, OR 97220',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=700+NE+102nd+Ave%2C+Portland%2C+OR+97220',
  },
  hours: [
    { days: 'Monday – Friday', time: '8 AM – 5 PM' },
    { days: 'Saturday', time: '9 AM – 12 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/edelendoors/' },
    { label: 'Instagram', href: 'https://www.instagram.com/edelendoors/' },
  ],
  nav: [
    { label: 'Windows', href: '#windows' },
    { label: 'Doors', href: '#doors' },
    { label: 'Garage Doors', href: '#garage-doors' },
    { label: 'Milgard', href: '#milgard' },
    { label: 'Repairs', href: '#repairs' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  images: {
    hero: '/assets/image-06.jpg',
    view: '/assets/image-11.jpg',
    viewDetail: '/assets/image-01.jpg',
    editorial: '/assets/image-03.jpg',
    milgard: '/assets/image-08.webp',
    repair: '/assets/image-05.jpg',
    showroom: '/assets/official/showroom-contact.webp',
    showroomSecondary: '/assets/official/exterior-doors-showroom.webp',
    logo: '/assets/image-14.webp',
    milgardLogo: '/assets/official/logo-of-milgard-windows-and-doors.webp',
  },
} as const;

export const productCategories = [
  {
    id: 'windows',
    title: 'Windows',
    description: 'Replacement and new-construction windows selected for light, efficiency and the way a room lives.',
    image: '/assets/image-03.jpg',
    href: 'https://www.edelendoors.com/windows/',
    size: 'feature' as const,
  },
  {
    id: 'doors',
    title: 'Entry Doors',
    description: 'A considered first impression, in wood, fiberglass, steel and clad finishes.',
    image: '/assets/official/exterior-doors-image-1.webp',
    href: 'https://www.edelendoors.com/exterior-doors/',
    size: 'standard' as const,
  },
  {
    id: 'patio-doors',
    title: 'Patio Doors',
    description: 'Sliding, swinging and folding ways to open the home to the outdoors.',
    image: '/assets/image-13.jpg',
    href: 'https://www.edelendoors.com/exterior-doors/',
    size: 'standard' as const,
  },
  {
    id: 'garage-doors',
    title: 'Garage Doors',
    description: 'Curb appeal that works every day, with repair and installation by our local team.',
    image: '/assets/official/garage-doors-img.webp',
    href: 'https://www.edelendoors.com/garage-doors/',
    size: 'standard' as const,
  },
  {
    id: 'interior-doors',
    title: 'Interior Doors',
    description: 'Quiet detail, thoughtful hardware and finishes that carry a room together.',
    image: '/assets/official/interior-doors-banner.webp',
    href: 'https://www.edelendoors.com/interior-doors/',
    size: 'standard' as const,
  },
  {
    id: 'screen-storm',
    title: 'Screen & Storm Doors',
    description: 'Fresh air, added protection and a welcome layer of everyday convenience.',
    image: '/assets/official/screen-doors-banner.webp',
    href: 'https://www.edelendoors.com/screen-doors/',
    size: 'standard' as const,
  },
  {
    id: 'accordion-doors',
    title: 'Accordion Doors',
    description: 'Flexible space-making for homes and gathering places.',
    image: '/assets/official/accordion-door-store.webp',
    href: 'https://www.accordiondoorstore.com/',
    size: 'wide' as const,
    external: true,
  },
  {
    id: 'skylights',
    title: 'Skylights',
    description: 'Daylight from above, carefully placed and properly installed.',
    image: '/assets/official/skylights-banner.webp',
    href: 'https://www.edelendoors.com/skylights/',
    size: 'standard' as const,
  },
  {
    id: 'hardware',
    title: 'Locks & Hardware',
    description: 'The finishing touch you feel every time you come home.',
    image: '/assets/official/Locks-Hardware.webp',
    href: 'https://www.edelendoors.com/locks-hardware/',
    size: 'standard' as const,
  },
] as const;

export const brands = [
  { name: 'Milgard', logo: '/assets/official/logo-of-milgard-windows-and-doors.webp', w: 174, h: 37 },
  { name: 'Sierra Pacific', logo: '/assets/official/logo-of-sierra-pacific.webp', w: 75, h: 85 },
  { name: 'Simpson', logo: '/assets/official/logo-of-simpson.webp', w: 123, h: 34 },
  { name: 'Therma-Tru', logo: '/assets/official/logo-of-thermatry-doors.webp', w: 119, h: 36 },
  { name: 'Masonite', logo: '/assets/official/logo-of-masonite.webp', w: 150, h: 34 },
  { name: 'Rogue Valley Door', logo: '/assets/official/logo-of-rogue-valley-door.webp', w: 121, h: 40 },
  { name: 'Wayne-Dalton', logo: '/assets/official/logo-of-Wayne-Dalton.webp', w: 174, h: 50 },
  { name: 'Larson', logo: null, w: 0, h: 0 },
] as const;

export const reviews = [
  {
    quote:
      'We love our windows. We remodeled a Mid Century Ranch using the black Ultra series, and now the house looks spectacular. During the renovation we received so many compliments on the windows.',
    author: 'SUSIE58',
    source: 'Milgard C700 review published on Edelen’s website',
  },
  {
    quote:
      'Had seven windows and two patio sliders installed, replacing the forty-five year old originals. As expected the difference is great. They are beautiful and make a statement.',
    author: 'Bluenumbef3',
    source: 'Milgard C700 review published on Edelen’s website',
  },
  {
    quote:
      'Just got this window installed and I could not be happier with the result. The biggest difference was the look of the frame. You can tell the quality is far superior to most windows.',
    author: 'Domino451',
    source: 'Milgard C700 review published on Edelen’s website',
  },
] as const;
