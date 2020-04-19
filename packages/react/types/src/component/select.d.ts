import { Component, CSSProperties, KeyboardEvent } from 'react'
import { CommonListProps } from './list/base'

interface SelectProps<T> {
  data: SelectDataOptions<T>[]
  value: T
  onChange(value: T): void
  disabled?: boolean
  listProps?: CommonListProps<T>
  canShowClose?: boolean
  clean?: boolean
  className?: string
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  style?: CSSProperties
  onKeyDown?(event: KeyboardEvent): void
}

interface SelectDataOptions<T> {
  text: string
  value: T
  disabled?: boolean
}

interface SelectState {
  willActiveIndex: number
}

declare class Select<P> extends Component<SelectProps<P>, SelectState> {
  static defaultProps: {
    canShowClose: boolean
    onKeyDown(): void
  }

  static displayName: string

  readonly state: SelectState

  public apiDoFocus(): void
  public apiDoSelectWillActive(): void
}
export default Select
export { SelectProps, SelectDataOptions }
