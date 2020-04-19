import { Component, CSSProperties, ReactNode } from 'react'
import {
  ManagePaginationOptions,
  ManagePaginationPromiseResult,
} from './common'

interface ManagePaginationV2Options extends ManagePaginationOptions {
  peek: number
  // eslint-disable-next-line camelcase
  page_obj: { [key: string]: unknown }
}

interface ManagePaginationV2Props {
  id?: string
  onRequest(
    pagination: ManagePaginationV2Options
  ): Promise<ManagePaginationPromiseResult>
  children: ReactNode
  defaultLimit?: number
  disablePage?: boolean
  className?: string
  style?: CSSProperties
}

interface ManagePaginationV2State {
  pageObj: { [key: string]: unknown }
  limit: number
  offset: number
  peek: number
  resPagination: { [key: string]: unknown }

  loading: boolean
  currentIndex: number
  pageObjArr: { [key: string]: unknown }[]
}

type ParamsType = { [key: string]: unknown }

declare class ManagePaginationV2 extends Component<
  ManagePaginationV2Props,
  ManagePaginationV2State
> {
  static defaultProps: {
    defaultLimit: number
    disablePage: boolean
  }

  public doFirstRequest(params?: ParamsType): void
  public doCurrentRequest(): void
  public apiDoFirstRequest(params?: ParamsType): void
  public apiDoCurrentRequest(): void
}

export default ManagePaginationV2
