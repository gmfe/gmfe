import { FC, ReactNode } from 'react'
import { Column } from 'react-table'

interface DiyTableColumns {
  diyItemText: ReactNode
  diyGroupName: ReactNode
  diyEnable?: boolean
  show?: boolean
  [key: string]: any
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

interface DiyTableXProps<Original extends DiyTableColumns> {
  id: string
  diyGroupSorting: string[]
  columns: Column<Original>
}

declare function diyTableXHOC<
  Original extends DiyTableColumns,
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props & DiyTableXProps<Original>>
export default diyTableXHOC
