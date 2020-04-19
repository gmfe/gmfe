import { Component, CSSProperties } from 'react'

export interface InputNumberV2Props {
  max?: number
  min?: number
  value?: number
  placeholder?: string
  onChange(value: number): void
  precision?: number
  className?: string
  style?: CSSProperties
}

interface InputNumberV2State {
  value: number
}

declare class InputNumberV2 extends Component<
  InputNumberV2,
  InputNumberV2State
> {
  static defaultProps: {
    value: number
    precision: number
  }

  readonly state: InputNumberV2State

  public apiDoFocus(): void
}
export default InputNumberV2
