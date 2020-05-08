import { Component, CSSProperties, AllHTMLAttributes, ReactNode } from 'react'

interface CascaderProps<P> {
  data: CascaderDataOptions<P>
  value?: P[]
  defaultValue?: P[]
  onChange?(value: P[]): void
  inputProps?: AllHTMLAttributes<HTMLInputElement>
  valueRender?(value: CascaderDataOptions<P>[]): ReactNode // todo 待确认
  disabled?: boolean
  filtrable?: boolean
  onlyChildSelectable?: boolean
  popoverStyle?: CSSProperties
  className?: string
  style?: CSSProperties
}

interface CascaderDataOptions<T> {
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
    onChange(value: unknown[]): void
    inputProps: AllHTMLAttributes<HTMLInputElement>
    disabled: boolean
    onlyChildSelectable: boolean
  }
}

export default Cascader
export { CascaderProps, CascaderDataOptions }
