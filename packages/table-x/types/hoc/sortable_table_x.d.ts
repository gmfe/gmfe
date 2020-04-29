import { FC } from 'react'

interface SortableTableXProps<Original extends { [key: string]: any }> {
  onSortChange(data: Original[]): void
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function sortableTableX<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props & SortableTableXProps<Original>>
export default sortableTableX
