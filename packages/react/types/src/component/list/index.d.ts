import { CommonProps, BaseDataOptions } from './base'
import { Component } from 'react'

interface ListGroupDataOptions<T> {
  label: string
  children: BaseDataOptions<T>[]
}

type ListDataOptions<T> = BaseDataOptions<T> | ListGroupDataOptions<T>

interface ListProps<T> extends CommonProps<T> {
  data: ListDataOptions<T>[]
  selected?: T | T[]
  onSelect?(selected: T | T[]): void
}

declare class List<P> extends Component<ListProps<P>, void> {
  apiDoSelectWillActive
}

export default List
export { ListProps, ListDataOptions, ListGroupDataOptions }
