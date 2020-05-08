import {
  CSSProperties,
  FC,
  AllHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'

export interface BoxTableProps {
  info?: ReactNode
  action?: ReactNode
  className?: string
  style?: CSSProperties
  headerProps?: AllHTMLAttributes<HTMLDivElement>
}

interface BoxTableFC extends FC<BoxTableProps> {
  More: ReactElement
}

declare const BoxTable: BoxTableFC
export default BoxTable
