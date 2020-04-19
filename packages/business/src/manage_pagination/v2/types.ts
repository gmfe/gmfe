import { HTMLAttributes, ReactElement } from 'react'

interface ManagePaginationV2Props extends HTMLAttributes<HTMLDivElement> {
  /* 请提供唯一id，目前用来记忆 limit */
  id?: string
  onRequest(params: ManagePaginationV2Params): Promise<ManagePaginationV2Response>
  children: ReactElement | ((data: { loading: boolean }) => ReactElement)
  defaultLimit?: number
  disablePage?: boolean
}

interface ManagePaginationV2Params {
  limit: number
  offset: number
  peek: number
  // eslint-disable-next-line camelcase
  page_obj: string
  [key: string]: any
}

interface ManagePaginationV2Response {
  data: any[]
  pagination: {
    // eslint-disable-next-line camelcase
    page_obj: string
    count?: number
    more: boolean
    peek: number
  }
}

export type { ManagePaginationV2Props, ManagePaginationV2Params, ManagePaginationV2Response }
