# Calorie Counter AI Website

React + Vite SEO website for `caloriecounterai.app`.

## Run locally

Use a fresh folder. Do not unpack this archive over an older project folder.

```bash
npm config set registry https://registry.npmjs.org/
npm install --registry=https://registry.npmjs.org/
npm run dev
```

## Build

```bash
npm run build
```

The production files will be generated in `dist/`.

## What is included

- Main English SEO landing page for: calorie counter, AI calorie counter, photo calorie counter, calorie counter app, free calorie counter app.
- Internal pages for the semantic core: features, use cases, barcode scanner, macro tracker, food diary, AI food recognition, nutrition tracker, progress, Health Connect, and blog guides.
- Language switcher with empty JSON files for 50 non-English languages.
- SEO metadata, canonical URLs, Open Graph, JSON-LD, robots.txt, sitemap.xml.
- Vercel rewrites and Netlify `_redirects` for SPA internal routes.

## Translation files

English content is in:

```text
src/locales/en.json
```

Other JSON files are intentionally empty. Until translated, non-English pages are shown in English and marked `noindex`.
