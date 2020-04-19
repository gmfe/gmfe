import { ReactNode } from 'react'

interface DropSelectProps {
  show: boolean
  data?: DropSelectDataOptions
  onEnter?(activeIndex: number): void
  onHide?(): void
  className?: string
}

interface DropSelectDataOptions {
  loading?: boolean
  columns?: DropSelectDataColumnOptions[]
  list?: { [key: string]: any }[]
  actions?: DropSelectDataActionOptions[]
}

interface DropSelectDataColumnOptions {
  name: string
  field: string
  render?(value: any, rowData: { [key: string]: any }, rowIndex: number): ReactNode
}

interface DropSelectDataActionOptions {
  getDisabled(rowData: { [key: string]: any }, rowIndex: number): boolean
  text: string
  className?: string
  onClick?(rowData: { [key: string]: any }): void
}

export type {
  DropSelectProps,
  DropSelectDataOptions,
  DropSelectDataActionOptions,
  DropSelectDataColumnOptions,
}
