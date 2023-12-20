import i18n from "i18n-js";
import * as Localization from "expo-localization";

const translations = {
  en: {
    greeting: "Hello!",
  },
  ru: {
    greeting: "Привет!",
  },
};

i18n.translations = translations;
i18n.fallbacks = true;
i18n.locale = Localization.locale;

export default i18n;
