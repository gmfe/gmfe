import { Component, CSSProperties, HTMLAttributes, ReactNode } from 'react'

export interface CascaderProps<P> {
  data: CascaderDataOptions<P>
  value?: P[]
  defaultValue?: P[]
  onChange?(value: P[]): void
  inputProps?: HTMLAttributes<HTMLInputElement>
  valueRender?(value: CascaderDataOptions<P>[]): ReactNode // todo 待确认
  disabled?: boolean
  filtrable?: boolean
  onlyChildSelectable?: boolean
  popoverStyle?: CSSProperties
  className?: string
  style?: CSSProperties
}

export interface CascaderDataOptions<T> {
  value: T
  name: string
  children?: CascaderDataOptions<T>[]
  disabled?: boolean
}

interface CascaderState<T> {
  selected: T[]
  filterInput: string
  data: CascaderDataOptions<T>[]
  filterLastResultID: string
}

declare class Cascader<C> extends Component<
  CascaderProps<C>,
  CascaderState<C>
> {
  static defaultProps: {
    onChange(value: any[]): void
    inputProps: HTMLAttributes<HTMLInputElement>
    disabled: boolean
    onlyChildSelectable: boolean
  }
}

export default Cascader
