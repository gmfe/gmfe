import { Component, ReactNode, KeyboardEvent } from 'react'
import { BaseMoreSelectCommonProps, BaseMoreSelectDataOptions } from './base'

interface MoreSelectDataOptions<T> {
  value: T
  text: string
  children?: MoreSelectDataOptions<T>[]
  disabled?: boolean
}

interface MoreSelectGroupDataOptions<T> {
  label: string
  children: MoreSelectDataOptions<T>[]
}

type MoreSelectData<T> =
  | MoreSelectDataOptions<T>
  | MoreSelectGroupDataOptions<T>

interface MoreSelectProps<T> extends BaseMoreSelectCommonProps<T> {
  data: MoreSelectData<T>
  selected?: MoreSelectDataOptions<T> | MoreSelectDataOptions<T>[]
  onSelect(
    selected: MoreSelectDataOptions<T> | MoreSelectDataOptions<T>[]
  ): void
}

declare class MoreSelect<P> extends Component<MoreSelectProps<P>, void> {
  static defaultProps: {
    renderSelected<T>(value: BaseMoreSelectDataOptions<T>): ReactNode
    delay: number
    renderListItem<T>(value: BaseMoreSelectDataOptions<T>): ReactNode
    listHeight: string
    renderListFilterType: 'default' | 'pinyin'
    popoverType: 'focus' | 'realFocus'
    onKeyDown(event: KeyboardEvent<HTMLDivElement>): void
  }

  public apiDoFocus(): void
  public apiDoSelectWillActive(): void
}
export default MoreSelect
export {
  MoreSelectData,
  MoreSelectDataOptions,
  MoreSelectGroupDataOptions,
  MoreSelectProps,
}
