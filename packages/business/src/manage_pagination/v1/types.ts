import { HTMLAttributes, ReactElement } from 'react'
import { PaginationDataOptions } from '../../../../react/src/component/pagination'

interface ManagePaginationProps extends HTMLAttributes<HTMLDivElement> {
  /* 请提供唯一的id，目前用来记忆 limit */
  id?: string
  onRequest(params: ManagePaginationParams): Promise<ManagePaginationResponse>
  defaultLimit?: number
  children: ReactElement | ((data: { loading: boolean }) => ReactElement)
}

interface ManagePaginationParams extends PaginationDataOptions {
  [key: string]: any
}

interface ManagePaginationResponse {
  data: any[]
  pagination?: ManagePaginationParams
}

export type { ManagePaginationProps, ManagePaginationParams, ManagePaginationResponse }
