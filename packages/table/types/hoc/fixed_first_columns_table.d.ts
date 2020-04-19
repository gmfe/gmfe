import { ComponentType, FC } from 'react'
import { FixedColumnsTableProps } from './fixed_columns_table'

interface FixedFirstColumnsTableProps<
  Original extends { [key: string]: unknown }
> extends FixedColumnsTableProps<Original> {
  firstColumnWidth?: number
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function fixedFirstColumnsTableHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(
  Component: ComponentType<Props>
): FC<Props & FixedFirstColumnsTableProps<Original>>
export default fixedFirstColumnsTableHOC
