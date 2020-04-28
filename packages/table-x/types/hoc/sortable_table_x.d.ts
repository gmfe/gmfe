import { FC } from 'react'
import { TableXProps } from '../base/base'

interface SortableTableXProps<Original extends { [key: string]: any }> {
  onSortChange(data: Original[]): void
}

declare function sortableTableX<Original extends { [key: string]: any }>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & SortableTableXProps<Original>>
export default sortableTableX
