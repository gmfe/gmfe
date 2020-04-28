import Sortable, { Options } from 'sortablejs'
import { CSSProperties, FC } from 'react'

interface SortableBaseProps<P> {
  options?: Options
  onChange?(
    list: P[],
    sortable: Sortable,
    event: CustomEvent<HTMLDivElement>
  ): void
  disabled?: boolean
  tag?: string
  style?: CSSProperties
}

declare const SortableBase: FC<SortableBaseProps<any>>
export default SortableBase
