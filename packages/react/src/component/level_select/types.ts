import { ReactNode, KeyboardEvent } from 'react'

interface LevelSelectDataOptions<V> {
  value: V
  text: string
  children?: LevelSelectDataOptions<V>[]
  disabled?: boolean
}

interface LevelSelectProps<V> {
  titles?: string[]
  data: LevelSelectDataOptions<V>[]
  selected: V[]
  onSelect(selected: V[]): void
  disabled?: boolean
  renderSelected(selected: LevelSelectDataOptions<V>[]): ReactNode
  /**
   * @todo 只能选叶子节点
   */
  onlySelectLeaf?: boolean
  popoverType: 'focus' | 'realFocus'
  right?: boolean
  onKeyDown?(event: KeyboardEvent): void
}

export type { LevelSelectDataOptions, LevelSelectProps }
