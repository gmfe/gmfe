import { CSSProperties, ReactNode } from 'react'

interface TreeV2DataOptions<T> {
  value: T
  text: string
  disabled?: boolean
  children?: TreeV2DataOptions<T>[]
}

interface TreeV2Props<T> {
  /* 树状列表 */
  list: TreeV2DataOptions<T>[]
  /* 已勾选的数据 */
  selectedValues: T[]
  /* 勾选回调 */
  onSelectValues(selectedValues: T[]): void
  /* 点击选中的数据 */
  activeValue?: T
  /* 点击选中回调 */
  onActiveValues?(activeValues: T[]): void
  title?: string
  withFilter?: ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[]) | boolean
  renderLeafItem?(item: TreeV2DataOptions<T>): ReactNode
  renderGroupItem?(item: TreeV2DataOptions<T>): ReactNode
  placeholder?: string
  /* 是否显示全选 */
  showAllCheck?: boolean
  /* 半选 value 列表 */
  indeterminateList?: T[]
  withFindFilter?: false | ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[])
  findPlaceholder?: string
  className?: string
  style?: CSSProperties
}

export type { TreeV2DataOptions, TreeV2Props }
