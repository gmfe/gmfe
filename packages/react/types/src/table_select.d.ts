import {
  CSSProperties,
  ReactNode,
  KeyboardEvent,
  ReactElement,
  RefObject,
} from 'react'
import MoreSelect from './more_select'

export interface TableSelectProps<T extends { [key: string]: unknown }> {
  data: T[]
  selected?: T
  onSelect(selected: T): void
  columns: TableColumnOptions[]
  disabled?: boolean
  onSearch?(searchWord: string): void
  delay?: number
  searchPlaceholder?: string
  renderListFilter?(data: T[], searchValue: string): T[]
  renderFilterType?: 'default' | 'pinyin'
  placeholder?: string
  renderSelected?(value: T[]): ReactNode
  listHeight?: string
  popoverType?: 'focus' | 'realFocus'
  className?: string
  style?: CSSProperties
  popupClassName?: string
  isKeyboard?: boolean
  onKeyDown?(event: KeyboardEvent): void
}

interface TableColumnOptions {
  Header: ReactNode
  accessor: (() => ReactNode) | string
  Cell?: () => ReactNode
  width?: number
}

declare const TableSelect: <P extends { [key: string]: unknown }, R>(
  props: TableSelectProps<P>,
  ref: RefObject<MoreSelect<unknown>>
) => ReactElement
export default TableSelect
