import { Component, CSSProperties, ReactNode } from 'react'

interface CommonProps<T> {
  multiple?: boolean
  isGroupList?: boolean
  renderItem?(value: BaseDataOptions<T>): ReactNode
  willActiveIndex?: number
  isScrollTo?: boolean
  getItemProps?(value: BaseDataOptions<T>): object
  className?: string
  style?: CSSProperties
}

interface BaseProps<T> extends CommonProps<T> {
  data: BaseDataOptions<T>[]
  selected: T[]
  onSelect?(selected: T[]): void
}

interface BaseDataOptions<T> {
  value: T
  text: string
  disabled?: boolean
  children?: BaseDataOptions<T>[]
}

declare class Base<P> extends Component<BaseProps<P>, void> {
  apiDoSelectWillActive
}
export default Base
export { BaseProps, BaseDataOptions, CommonProps }
