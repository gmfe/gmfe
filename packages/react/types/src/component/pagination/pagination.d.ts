import { CSSProperties, FC } from 'react'
import { PaginationBaseResultOptions } from './base'

export interface PaginationProps {
  data?: PaginationBaseResultOptions
  toPage(data: PaginationBaseResultOptions): void
  nextDisabled?: boolean
  className?: string
  style?: CSSProperties
}

declare const Pagination: FC<PaginationProps>
export default Pagination
