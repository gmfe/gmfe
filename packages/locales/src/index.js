/* 此文件由脚本自动生成 */
import lng1 from './lng/zh.json'
import lng2 from './lng/zh-HK.json'
import lng3 from './lng/en.json'
import lng4 from './lng/th.json'

const LOCALES_LNG = '_gmfe_locales_lng_'
const moduleMap = {
  zh: lng1,
  'zh-HK': lng2,
  en: lng3,
  th: lng4
}
let _language = window.localStorage.getItem(LOCALES_LNG) || 'zh'

const setLocaleAndStorage = lng => {
  setLocale(lng)
  window.localStorage.setItem(LOCALES_LNG, lng)
}

const setLocale = lng => {
  _language = lng
}

const getLocale = text => {
  const languageMap = moduleMap[_language] || moduleMap.zh
  let result = languageMap[text]

  if (!result) {
    result = text.split('__').pop()
  }

  return result
}

export { getLocale, setLocale, setLocaleAndStorage }
