import i18n from "i18next";
import backend from 'i18next-http-backend'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next";

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n