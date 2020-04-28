import { FC, HTMLAttributes, ReactNode } from 'react'
import { Options } from 'sortablejs'

interface SortableDataOptions<T> {
  value: T
  text: string
  [key: string]: any
}

interface SortableCommonProps<P> {
  groupValues?: P[]
  renderItem?: (value: SortableDataOptions<P>) => ReactNode
  itemProps?: HTMLAttributes<HTMLDivElement>
  tag?: string
  options?: Options
}

interface SortableProps<P> extends SortableCommonProps<P> {
  data: SortableDataOptions<P>[]
  onChange?(data: SortableDataOptions<P>[]): void
}

declare const SortableProps: FC<SortableProps<any>>
export default SortableProps
export { SortableCommonProps, SortableDataOptions }
