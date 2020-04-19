import { TreeV2DataOptions } from '../tree_v2'
import { CSSProperties, ReactNode } from 'react'
import { FlexProps } from '../flex'

export interface TransferV2Props<T> extends FlexProps {
  list: TreeV2DataOptions<T>[]
  selectedValues: T[]
  onSelectValues(selectedValues: T[]): void
  /* 右侧是否以树状结构展示 */
  rightTree?: boolean

  /* 左侧树 */
  /* 左侧树自定义筛选 */
  leftWithFilter?:
    | ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[])
    | boolean
  leftTitle?: string
  leftPlaceholder?: string
  /* 左侧自定义渲染叶子节点 */
  leftRenderLeafItem?(item: TreeV2DataOptions<T>): ReactNode
  /* 左侧自定义渲染分支节点 */
  leftRenderGroupItem?(item: TreeV2DataOptions<T>): ReactNode
  leftStyle?: CSSProperties
  leftClassName?: string

  /* 右侧树 */
  /* 右侧自定义筛选 */
  rightWithFilter?:
    | ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[])
    | boolean
  rightTitle?: string
  rightPlaceholder?: string
  /* 右侧自定义渲染叶子节点 */
  rightRenderLeafItem?(item: TreeV2DataOptions<T>): ReactNode
  /* 右侧自定义渲染分支节点 */
  rightRenderGroupItem?(item: TreeV2DataOptions<T>): ReactNode
  rightStyle?: CSSProperties
  rightClassName?: string
}
