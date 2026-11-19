import sharp from 'sharp';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dir = 'C:\\Users\\user\\Desktop\\Edelen Doors Competition Presentation\\Competition_Ready_800x640_300DPI';
const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();

function pngDensity(buf) {
  // PNG signature + IHDR, then walk chunks looking for pHYs.
  if (buf.subarray(1, 4).toString('ascii') !== 'PNG') return null;
  let offset = 8;
  while (offset + 12 <= buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString('ascii');
    if (type === 'pHYs' && len >= 9) {
      return {
        x: buf.readUInt32BE(offset + 8),
        y: buf.readUInt32BE(offset + 12),
        unit: buf[offset + 16],
      };
    }
    offset += 12 + len;
    if (type === 'IEND') break;
  }
  return null;
}

const rows = [];
let allPass = true;

for (const file of files) {
  const full = path.join(dir, file);
  const buf = await readFile(full);
  const issues = [];

  let meta;
  let stats;
  try {
    meta = await sharp(buf).metadata();
    stats = await sharp(buf).stats();
    // Force a full decode to confirm the file actually opens.
    await sharp(buf).raw().toBuffer();
  } catch (err) {
    issues.push(`decode failed: ${err.message}`);
  }

  const width = meta?.width;
  const height = meta?.height;
  const dpi = meta?.density;
  const format = meta?.format?.toUpperCase();

  if (width !== 800 || height !== 640) issues.push(`dimensions ${width}x${height}`);
  if (dpi !== 300) issues.push(`DPI ${dpi}`);
  if (format !== 'PNG' && format !== 'JPEG') issues.push(`format ${format}`);

  const phys = pngDensity(buf);
  if (format === 'PNG') {
    if (!phys) issues.push('missing pHYs DPI chunk');
    else if (phys.unit !== 1 || phys.x !== 11811 || phys.y !== 11811) {
      issues.push(`pHYs ${phys.x}x${phys.y} unit ${phys.unit}`);
    }
  }

  const stdevs = stats?.channels?.map((c) => c.stdev) ?? [];
  const means = stats?.channels?.map((c) => c.mean) ?? [];
  const maxStdev = Math.max(...stdevs, 0);
  const allFlat = maxStdev < 6 || means.every((m) => m < 4 || m > 251);
  if (allFlat) issues.push('blank/flat image');

  const pass = issues.length === 0;
  if (!pass) allPass = false;
  rows.push({
    file,
    dimensions: `${width}x${height}`,
    dpi: `${dpi}x${dpi}`,
    format,
    bytes: buf.length,
    maxStdev: Number(maxStdev.toFixed(1)),
    pHYs: phys ? `${phys.x}x${phys.y}` : 'n/a',
    status: pass ? 'PASS' : `FAIL — ${issues.join('; ')}`,
  });
}

const report = [
  'EDELEN DOORS & WINDOWS — COMPETITION EXPORT VERIFICATION',
  '=========================================================',
  '',
  `Folder: ${dir}`,
  `Files checked: ${files.length}`,
  'Required: exactly 800 x 640 px, 300 x 300 DPI metadata, valid PNG or JPG, opens correctly, non-blank.',
  '',
  'RESULTS',
  '-------',
  ...rows.map((r) =>
    `${r.file.padEnd(34)} ${r.dimensions.padEnd(9)} ${r.dpi.padEnd(9)} ${r.format.padEnd(5)} ${String(Math.round(r.bytes / 1024)).padStart(5)} KB  pHYs ${r.pHYs.padEnd(11)} contrast ${String(r.maxStdev).padStart(5)}  ${r.status}`,
  ),
  '',
  `OVERALL: ${allPass && files.length >= 8 ? 'ALL FILES PASS' : 'VERIFICATION FAILED'}`,
  '',
  'Method: metadata read and full raw decode with sharp 0.35.5; PNG pHYs chunk parsed directly;',
  'non-blank check uses per-channel standard deviation and mean luminance.',
  '',
].join('\n');

await writeFile(path.join(dir, 'verification_report.txt'), report, 'utf8');
console.log(report);

if (!allPass || files.length < 8) process.exit(1);
