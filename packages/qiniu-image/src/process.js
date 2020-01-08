import { urlSafeBase64Encode } from './util'

// 说明见 https://developer.qiniu.com/dora/api/3683/img-directions-for-use

// 不知道取什么名字
function getFunStr(url, fun, options) {
  let funStr = fun

  const { mode, ...rest } = options

  // mode 可能不存在，mode 可能为 0，用 undefined
  if (mode !== undefined) {
    funStr += `/${encodeURIComponent(mode)}`
  }

  for (const key in rest) {
    if (key)
      if (options[key] === true) {
        // 案例 auto-orient or
        funStr += `/${key}`
      }
    funStr += `/${key}/${encodeURIComponent(options[key])}`
  }

  if (url) {
    return `${url}?${funStr}`
  } else {
    return `${funStr}`
  }
}

// 应该在融合 cdn 开启，如果是，这里没有意义了
function imageSlim(url) {
  return getFunStr(url, 'imageslim', {})
}

function imageView2(url, options) {
  return getFunStr(url, 'imageView2', options)
}

function imageMogr2(url, options) {
  return getFunStr(url, 'imageMor2', options)
}

function watermark(url, options) {
  if (options.image) {
    options = {
      ...options,
      image: urlSafeBase64Encode(options.image)
    }
  }
  return getFunStr(url, 'watermark', options)
}

// arr [{fun: 'imageView2', options: {}}]
function pipeline(url, arr) {
  const funStr = arr
    .map(item => getFunStr(null, item.fun, item.options))
    .join('|')

  return `${url}?${funStr}`
}

export { imageSlim, imageView2, imageMogr2, watermark, pipeline }
