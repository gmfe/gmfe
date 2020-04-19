import { Component, HTMLAttributes, ReactNode } from 'react'

interface CascaderSelectProps<T> {
  data: CascaderSelectDataOptions<T>
  selected?: T[]
  onSelect(value: T[]): void
  multiple?: boolean
  selectedRender?(value: CascaderSelectDataOptions<T>): ReactNode
  inputProps?: HTMLAttributes<HTMLInputElement>
  disabled?: boolean
  valueRender?(value: CascaderSelectDataOptions<T>): ReactNode
  filtrable?: boolean
  onlyChildSelectable?: boolean
}

interface CascaderSelectDataOptions<T> {
  name: string
  value: T
  children?: CascaderSelectDataOptions<T>[]
  disabled?: boolean
}

interface CascaderSelectState<T> {
  selected?: T[] // todo 待确认
  cascaderValue?: T[]
}

declare class CascaderSelect<T> extends Component<
  CascaderSelectProps<T>,
  CascaderSelectState<T>
> {}

export default CascaderSelect
