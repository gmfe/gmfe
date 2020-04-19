import React, { ChangeEvent, Component, CSSProperties } from 'react'

export interface InputNumberProps {
  value?: number | string
  max?: number
  min?: number
  precision?: number
  onChange(value: number | string): void
  placeholder?: string
  minus?: boolean
  className?: string
  style?: CSSProperties
  disabled?: boolean
}

export default class InputNumber extends Component<InputNumberProps> {
  static defaultProps = {
    precision: 2,
  }

  static displayName = 'InputNumber'

  private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { max, min, precision, minus } = this.props
    const value = event.target.value.replace(/。/g, '.')
    let figure = value
    const reg = new RegExp(
      '(^[1-9]\\d*(\\.\\d{0,' +
        precision +
        '})?$)|(^0(\\.\\d{0,' +
        precision +
        '})?$)'
    )

    if (minus && value.indexOf('-') === 0) {
      // 去掉减号，然后去匹配正则
      figure = value.slice(1)
    }

    if (reg.test(figure) || figure === '' || /^0[1-9]/.test(value)) {
      const currentValue = Number(value)
      if (max !== undefined && currentValue > max) {
        this.props.onChange(max)
      } else if (min !== undefined && currentValue < min) {
        this.props.onChange(min)
      } else {
        // 如果第一个数字是0，第二个是1-9，则选取第二个数字
        this.props.onChange(/^0[1-9]/.test(value) ? value.slice(1) : value)
      }
    } else if (
      value.length < this.props.value!.toString().length &&
      reg.test(value)
    ) {
      // 有默认值，且不符合以上的规则，但是是一个删减字符的操作
      this.props.onChange(value)
    }
  }

  render() {
    const { precision, minus, ...rest } = this.props
    return <input {...rest} type='text' onChange={this._handleChange} />
  }
}
