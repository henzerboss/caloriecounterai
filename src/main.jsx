import React from 'react';
import { createRoot } from 'react-dom/client';
import { languageCodes } from './data/languages.js';
import './styles.css';

// Определяем текущий язык из URL: /ru/foo/ -> 'ru', / -> 'en'
function detectInitialLocale() {
  try {
    const stored = window.localStorage.getItem('ccai.locale');
    if (stored && languageCodes.includes(stored)) return stored;
  } catch {}
  const segments = window.location.pathname.split('/').filter(Boolean);
  const first = (segments[0] || '').toLowerCase();
  if (languageCodes.includes(first)) return first;
  // Сверяемся с языком браузера
  const browserLangs = navigator.languages || [navigator.language || 'en'];
  for (const raw of browserLangs) {
    const norm = String(raw || '').toLowerCase();
    if (languageCodes.includes(norm)) return norm;
    const base = norm.split('-')[0];
    if (languageCodes.includes(base)) return base;
  }
  return 'en';
}

const initialLocale = detectInitialLocale();

// Pre-load локаль и только потом монтируем приложение
async function start() {
  if (initialLocale !== 'en') {
    try {
      await import(`./locales/${initialLocale}.json`);
    } catch {
      // если файл не найден — продолжаем с английским
    }
  }
  const { default: App } = await import('./App.jsx');
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

start();
