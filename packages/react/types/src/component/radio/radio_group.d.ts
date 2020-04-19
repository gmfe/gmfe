import { Component, CSSProperties } from 'react'

export interface RadioGroupProps<R> {
  name: string
  value?: R
  onChange?(value: R): void
  inline?: boolean
  className?: string
  style?: CSSProperties
}

declare class RadioGroup<P> extends Component<RadioGroupProps<P>, void> {
  static defaultProps: {
    onChange(): void
  }
}
export default RadioGroup
