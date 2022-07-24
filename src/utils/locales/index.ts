import zhCN from './zhCN'
import enUS from './enUS'
import {AllLanguages, LanguagesMap} from './type'

export const Languages: LanguagesMap = { zhCN, enUS }
// @ts-ignore
export const allLanguages: AllLanguages = Object.keys(Languages).map(key => Languages[key])
export const LOCALE_CACHE_KEY = 'mangoswap_language'
