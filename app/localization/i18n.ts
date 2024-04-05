import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import hi from './hi/hi.json'
import en from './en/en.json'

// list of languages

const resources = {
    en: {
        translation: en
    },
    hi: {
        translation: hi
    }
};

i18next.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        debug: true,
        compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
        lng: 'en', // default language to use.
        // if you're using a language detector, do not define the lng option
        interpolation: {
            escapeValue: false,
        },
        resources,
    });
export default i18next;