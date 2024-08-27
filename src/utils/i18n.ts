import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
  en: {
    translation: {
      welcomeMessage: 'Welcome to React and react-i18next',
    },
  },
  es: {
    translation: {
      welcomeMessage: 'Bienvenido a React y react-i18next',
    },
  },
};

// * Configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
