// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationEE from './locales/ee/translation.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
  en: { translation: translationEN },
  ee: { translation: translationEE },
  ru: { translation: translationRU },
};

i18n
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n into react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already protects from XSS
    },
  });

export default i18n;
