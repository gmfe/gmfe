import { ReactNode, KeyboardEvent, CSSProperties, Component } from 'react'

export interface SelectionProps<T> {
  selected?: SelectionSelectedOptions<T>
  onSelect(selected: SelectionSelectedOptions<T>): void
  disabled?: boolean
  renderSelected?(value: SelectionSelectedOptions<T>): ReactNode
  placeholder?: string
  /* 代替默认的Icon */
  funIcon?: ReactNode
  /* 干净模式 */
  clean?: boolean
  /* 禁用清除 */
  disabledClose?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
  /* 给Select定制的 */
  isForSelect?: boolean
}

interface SelectionSelectedOptions<T> {
  value: T
  text: string
  disabled?: boolean
}

declare class Selection<P> extends Component<SelectionProps<P>, void> {
  static defaultProps: {
    renderSelected<P>(value: SelectionSelectedOptions<P>): ReactNode
  }

  public apiDoFocus(): void
}
export default Selection
