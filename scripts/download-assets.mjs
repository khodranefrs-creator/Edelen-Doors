import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = 'https://www.edelendoors.com/wp-content/uploads/';
const out = path.resolve('public/assets/official');
await mkdir(out, { recursive: true });

const files = [
  // Logos
  '2026/11/edelen-logo.webp',
  '2023/08/Doors-Windows.webp',
  '2023/08/milgard-windows-and-doors-logo.webp',
  '2024/02/logo-of-milgard-windows-and-doors.webp',
  '2024/02/logo-of-sierra-pacific.webp',
  '2024/02/logo-of-simpson.webp',
  '2024/02/logo-of-thermatry-doors.webp',
  '2024/02/logo-of-masonite.webp',
  '2024/02/logo-of-rogue-valley-door.webp',
  '2024/02/logo-of-Wayne-Dalton.webp',
  '2024/02/logo-of-velux.webp',
  '2024/02/logo-of-Schlage.webp',
  '2024/02/logo-of-Baldwin.webp',
  // Editorial / product photography
  '2024/03/edelendoors-main-image.webp',
  '2024/03/windows-frame.webp',
  '2024/03/exterior-doors-image-1.webp',
  '2024/03/wood-fiberglass-image.webp',
  '2024/04/Garage-Door-Image.webp',
  '2024/04/Garage-Door-Setcion.webp',
  '2024/03/exterior-doors-showroom.webp',
  '2023/08/half-view-home.webp',
  '2023/12/window-hero-image.webp',
  '2023/12/Our-large-showroom-boasts.webp',
  '2024/03/interior-doors-banner.webp',
  '2024/03/screen-doors-banner.webp',
  '2024/02/accordion-door-store.webp',
  '2024/04/skylights-banner.webp',
  '2024/04/Locks-Hardware.webp',
  '2024/03/garage-doors-img.webp',
  '2024/03/showroom-garage-doors.webp',
  '2024/03/showroom-contact.webp',
  // C700 feature
  '2024/07/Edelen-Doors-Hero-Section-Image.webp',
  '2024/07/Windows-Style-Section-Image.webp',
  '2024/07/Expert-Installation-By-Edelen-Doors-Image-Section.webp',
  '2024/07/Gallrey-1.webp',
  '2024/07/Gallrey-2.webp',
  '2024/07/Stars.png',
];

let ok = 0;
for (const file of files) {
  const name = path.basename(file);
  try {
    const res = await fetch(base + file, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EdelenDesignPrototype/1.0)' },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 500) throw new Error('Suspiciously small');
    await writeFile(path.join(out, name), buf);
    ok++;
    console.log(`ok  ${name} (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    console.log(`FAIL ${name} — ${err.message}`);
  }
}
console.log(`\nDownloaded ${ok}/${files.length} assets.`);
