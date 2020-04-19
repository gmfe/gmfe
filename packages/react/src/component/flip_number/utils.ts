import _ from 'lodash'
import { is } from '@gm-common/tool'

function formatNum(number: number, decimals: number, useGrouping: boolean) {
  const num = Big(number).toFixed(decimals)
  return useGrouping
    ? num.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
    : num
}

function getNumLength(str1: string, str2: string): number {
  return Math.max(str1.length, str2.length)
}

function filterForNum(strArr: any[]): number[] {
  return _.filter(strArr, (item) => is.number(item)) as number[]
}

interface GetRawArray {
  (numStr: string, length: number): GetRawArrayReturns
}

interface GetRawArrayReturns {
  rawList: string[]
  symbolList: { symbol: string; position: number }[]
}

/**
 * @description 根据字符串返回相应的反转字符串数组以及符号数组
 * @param numStr 需要转换成数组的数字字符串
 * @param length 需要转换的长度
 */
const getRawArray: GetRawArray = function (numStr, length) {
  const alignNum = (str: string, len: number): string => {
    return str.length < len ? alignNum(`0${str}`, len) : str
  }
  const symbolList: { symbol: string; position: number }[] = []
  const rawStrArr = alignNum(numStr, length).split('')
  _.forEach(rawStrArr, (item, index) => {
    if (item === ',' || item === '.') {
      symbolList.push({
        symbol: item,
        position: index,
      })
    }
  })
  const rawList = filterForNum(rawStrArr)
    .map((item) => `${item}`)
    .reverse()
  _.forEach(symbolList, (item) => {
    rawList.splice(item.position, 0, item.symbol)
  })
  return { rawList, symbolList }
}

export { formatNum, filterForNum, getNumLength, getRawArray }
export type { GetRawArray, GetRawArrayReturns }
