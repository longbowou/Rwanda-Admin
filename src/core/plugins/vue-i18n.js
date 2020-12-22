import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import fr from "@/core/config/i18n/fr.json";
import en from "@/core/config/i18n/en.json";
import i18nService from "@/core/services/i18n.service";

Vue.use(VueI18n);

let messages = {};
messages = { ...messages, fr, en };

// get current selected language
const lang = i18nService.getActiveLanguage();

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages // set locale messages
});

export default i18n;
