import { CommonListProps, BaseListDataOptions } from './base'
import { Component } from 'react'

interface ListGroupDataOptions<T> {
  label: string
  children: BaseListDataOptions<T>[]
}

type ListDataOptions<T> = BaseListDataOptions<T> | ListGroupDataOptions<T>

interface ListProps<T> extends CommonListProps<T> {
  data: ListDataOptions<T>[]
  selected?: T | T[]
  onSelect?(selected: T | T[]): void
}

declare class List<P> extends Component<ListProps<P>, void> {
  public apiDoSelectWillActive(): void
}

export default List
export { ListProps, ListDataOptions, ListGroupDataOptions }
