// Only one item MUST have the "default: true" key

module.exports = {
  en: {
    default: true,
    path: `en`,
    locale: `en-US`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Gatsby Starter with multi-language and CMS`,
    defaultDescription: `Gatsby example site using Markdown, i18n and CMS`,
  },
  de: {
    path: `de`,
    locale: `de-DE`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `de`,
    ogLanguage: `de_DE`,
    defaultTitle: `Gatsby Starter multilingue com CMS`,
    defaultDescription: `Gatsby-Beispielsite mit Markdown, i18n und CMS`,
  },
}