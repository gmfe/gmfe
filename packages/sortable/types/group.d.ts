import { SortableCommonProps, SortableDataOptions } from './sortable'
import { FC } from 'react'

interface GroupSortableProps<P> extends SortableCommonProps<P> {
  data: SortableDataOptions<P>[][]
  onChange(data: Array<SortableDataOptions<P> | SortableDataOptions<P>[]>): void
}

declare const GroupSortable: FC<GroupSortableProps<any>>

export default GroupSortable
