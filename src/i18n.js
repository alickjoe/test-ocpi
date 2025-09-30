import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

// Language detection options
const detectionOptions = {
  // Detection order and from where user language should be detected
  order: ['localStorage', 'navigator', 'htmlTag'],
  
  // Keys or params to lookup language from
  lookupLocalStorage: 'i18nextLng',
  
  // Cache user language on
  caches: ['localStorage'],
  
  // Language codes to lookup, given set will be used for browser language detection
  checkWhitelist: true
};

const resources = {
  en: {
    translation: enTranslations
  },
  zh: {
    translation: zhTranslations
  }
};

i18n
  // Load language detector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection
    detection: detectionOptions,
    
    // Interpolation options
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    // Whitelist languages
    whitelist: ['en', 'zh'],
    
    // Preload languages
    preload: ['en', 'zh'],
    
    // React specific options
    react: {
      useSuspense: false
    }
  });

export default i18n;