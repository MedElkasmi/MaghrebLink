import * as Localization from 'react-native-localize'
import i18n from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Import translation files
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

// Bind translations to i18n
i18n.translations = {
  en,
  fr,
  es,
}

const setI18nConfig = async () => {
  const savedLanguage = await AsyncStorage.getItem('appLanguage')
  if (savedLanguage) {
    i18n.locale = savedLanguage
  } else {
    const fallback = { languageTag: 'en', isRTL: false }
    const { languageTag } =
      Localization.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
      fallback

    i18n.locale = languageTag
  }
  i18n.fallbacks = true // fall back to English if translation is missing
}

export const changeLanguage = async (language) => {
  await AsyncStorage.setItem('appLanguage', language)
  i18n.locale = language
  setI18nConfig()
}

export default setI18nConfig
