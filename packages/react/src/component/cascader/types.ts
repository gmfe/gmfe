import { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

interface CascaderDataOptions<T> {
  value: T
  name: string
  disabled?: boolean
  children?: CascaderDataOptions<T>[]
}

interface CascaderProps<T> {
  data: CascaderDataOptions<T>[]
  value: T[]
  defaultValue?: T[]
  onChange?(value: T[]): void
  /* 默认 children 的props */
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  /* 自定义已选项渲染 */
  valueRender?(value: CascaderDataOptions<T>[]): string
  disabled?: boolean
  /* 是否可搜索 */
  filterable?: boolean
  /* 只允许选择子节点，有 children 则清空输入框 */
  onlyChildSelectable?: boolean
  /* 浮层样式 */
  popoverStyle?: CSSProperties
  className?: string
  style?: CSSProperties
}

interface CascaderDataOptionsWithPath<T> extends CascaderDataOptions<T> {
  _path?: T[]
}

interface CascaderSelectProps<T> {
  data: CascaderDataOptions<T>[]
  selected: CascaderDataOptions<T>[] | CascaderDataOptions<T>[][]
  onSelect(selected: CascaderDataOptions<T>[] | CascaderDataOptions<T>[][]): void
  multiple?: boolean
  selectedRender?(value: CascaderDataOptions<T>[], index: number): ReactNode
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  disabled?: boolean
  valueRender?(value: CascaderDataOptions<T>[]): string
  filterable?: boolean
  onlyChildSelectable?: boolean
}

export type { CascaderDataOptions, CascaderProps, CascaderDataOptionsWithPath, CascaderSelectProps }
