import { ReactNode } from 'react'
import { MoreSelectCommonProps, MoreSelectNormalDataOptions } from '../more_select'

interface TableSelectColumnOptions<T = any> {
  id?: string
  accessor?: string | ((data: MoreSelectNormalDataOptions<T>) => ReactNode)
  width: number
  Header: ReactNode
  Cell?: (cellProps: { original: MoreSelectNormalDataOptions<T>; index: number }) => ReactNode
}

interface TableSelectProps<T = any>
  extends Omit<MoreSelectCommonProps<T>, 'isGroupList' | 'multiple'> {
  data: MoreSelectNormalDataOptions<T>[]
  selected: MoreSelectNormalDataOptions<T>
  onSelect(selected: MoreSelectNormalDataOptions<T>): void
  columns: TableSelectColumnOptions<T>[]
}

export type { TableSelectProps, TableSelectColumnOptions }
