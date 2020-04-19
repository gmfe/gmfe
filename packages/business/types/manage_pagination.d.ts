import { Component, ReactNode } from 'react'
import {
  ManagePaginationOptions,
  ManagePaginationPromiseResult,
} from './common'

interface ManagePaginationProps {
  id?: string
  onRequest(
    pagination: ManagePaginationOptions
  ): Promise<ManagePaginationPromiseResult>
  defaultLimit?: number
  children: ReactNode
}

interface ManagePaginationState {
  limit: number
  offset: number
  count: number

  nextDisabled: boolean
  loading: boolean
}

declare class ManagePagination extends Component<
  ManagePaginationProps,
  ManagePaginationState
> {
  static defaultProps: {
    defaultLimit: number
  }

  public apiDoFirstRequest(params?: { [key: string]: unknown }): void
  public apiDoCurrentRequest(): void
}

export default ManagePagination
