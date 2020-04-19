import { PropsWithChildren, ReactElement } from 'react'
import { VariableSizeList } from 'react-window'
import { TableXProps } from './base'

interface TableXVirtualizedProps<Original extends { [key: string]: unknown }>
  extends TableXProps<Original> {
  virtualizedHeight: number
  virtualizedItemSize: number | ((index: number) => number)
  refVirtualized: VariableSizeList | ((ref: VariableSizeList) => void)
}

declare const TableXVirtualized: <P extends {
  [key: string]: unknown
}>(
  props: PropsWithChildren<TableXVirtualizedProps<P>>
) => ReactElement
export default TableXVirtualized
