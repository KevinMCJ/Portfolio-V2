import { initReactI18next } from "react-i18next";
import { isValidLanguage } from "@/utils/validators";
import i18n from "i18next";
import enLang from "./locales/en.json";
import esLang from "./locales/es.json";

const savedLang = localStorage.getItem("lang");
const resources = {
  en: { translation: enLang },
  es: { translation: esLang },
};

// * Configuration
i18n.use(initReactI18next).init({
  resources,
  lng: isValidLanguage(savedLang) ? savedLang : "es",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
