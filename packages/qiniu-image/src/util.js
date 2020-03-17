import { Request } from 'gm-util'

const getTokenDefault = () =>
  Request('/gm_wheat/qiniu_token')
    .get()
    .then(json => {
      if (!json.code) {
        return json.data
      } else {
        throw new Error(`error ${json.msg}`)
      }
    })

function getUploadImageName(blob) {
  const { type } = blob
  const suf = type.split('/').pop()

  return `${+new Date()}-${(Math.random() + '').slice(2)}.${suf}`
}

// token 过期处理
// 存储到 localStorage
const TOKEN_KEY = '_qiniu_token'
const TOKEN_KEY_CACHE_TIME = '_qiniu_token_cache_time'
let _token = window.localStorage.getItem(TOKEN_KEY) || null
let _cacheTime = window.localStorage.getItem(TOKEN_KEY_CACHE_TIME) || null
if (_cacheTime) {
  _cacheTime = new Date(_cacheTime)
}

async function getToken(options) {
  // 留 2h buffer
  if (_token && new Date() - _cacheTime < options.timeout - 2 * 3600 * 1000) {
    return _token
  }
  _token = await options.getToken()
  _cacheTime = new Date()

  window.localStorage.setItem(TOKEN_KEY, _token)
  window.localStorage.setItem(TOKEN_KEY_CACHE_TIME, _cacheTime)

  return _token
}

async function request(url, data) {
  const formData = new window.FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }

  let json
  const res = await window.fetch(url, {
    method: 'post',
    body: formData
  })

  if (res.ok) {
    json = await res.json()
  } else {
    throw new Error(`error ${res.status} ${res.statusText}`)
  }

  return json
}

// https://developer.qiniu.com/kodo/manual/1231/appendix#urlsafe-base64
function urlSafeBase64Encode(v) {
  v = window.btoa(v)
  return v.replace(/\//g, '_').replace(/\+/g, '-')
}

function getOptionWithSafeBase64Encode(option) {
  let opt = { ...option }
  if (opt.image) {
    opt = {
      ...opt,
      image: urlSafeBase64Encode(opt.image)
    }
  }
  if (opt.text) {
    opt = {
      ...opt,
      text: urlSafeBase64Encode(opt.text)
    }
  }
  return opt
}

export {
  getOptionWithSafeBase64Encode,
  getUploadImageName,
  getToken,
  request,
  urlSafeBase64Encode,
  getTokenDefault
}
