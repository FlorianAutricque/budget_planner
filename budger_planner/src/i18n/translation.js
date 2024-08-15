import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: "Hello",
      },
    },
    fr: {
      translation: {
        hello: "bonjour",
      },
    },
  },
  lng: selectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
