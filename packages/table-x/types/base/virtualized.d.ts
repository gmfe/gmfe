import { PropsWithChildren, ReactElement } from 'react'
import { VariableSizeList } from 'react-window'
import { TableXProps } from './base'

interface TableXVirtualizedProps<Original extends { [key: string]: any }>
  extends TableXProps<Original> {
  virtualizedHeight: number
  virtualizedItemSize: number | ((index: number) => number)
  refVirtualized: VariableSizeList | ((ref: VariableSizeList) => void)
}

declare const TableXVirtualized: <P extends {
  [key: string]: any
}>(
  props: PropsWithChildren<TableXVirtualizedProps<P>>
) => ReactElement
export default TableXVirtualized
