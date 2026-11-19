import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

function webpSize(b) {
  const fmt = b.subarray(12, 16).toString('ascii');
  if (fmt === 'VP8X') return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
  if (fmt === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (fmt === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  return null;
}
function pngSize(b) { return [b.readUInt32BE(16), b.readUInt32BE(20)]; }
function jpgSize(b) {
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

for (const dir of ['public/assets', 'public/assets/official']) {
  const files = await readdir(dir);
  console.log('\n' + dir);
  for (const f of files.sort()) {
    const p = path.join(dir, f);
    if (!(await stat(p)).isFile()) continue;
    const b = await readFile(p);
    let d = null;
    if (f.endsWith('.webp')) d = webpSize(b);
    else if (f.endsWith('.png')) d = pngSize(b);
    else if (f.endsWith('.jpg') || f.endsWith('.jpeg')) d = jpgSize(b);
    console.log(`${f.padEnd(52)} ${d ? d.join(' x ') : '?'}`.padEnd(72) + `${Math.round(b.length/1024)} KB`);
  }
}
