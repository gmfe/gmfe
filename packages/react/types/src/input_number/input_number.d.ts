import { Component, CSSProperties } from 'react'

export interface InputNumberProps {
  value?: number | string
  max?: number
  min?: number
  precision?: number
  onChange(value: number): void
  placeholder?: string
  minus?: boolean
  className?: string
  style?: CSSProperties
  disabled?: boolean
}

declare class InputNumber extends Component<InputNumberProps, void> {
  static defaultProps: {
    precision: number
    minus: boolean
  }
}
export default InputNumber
