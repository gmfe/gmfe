import { Component, CSSProperties } from 'react'

export interface CheckboxGroupProps<P> {
  name: string
  value: P[]
  onChange?(value: P[]): void
  inline?: boolean
  block?: boolean
  col?: number
  className?: string
  style?: CSSProperties
}

declare class CheckboxGroup<T> extends Component<CheckboxGroup<T>, void> {
  static defaultProps: {
    onChange(value: unknown[]): void
  }
}
export default CheckboxGroup
