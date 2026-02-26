import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import auth from '@/locales/en/auth.json';
import common from '@/locales/en/common.json';
import home from '@/locales/en/home.json';

const resources = {
  en: {
    auth,
    common,
    home,
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'home', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
