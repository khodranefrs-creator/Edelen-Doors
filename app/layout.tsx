import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-dm-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.edelendoors.com'),
  title: {
    default: 'Edelen Doors & Windows | Portland Windows, Doors & Showroom Since 1977',
    template: '%s | Edelen Doors & Windows',
  },
  description:
    'Beautifully crafted windows and doors, thoughtfully selected and professionally installed for Portland homes. Visit our complete door and window showroom on NE 102nd Ave, or call 503-255-6552 for a free consultation.',
  keywords: [
    'Portland windows',
    'Portland doors',
    'window replacement Portland',
    'door installation Portland',
    'garage doors Portland',
    'window repair Portland',
    'Milgard windows Portland',
    'Edelen Doors and Windows',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Edelen Doors & Windows',
    title: 'The window makes the view. | Edelen Doors & Windows',
    description:
      'Portland’s complete door and window showroom. Beautifully crafted windows and doors, professionally installed since 1977.',
    url: 'https://www.edelendoors.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edelen Doors & Windows',
    description: 'The window makes the view. Portland windows, doors and repairs since 1977.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
