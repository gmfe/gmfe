import { CSSProperties, FC } from 'react'

interface PaginationBaseCommonOptions {
  offset: number
  limit: number
}

interface PaginationBaseDataOptions extends PaginationBaseCommonOptions {
  count: number
}

interface PaginationBaseResultOptions extends PaginationBaseCommonOptions {
  count?: number
}

interface PaginationBaseProps {
  data?: PaginationBaseDataOptions
  onChange(data: PaginationBaseResultOptions): void
  showCount?: boolean
  className?: string
  style?: CSSProperties
  _peekInfo?: {
    more?: boolean
    peek?: number
  }
}
declare const PaginationBase: FC<PaginationBaseProps>
export default PaginationBase
export {
  PaginationBaseProps,
  PaginationBaseCommonOptions,
  PaginationBaseDataOptions,
  PaginationBaseResultOptions,
}
