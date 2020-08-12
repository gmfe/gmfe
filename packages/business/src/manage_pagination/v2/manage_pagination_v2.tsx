import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex, Storage } from '@gmfe/react'
import { ManagePaginationV2Params, ManagePaginationV2Props } from './types'
import Transform from './transform'
import { ManagePaginationParams } from '..'

interface ManagePaginationV2State {
  /* 给后台 */
  pageObj: string | null
  limit: number
  /* 不会变 */
  offset: number
  /**
   * 不会变
   * 页面会显示5页，peek6页，便于显示 ... 代表还有更多页码
   */
  peek: number | null
  /* 返回的 pagination */
  resPagination: ManagePaginationParams['pagination'] | null
  loading: boolean
  currentIndex: number
  pageObjArr: any[]
}

class ManagePaginationV2 extends Component<ManagePaginationV2Props, ManagePaginationV2State> {
  static defaultProps = {
    defaultLimit: 10,
  }

  constructor(props: ManagePaginationV2Props) {
    super(props)
    const limit =
      ((props.id && Storage.get(`manage_pagination_v2_${props.id}`)) as number) ??
      props.defaultLimit
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      pageObj: null,
      limit,
      offset: 0,
      peek: props.disablePage ? null : 6 * limit,
      resPagination: null,
      loading: false,
      currentIndex: 0,
      pageObjArr: [null],
    }
  }

  public apiDoFirstRequest = (params: Partial<ManagePaginationV2Params> = {}): void => {
    const { limit, offset, peek } = this.state
    this.setState(
      {
        pageObj: null,
        limit,
        offset,
        peek,
        resPagination: null,
        loading: false,
        currentIndex: 0,
        pageObjArr: [null],
      },
      () => {
        this._handleRequest(params)
      }
    )
  }

  public apiDoCurrentRequest = (): void => {
    const { currentIndex } = this.state
    this._handleRequest(this._getParams(currentIndex), { currentIndex })
  }

  private _getParams = (currentIndex: number) => {
    const { pageObjArr, limit } = this.state
    let i = currentIndex
    while (pageObjArr[i] === undefined && i > 0) {
      i--
    }
    return {
      page_obj: pageObjArr[i] || null,
      offset: (currentIndex - i) * limit,
    }
  }

  private _handleRequest = (
    params: Partial<ManagePaginationV2Params>,
    options: { currentIndex?: number; limit?: number } = {}
  ): void => {
    let { currentIndex, limit } = options
    const { loading, pageObjArr, pageObj, offset, peek } = this.state
    if (loading) {
      return
    }

    // currentIndex 成功后才更新 state，所以这里要去之前的
    currentIndex = currentIndex ?? this.state.currentIndex
    limit = limit ?? this.state.limit

    this.setState({ loading: true })
    this.props
      .onRequest({
        limit,
        offset,
        peek: peek as number,
        page_obj: pageObj as string,
        ...params,
      })
      .then((response) => {
        const newPageObjArr = pageObjArr.slice()
        newPageObjArr[currentIndex! + 1] = response.pagination.page_obj
        newPageObjArr.length = currentIndex! + 2 // 调整数组长度，当前位置之后的 page_obj 都清理掉，不缓存，后面拉新的为准
        this.setState({
          pageObj: response.pagination.page_obj,
          resPagination: response.pagination,
          currentIndex: currentIndex!,
          limit: limit!,
          loading: false,
          pageObjArr: newPageObjArr,
        })
        return response
      })
      .catch((error) => {
        this.setState({ loading: false })
        return Promise.reject(error)
      })
  }

  private _handleChange = ({
    currentIndex,
    limit,
  }: {
    currentIndex: number
    limit: number
  }): void => {
    if (this.props.id) {
      Storage.set(`manage_pagination_v2_${this.props.id}`, limit)
    }
    this._handleRequest(this._getParams(currentIndex), { currentIndex, limit })
  }

  render() {
    const { id, onRequest, children, defaultLimit, disablePage, className, ...rest } = this.props
    const { limit, loading, resPagination, currentIndex } = this.state
    return (
      <div {...rest} className={classNames('gm-manage-pagination', className)}>
        <div className='gm-manage-pagination-list'>
          {_.isFunction(children) ? children({ loading }) : children}
        </div>
        <Flex justifyEnd className='gm-padding-20'>
          <Transform
            limit={limit}
            count={(resPagination && resPagination.count) as number}
            currentIndex={currentIndex}
            peek={(resPagination && resPagination.peek) as number}
            more={(resPagination && resPagination.more) as boolean}
            onChange={this._handleChange}
          />
        </Flex>
      </div>
    )
  }
}

export default ManagePaginationV2
