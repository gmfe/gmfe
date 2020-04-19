import {
  CSSProperties,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'

export interface BoxTableProps {
  info?: ReactNode
  action?: ReactNode
  className?: string
  style?: CSSProperties
  headerProps?: HTMLAttributes<HTMLDivElement>
}

interface BoxTableFC extends FC<BoxTableProps> {
  More: ReactElement
}

declare const BoxTable: BoxTableFC
export default BoxTable
