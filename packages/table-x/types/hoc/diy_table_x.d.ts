import { FC, ReactNode } from 'react'
import { Column } from 'react-table'
import { TableXProps } from '../base/base'

interface DiyTableColumns {
  diyItemText: ReactNode
  diyGroupName: ReactNode
  diyEnable?: boolean
  show?: boolean
  [key: string]: any
}

interface DiyTableXProps<Original extends DiyTableColumns> {
  id: string
  diyGroupSorting: string[]
  columns: Column<Original>
}

declare function diyTableXHOC<Original extends DiyTableColumns>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & DiyTableXProps<Original>>
export default diyTableXHOC
