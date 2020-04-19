import { Component } from 'react'

interface PriceProps {
  value: number
  /* 保留几位小数，默认是 2 位 */
  precision?: number
  /* 是否使用千分符 */
  useGrouping?: boolean
  /* 货币符号的缩放大小 */
  currencyScale?: number
  /* 是否保留小数点后无效的零 */
  keepZero?: boolean
  isFenUnit?: boolean
  /* 多币种 */
  feeType?: string
}

interface CurrencyOptions {
  /* 符号 */
  symbol: string
  /* 英文 */
  type: string
  /* 中文 */
  unit: string
}

declare class Price extends Component<PriceProps, void> {
  static defaultProps: {
    precision: number
    useGrouping: boolean
    currencyScale: number
    keepZero: boolean
    isFenUnit: boolean
    feeType: string
  }

  static setCurrencyList(list: CurrencyOptions): void
  static setCurrency(symbol: string): void
  static getCurrency(type: string): string
  static setUnit(unit: string): void
  static getUnit(type: string): string
}
export default Price
export { PriceProps, CurrencyOptions }
