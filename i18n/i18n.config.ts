export default {
  legacy: 'false',
  defaultLocale: 'en',
  lazy: true, 
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'ru', name: 'Russian', file: 'ru.json' },
  ],
  detectBrowserLanguage: {
    useCookie: false,
    redirectOn: 'root',
    fallbackLocale: 'en',
  },
  datetimeFormats: {
    en: { short: { year: 'numeric', month: 'short', day: 'numeric' } },
    ru: { short: { year: 'numeric', month: 'long', day: 'numeric' } },
  },
}
