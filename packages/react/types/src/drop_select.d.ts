import { Component, ReactNode } from 'react'

interface DropSelectProps {
  show: boolean
  data?: DropSelectDataOptions
  onEnter?(activeIndex: number): void
  onHide?(): void
}

interface DropSelectDataOptions {
  loading?: boolean
  actions?: DropSelectDataActionsOptions[]
  list?: { [key: string]: unknown }[]
  columns?: DropSelectDataColumnsOptions[]
}

interface DropSelectDataActionsOptions {
  getDisabled(rowData: { [key: string]: unknown }, rowIndex: number): boolean
}

interface DropSelectDataColumnsOptions {
  name: string
  field: string
  render?(
    value: unknown,
    rowData: { [key: string]: unknown },
    rowIndex: number
  ): ReactNode
}

interface DropSelectState {
  activeIndex: number
}

declare class DropSelect extends Component<DropSelectProps, DropSelectState> {
  static defaultProps: {
    onEnter(activeIndex: number): void
  }

  readonly state: DropSelectState
}

export default DropSelect
export {
  DropSelectDataColumnsOptions,
  DropSelectDataOptions,
  DropSelectDataActionsOptions,
  DropSelectProps,
}
