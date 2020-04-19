import Sortable, { Options, SortableEvent } from 'sortablejs'
import { ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react'

interface SortableBaseProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  options: Options
  onChange?(remoteItems: string[], sortable: Sortable, event: SortableEvent): void
  tag: ElementType
  disabled?: boolean
}

interface SortableDataOptions<T> {
  value: T
  text: string
  [key: string]: any
}

interface SortableCommonProps<T> extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * options.group 有值的时候要传。
   * 此时 data 是 group 集合数据，groupValues 是当前组件的数据
   */
  groupValues?: T[]
  renderItem?(value: SortableDataOptions<T>, index: number): ReactNode
  itemProps?: HTMLAttributes<HTMLDivElement>
  tag?: ElementType
  options?: Options
  disabled?: boolean
}

interface SortableProps<T> extends SortableCommonProps<T> {
  data: SortableDataOptions<T>[]
  onChange(data: SortableDataOptions<T>[]): void
}

interface GroupSortableProps<T> extends SortableCommonProps<T> {
  /* 二维数组 */
  data: SortableDataOptions<T>[][]
  onChange(data: SortableDataOptions<T>[][]): void
  children: (items: ReactElement<SortableProps<T>>[]) => ReactElement
}

export type { SortableBaseProps, SortableDataOptions, SortableProps, GroupSortableProps }
