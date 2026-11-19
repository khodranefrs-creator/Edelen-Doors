# Edelen Doors & Windows — Homepage Redesign

A production-quality, editorial homepage concept for Edelen Doors & Windows, built around the idea **“The window makes the view.”**

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Notes

- The original supplied Edelen logo is preserved exactly at `public/assets/image-14.webp` and used in the header and footer.
- Official brand logos and photography are stored locally in `public/assets/official/` so the page does not depend on fragile third-party image URLs.
- Business information (phone, address, showroom hours) and product URLs come from the client brief and the official Edelen website.
- The consultation form is an honest frontend prototype: it validates input and shows a demo confirmation, but does not transmit or store data.
- Customer quotations are reproduced from reviews published on Edelen’s Milgard C700 page and are attributed accordingly.

## Competition presentation assets

High-resolution source captures live in `C:\Users\user\Desktop\Edelen Doors Competition Presentation`.
The submission-ready 800 × 640 / 300 DPI exports live in its `Competition_Ready_800x640_300DPI`
subfolder, together with `verification_report.txt`.

They can be regenerated after rebuilding and starting the production site:

```bash
npm run export:competition
npm run verify:competition
```
