import {Languages} from "./locales";

interface translationOption {
  id: string;
  data: string
}

const ReplaceAll = (str: string, data: string) => {
  const keys = Object.keys(data)
  keys.forEach((key:any) => {
    str = str?.replace(`{${key}}`, data[key])
  })
  return str
}
const useIntl = () => {
  const {locale} = Languages['enUS'];
  // Languages[localStorage.getItem('lang') === 'zhCN' ? 'zhCN' : 'enUS'];

  const getLocale = (_locale: object, key: any, data?: string): string => {
    // @ts-ignore
    return data ? ReplaceAll(_locale[key], data) : _locale[key]
  }
  return (translation: string | translationOption, fallback?: string): string => {
    if (typeof translation === 'string') {
      if (Object.keys(locale).length === 0) {
        return fallback || ''
      }

      return getLocale(locale, translation) || fallback || translation
    }
    return getLocale(locale, translation.id, translation.data) || fallback || translation.id
  }
}

export default useIntl
