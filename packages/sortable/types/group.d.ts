import { PropsWithChildren, ReactElement } from 'react'
import { SortableCommonProps, SortableDataOptions } from './sortable'

interface GroupSortableProps<P> extends SortableCommonProps<P> {
  data: SortableDataOptions<P>[][]
  onChange(data: Array<SortableDataOptions<P> | SortableDataOptions<P>[]>): void
}

declare const GroupSortable: <P>(
  props: PropsWithChildren<GroupSortableProps<P>>
) => ReactElement
export default GroupSortable
