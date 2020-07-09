import React, { Component, HTMLAttributes } from 'react'
import Big from 'big.js'
import eventBus from './event_bus'
import { Storage } from '../storage'
import { symbolKey, unitKey } from './constant'

interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
  /* 保留几位小数 */
  precision?: number
  /* 是否使用千分符 */
  useGrouping?: boolean
  /* 货币符号缩放大小 */
  currencyScale?: number
  /* 保留小数点后无效的零 */
  keepZero?: boolean
  isFenUnit?: boolean
  feeType?: string
}

interface CurrencyListOptions {
  symbol: string
  type: string
  unit: string
}

let currencyList: CurrencyListOptions[] = []

function getCurrentFromType(type: string): CurrencyListOptions | undefined {
  return currencyList.find((value) => value.type === type)
}

const symbol = Storage.get(symbolKey) ?? '¥'
const unit = Storage.get(unitKey) ?? '元'

class Price extends Component<PriceProps> {
  /**
   * 设置符号列表
   */
  static setCurrencyList(list: CurrencyListOptions[]): void {
    if (!list || !list.length) {
      return
    }
    currencyList = list
  }

  /**
   * 设置符号
   */
  static setCurrency(_symbol: string): void {
    if (!_symbol || _symbol === symbol) {
      return
    }
    Storage.set(symbolKey, _symbol)
    eventBus.dispatch('REACT_GM_UPDATE_PRICE')
  }

  /**
   * 获取符号
   */
  static getCurrency(type = ''): string {
    const current = type ? getCurrentFromType(type) : null
    return current ? current.symbol : (symbol as string)
  }

  static setUnit(_unit: string): void {
    if (!_unit || _unit === unit) {
      return
    }
    Storage.set(unitKey, _unit)
  }

  static getUnit(type = ''): string {
    const current = type ? getCurrentFromType(type) : null
    return current ? current.unit : (unit as string)
  }

  static defaultProps = {
    precision: 2,
    useGrouping: true,
    currencyScale: 0.85,
    keepZero: true,
    feeType: '',
  }

  componentDidMount() {
    eventBus.add('REACT_GM_UPDATE_PRICE', this._rerender)
  }

  componentWillUnmount() {
    eventBus.remove('REACT_GM_UPDATE_PRICE', this._rerender)
  }

  private _rerender = (): void => {
    this.forceUpdate()
  }

  private _formatValue = (
    value: number,
    precision: number,
    keepZero: boolean,
    isFenUnit: boolean
  ): string => {
    const divRatio = isFenUnit ? 100 : 1
    const result = Big(Math.abs(value)).div(divRatio).toFixed(precision)
    return keepZero ? result : `${parseFloat(result)}`
  }

  /**
   * 增加千分符
   */
  private _addComma = (useGrouping: boolean, num: string): string => {
    if (!useGrouping) {
      return num
    }
    return num.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
  }

  render() {
    const {
      value,
      useGrouping,
      precision,
      currencyScale,
      keepZero,
      isFenUnit,
      feeType,
      ...rest
    } = this.props
    const current = getCurrentFromType(feeType!)

    return (
      <span {...rest}>
        {value < 0 ? '-' : ''}
        <span style={{ fontSize: `${currencyScale! > 1 ? '1' : currencyScale}em` }}>
          {current ? current.symbol : symbol}
        </span>
        {this._addComma(
          !!useGrouping,
          this._formatValue(value, precision!, !!keepZero, !!isFenUnit)
        )}
      </span>
    )
  }
}

export default Price
export type { PriceProps, CurrencyListOptions }
