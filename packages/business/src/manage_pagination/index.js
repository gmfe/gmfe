import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Flex, Pagination, Storage, PaginationConfigContext } from '@gmfe/react'

class ManagePagination extends React.Component {
  static contextType = PaginationConfigContext

  constructor(props, context) {
    super(props, context)

    const storedLimit = props.id
      ? Storage.get('manage_pagination_' + props.id)
      : null
    const preferredLimit =
      props.preferredLimit != null
        ? props.preferredLimit
        : context && context.preferredLimit != null
        ? context.preferredLimit
        : null
    // 选中条数优先级：Storage(id) > props > Provider > defaultLimit
    // 页面本地选择优先，全局默认仅作兜底，避免改一处全站统一
    const limit =
      storedLimit != null
        ? storedLimit
        : preferredLimit != null
        ? preferredLimit
        : props.defaultLimit

    this.state = {
      limit,
      offset: 0,
      count: null,

      nextDisabled: false,
      loading: false
    }
  }

  apiDoFirstRequest = params => {
    this.setState(
      {
        offset: 0,
        count: null,

        nextDisabled: false,
        loading: false
      },
      () => {
        this.handleRequest(params)
      }
    )
  }

  apiDoCurrentRequest = () => {
    this.handleRequest()
  }

  handleRequest = (data = {}) => {
    const { limit, offset, loading } = this.state

    if (loading) {
      return
    }

    this.setState({
      loading: true
    })

    const result = this.props.onRequest({
      limit,
      offset,
      ...data
    })

    result
      .then(json => {
        let nextDisabled = false
        if (json.data.length < limit) {
          nextDisabled = true
        }

        this.setState({
          offset: data.offset === undefined ? offset : data.offset,
          limit: data.limit === undefined ? limit : data.limit,
          count: json.pagination && json.pagination.count,
          nextDisabled,
          loading: false
        })

        return json
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        return Promise.reject(err)
      })
  }

  handlePage = data => {
    if (this.props.id) {
      Storage.set('manage_pagination_' + this.props.id, data.limit)
    }

    if (data.limit !== this.state.limit && this.props.onLimitChange) {
      this.props.onLimitChange(data.limit)
    }

    this.setState({ limit: data.limit }, () => {
      this.handleRequest(data)
    })
  }

  render() {
    const {
      onRequest,
      defaultLimit,
      preferredLimit,
      limitData,
      onLimitChange,
      children,
      className,
      ...rest
    } = this.props
    const { limit, offset, count, nextDisabled, loading } = this.state
    const config = this.context
    const resolvedLimitData =
      limitData != null
        ? limitData
        : config && Array.isArray(config.limitData) && config.limitData.length
        ? config.limitData
        : undefined

    return (
      <div {...rest} className={classNames('gm-manage-pagination', className)}>
        <div className='gm-manage-pagination-list'>
          {_.isFunction(children) ? children({ loading }) : children}
        </div>
        <Flex
          justifyEnd
          className='gm-padding-20 gm-manage-pagination-bar'
        >
          <Pagination
            data={{
              limit,
              offset,
              count
            }}
            toPage={this.handlePage}
            nextDisabled={nextDisabled}
            limitData={resolvedLimitData}
          />
        </Flex>
      </div>
    )
  }
}

ManagePagination.propTypes = {
  /** 请提供唯一id。目前用来记忆 limit */
  id: PropTypes.string,
  /**
   * 参数 pagination。为发请求所需的页码信息。
   * 后台返回 data 是数组
   * 要求返回 promise
   * */
  onRequest: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  defaultLimit: PropTypes.number,
  /**
   * 当前每页条数（优先于 Provider / Storage）
   */
  preferredLimit: PropTypes.number,
  /**
   * 每页条数选项 [{ value, text }, ...]
   * 不传则由 Pagination 读 Provider / 默认值
   */
  limitData: PropTypes.array,
  /** 用户切换每页条数时的页面级回调 */
  onLimitChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

ManagePagination.defaultProps = {
  defaultLimit: 10
}

export default ManagePagination
