import _ from 'lodash'
import { is } from '@gm-common/tool'
import Big from 'big.js'

// 不能用Number.toLocaleString, 在oppo微信会报错!!
function formatNum(number, decimals, useGroup) {
  const num = Big(number).toFixed(decimals)

  return useGroup
    ? num
        .toString()
        .replace(/^\d+/g, m => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
    : num
}

function getNumLength(str1, str2) {
  return Math.max(str1.length, str2.length)
}

function filterForNum(strArr) {
  return _.filter(strArr, item => is.number(item))
}

/**
 * @description 根据字符串返回相应的反转字符数组以及符号数组
 * @augments numStr 需要转换成数组的数字字符串
 * @augments length 需要转换成的长度
 */
function getRawArray(numStr, length) {
  const alignNum = (str, len) => {
    return str.length < len ? alignNum(`0${str}`, len) : str
  }
  const symbolList = []
  const rawStrArr = alignNum(numStr, length).split('')
  _.forEach(rawStrArr, (item, index) => {
    if (item === ',' || item === '.') {
      symbolList.push({
        symbol: item,
        position: index
      })
    }
  })
  const rawList = filterForNum(rawStrArr).reverse()
  _.forEach(symbolList, item => {
    rawList.splice(item.position, 0, item.symbol)
  })
  return { rawList, symbolList }
}

export { formatNum, filterForNum, getNumLength, getRawArray }
