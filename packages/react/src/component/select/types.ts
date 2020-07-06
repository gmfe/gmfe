import { ListProps } from '../list'
import { CSSProperties, KeyboardEvent } from 'react'

interface SelectDataOptions<V> {
  text: string
  value: V
  disabled?: boolean
}

interface SelectProps<V> {
  data: SelectDataOptions<V>[]
  value: V
  onChange(selected: V | null): void
  disabled?: boolean
  listProps?: ListProps<V>
  canShowClose?: boolean
  clean?: boolean
  className?: string
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  style?: CSSProperties
  onKeyDown?(event: KeyboardEvent): void
}

export { SelectDataOptions, SelectProps }
