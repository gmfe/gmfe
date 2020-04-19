import {
  CSSProperties,
  ReactNode,
  KeyboardEvent,
  ForwardRefExoticComponent,
} from 'react'
import MoreSelect from './more_select'

export interface TableSelectProps<T extends { [key: string]: any }> {
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

declare const TableSelect: ForwardRefExoticComponent<
  TableSelectProps<any> & MoreSelect<any>
>
export default TableSelect
