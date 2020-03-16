import _ from 'lodash'
import { urlSafeBase64Encode } from './util'

// 说明见 https://developer.qiniu.com/dora/api/3683/img-directions-for-use

// 不知道取什么名字
function getFunStr(url, fun, option) {
  let funStr = fun

  const { mode, ...rest } = option

  // mode 可能不存在，mode 可能为 0，用 undefined
  if (mode !== undefined) {
    funStr += `/${encodeURIComponent(mode)}`
  }

  for (const key in rest) {
    if (option[key] === true) {
      // 案例 auto-orient or
      funStr += `/${key}`
    } else {
      funStr += `/${key}/${encodeURIComponent(option[key])}`
    }
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

function imageView2(url, option) {
  return getFunStr(url, 'imageView2', option)
}

function imageMogr2(url, option) {
  return getFunStr(url, 'imageMor2', option)
}

function watermark(url, option) {
  if (option.image) {
    option = {
      ...option,
      image: urlSafeBase64Encode(option.image)
    }
  }
  return getFunStr(url, 'watermark', option)
}

/*
  混合水印 
  http://7xlv47.com0.z0.glb.clouddn.com/baidi.png?
    watermark/3
    /image/aHR0cDovLzd4bHY0Ny5jb20wLnowLmdsYi5jbG91ZGRuLmNvbS94aWFvamkucG5n/gravity/North/dy/-10/dx/0
    /text/5ZCD6L-H54yr5bGx546L77yM5YW25LuW5qa06I6y55qG6Lev5Lq6/gravity/SouthWest/dx/10/dy/180/fontsize/500
    /text/5LuF6ZmQN-WkqSAgMjAxOS4wNC4wMS0yMDE5LjA0LjA3/gravity/SouthWest/dx/30/dy/130/fontsize/300
    /image/aHR0cDovLzd4bHY0Ny5jb20wLnowLmdsYi5jbG91ZGRuLmNvbS9xdWFuLnBuZw==/gravity/SouthWest/dx/80/dy/30
    /image/aHR0cDovLzd4bHY0Ny5jb20wLnowLmdsYi5jbG91ZGRuLmNvbS_kuoznu7TnoIEucG5n/gravity/SouthEast/dx/10/dy/30
    /text/5omr56CB6aKG5Y-W5LyY5oOg5Yi4/gravity/SouthEast/dx/50/dy/10/fontsize/300/fill/UmVk/fwef
*/
function mixedWatermark(url, options) {
  const query = _.reduce(
    options,
    (s, option) => {
      delete option.mode
      option = {
        ...option,
        image: urlSafeBase64Encode(option.image)
      }
      return s + getFunStr('', '', option)
    },
    ''
  )
  return `${url}?watermark/3${query}`
}

// arr [{fun: 'imageView2', option: {}}]
function pipeline(url, arr) {
  const funStr = arr
    .map(item => getFunStr(null, item.fun, item.option))
    .join('|')

  return `${url}?${funStr}`
}

export {
  imageSlim,
  imageView2,
  imageMogr2,
  watermark,
  mixedWatermark,
  pipeline
}
