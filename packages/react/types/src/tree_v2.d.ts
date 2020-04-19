import { CSSProperties, FC, ReactNode } from 'react'

export interface TreeV2DataOptions<T> {
  value: T
  name: string
  disabled?: boolean
  children?: TreeV2DataOptions<T>[]
}

export interface TreeV2Props<T> {
  list: TreeV2DataOptions<T>[]
  selected: T[]
  onSelectValues(selected: T[]): void
  onActiveValues?(active: T): void
  activeValue?: T
  title?: string

  withFilter?: ((value: TreeV2DataOptions<T>) => boolean) | false
  renderLeafItem?(value: TreeV2DataOptions<T>): ReactNode
  renderGroupItem?(value: TreeV2DataOptions<T>): ReactNode
  placeholder?: string
  showAllCheck?: boolean
  indeterminateList?: T[]
  withFindFilter?:
    | ((
        list: TreeV2DataOptions<T>[],
        searchQuery: string
      ) => TreeV2DataOptions<T>)
    | false
  findPlaceholder?: string
  className?: string
  style?: CSSProperties
}

declare const TreeV2: FC<TreeV2Props<any>>
export default TreeV2
