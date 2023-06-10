
import { createI18n } from 'vue-i18n';

import en from './locales/en.json'
import kh from './locales/kh.json'
import us  from 'view-ui-plus/dist/locale/en-US'


function loadLocale() {
    const locale = [
        { en: Object.assign(en,us)},
        { kh: Object.assign(kh,us) }
    ]
    const messages = {}
    locale.forEach((lang) => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

const lang = localStorage.getItem('lang')
const i18n = createI18n({
    legacy: false,
    locale: lang,
    globalInjection: true,
    localeKeys: ['en', 'kh'],
    messages: loadLocale()
})

export default i18n;