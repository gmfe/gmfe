import { CSSProperties, ReactNode, KeyboardEvent, Component } from 'react'
import { BaseListDataOptions } from '../list/base'

interface BaseMoreSelectCommonProps<T> {
  multiple?: boolean
  disabled?: boolean
  disabledClose?: boolean
  onSearch?(
    query: string,
    data: BaseMoreSelectDataOptions<T>[]
  ): BaseMoreSelectDataOptions<T>[]
  delay?: number
  searchPlaceholder?: string
  renderListFilter?(
    data: BaseMoreSelectDataOptions<T>[],
    searchValue: string
  ): BaseListDataOptions<T>[]
  renderListFilterType?: 'default' | 'pinyin'
  placeholder?: string
  renderSelected?(value: BaseMoreSelectDataOptions<T>): ReactNode
  renderListItem?(value: BaseMoreSelectDataOptions<T>): ReactNode
  listHeight?: string
  isGroupList?: boolean
  popoverType?: 'focus' | 'realFocus'
  className?: string
  style?: CSSProperties
  popupClassName?: string
  isInPopup?: boolean
  isKeyboard?: boolean
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

interface BaseMoreSelectDataOptions<T> {
  label: string
  children: { value: T; text: string; disabled?: boolean }[]
}

interface BaseMoreSelectProps<P> {
  data: BaseMoreSelectDataOptions<P>[]
  selected: BaseMoreSelectDataOptions<P>[]
  onSelect(selected: BaseMoreSelectDataOptions<P>[]): void
}

interface BaseMoreSelectState {
  searchValue: string
  loading: boolean
  willActiveIndex: number
}

declare class Base<P> extends Component<
  BaseMoreSelectProps<P>,
  BaseMoreSelectState
> {
  static renderListFilterDefault<V>(
    data: BaseMoreSelectDataOptions<V>[],
    query: string
  ): BaseMoreSelectDataOptions<V>[]

  static renderListFilterPinYin<V>(
    data: BaseMoreSelectDataOptions<V>[],
    query: string
  ): BaseMoreSelectDataOptions<V>[]

  readonly state: BaseMoreSelectState

  public apiDoFocus(): void
  public apiDoSelectWillActive(): void
}
export default Base
export {
  BaseMoreSelectProps,
  BaseMoreSelectDataOptions,
  BaseMoreSelectCommonProps,
}
