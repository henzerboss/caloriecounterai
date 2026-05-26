import fs from 'node:fs';
import path from 'node:path';
import { allPages } from '../src/data/pages.js';
import { languages } from '../src/data/languages.js';

const domain = 'https://caloriecounterai.app';
const legalOnlyRoutes = new Set(['/privacy-policy/', '/terms/']);
const routes = Array.from(new Set(['/', ...allPages.map((page) => page.path)]));
const now = new Date().toISOString().slice(0, 10);
const locales = languages.map((language) => language.code);

const localizePath = (route, locale) => locale === 'en' ? route : `/${locale}${route}`.replace(/\/+/g, '/');
const toHreflang = (code) => ({ 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT', 'zh-cn': 'zh-CN', 'zh-tw': 'zh-TW' }[code] || code);
const priorityFor = (route) => {
  if (route === '/') return '1.0';
  if (route === '/download/') return '0.9';
  if (route === '/how-many-calories-in/') return '0.85';
  if (route.startsWith('/how-many-calories-in/')) return '0.65';
  if (route.includes('/blog/')) return '0.7';
  return '0.7';
};
const changefreqFor = (route) => route.startsWith('/how-many-calories-in/') || route.includes('/blog/') ? 'monthly' : 'weekly';
const availableLocalesFor = (route) => legalOnlyRoutes.has(route) ? ['en'] : locales;

function renderUrl(route, locale) {
  const availableLocales = availableLocalesFor(route);
  const loc = `${domain}${localizePath(route, locale)}`;
  const alternateLinks = availableLocales.map((alternateLocale) => (
    `    <xhtml:link rel="alternate" hreflang="${toHreflang(alternateLocale)}" href="${domain}${localizePath(route, alternateLocale)}" />`
  ));
  alternateLinks.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${route}" />`);
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreqFor(route)}</changefreq>
    <priority>${priorityFor(route)}</priority>
${alternateLinks.join('\n')}
  </url>`;
}

function writeLocaleSitemap(locale) {
  const urlBlocks = [];
  for (const route of routes) {
    if (!availableLocalesFor(route).includes(locale)) continue;
    urlBlocks.push(renderUrl(route, locale));
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks.join('\n')}
</urlset>
`;
  const filename = `sitemap-${locale}.xml`;
  fs.writeFileSync(path.resolve('public', filename), xml);
  return { filename, count: urlBlocks.length };
}

const sitemapFiles = locales.map(writeLocaleSitemap).filter((entry) => entry.count > 0);
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(({ filename }) => `  <sitemap>\n    <loc>${domain}/${filename}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`).join('\n')}
</sitemapindex>
`;
fs.writeFileSync(path.resolve('public/sitemap.xml'), indexXml);
console.log(`Generated sitemap index with ${sitemapFiles.length} locale sitemaps and ${sitemapFiles.reduce((sum, item) => sum + item.count, 0)} URLs`);
