import React, { useEffect, useMemo, useState } from 'react';
import { appJsonLd, site } from './data/site.js';
import { allPages, blogArticles, blogIndex, featurePages, primaryNav, useCaseIndex, useCasePages, utilityPages } from './data/pages.js';
import { foodIndexPage, foodPages, foodCategories } from './data/foods.js';
import { languageCodes, languages, nonEnglishLanguages } from './data/languages.js';
import { pageEnhancements } from './data/pageEnhancements.js';
import privacyPolicyText from './data/legal/privacy-policy.txt?raw';
import termsOfUseText from './data/legal/terms-of-use.txt?raw';

const localeModules = import.meta.glob('./locales/*.json', { eager: true });
const locales = Object.fromEntries(
  Object.entries(localeModules).map(([path, module]) => {
    const code = path.split('/').pop().replace('.json', '');
    return [code, module.default ?? module];
  })
);
const localizedScreenLocales = new Set(languageCodes);
const rtlLanguageCodes = new Set(['ar', 'fa', 'he', 'ur']);

const LEGAL_ONLY_ROUTES = ['/privacy-policy/', '/terms/'];
const LOCALE_STORAGE_KEY = 'ccai.locale';
const COOKIE_CONSENT_KEY = 'ccai.cookieConsent';
const GA_MEASUREMENT_ID = 'G-09YELXCHFX';
const socialLinks = [
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@caloriecounter.ai'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/caloriecounterai.app'
  }
];

function SocialIcon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.4" cy="6.6" r="1.1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.2 3c.35 2.45 1.72 4.15 4.25 4.32v3.05a7.4 7.4 0 0 1-4.16-1.2v5.93c0 3.25-2.1 5.9-5.43 5.9C5.86 21 3.6 18.94 3.6 16.06c0-3.34 2.86-5.55 6.27-5.15v3.15c-1.52-.27-2.98.44-2.98 1.93 0 1.07.85 1.82 1.96 1.82 1.34 0 2.1-.88 2.1-2.48V3h3.25Z" />
    </svg>
  );
}

function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`} aria-label="Social links">
      {socialLinks.map((link) => (
        <a key={link.name} className="social-link" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
          <SocialIcon name={link.name} />
        </a>
      ))}
    </div>
  );
}


function isLegalOnlyRoute(routePath) {
  return LEGAL_ONLY_ROUTES.includes(routePath);
}

function toHreflang(code) {
  const regional = { 'pt-br': 'pt-BR', 'pt-pt': 'pt-PT', 'zh-cn': 'zh-CN', 'zh-tw': 'zh-TW' };
  return regional[code] || code;
}

function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return languageCodes.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function saveLanguageChoice(locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage restrictions in private browsing modes.
  }
}

function detectUserLocale() {
  const stored = readStoredLocale();
  if (stored) return stored;
  const browserLanguages = Array.isArray(window.navigator.languages) && window.navigator.languages.length
    ? window.navigator.languages
    : [window.navigator.language || 'en'];
  const regionalFallbacks = { pt: 'pt-br', zh: 'zh-cn', no: 'no' };
  for (const rawLanguage of browserLanguages) {
    const normalized = String(rawLanguage || '').toLowerCase();
    if (languageCodes.includes(normalized)) return normalized;
    const base = normalized.split('-')[0];
    if (languageCodes.includes(base)) return base;
    if (regionalFallbacks[base] && languageCodes.includes(regionalFallbacks[base])) return regionalFallbacks[base];
  }
  return 'en';
}

function pathHasLocalePrefix(pathname) {
  const first = normalizePath(pathname).split('/').filter(Boolean)[0]?.toLowerCase();
  return languageCodes.includes(first);
}

function loadAnalytics(pagePath = window.location.pathname, pageTitle = document.title) {
  if (window.__ccaiAnalyticsLoaded) {
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: pagePath, page_title: pageTitle });
    return;
  }
  window.__ccaiAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', { analytics_storage: 'granted' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => window.gtag('config', GA_MEASUREMENT_ID, { page_path: pagePath, page_title: pageTitle });
  document.head.appendChild(script);
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function createTranslator(locale) {
  const dictionary = locales[locale] && Object.keys(locales[locale]).length ? locales[locale] : locales.en;
  return (key, fallback = '') => getNestedValue(dictionary, key) ?? getNestedValue(locales.en, key) ?? fallback;
}

function normalizePath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/+$/, '/');
  return path || '/';
}

function parseLocation() {
  const normalized = normalizePath(window.location.pathname);
  const parts = normalized.split('/').filter(Boolean);
  const first = parts[0]?.toLowerCase();
  if (languageCodes.includes(first) && first !== 'en') {
    const rest = `/${parts.slice(1).join('/')}${parts.length > 1 ? '/' : ''}`;
    return { locale: first, routePath: rest === '//' ? '/' : rest || '/', prefix: `/${first}` };
  }
  if (first === 'en') {
    const rest = `/${parts.slice(1).join('/')}${parts.length > 1 ? '/' : ''}`;
    return { locale: 'en', routePath: rest === '//' ? '/' : rest || '/', prefix: '' };
  }
  return { locale: 'en', routePath: normalized, prefix: '' };
}

function localizePath(path, locale) {
  if (locale === 'en') return path;
  const clean = path === '/' ? '/' : path;
  return `/${locale}${clean}`.replace(/\/+/g, '/');
}

function setMeta(name, content, attr = 'name') {
  let element = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel, href, attrs = {}) {
  let selector = `link[rel="${rel}"]`;
  if (attrs.hreflang) selector += `[hreflang="${attrs.hreflang}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function useSeo(page, locale, routePath, indexable) {
  useEffect(() => {
    const isHome = routePath === '/';
    const legalOnly = isLegalOnlyRoute(routePath);
    const seoLocale = legalOnly ? 'en' : locale;
    const activeLocaleData = legalOnly ? locales.en : (locales[locale] && Object.keys(locales[locale]).length ? locales[locale] : locales.en);
    const title = isHome ? (getNestedValue(activeLocaleData, 'seo.homeTitle') || locales.en.seo.homeTitle) : `${page.title} | Calorie Counter AI`;
    const description = isHome ? (getNestedValue(activeLocaleData, 'seo.homeDescription') || locales.en.seo.homeDescription) : page.description;
    const pageUrlPath = seoLocale === 'en' ? routePath : localizePath(routePath, seoLocale);
    const url = `${site.domain}${pageUrlPath}`.replace(/\/$/, '') || site.domain;
    const canonical = `${site.domain}${pageUrlPath}`;
    document.documentElement.lang = seoLocale;
    document.documentElement.dir = rtlLanguageCodes.has(seoLocale) ? 'rtl' : 'ltr';
    document.title = title;
    setMeta('description', description);
    setMeta('robots', indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow');
    setLink('canonical', canonical);
    setMeta('og:type', page.type === 'article' ? 'article' : 'website', 'property');
    setMeta('og:site_name', site.name, 'property');
    setMeta('og:title', isHome ? title : page.title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', `${site.domain}${site.assets.og}`, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', isHome ? title : page.title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${site.domain}${site.assets.og}`);
    setMeta('theme-color', '#6f4dff');

    document.head.querySelectorAll('link[rel="alternate"]').forEach((element) => element.remove());
    setLink('alternate', `${site.domain}${routePath}`, { hreflang: toHreflang('en') });
    if (!legalOnly) {
      nonEnglishLanguages.forEach((language) => setLink('alternate', `${site.domain}${localizePath(routePath, language.code)}`, { hreflang: toHreflang(language.code) }));
    }
    setLink('alternate', `${site.domain}${routePath}`, { hreflang: 'x-default' });

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: getNestedValue(activeLocaleData, 'nav.home') || 'Home', item: site.domain },
        ...(routePath === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title, item: canonical }])
      ]
    };
    upsertJsonLd('app-jsonld', appJsonLd);
    upsertJsonLd('breadcrumb-jsonld', breadcrumb);
    if (window.gtag) {
      const pagePath = localizePath(routePath, locale);
      if (window.__ccaiLastPagePath !== pagePath) {
        window.__ccaiLastPagePath = pagePath;
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: pagePath,
          page_title: document.title
        });
      }
    }

    if (page.type === 'article') {
      upsertJsonLd('article-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title,
        description,
        image: `${site.domain}${page.image || site.assets.og}`,
        author: { '@type': 'Organization', name: site.name },
        publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.domain}/android-chrome-192x192.png` } },
        mainEntityOfPage: canonical
      });
    } else {
      const articleJson = document.getElementById('article-jsonld');
      if (articleJson) articleJson.remove();
    }
  }, [page, locale, routePath, indexable]);
}

function useScrollReveal(routeKey) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 120px 0px', threshold: 0.01 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [routeKey]);
}

function Icon({ name }) {
  const icons = {
    sparkles: '✦', camera: '◉', barcode: '▥', chart: '▥', diary: '◫', macro: '◌', goal: '◎', shield: '✓'
  };
  return <span className="icon" aria-hidden="true">{icons[name] || '✦'}</span>;
}

function StoreGlyph({ apple }) {
  if (apple) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.5 13.1c0-2.2 1.8-3.3 1.9-3.4-1.1-1.6-2.7-1.8-3.2-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2.1-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.6-1-2.6-3.6ZM14.4 6.5c.6-.8 1.1-1.8 1-2.9-1 .1-2.1.7-2.8 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.2-.5 2.8-1.3Z"/></svg>
    );
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4.4 3.2c-.4.2-.7.7-.7 1.3v15c0 .6.3 1.1.8 1.3l8.3-8.8-8.4-8.8Zm9.4 9.9L6.1 21l9.8-5.6-2.1-2.3Zm2.9-1.7 2.6-1.5c.9-.5.9-1.8 0-2.3L6.1 3l10.6 8.4Zm0 1.2-2.2 2.1 2.1 2.3 2.7-1.6c.9-.5.9-1.8 0-2.3l-2.6-1.5Z"/></svg>;
}

function AppButton({ type = 'apple', t = (key, fallback) => fallback }) {
  const isApple = type === 'apple';
  return (
    <a className={`store-button ${isApple ? 'dark' : 'light'}`} href={isApple ? site.appStoreUrl : site.googlePlayUrl} target="_blank" rel="noreferrer">
      <span className="store-icon"><StoreGlyph apple={isApple} /></span>
      <span>
        <small>{isApple ? t('store.appStoreSmall', 'Download on the') : t('store.googlePlaySmall', 'Get it on')}</small>
        <strong>{isApple ? t('store.appStoreName', 'App Store') : t('store.googlePlayName', 'Google Play')}</strong>
      </span>
    </a>
  );
}


function ChevronDown() {
  return (
    <svg className="chevron" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5.5 7.5 10 12l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function flagEmojiToTwemojiUrl(flag) {
  const codepoints = Array.from(flag).map((char) => char.codePointAt(0).toString(16)).join('-');
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoints}.svg`;
}

function FlagIcon({ flag, label }) {
  return (
    <span className="flag-icon" aria-hidden="true">
      <img src={flagEmojiToTwemojiUrl(flag)} alt="" loading="lazy" />
    </span>
  );
}


const screenFileByPath = {
  '/assets/screens/ai-photo.png': 'ai-photo.webp',
  '/assets/screens/nutrition-balance.png': 'nutrition-balance.webp',
  '/assets/screens/barcode-scanner.png': 'barcode-scanner.webp',
  '/assets/screens/goal-control.png': 'goal-control.webp',
  '/assets/screens/visual-progress.png': 'visual-progress.webp',
  '/assets/screens/food-diary.png': 'food-diary.webp',
  '/assets/screens/goals-pace.png': 'goals-pace.webp',
  '/assets/screens/health-connect.png': 'health-connect.webp'
};

function localizedScreenPath(src, locale = 'en') {
  const file = screenFileByPath[src];
  if (!file) return src;
  const screenLocale = localizedScreenLocales.has(locale) ? locale : 'en';
  return `/assets/screens/${screenLocale}/${file}`;
}

function fallbackScreenPath(src) {
  const file = screenFileByPath[src];
  return file ? `/assets/screens/en/${file}` : src;
}

function localizedFoodName(food, t) {
  return t(`foods.${food.slug}.name`, food.name);
}

function localizedFoodServing(food, t) {
  return t(`foods.${food.slug}.serving`, food.serving);
}

function localizedFoodCategory(category, t) {
  return t(`foodCategories.${category}`, category);
}

function localizedFoodNamePrep(food, t) {
  return t(`foods.${food.slug}.namePrep`, localizedFoodName(food, t).toLowerCase());
}

function localizedFoodMacroLabel(key, t, fallback) {
  return t(`foodPage.macros.${key}`, fallback);
}

function unitKcal(t) {
  return t('units.kcal', 'kcal');
}

function unitGram(t) {
  return t('units.gram', 'g');
}

function formatCalories(value, t) {
  return `${value} ${unitKcal(t)}`;
}

function formatGrams(value, t) {
  return `${value} ${unitGram(t)}`;
}

function fillTemplate(template, data) {
  if (!template || typeof template !== 'string') return '';
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? '');
}

function localizePageData(page, t) {
  if (!page) return page;
  if (page.food) {
    const name = t(`foods.${page.food.slug}.name`, page.food.name);
    const serving = t(`foods.${page.food.slug}.serving`, page.food.serving);
    const prep = t(`foods.${page.food.slug}.namePrep`, name.toLowerCase());
    const data = {
      name,
      nameLower: name.toLowerCase(),
      namePrep: prep,
      serving,
      servingLower: serving.toLowerCase(),
      calories: page.food.calories,
      kcal: t('units.kcal', 'kcal')
    };
    const titleTemplate = t('foodPage.titleTemplate', null);
    const h1Template = t('foodPage.h1Template', null);
    const descriptionTemplate = t('foodPage.descriptionTemplate', null);
    if (titleTemplate || h1Template || descriptionTemplate || name !== page.food.name || serving !== page.food.serving) {
      return {
        ...page,
        title: titleTemplate ? fillTemplate(titleTemplate, data) : page.title,
        h1: h1Template ? fillTemplate(h1Template, data) : page.h1,
        description: descriptionTemplate ? fillTemplate(descriptionTemplate, data) : page.description
      };
    }
  }
  const override = t(`pages.${page.path}`, null);
  if (override && typeof override === 'object' && !Array.isArray(override)) {
    const localized = { ...page, ...override };
    // If a translated page does not define a separate navLabel, never keep
    // the English navLabel from src/data/pages.js. Dropdown menus should use
    // the translated short title instead.
    localized.navLabel = override.navLabel || override.title || override.h1 || localized.title || page.navLabel;
    return localized;
  }
  return page;
}

function localizePagesData(items, t) {
  return items.map((item) => localizePageData(item, t));
}

function LocalizedScreenshot({ src, locale, alt = '', className = '', ...props }) {
  return (
    <img
      className={className}
      src={localizedScreenPath(src, locale)}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        const fallback = fallbackScreenPath(src);
        if (event.currentTarget.src !== new URL(fallback, window.location.origin).href) {
          event.currentTarget.src = fallback;
        }
      }}
      {...props}
    />
  );
}

function NavDropdown({ label, path, items, locale, active, onToggle, t, hubLabel }) {
  return (
    <div className={`nav-dropdown ${active ? 'active' : ''}`}>
      <button className="nav-trigger" type="button" onClick={onToggle} aria-expanded={active}>
        <span>{label}</span>
        <ChevronDown />
      </button>
      <div className="nav-panel">
        <a className="nav-panel-primary" href={localizePath(path, locale)}>
          <span>{hubLabel || `${t('nav.all', 'All')} ${label.toLowerCase()}`}</span>
          <strong>{t('nav.openHub', 'Open hub →')}</strong>
        </a>
        <div className="nav-panel-grid">
          {items.map((item) => (
            <a key={item.path} href={localizePath(item.path, locale)}>
              <span>{item.navLabel || item.title}</span>
              <small>{item.description}</small>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ locale, routePath, t }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const currentLanguage = languages.find((language) => language.code === locale) || languages[0];
  const featureItems = localizePagesData(featurePages.filter((item) => item.path !== '/features/').slice(0, 9), t);
  const useCaseItems = localizePagesData(useCasePages.slice(0, 9), t);
  const learnItems = localizePagesData([foodIndexPage, ...blogArticles.slice(0, 8)], t).map((article) => ({ ...article, navLabel: article.navLabel || article.title }));

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setActiveDropdown(null);
  }, [routePath, locale]);

  return (
    <header className="site-header">
      <a className="brand" href={localizePath('/', locale)} aria-label="Calorie Counter AI home">
        <img src={site.assets.icon} alt="" />
        <span>Calorie Counter AI</span>
      </a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={t('nav.openMenu', 'Open menu')}>☰</button>
      <nav className={open ? 'open' : ''}>
        <NavDropdown
          label={t('nav.features', 'Features')}
          path="/features/"
          items={featureItems}
          locale={locale}
          active={activeDropdown === 'features'}
          onToggle={() => setActiveDropdown(activeDropdown === 'features' ? null : 'features')}
          t={t}
          hubLabel={t('nav.allFeatures', 'All features')}
        />
        <NavDropdown
          label={t('nav.useCases', 'Use cases')}
          path="/use-cases/"
          items={useCaseItems}
          locale={locale}
          active={activeDropdown === 'use-cases'}
          onToggle={() => setActiveDropdown(activeDropdown === 'use-cases' ? null : 'use-cases')}
          t={t}
          hubLabel={t('nav.allUseCases', 'All use cases')}
        />
        <NavDropdown
          label={t('nav.blog', 'Learn')}
          path="/blog/"
          items={learnItems}
          locale={locale}
          active={activeDropdown === 'learn'}
          onToggle={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
          t={t}
          hubLabel={t('nav.allLearn', 'All guides')}
        />
        
        <a href={localizePath('/faq/', locale)}>{t('nav.faq', 'FAQ')}</a>
        <a className="download-link" href={localizePath('/download/', locale)}>{t('nav.download', 'Download')}</a>
        <SocialLinks className="header-social" />
        <div className={`language-menu ${langOpen ? 'active' : ''}`}>
          <button className="language-trigger" onClick={() => setLangOpen(!langOpen)} aria-expanded={langOpen} type="button" aria-label={t('nav.language', 'Choose language')}>
            <FlagIcon flag={currentLanguage.flag} label={currentLanguage.name} />
            <span className="language-trigger-label">{currentLanguage.code.toUpperCase()}</span>
            <ChevronDown />
          </button>
          {langOpen && (
            <div className="language-panel">
              {languages.map((language) => (
                <a key={language.code} href={isLegalOnlyRoute(routePath) ? routePath : localizePath(routePath, language.code)} onClick={() => saveLanguageChoice(language.code)} className={language.code === locale ? 'active' : ''}>
                  <span className="language-row-name"><FlagIcon flag={language.flag} label={language.name} />{language.nativeName}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer({ locale, t }) {
  const links = [
    { path: '/features/', label: t('nav.features', 'Features'), localized: true },
    { path: '/how-many-calories-in/', label: t('nav.caloriesInFoods', 'Calories in foods'), localized: true },
    { path: '/download/', label: t('nav.download', 'Download'), localized: true },
    { path: '/faq/', label: t('nav.faq', 'FAQ'), localized: true },
    { path: '/pricing/', label: t('utility.pricing', 'Pricing'), localized: true },
    { path: '/support/', label: t('utility.support', 'Support'), localized: true },
    { path: '/privacy-policy/', label: t('utility.privacy', 'Privacy'), localized: false },
    { path: '/terms/', label: t('utility.terms', 'Terms'), localized: false }
  ];
  return (
    <footer className="site-footer">
      <div className="footer-card">
        <div>
          <a className="brand footer-brand" href={localizePath('/', locale)}><img src={site.assets.icon} alt="" /><span>Calorie Counter AI</span></a>
          <p>{t('footer.disclaimer')}</p>
          <SocialLinks className="footer-social" />
        </div>
        <div className="footer-links">
          {links.map(({ path, label, localized }) => <a key={path} href={localized ? localizePath(path, locale) : path}>{label}</a>)}
        </div>
      </div>
      <p className="copyright">{t('footer.copyright')}</p>
    </footer>
  );
}

function MagicBackdrop() {
  return (
    <div className="magic-backdrop" aria-hidden="true">
      <span className="orb orb-one" />
      <span className="orb orb-two" />
      <span className="orb orb-three" />
      <span className="star star-one">✦</span>
      <span className="star star-two">✧</span>
      <span className="star star-three">✦</span>
    </div>
  );
}

function HeroShowcase({ locale }) {
  return (
    <div className="hero-showcase" data-reveal>
      <div className="hero-glow-card hero-screenshot-crop" aria-label="Calorie Counter AI food photo analysis preview">
        <LocalizedScreenshot className="hero-screen-img" src={site.assets.screens.aiPhoto} locale={locale} alt="Food photo analysis screen in Calorie Counter AI" loading="eager" fetchPriority="high" />
      </div>
    </div>
  );
}

function HomePage({ t, locale }) {
  const featureCards = t('home.featureCards', [
    ['camera', 'Photo-based logging', 'Take a meal photo, review the estimate and save it without searching every ingredient.'],
    ['sparkles', 'AI meal estimates', 'Get a fast starting point for calories, macros and portion weight when labels are not available.'],
    ['shield', 'Free daily analyses', 'Try the core AI workflow every day and upgrade only if you need more usage.'],
    ['barcode', 'Packaged foods', 'Scan barcodes for grocery items, snacks, drinks and prepared products.'],
    ['macro', 'Macro overview', 'Keep protein, fats and carbs visible alongside your daily energy target.'],
    ['diary', 'Visual diary', 'Review meals by day and spot eating patterns without digging through clutter.']
  ]);
  const useCases = t('home.useCases', [
    ['/weight-loss-calorie-counter/', 'Weight loss', 'Track calories and see what is left for your daily allowance.'],
    ['/homemade-food-calorie-counter/', 'Homemade food', 'Estimate mixed meals that do not come with a nutrition label.'],
    ['/restaurant-calorie-tracker/', 'Restaurant meals', 'Log meals while eating out with fast photo estimates.'],
    ['/muscle-gain-calorie-tracker/', 'Muscle gain', 'Keep protein and calories visible while building mass.']
  ]);
  const faq = t('home.faq', [
    ['Is Calorie Counter AI free?', 'You can start for free with daily AI meal analyses. Premium options may be available for more usage and advanced features.'],
    ['Can I count calories from a photo?', 'Yes. Take a photo of a meal and the app estimates calories, macros and meal weight from visible food.'],
    ['How accurate is the AI calorie counter?', 'AI provides estimates. Accuracy depends on photo quality, portion visibility, hidden ingredients, sauces and manual corrections.'],
    ['Does the app track macros?', 'Yes. The app shows protein, carbs and fats alongside calories.'],
    ['Is it available on iPhone and Android?', 'Yes. You can download it from the App Store and Google Play.']
  ]);
  const checkList = t('home.photoChecklist', ['Count calories from a photo', 'Estimate proteins, fats and carbs', 'Review and edit before saving', 'Keep meals in a visual food diary']);
  const goalPills = t('home.goalPills', ['Weight loss', 'Maintain weight', 'Gain weight', 'Busy days']);
  const magicSteps = t('home.magicSteps', ['Snap', 'Analyze', 'Track']);
  return (
    <>
      <section className="hero section-wide">
        <div className="hero-copy" data-reveal>
          <h1>{t('home.title')}</h1>
          <p className="hero-description">{t('home.description')}</p>
          <div className="hero-cta"><AppButton type="apple" t={t} /><AppButton type="google" t={t} /></div>
          <p className="hero-note">{t('home.heroNote')}</p>
        </div>
        <HeroShowcase locale={locale} />
      </section>

      <section className="section-grid two-col align-center">
        <div data-reveal>
          <div className="eyebrow"><Icon name="camera" /> {t('home.photoEyebrow', 'The core magic')}</div>
          <h2>{t('home.photoTitle')}</h2>
          <p>{t('home.photoText')}</p>
          <ul className="check-list">
            {checkList.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="image-frame screenshot-crop tilted" data-reveal>
          <LocalizedScreenshot src={site.assets.screens.nutritionBalance} locale={locale} alt={t('alt.nutritionBalance', 'Nutrition balance screen showing AI food analysis')} />
        </div>
      </section>

      <section className="feature-grid section-wide" data-reveal>
        {featureCards.map(([icon, title, text]) => (
          <article className="feature-card" key={title}>
            <Icon name={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      

      <section className="section-grid two-col reverse align-center">
        <div className="image-frame screenshot-crop" data-reveal>
          <LocalizedScreenshot src={site.assets.screens.goalControl} locale={locale} alt={t('alt.goalControl', 'Calorie goal and macro tracking screen')} />
        </div>
        <div data-reveal>
          <div className="eyebrow"><Icon name="goal" /> {t('home.goalEyebrow', 'Goal under control')}</div>
          <h2>{t('home.counterTitle')}</h2>
          <p>{t('home.counterText')}</p>
          <div className="pill-list">{goalPills.map((pill) => <span key={pill}>{pill}</span>)}</div>
        </div>
      </section>

      <section className="magic-speed section-wide" data-reveal>
        <div>
          <div className="eyebrow"><Icon name="sparkles" /> {t('home.magicEyebrow', 'Why it feels different')}</div>
          <h2>{t('home.magicTitle')}</h2>
          <p>{t('home.magicText')}</p>
        </div>
        <div className="speed-steps">
          {magicSteps.map((step, index) => <React.Fragment key={step}><span>{step}</span>{index < magicSteps.length - 1 && <i />}</React.Fragment>)}
        </div>
      </section>

      <section className="section-grid two-col align-center">
        <div data-reveal>
          <div className="eyebrow"><Icon name="barcode" /> {t('home.barcodeEyebrow', 'Packaged foods')}</div>
          <h2>{t('home.barcodeTitle', 'Calorie counter with barcode scanner')}</h2>
          <p>{t('home.barcodeText', 'Have a barcode? Scan it, confirm the product and add calories, protein, fats and carbs to your food diary in seconds.')}</p>
          <a className="inline-link" href={localizePath('/barcode-calorie-scanner/', locale)}>{t('home.barcodeLink', 'Explore barcode scanning →')}</a>
        </div>
        <div className="image-frame screenshot-crop" data-reveal>
          <LocalizedScreenshot src={site.assets.screens.barcode} locale={locale} alt={t('alt.barcode', 'Barcode calorie scanner screen')} />
        </div>
      </section>

      <section className="section-grid two-col reverse align-center">
        <div className="image-frame screenshot-crop" data-reveal>
          <LocalizedScreenshot src={site.assets.screens.progress} locale={locale} alt={t('alt.progress', 'Visual progress charts in the nutrition tracking app')} />
        </div>
        <div data-reveal>
          <div className="eyebrow"><Icon name="chart" /> {t('home.progressEyebrow', 'Visual progress')}</div>
          <h2>{t('home.macroTitle')}</h2>
          <p>{t('home.macroText')}</p>
          <a className="inline-link" href={localizePath('/macro-tracker/', locale)}>{t('home.macroLink', 'Open macro tracker page →')}</a>
        </div>
      </section>

      <section className="use-case-section section-wide" data-reveal>
        <div className="section-head">
          <div className="eyebrow"><Icon name="sparkles" /> {t('home.useCasesEyebrow', 'Use Calorie Counter AI for')}</div>
          <h2>{t('home.useCasesTitle', 'Nutrition goals that fit real life')}</h2>
          <p>{t('home.useCasesText', 'Whether you want to lose weight, maintain, gain muscle or simply understand your food better, the app turns meals into clear daily feedback.')}</p>
        </div>
        <div className="use-case-grid">
          {useCases.map(([path, title, text]) => (
            <a className="use-case-card" key={path} href={localizePath(path, locale)}><h3>{title}</h3><p>{text}</p><span>{t('cta.learnMoreArrow', 'Learn more →')}</span></a>
          ))}
        </div>
      </section>

      <section className="download-band section-wide" data-reveal>
        <img src={site.assets.icon} alt={t('alt.appIcon', 'Calorie Counter AI app icon')} />
        <div>
          <h2>{t('home.downloadTitle', 'Start tracking calories with AI today')}</h2>
          <p>{t('home.downloadText', 'Download Calorie Counter AI for iPhone or Android and turn your next meal photo into a nutrition entry.')}</p>
        </div>
        <div className="hero-cta compact"><AppButton type="apple" t={t} /><AppButton type="google" t={t} /></div>
      </section>

      <section className="faq-section" data-reveal>
        <div className="section-head">
          <div className="eyebrow"><Icon name="shield" /> {t('home.faqEyebrow', 'FAQ')}</div>
          <h2>{t('home.faqTitle', 'Questions before you download?')}</h2>
        </div>
        <div className="faq-list">
          {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>

      <section className="food-preview section-wide" data-reveal>
        <div className="section-heading compact center"><h2>{t('home.foodPreviewTitle', 'How many calories in common foods?')}</h2><p>{t('home.foodPreviewText', 'Browse quick calorie and macro guides for everyday meals, snacks and drinks.')}</p></div>
        <div className="food-preview-grid">
          {foodPages.slice(0, 12).map((page) => (
            <a className="food-card compact" href={localizePath(page.path, locale)} key={page.path}>
              <span>{page.food.emoji}</span><strong>{localizedFoodName(page.food, t)}</strong><b>{formatCalories(page.food.calories, t)}</b>
            </a>
          ))}
        </div>
        <a className="inline-link preview-link" href={localizePath('/how-many-calories-in/', locale)}>{t('home.foodPreviewLink', 'Open the full food calorie guide →')}</a>
      </section>
    </>
  );
}


function HubPage({ page, items, locale, t, kind = 'features' }) {
  const localizedPage = localizePageData(page, t);
  const localizedItems = localizePagesData(items, t);
  return (
    <>
      <PageHero page={localizedPage} />
      <section className="hub-grid section-wide">
        {localizedItems.map((item, index) => (
          <a className="hub-card" key={item.path} href={localizePath(item.path, locale)} data-reveal style={{ '--delay': `${index * 60}ms` }}>
            <div className="hub-card-image screenshot-crop"><LocalizedScreenshot src={item.image} locale={locale} alt="" /></div>
            <div className="hub-card-content">
              <span>{item.kicker || (kind === 'features' ? t('labels.feature', 'Feature') : t('labels.useCase', 'Use case'))}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <strong>{t('labels.openPage', 'Open page →')}</strong>
            </div>
          </a>
        ))}
      </section>
      <InternalCta locale={locale} t={t} />
    </>
  );
}

function StandardPage({ page: basePage, locale, t }) {
  const enhancement = pageEnhancements[basePage.path] || {};
  const enhancedPage = locale === 'en' ? { ...basePage, ...enhancement } : { ...enhancement, ...basePage };
  const page = localizePageData(enhancedPage, t);
  const pageSections = [...(page.sections || []), ...(page.extraSections || [])];
  const related = allPages
    .filter((item) => item.path !== page.path && item.path !== '/' && item.path !== '/features/' && item.path !== '/use-cases/' && item.path !== '/blog/' && item.type !== 'legal')
    .filter((item) => item.image === page.image || item.kicker === page.kicker || item.title.split(' ').some((word) => page.title.includes(word) && word.length > 5))
    .slice(0, 3);

  return (
    <>
      <PageHero page={page} />
      <section className="section-grid two-col align-center">
        <div data-reveal>
          <div className="eyebrow"><Icon name="sparkles" /> {page.kicker}</div>
          <h2>{page.summary}</h2>
          <ul className="check-list">
            {page.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </div>
        <div className="image-frame screenshot-crop" data-reveal><LocalizedScreenshot src={page.image} locale={locale} alt={page.title} /></div>
      </section>
      <section className="content-sections">
        {pageSections.map(([title, text], index) => (
          <article key={title} className="content-card" data-reveal style={{ '--delay': `${index * 80}ms` }}>
            <h2>{title}</h2><p>{text}</p>
          </article>
        ))}
      </section>
      <section className="deep-content section-wide" data-reveal>
        <article>
          <div className="eyebrow"><Icon name="sparkles" /> {page.workflowKicker || t('labels.practicalWorkflow', 'Practical workflow')}</div>
          <h2>{page.workflowTitle || t('labels.workflowTitle', 'How this fits into daily tracking')}</h2>
          {(page.workflow || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
        <article className="deep-note">
          <h3>{page.noteTitle || t('labels.goodToKnow', 'Good to know')}</h3>
          <p>{page.note || t('labels.defaultNote', 'Nutrition values are estimates for everyday awareness. Food photos, barcodes and diary entries work best when combined with common sense, portion review and occasional manual edits.')}</p>
          {page.bestFor && page.bestFor.length > 0 && (
            <div className="best-for-list">
              <strong>{t('labels.bestFor', 'Best for')}</strong>
              <ul className="mini-list">{page.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
        </article>
      </section>
      {related.length > 0 && (
        <section className="related-pages section-wide" data-reveal>
          <h2>{t('labels.relatedPages', 'Related pages')}</h2>
          <div>
            {related.map((item) => { const relatedItem = localizePageData(item, t); return <a key={item.path} href={localizePath(item.path, locale)}>{relatedItem.title}<span>{t('labels.openArrow', 'Open →')}</span></a>; })}
          </div>
        </section>
      )}
      <InternalCta locale={locale} t={t} />
    </>
  );
}

function PageHero({ page }) {
  return (
    <section className="page-hero section-wide" data-reveal>
      <div className="eyebrow"><Icon name="sparkles" /> {page.kicker || 'Calorie Counter AI'}</div>
      <h1>{page.h1}</h1>
      <p>{page.description}</p>
    </section>
  );
}

function BlogIndex({ locale, t }) {
  const page = localizePageData(blogIndex, t);
  const articles = localizePagesData(blogArticles, t);
  return (
    <>
      <PageHero page={{ ...page, kicker: page.kicker || t('nav.blog', 'Learn') }} />
      <section className="article-grid section-wide">
        {articles.map((article) => (
          <a className="article-card" key={article.path} href={localizePath(article.path, locale)} data-reveal>
            <div className="article-card-image screenshot-crop"><LocalizedScreenshot src={article.image} locale={locale} alt="" /></div>
            <span>{article.category} · {article.readTime}</span>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </a>
        ))}
      </section>
    </>
  );
}

function ArticlePage({ page: basePage, locale, t }) {
  const page = localizePageData(basePage, t);
  return (
    <article className="article-page">
      <section className="article-hero section-wide" data-reveal>
        <div className="eyebrow"><Icon name="sparkles" /> {page.category} </div>
        <h1>{page.h1}</h1>
        <p>{page.intro}</p>
        <div className="article-hero-image screenshot-crop"><LocalizedScreenshot src={page.image} locale={locale} alt={page.title} /></div>
      </section>
      <section className="article-body">
        {page.sections.map(([heading, text]) => <section key={heading} data-reveal><h2>{heading}</h2><p>{text}</p></section>)}
        <div className="article-note" data-reveal>
          <strong>{t('labels.quickTakeaway', 'Quick takeaway:')}</strong> {page.takeaway || t('labels.defaultTakeaway', 'Calorie Counter AI is designed to reduce logging friction. Use AI estimates, barcode scanning and manual edits together for a practical daily workflow.')}
        </div>
      </section>
      <InternalCta locale={locale} t={t} />
    </article>
  );
}


function FoodIndexPage({ locale, t }) {
  return (
    <>
      <PageHero page={localizePageData(foodIndexPage, t)} />
      <section className="food-index-intro section-wide" data-reveal>
        <div>
          <h2>{t('foodIndex.findTitle', 'Find calories, macros and practical serving notes')}</h2>
          <p>{t('foodIndex.findText', 'These guides give quick estimates for common foods, plus logging tips that help you avoid the usual mistakes: serving size, cooking method, sauces, oils and toppings.')}</p>
        </div>
        <div className="food-category-list">
          {foodCategories.map((category) => <a key={category} href={`#${category.toLowerCase().replaceAll(' ', '-')}`}>{localizedFoodCategory(category, t)}</a>)}
        </div>
      </section>
      {foodCategories.map((category) => (
        <section className="food-category-section section-wide" id={category.toLowerCase().replaceAll(' ', '-')} key={category} data-reveal>
          <div className="section-heading compact"><h2>{localizedFoodCategory(category, t)}</h2><p>{t('foodIndex.categoryIntro', 'Popular calorie and macro searches for this category.')}</p></div>
          <div className="food-grid">
            {foodPages.filter((page) => page.food.category === category).map((page) => (
              <a className="food-card" href={localizePath(page.path, locale)} key={page.path}>
                <span>{page.food.emoji}</span>
                <strong>{localizedFoodName(page.food, t)}</strong>
                <small>{localizedFoodServing(page.food, t)}</small>
                <b>{formatCalories(page.food.calories, t)}</b>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function FoodLandingPage({ page, locale, t }) {
  const food = page.food;
  const per100 = food.per100;
  const foodName = localizedFoodName(food, t);
  const foodNamePrep = localizedFoodNamePrep(food, t);
  const foodServing = localizedFoodServing(food, t);
  return (
    <article className="food-page">
      <section className="food-hero section-wide" data-reveal>
        <div>
          <div className="eyebrow"><Icon name="sparkles" /> {t('foodPage.eyebrow', 'Food calories guide')}</div>
          <h1>{page.h1}</h1>
          <p>{locale === 'ru' ? fillTemplate(t('foodPage.heroIntroTemplate', 'Ориентировочно {calories} {kcal} в порции: {servingLower}. Используйте эти данные как отправную точку и уточняйте результат по бренду, рецепту, способу приготовления и размеру порции.'), { calories: food.calories, kcal: unitKcal(t), servingLower: foodServing.toLowerCase(), name: foodName, namePrep: foodNamePrep }) : page.intro}</p>
          <div className="food-hero-actions"><a className="cta-button" href={localizePath('/download/', locale)}>{t('foodPage.trackInApp', 'Track it in the app')}</a><a className="inline-link" href={localizePath('/how-many-calories-in/', locale)}>{t('foodPage.browseFoods', 'Browse foods →')}</a></div>
        </div>
        <aside className="nutrition-card" aria-label={`Nutrition estimate for ${foodName}`}>
          <span className="food-emoji">{food.emoji}</span>
          <h2>{foodName}</h2>
          <p>{foodServing}</p>
          <strong>{formatCalories(food.calories, t)}</strong>
          <div className="macro-row"><span>{localizedFoodMacroLabel('protein', t, 'Protein')} <b>{formatGrams(food.protein, t)}</b></span><span>{localizedFoodMacroLabel('fat', t, 'Fat')} <b>{formatGrams(food.fat, t)}</b></span><span>{localizedFoodMacroLabel('carbs', t, 'Carbs')} <b>{formatGrams(food.carbs, t)}</b></span></div>
          <small>{t('foodPage.typicalEstimate', 'Typical estimate. Actual values vary by brand, recipe and portion.')}</small>
        </aside>
      </section>

      <section className="food-content section-wide">
        <div className="food-main">
          <section data-reveal>
            <h2>{t('foodPage.caloriesMacros', 'Calories and macros')}</h2>
            {locale === 'ru' ? (
              <>
                <p>{fillTemplate(t('foodPage.macroParagraphTemplate', '{name}: примерно {calories} {kcal} в порции «{servingLower}». В такой порции около {protein} {gram} белка, {fat} {gram} жиров и {carbs} {gram} углеводов{fiberText}.'), { name: foodName, calories: food.calories, kcal: unitKcal(t), servingLower: foodServing.toLowerCase(), protein: food.protein, fat: food.fat, carbs: food.carbs, gram: unitGram(t), fiberText: food.fiber ? `, включая примерно ${food.fiber} ${unitGram(t)} клетчатки` : '' })}</p>
                <p>{fillTemplate(t('foodPage.per100Template', 'Для сравнения на 100 {gram}: около {calories} {kcal}, {protein} {gram} белка, {fat} {gram} жиров и {carbs} {gram} углеводов.'), { gram: unitGram(t), calories: per100.calories, kcal: unitKcal(t), protein: per100.protein, fat: per100.fat, carbs: per100.carbs })}</p>
              </>
            ) : (
              <>
                <p>{foodName} has about <strong>{food.calories} calories</strong> in {foodServing.toLowerCase()}. That serving provides roughly <strong>{formatGrams(food.protein, t)} protein</strong>, <strong>{formatGrams(food.fat, t)} fat</strong> and <strong>{formatGrams(food.carbs, t)} carbohydrates</strong>{food.fiber ? `, including about ${formatGrams(food.fiber, t)} fiber` : ''}.</p>
                <p>For a 100 {unitGram(t)} comparison, this is approximately <strong>{formatCalories(per100.calories, t)}</strong>, {formatGrams(per100.protein, t)} protein, {formatGrams(per100.fat, t)} fat and {formatGrams(per100.carbs, t)} carbs.</p>
              </>
            )}
          </section>
          <section data-reveal><h2>{t('foodPage.whenFits', 'When it fits well')}</h2><p>{locale === 'ru' ? `Этот продукт можно использовать как часть обычного рациона: важнее всего размер порции, общий дневной баланс и то, с чем он сочетается.` : food.bestFor}</p></section>
          <section data-reveal><h2>{t('foodPage.whatToWatch', 'What to watch')}</h2><p>{locale === 'ru' ? `Сильнее всего калорийность меняют порция, способ приготовления, масло, соусы, сахар, сыр и другие добавки. Для готовых продуктов лучше сверяться с этикеткой.` : food.watchOut}</p></section>
          <section data-reveal><h2>{t('foodPage.howToLog', 'How to log it more accurately')}</h2><p>{locale === 'ru' ? `Записывайте продукт по весу или понятной порции. Если это блюдо из ресторана или домашний рецепт, начните с фото-оценки и скорректируйте видимые добавки вручную.` : food.loggingTip}</p></section>
          <section data-reveal><h2>{t('foodPage.helpfulContext', 'Helpful context')}</h2><p>{locale === 'ru' ? `Одна и та же еда может по-разному вписываться в рацион: для похудения важен дефицит, для набора — достаточная энергия и белок, для поддержания — стабильность привычек.` : food.context}</p></section>
          <section className="food-faq" data-reveal>
            <h2>{t('foodPage.faq', 'FAQ')}</h2>
            <details open><summary>{locale === 'ru' ? `${foodName} — это калорийный продукт?` : `Is ${food.name.toLowerCase()} high in calories?`}</summary><p>{locale === 'ru' ? fillTemplate(t('foodPage.calorieLevelTemplate', 'Ориентируйтесь на порцию: здесь указано примерно {calories} {kcal} для «{servingLower}».'), { calories: food.calories, kcal: unitKcal(t), servingLower: foodServing.toLowerCase() }) : food.calorieLevel}</p></details>
            <details><summary>{t('foodPage.weightLossQuestion', 'Can I use it for weight loss?')}</summary><p>{locale === 'ru' ? `Да, если порция вписывается в ваш дневной ориентир и помогает сохранять сытость. Сам продукт не “худеет” и не “мешает” сам по себе — важен общий рацион.` : food.weightLoss}</p></details>
            <details><summary>{t('foodPage.variabilityQuestion', 'What changes the calorie count most?')}</summary><p>{locale === 'ru' ? `Больше всего влияют вес порции, бренд, рецепт, масло, соусы, сахар и способ приготовления.` : food.variability}</p></details>
          </section>
        </div>
        <aside className="food-side" data-reveal>
          <h3>{t('foodPage.logFasterTitle', 'Log meals faster')}</h3>
          <p>{t('foodPage.logFasterText', 'Use Calorie Counter AI to turn a food photo into a diary entry, then edit the estimate when the portion, sauce or brand is different.')}</p>
          <AppButton type="apple" t={t} /><AppButton type="google" t={t} />
          <a className="inline-link" href={localizePath('/blog/how-to-count-calories-from-a-photo/', locale)}>{t('foodPage.photoTrackingLink', 'How photo calorie tracking works →')}</a>
        </aside>
      </section>
    </article>
  );
}

function LegalText({ text }) {
  return (
    <div className="legal-text">
      {text.split(/\n+/).map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        if (/^\d+\.\s/.test(trimmed)) return <h2 key={trimmed}>{trimmed}</h2>;
        if (/^\d+\.\d+\.\s/.test(trimmed)) return <h3 key={trimmed}>{trimmed}</h3>;
        return <p key={trimmed}>{trimmed}</p>;
      })}
    </div>
  );
}

function LegalDocumentPage({ page, text }) {
  return (
    <>
      <PageHero page={{ ...page, kicker: page.type === 'privacy' ? 'Privacy' : 'Terms' }} />
      <section className="legal-card legal-document-card">
        <LegalText text={text} />
      </section>
    </>
  );
}

function UtilityPage({ page: basePage, locale, t }) {
  if (basePage.type === 'privacy') return <LegalDocumentPage page={basePage} text={privacyPolicyText} />;
  if (basePage.type === 'terms') return <LegalDocumentPage page={basePage} text={termsOfUseText} />;
  const page = localizePageData(basePage, t);
  if (page.type === 'download') return <DownloadPage page={page} t={t} />;
  if (page.type === 'faq') return <FaqPage page={page} t={t} />;
  if (page.type === 'press') return <PressPage page={page} t={t} />;
  const englishContent = {
    pricing: ['You can start with free daily AI meal analyses. Premium options may be available for users who need more usage, advanced tracking tools or additional convenience features.', 'Subscription availability, trial terms and prices can vary by country, platform and store settings. The current price is always shown before purchase in the App Store or Google Play.'],
    support: [`Need help? Contact ${site.supportEmail} with your device, platform, app version and a short description of the issue.`, 'For billing, refund or subscription management questions, review the App Store or Google Play subscription settings because purchases are handled by the platform store.'],
    contact: [`Support email: ${site.supportEmail}`, 'For partnerships, media requests or product feedback, include a clear subject line so the message can be routed faster.'],
    privacy: ['Calorie Counter AI is designed for food logging and nutrition awareness. App data may include meal entries, photos, preferences and technical information needed to provide the service.', 'Only share health or activity permissions that you are comfortable using. You can manage app permissions through your device and platform settings.'],
    terms: ['By using Calorie Counter AI, users agree to use the app for informational nutrition tracking and to review estimates before relying on them.', 'The app may change features, free usage limits or premium options over time. Store terms also apply to purchases made through the App Store or Google Play.'],
    disclaimer: ['Calorie Counter AI provides nutrition estimates for informational and educational purposes only. It is not medical advice, diagnosis or treatment.', 'Food-photo estimates can be affected by portion size, hidden ingredients, recipe differences, photo quality and user edits. Users with medical conditions, pregnancy, eating disorder history or clinical nutrition needs should consult a qualified professional.'],
    delete: [`To request account or data deletion, contact ${site.supportEmail} from the email linked to your account and include “Delete account” in the subject.`, 'The support team may ask for information needed to verify the request and identify the correct account before deleting data.']
  };
  const translatedContent = t(`utilityContent.${page.type}`, null);
  const content = Array.isArray(translatedContent) ? translatedContent : (englishContent[page.type] || ['Information about this page will be updated as the product evolves.']);
  return (
    <>
      <PageHero page={{ ...page, kicker: page.kicker || t('labels.information', 'Information') }} />
      <section className="legal-card" data-reveal>
        {content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {page.path === '/delete-account/' && <p>{t('utility.deleteExtra', `To request deletion, contact ${site.supportEmail} from the email linked to your account and include “Delete account” in the subject.`)}</p>}
      </section>
      <InternalCta locale={locale} t={t} />
    </>
  );
}

function DownloadPage({ page, t }) {
  return (
    <>
      <PageHero page={{ ...page, kicker: page.kicker || t('nav.download', 'Download') }} />
      <section className="download-page-card section-wide" data-reveal>
        <img src={site.assets.icon} alt="Calorie Counter AI app icon" />
        <div><h2>{t('download.availableTitle', 'Available for iPhone and Android')}</h2><p>{t('download.availableText', 'Start with a photo, barcode or simple diary entry. Keep calorie and macro tracking fast from day one.')}</p></div>
        <div className="hero-cta"><AppButton type="apple" t={t} /><AppButton type="google" t={t} /></div>
      </section>
    </>
  );
}

function FaqPage({ page, t }) {
  const items = t('faq.items', [
    ['Is Calorie Counter AI free?', 'You can start for free with daily AI meal analyses. Premium options may be available for more usage and advanced features.'],
    ['Can I count calories from a photo?', 'Yes. Take a food photo and the app estimates calories, macros and portion weight.'],
    ['Can the app scan barcodes?', 'Yes. The barcode scanner helps add packaged foods to your diary quickly.'],
    ['Does it track macros?', 'Yes. The app tracks protein, carbohydrates and fats alongside calories.'],
    ['Can I use it for homemade food?', 'Yes. Photo estimates are especially useful for homemade dishes, but you should review hidden ingredients and portions.'],
    ['Is it medical advice?', 'No. The app provides informational estimates and does not replace a doctor, dietitian or other qualified professional.']
  ]);
  return (
    <>
      <PageHero page={{ ...page, kicker: page.kicker || t('nav.faq', 'FAQ') }} />
      <section className="faq-section" data-reveal><div className="faq-list">{items.map(([q,a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    </>
  );
}

function PressPage({ page, t }) {
  return (
    <>
      <PageHero page={{ ...page, kicker: page.kicker || t('utility.press', 'Press') }} />
      <section className="press-grid section-wide">
        <div className="press-card" data-reveal><img src={site.assets.icon} alt={t('press.iconAlt', 'App icon')} /><h2>{t('press.iconTitle', 'App icon')}</h2><a href={site.assets.icon} download>{t('press.downloadIcon', 'Download icon')}</a></div>
        <div className="press-card" data-reveal><LocalizedScreenshot src={site.assets.screens.aiPhoto} locale="en" alt={t('press.screenshotAlt', 'App screenshot')} /><h2>{t('press.screenshotTitle', 'Screenshot')}</h2><a href={site.assets.screens.aiPhoto} download>{t('press.downloadScreenshot', 'Download screenshot')}</a></div>
        <div className="press-card text" data-reveal><h2>{t('press.shortDescriptionTitle', 'Short description')}</h2><p>{t('press.shortDescriptionText', 'Calorie Counter AI is an AI calorie counter app that estimates calories, macros and meal weight from food photos, with barcode scanning and a visual food diary.')}</p></div>
      </section>
    </>
  );
}

function InternalCta({ locale, t = (key, fallback) => fallback }) {
  return (
    <section className="internal-cta section-wide" data-reveal>
      <div><h2>{t('internalCta.title', 'Turn your next meal into a nutrition entry')}</h2><p>{t('internalCta.text', 'Download Calorie Counter AI and experience fast photo calorie tracking.')}</p></div>
      <a className="cta-button" href={localizePath('/download/', locale)}>{t('internalCta.button', 'Download the app')}</a>
    </section>
  );
}

function CookieConsent({ t, routePath }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent === 'accepted') {
        loadAnalytics(localizePath(routePath, document.documentElement.lang || 'en'), document.title);
        return;
      }
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [routePath]);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // Ignore blocked storage, but still respect the user's click for this session.
    }
    loadAnalytics(localizePath(routePath, document.documentElement.lang || 'en'), document.title);
    setVisible(false);
  };

  const decline = () => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    } catch {
      // Ignore blocked storage.
    }
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t('cookies.title', 'Cookie preferences')}>
      <div>
        <strong>{t('cookies.title', 'Cookie preferences')}</strong>
        <p>{t('cookies.text', 'We use necessary cookies and local storage to remember your language and cookie choice. With your consent, we also use analytics cookies to improve the website.')}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-secondary" onClick={decline}>{t('cookies.decline', 'Decline analytics')}</button>
        <button type="button" className="cookie-primary" onClick={accept}>{t('cookies.accept', 'Accept')}</button>
      </div>
    </div>
  );
}

function NotFound({ locale, t }) {
  return (
    <section className="page-hero section-wide not-found" data-reveal>
      <div className="eyebrow"><Icon name="sparkles" /> 404</div>
      <h1>{t('notFound.title', 'Page not found')}</h1>
      <p>{t('notFound.text', 'The page you are looking for does not exist yet.')}</p>
      <a className="cta-button" href={localizePath('/', locale)}>{t('notFound.home', 'Go home')}</a>
    </section>
  );
}

export default function App() {
  const [{ locale, routePath, prefix }, setLocationState] = useState(parseLocation());
  const t = useMemo(() => createTranslator(locale), [locale]);
  const page = useMemo(() => {
    const basePage = routePath === '/'
      ? { title: t('seo.homeOgTitle', 'AI Calorie Counter App by Photo'), description: t('seo.homeDescription', locales.en.seo.homeDescription), type: 'home' }
      : allPages.find((item) => item.path === routePath) || null;
    return localizePageData(basePage, t);
  }, [routePath, t]);

  useSeo(page || { title: 'Page not found', description: 'Page not found' }, locale, routePath, Boolean(page));
  useScrollReveal(routePath);

  useEffect(() => {
    if (pathHasLocalePrefix(window.location.pathname) || isLegalOnlyRoute(routePath)) return;
    const preferredLocale = detectUserLocale();
    if (preferredLocale && preferredLocale !== 'en') {
      const targetPath = localizePath(routePath, preferredLocale);
      if (targetPath !== window.location.pathname) {
        window.history.replaceState({}, '', targetPath);
        setLocationState(parseLocation());
      }
    }
  }, []);

  useEffect(() => {
    if (locale !== 'en' && isLegalOnlyRoute(routePath)) {
      window.history.replaceState({}, '', routePath);
      setLocationState(parseLocation());
    }
  }, [locale, routePath]);

  useEffect(() => {
    const onPop = () => setLocationState(parseLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor || anchor.target || anchor.download) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      window.history.pushState({}, '', url.pathname);
      setLocationState(parseLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="app">
      <MagicBackdrop />
      <Header locale={locale} routePath={routePath} t={t} />
      <main>
        {routePath === '/' && <HomePage t={t} locale={locale} />}
        {routePath === '/features/' && <HubPage page={{ ...page, kicker: page.kicker || t('nav.features', 'Features') }} items={featurePages.filter((item) => item.path !== '/features/')} locale={locale} t={t} kind="features" />}
        {routePath === useCaseIndex.path && <HubPage page={useCaseIndex} items={useCasePages} locale={locale} t={t} kind="use cases" />}
        {routePath === blogIndex.path && <BlogIndex locale={locale} t={t} />}
        {routePath === foodIndexPage.path && <FoodIndexPage locale={locale} t={t} />}
        {page && foodPages.some((item) => item.path === routePath) && <FoodLandingPage page={page} locale={locale} t={t} />}
        {page && routePath !== '/features/' && featurePages.some((item) => item.path === routePath) && <StandardPage page={page} locale={locale} t={t} />}
        {page && routePath !== useCaseIndex.path && useCasePages.some((item) => item.path === routePath) && <StandardPage page={page} locale={locale} t={t} />}
        {page && blogArticles.some((item) => item.path === routePath) && <ArticlePage page={{ ...page, type: 'article' }} locale={locale} t={t} />}
        {page && utilityPages.some((item) => item.path === routePath) && <UtilityPage page={page} locale={locale} t={t} />}
        {!page && <NotFound locale={locale} t={t} />}
      </main>
      <Footer locale={locale} t={t} />
      <CookieConsent t={t} routePath={routePath} />
    </div>
  );
}
