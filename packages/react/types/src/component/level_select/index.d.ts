import { ReactNode, KeyboardEvent, Component } from 'react'

interface LevelSelectProps<T> {
  titles?: string[]
  data: LevelSelectDataOptions<T>
  selected: T[]
  onSelect(selected: T[]): void
  disabled?: boolean
  renderSelected?(value: LevelSelectDataOptions<T>): ReactNode
  onlySelectLeaf?: boolean
  popoverType?: 'focus' | 'realFocus'
  right?: boolean
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

interface LevelSelectDataOptions<T> {
  value: T
  text: string
  children?: LevelSelectDataOptions<T>[]
  disabled?: boolean
}

interface LevelSelectState<T> {
  willActiveSelected: T[]
  search: string
}

declare class LevelSelect<T> extends Component<
  LevelSelectProps<T>,
  LevelSelectState<T>
> {
  static defaultProps: {
    renderSelected(value: LevelSelectDataOptions<any>): ReactNode
    onKeyDown(event: KeyboardEvent<HTMLDivElement>): void
  }

  readonly state: LevelSelectState<T>

  apiDoFocus
  apiDoSelectWillActive
}

export default LevelSelect
export { LevelSelectProps, LevelSelectDataOptions }
