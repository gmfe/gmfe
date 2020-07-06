import { Column, ColumnInstance, Row } from 'react-table'
import { HTMLAttributes, MouseEvent, ReactNode, RefObject } from 'react'
import { VariableSizeList } from 'react-window'

type TableXColumn<Original extends object> = Column<Original> & {
  show?: boolean
  fixed?: 'left' | 'right'
  [key: string]: any
}

interface TableXColumnInstance<Original extends object> extends ColumnInstance<Original> {
  [key: string]: any
}

type TableXHTMLAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

interface TableXProps<Original extends object> extends TableXHTMLAttributes {
  columns: TableXColumn<Original>[]
  data: Original[]
  loading?: boolean
  SubComponent?(row: Row<Original>): ReactNode
  /* 目前由 HOC 透传下来 */
  keyField?: keyof Original
  /* table 是否平铺，准确意思应该是是否有边框 */
  tiled?: boolean
  /* 当前行禁用 */
  isTrDisable?(original: Original, index: number): boolean
  isTrHighlight?(original: Original, index: number): boolean
}

interface TableXVirtualizedProps<Original extends object> extends TableXProps<Original> {
  /* 虚拟滚动视口高度 */
  virtualizedHeight: number
  /* 虚拟滚动行高 */
  virtualizedItemSize: number | ((index: number) => number)
  refVirtualized: RefObject<VariableSizeList>
}

type TableXSortType = 'desc' | 'asc' | null
type TableXBatchActionType = 'delete' | 'edit' | 'business'

interface TableXBatchActionOptions {
  show?: boolean
  dataId?: string | number
  onClick?(event: MouseEvent): void
  name: string
  type: TableXBatchActionType
}

export {
  TableXColumn,
  TableXColumnInstance,
  TableXProps,
  TableXVirtualizedProps,
  TableXSortType,
  TableXBatchActionType,
  TableXBatchActionOptions,
}
