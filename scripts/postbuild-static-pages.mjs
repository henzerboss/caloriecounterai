import fs from 'node:fs';
import path from 'node:path';
import { allPages, blogArticles } from '../src/data/pages.js';
import { languages } from '../src/data/languages.js';
import { appJsonLd, site } from '../src/data/site.js';

const distDir = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const localeDir = path.resolve('src/locales');
const locales = Object.fromEntries(
  fs.readdirSync(localeDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => [file.replace('.json', ''), JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf8') || '{}')])
);
const en = locales.en;
const localeCodes = languages.map((language) => language.code);
const routes = Array.from(new Set(['/', ...allPages.map((page) => page.path)]));
const legalOnlyRoutes = new Set(['/privacy-policy/', '/terms/']);
const rtlLanguageCodes = new Set(['ar', 'fa', 'he', 'ur']);
const legalTexts = {
  '/privacy-policy/': fs.readFileSync(path.resolve('src/data/legal/privacy-policy.txt'), 'utf8'),
  '/terms/': fs.readFileSync(path.resolve('src/data/legal/terms-of-use.txt'), 'utf8')
};

function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}
function t(locale, key, fallback = '') {
  return getNestedValue(locales[locale], key) ?? getNestedValue(en, key) ?? fallback;
}
function localizePath(route, locale) {
  return locale === 'en' ? route : `/${locale}${route}`.replace(/\/+/g, '/');
}
function toHreflang(code) {
  const regional = { 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT', 'zh-cn': 'zh-CN', 'zh-tw': 'zh-TW' };
  return regional[code] || code;
}
function fillTemplate(template, data) {
  if (!template || typeof template !== 'string') return '';
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? '');
}
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
function stripTrailingSlashForUrl(url) {
  return url.endsWith('/') && url !== `${site.domain}/` ? url.slice(0, -1) : url;
}
function textToParagraphs(text) {
  return String(text || '')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}
function renderLegalFallback(text) {
  return textToParagraphs(text).map((line) => {
    if (/^\d+\.\d+\.\s/.test(line)) return `<h3>${escapeHtml(line)}</h3>`;
    if (/^\d+\.\s/.test(line)) return `<h2>${escapeHtml(line)}</h2>`;
    return `<p>${escapeHtml(line)}</p>`;
  }).join('\n          ');
}
function renderStaticBody(route, locale, page) {
  const legalText = legalTexts[route];
  if (legalText) {
    return `<main class="ssr-fallback legal-fallback">
        <section class="page-hero section-wide">
          <div class="eyebrow">${route === '/privacy-policy/' ? 'Privacy' : 'Terms'}</div>
          <h1>${escapeHtml(page.h1 || page.title)}</h1>
          <p>${escapeHtml(page.description)}</p>
        </section>
        <section class="legal-card legal-document-card">
          <div class="legal-text">
          ${renderLegalFallback(legalText)}
          </div>
        </section>
      </main>`;
  }
  const h1 = page.h1 || page.title;
  const description = page.description || page.intro || '';
  const downloadUrl = `${site.domain}${localizePath('/download/', locale)}`;
  let extra = '';
  if (page.food) {
    extra = `<section><h2>${escapeHtml(t(locale, 'foodPage.quickAnswer', 'Quick answer'))}</h2><p>${escapeHtml(page.food.name)} has about ${escapeHtml(page.food.calories)} ${escapeHtml(t(locale, 'units.kcal', 'kcal'))} in ${escapeHtml(t(locale, `foods.${page.food.slug}.serving`, page.food.serving))}.</p></section>`;
  }
  return `<main class="ssr-fallback">
        <section class="page-hero section-wide">
          <h1>${escapeHtml(h1)}</h1>
          <p>${escapeHtml(description)}</p>
          <p><a href="${escapeHtml(downloadUrl)}">${escapeHtml(t(locale, 'nav.download', 'Download'))}</a></p>
        </section>
        ${extra}
      </main>`;
}
function localizePageData(page, locale) {
  if (!page) return page;
  if (page.food) {
    const name = t(locale, `foods.${page.food.slug}.name`, page.food.name);
    const serving = t(locale, `foods.${page.food.slug}.serving`, page.food.serving);
    const prep = t(locale, `foods.${page.food.slug}.namePrep`, name.toLowerCase());
    const data = {
      name,
      nameLower: name.toLowerCase(),
      namePrep: prep,
      serving,
      servingLower: serving.toLowerCase(),
      calories: page.food.calories,
      kcal: t(locale, 'units.kcal', 'kcal')
    };
    const titleTemplate = t(locale, 'foodPage.titleTemplate', null);
    const h1Template = t(locale, 'foodPage.h1Template', null);
    const descriptionTemplate = t(locale, 'foodPage.descriptionTemplate', null);
    return {
      ...page,
      title: titleTemplate ? fillTemplate(titleTemplate, data) : page.title,
      h1: h1Template ? fillTemplate(h1Template, data) : page.h1,
      description: descriptionTemplate ? fillTemplate(descriptionTemplate, data) : page.description
    };
  }
  const override = getNestedValue(locales[locale], `pages.${page.path}`);
  if (override && typeof override === 'object' && !Array.isArray(override)) {
    return { ...page, ...override, navLabel: override.navLabel || override.title || override.h1 || page.navLabel };
  }
  return page;
}
function pageForRoute(route, locale) {
  const basePage = route === '/'
    ? { path: '/', title: t(locale, 'seo.homeOgTitle', 'AI Calorie Counter App by Photo'), h1: t(locale, 'home.title', 'AI Calorie Counter App by Photo'), description: t(locale, 'seo.homeDescription', en.seo.homeDescription), type: 'home' }
    : allPages.find((item) => item.path === route);
  return localizePageData(basePage, locale);
}
function availableLocalesFor(route) {
  return legalOnlyRoutes.has(route) ? ['en'] : localeCodes;
}
function renderAlternates(route) {
  const links = availableLocalesFor(route).map((alternateLocale) => `<link rel="alternate" hreflang="${toHreflang(alternateLocale)}" href="${site.domain}${localizePath(route, alternateLocale)}" />`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${site.domain}${route}" />`);
  return links.join('\n    ');
}
function injectMeta(html, route, locale) {
  const legalOnly = legalOnlyRoutes.has(route);
  const seoLocale = legalOnly ? 'en' : locale;
  const page = pageForRoute(route, seoLocale);
  const isHome = route === '/';
  const title = isHome ? t(seoLocale, 'seo.homeTitle', en.seo.homeTitle) : `${page.title} | Calorie Counter AI`;
  const description = isHome ? t(seoLocale, 'seo.homeDescription', en.seo.homeDescription) : page.description;
  const pagePath = localizePath(route, seoLocale);
  const canonical = `${site.domain}${pagePath}`;
  const url = stripTrailingSlashForUrl(canonical);
  const image = `${site.domain}${page.image || site.assets.og}`;
  const robots = 'index,follow,max-image-preview:large';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t(seoLocale, 'nav.home', 'Home'), item: site.domain },
      ...(route === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title, item: canonical }])
    ]
  };
  const schemas = [appJsonLd, breadcrumb];
  if (blogArticles.some((article) => article.path === route)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description,
      image,
      author: { '@type': 'Organization', name: site.name },
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.domain}/android-chrome-192x192.png` } },
      mainEntityOfPage: canonical
    });
  }
  const metaBlock = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${renderAlternates(route)}
    <meta property="og:type" content="${blogArticles.some((article) => article.path === route) ? 'article' : 'website'}" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="${escapeHtml(isHome ? title : page.title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(`${site.domain}${site.assets.og}`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(isHome ? title : page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(`${site.domain}${site.assets.og}`)}" />
    ${schemas.map((schema, index) => `<script type="application/ld+json" id="static-schema-${index}">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`).join('\n    ')}
  `;

  let output = html.replace(/<html lang="[^"]*">/, `<html lang="${seoLocale}" dir="${rtlLanguageCodes.has(seoLocale) ? 'rtl' : 'ltr'}">`);
  output = output.replace(/\s*<title>[\s\S]*?<\/title>/, '');
  output = output.replace(/\s*<meta name="description"[\s\S]*?>/g, '');
  output = output.replace(/\s*<meta name="robots"[\s\S]*?>/g, '');
  output = output.replace(/\s*<link rel="canonical"[\s\S]*?>/g, '');
  output = output.replace(/\s*<link rel="alternate"[\s\S]*?>/g, '');
  output = output.replace(/\s*<meta property="og:[\s\S]*?>/g, '');
  output = output.replace(/\s*<meta name="twitter:[\s\S]*?>/g, '');
  output = output.replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '');
  output = output.replace('</head>', `${metaBlock}\n  </head>`);
  const staticBody = renderStaticBody(route, seoLocale, page);
  output = output.replace('<div id="root"></div>', `<div id="root">${staticBody}</div>`);
  return output;
}
function writeRoute(route, locale) {
  const localized = localizePath(route, locale);
  const html = injectMeta(baseHtml, route, locale);
  const outDir = path.join(distDir, localized.replace(/^\//, ''));
  if (localized === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
  } else {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
  }
}

let written = 0;
for (const route of routes) {
  for (const locale of availableLocalesFor(route)) {
    writeRoute(route, locale);
    written += 1;
  }
}
console.log(`Generated ${written} static HTML route files in dist/`);
