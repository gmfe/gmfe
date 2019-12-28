import { setLocale } from '../packages/locales/src'

let lng = localStorage.getItem('_react-gm_lng')
lng = JSON.parse(lng)
console.log('lng', lng)
setLocale(lng)
