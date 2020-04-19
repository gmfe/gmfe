import { CSSProperties, FC, ReactNode } from 'react'
import { TreeV2DataOptions } from './tree_v2'

export interface TransferV2Props<T> {
  list: TreeV2DataOptions<T>
  selectedValues: T[]
  onSelectValues(selected: T[]): void
  rightTree?: boolean
  className?: string
  style?: CSSProperties
  leftTitle?: string
  leftPlaceholder?: string
  leftWithFilter?:
    | ((
        list: TreeV2DataOptions<T>[],
        searchQuery: string
      ) => TreeV2DataOptions<T>)
    | false
  leftRenderLeafItem?(value: TreeV2DataOptions<T>): ReactNode
  leftRenderGroupItem?(value: TreeV2DataOptions<T>): ReactNode
  leftStyle?: CSSProperties
  leftClassName?: string
  rightTitle?: string
  rightPlaceholder?: string
  rightWithFilter?:
    | ((
        list: TreeV2DataOptions<T>[],
        searchQuery: string
      ) => TreeV2DataOptions<T>)
    | false
  rightRenderLeafItem?(value: TreeV2DataOptions<T>): ReactNode
  rightRenderGroupItem?(value: TreeV2DataOptions<T>): ReactNode
  rightStyle?: CSSProperties
  rightClassName?: string
}
declare const TransferV2: FC<TransferV2Props<unknown>>
export default TransferV2
