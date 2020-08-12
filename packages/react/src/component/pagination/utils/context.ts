import { PaginationDataOptions } from './types'
import { createContext } from 'react'

export interface PaginationContextOptions {
  data: Required<PaginationDataOptions>
  onChange(pagination: PaginationDataOptions): void
}

const paginationContext = createContext<PaginationContextOptions | null>(null)

export default paginationContext
