import React, { Component } from 'react'
import _ from 'lodash'
import { Flex, Pagination, PaginationDataOptions, Storage } from '@gmfe/react'
import { ManagePaginationParams, ManagePaginationProps } from './types'

interface ManagePaginationState {
  limit: number
  offset: number
  count?: number
  nextDisabled: boolean
  loading: boolean
}

class ManagePagination extends Component<ManagePaginationProps, ManagePaginationState> {
  static defaultProps = {
    defaultLimit: 10,
  }

  readonly state: ManagePaginationState = {
    limit:
      ((this.props.id && Storage.get(`manage_pagination_${this.props.id}`)) as number) ??
      this.props.defaultLimit,
    offset: 0,
    nextDisabled: false,
    loading: false,
  }

  public apiDoFirstRequest = (params?: ManagePaginationParams) => {
    this.setState(
      {
        offset: 0,
        count: undefined,
        nextDisabled: false,
        loading: false,
      },
      () => {
        this._handleRequest(params)
      }
    )
  }

  public apiDoCurrentRequest = (): void => {
    this._handleRequest()
  }

  private _handleRequest = (params: Partial<ManagePaginationParams> = {}): void => {
    const { loading, limit, offset } = this.state
    if (loading) {
      return
    }
    this.setState({ loading: true })
    const { onRequest } = this.props
    onRequest({ limit, offset, ...params })
      .then((response) => {
        let nextDisabled = false
        if (response.data.length < limit) {
          nextDisabled = true
        }
        this.setState({
          offset: params.offset ?? offset,
          limit: params.limit ?? limit,
          count: response.pagination && response.pagination.count,
          nextDisabled,
          loading: false,
        })
        return response
      })
      .catch((error) => {
        this.setState({ loading: false })
        return Promise.reject(error)
      })
  }

  private _onPage = (pagination: PaginationDataOptions): void => {
    if (this.props.id) {
      Storage.set(`manage_pagination_${this.props.id}`, pagination.limit)
    }
    this.setState({ limit: pagination.limit }, () => {
      this._handleRequest(pagination)
    })
  }

  render() {
    const { onRequest, defaultLimit, children, ...rest } = this.props
    const { limit, offset, count, nextDisabled, loading } = this.state
    return (
      <div {...rest}>
        <div>{_.isFunction(children) ? children({ loading }) : children}</div>
        <Flex justifyEnd className='gm-padding-20'>
          <Pagination
            data={{ limit, offset, count }}
            toPage={this._onPage}
            nextDisabled={nextDisabled}
          />
        </Flex>
      </div>
    )
  }
}

export default ManagePagination
