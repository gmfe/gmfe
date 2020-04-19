import { PaginationBaseDataOptions } from './base'
import { CSSProperties, FC } from 'react'

export interface PaginationV2Props {
  data: PaginationBaseDataOptions
  onChange(data: PaginationBaseDataOptions): void
  showCount?: boolean
  className?: string
  style?: CSSProperties
  _peekInfo: {
    more?: boolean
    peek?: number
  }
}

declare const PaginationV2: FC<PaginationV2Props>

export default PaginationV2
