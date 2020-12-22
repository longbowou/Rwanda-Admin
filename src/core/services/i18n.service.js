const i18nService = {
  defaultLanguage: "fr",

  languages: [
    {
      lang: "en",
      name: "English",
      flag: process.env.BASE_URL + "media/svg/flags/226-united-states.svg"
    },
    {
      lang: "fr",
      name: "French",
      flag: process.env.BASE_URL + "media/svg/flags/195-france.svg"
    }
  ],

  /**
   * Keep the active language in the localStorage
   * @param lang
   */
  setActiveLanguage(lang) {
    localStorage.setItem("language", lang);
  },

  /**
   * Get the current active language
   * @returns {string | string}
   */
  getActiveLanguage() {
    return localStorage.getItem("language") || this.defaultLanguage;
  },

  getLanguages() {
    let languages = [];
    for (const language of this.languages) {
      if (language.lang !== this.getActiveLanguage()) {
        languages.push(language);
      }
    }

    return languages;
  }
};

export default i18nService;
