import { ComponentClass, ComponentType } from 'react'
import { BaseTableColumns } from '../base'

interface DiyTableColumns<Original extends { [key: string]: unknown }>
  extends BaseTableColumns<Original> {
  diySortNumber: number
  diyEnable?: boolean
  diyGroupName: string
}

interface DiyTableProps<Original extends { [key: string]: unknown }> {
  columns: DiyTableColumns<Original>
  id: string
  diyGroupSorting: string[]
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function diyTableHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(
  Component: ComponentType<Props>
): ComponentClass<Props & DiyTableProps<Original>>
export default diyTableHOC
