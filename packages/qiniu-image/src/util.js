const config = {
  uploadUrl: 'https://upload-z2.qiniup.com/',
  domain: 'https://image.document.guanmai.cn',
  tokenUrl: '',
  timeout: 24 * 3600 * 1000 // 24 个小时
}

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

async function getToken() {
  // 留 2h buffer
  if (_token && new Date() - _cacheTime < config.timeout - 2 * 3600 * 1000) {
    return _token
  }

  const res = await window.fetch('/gm_wheat/qiniu_token', {
    headers: { 'X-Guanmai-Client': 'GmStation' }
  })

  if (res.ok) {
    const json = await res.json()
    _token = json.data
  } else {
    throw new Error(`error ${res.status} ${res.statusText}`)
  }
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

export { getUploadImageName, getToken, request, urlSafeBase64Encode, config }
