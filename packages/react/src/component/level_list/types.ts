import { BaseListDataOptions } from '../list'
import { CSSProperties } from 'react'

interface LevelListDataOptions<V> extends BaseListDataOptions<V> {
  children?: LevelListDataOptions<V>[]
}

interface LevelListProps<V> {
  data: LevelListDataOptions<V>[]
  selected: V[]
  onSelect(selected: V[]): void
  willActiveSelected: V[]
  onWillActiveSelect(selected: V[]): void
  titles?: string[]
  /**
   * @todo 未完成
   */
  onlySelectLeaf?: boolean
  isReverse?: boolean
  className?: string
  style?: CSSProperties
  /* 内部用，暂时这么处理 */
  isForFunctionSet?: boolean
}

export type { LevelListDataOptions, LevelListProps }
