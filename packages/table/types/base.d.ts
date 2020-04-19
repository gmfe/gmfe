import { Component, CSSProperties, ReactNode } from 'react'

interface BaseTableColumns<Original extends { [key: string]: any }> {
  Header:
    | ReactNode
    | ((row: { columns: BaseTableColumns<Original>; data: Original[] }) => ReactNode)
  id?: string
  accessor?: string | ((original: Original) => ReactNode)
  Cell?: (cellProps: {
    column: BaseTableColumns<Original>
    index: number
    original: Original
  }) => ReactNode
  show?: boolean
  width?: number
  minWidth?: number
  maxWidth?: number
  className?: string
  style?: CSSProperties
  headerClassName?: string
  headerStyle?: CSSProperties
  footerClassName?: string
  footerStyle?: CSSProperties
}

interface BaseTableProps<Original extends { [key: string]: any }> {
  loading?: boolean
  data: Original[]
  columns: BaseTableColumns<Original>
  className?: string
  style?: CSSProperties
  tiled?: boolean
  showPagination?: boolean
  defaultPageSize?: number
}

declare class BaseTable<Original extends { [key: string]: any }> extends Component<
  BaseTableProps<Original>,
  void
> {}
export default BaseTable
export { BaseTableProps, BaseTableColumns }
