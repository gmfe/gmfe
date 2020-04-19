import { Component, CSSProperties } from 'react'

interface LevelListProps<T> {
  data: LevelListDataOptions<T>
  selected: T[]
  onSelect(selected: T[]): void
  willActiveSelected: T[]
  onWillActiveSelect(selected: T[]): void
  titles?: string[]
  onlySelectLeaf?: boolean
  isReverse?: boolean
  className?: string
  style?: CSSProperties
  isForFunctionSet?: boolean
}

interface LevelListDataOptions<T> {
  value: T
  text: string
  children?: LevelListDataOptions<T>[]
  disabled?: boolean
}

declare class LevelList<T> extends Component<LevelListProps<T>, void> {}
export default LevelList
export { LevelListProps, LevelListDataOptions }
