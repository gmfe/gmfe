import { Component, CSSProperties, ReactNode } from 'react'

interface CommonListProps<T> {
  multiple?: boolean
  isGroupList?: boolean
  renderItem?(value: BaseListDataOptions<T>): ReactNode
  willActiveIndex?: number
  isScrollTo?: boolean
  getItemProps?(value: BaseListDataOptions<T>): object
  className?: string
  style?: CSSProperties
}

interface BaseListProps<T> extends CommonListProps<T> {
  data: BaseListDataOptions<T>[]
  selected: T[]
  onSelect?(selected: T[]): void
}

interface BaseListDataOptions<T> {
  value: T
  text: string
  disabled?: boolean
  children?: BaseListDataOptions<T>[]
}

declare class Base<P> extends Component<BaseListProps<P>, void> {
  public apiDoSelectWillActive(): void
}
export default Base
export { BaseListProps, BaseListDataOptions, CommonListProps }
