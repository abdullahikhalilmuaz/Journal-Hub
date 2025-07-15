import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import yo from "./languages/yo.json";
import ha from "./languages/ha.json";
import ig from "./languages/ig.json";

const resources = {
  en: {
    translation: en,
  },
  yo: {
    translation: yo,
  },
  ha: {
    translation: ha,
  },
  ig: {
    translation: ig,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
