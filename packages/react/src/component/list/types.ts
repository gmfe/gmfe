import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface BaseListDataOptions<V> {
  value: V
  text: string
  disabled?: boolean
}

interface BaseListGroupDataOptions<V> {
  label: ReactNode
  children: BaseListDataOptions<V>[]
}

interface CommonListProps<V> {
  multiple?: boolean
  isGroupList?: boolean
  renderItem?(value: BaseListDataOptions<V>, index: number): ReactNode
  willActiveIndex?: number
  isScrollTo?: boolean
  /* 少用，给与更多 Item 的响应 */
  getItemProps?(value: BaseListDataOptions<V>): HTMLAttributes<HTMLDivElement>
  className?: string
  style?: CSSProperties
}

interface BaseListProps<V> extends CommonListProps<V> {
  data: BaseListGroupDataOptions<V>[]
  selected: V[]
  onSelect?(selected: V[]): void
}

type ListData<V> = (BaseListDataOptions<V> | BaseListGroupDataOptions<V>)[]

interface ListProps<V> extends CommonListProps<V> {
  /**
   * 区分 group
   */
  data: ListData<V>
  /**
   * 多选传 value 数组
   */
  selected?: V | V[]

  /**
   * 多选返回 value 数组
   */
  onSelect?(selected: V | V[]): void
}

export type {
  BaseListDataOptions,
  BaseListGroupDataOptions,
  BaseListProps,
  ListProps,
}
