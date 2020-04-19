import { ComponentClass, ComponentType } from 'react'
import { BaseTableColumns } from '../base'

interface FixedTableColumns<Original extends { [key: string]: any }>
  extends BaseTableColumns<Original> {
  fixed?: 'left' | 'right'
}

interface FixedColumnsTableProps<Original extends { [key: string]: any }> {
  columns: FixedTableColumns<Original>
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function fixedColumnsTableHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): ComponentClass<Props & FixedColumnsTableProps<Original>>
export default fixedColumnsTableHOC
export { FixedColumnsTableProps, FixedTableColumns }
