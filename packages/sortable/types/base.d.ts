import Sortable, { Options } from 'sortablejs'
import { CSSProperties, PropsWithChildren, ReactElement } from 'react'

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
declare const SortableBase: <P>(
  props: PropsWithChildren<SortableBaseProps<P>>
) => ReactElement
export default SortableBase
