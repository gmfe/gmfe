import { CSSProperties, PropsWithChildren, ReactElement, UIEvent } from 'react'
import { Column } from 'react-table'

export interface TableXProps<Original extends { [key: string]: unknown }> {
  columns: Column<Original>[]
  data: Original[]
  loading?: boolean
  /* 由其他 hoc 传下来 */
  keyField?: string
  /* table是否平铺 */
  tiled?: boolean
  /* 当前行是否disable */
  isTrDisable?(value: Original): boolean
  /* 当前行是否高亮 */
  isTrHighlight?(value: Original): boolean
  onScroll?(event: UIEvent<HTMLDivElement>): void
  className?: string
  style?: CSSProperties
}

declare const TableX: <P extends { [key: string]: unknown }>(
  props: PropsWithChildren<TableXProps<P>>
) => ReactElement
export default TableX
