import { ComponentType, FC } from 'react'

interface SortableTableXProps<Original extends { [key: string]: unknown }> {
  onSortChange(data: Original[]): void
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function sortableTableX<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & SortableTableXProps<Original>>
export default sortableTableX
