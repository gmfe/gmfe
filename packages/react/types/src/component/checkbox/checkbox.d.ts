import { ChangeEvent, Component, CSSProperties } from 'react'

export interface CheckboxProps<P> {
  checked?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement>): void
  value?: P
  disabled?: boolean
  indeterminate?: boolean
  inline?: boolean
  block?: boolean
  col?: number
  name?: string
  className?: string
  style?: CSSProperties
}

declare class Checkbox<C> extends Component<CheckboxProps<C>, void> {
  static defaultProps: {
    onChange(event: ChangeEvent<HTMLInputElement>): void
  }
}

export default Checkbox
