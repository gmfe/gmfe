import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'
import _ from 'lodash'
import { SortHeader } from '../util'
import ReactTable from 'react-table-v6'
import { findDOMNode } from 'react-dom'
import SVGEmpty from '../../svg/empty.svg'
import { Flex, EVENT_TYPE } from '@gmfe/react'
import { warn } from '@gm-common/tool'

class BaseTable extends React.Component {
  refTable = React.createRef()

  constructor(props) {
    super(props)
    warn('Table deprecated, use TableX instead.')
  }

  doScroll = _.debounce(() => {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.TABLE_SCROLL))
  }, 500)

  componentDidMount() {
    const dom = findDOMNode(this.refTable.current)
    dom
      .getElementsByClassName('rt-table')[0]
      .addEventListener('scroll', this.doScroll)

    dom
      .getElementsByClassName('rt-tbody')[0]
      .addEventListener('scroll', this.doScroll)
  }

  componentWillUnmount() {
    const dom = findDOMNode(this.refTable.current)
    dom
      .getElementsByClassName('rt-table')[0]
      .removeEventListener('scroll', this.doScroll)

    dom
      .getElementsByClassName('rt-tbody')[0]
      .removeEventListener('scroll', this.doScroll)
  }

  processItem = item => {
    const Cell = item.Cell
    let NewCell = (cell, column) => (
      <div className='gm-react-table-td-content'>
        {Cell
          ? Cell instanceof Function
            ? Cell(cell, column)
            : Cell
          : cell.value}
      </div>
    )

    if (!Cell) {
      NewCell = row => {
        if (row.value === undefined || row.value === null || row.value === '') {
          return (
            <div className='gm-react-table-td-content'>
              <span className='gm-text-desc'>-</span>
            </div>
          )
        }
        return <div className='gm-react-table-td-content'>{row.value}</div>
      }
    }

    let Header = item.Header
    if (_.isString(Header) && item.sortable) {
      Header = <SortHeader>{Header}</SortHeader>
    }

    return {
      ...item,
      Header,
      sortable: !!item.sortable,
      // 有意义，如果是 undefined, 则赋值 undefined，覆盖默认值 100
      minWidth: item.minWidth,
      Cell: NewCell
    }
  }

  render() {
    const {
      data,
      columns,
      defaultPageSize,
      showPagination,
      className,
      tiled,
      ...rest
    } = this.props

    const newColumns = _.map(columns, v => {
      // groups 的形式
      if (v.columns) {
        const columns = _.map(v.columns, vv => this.processItem(vv))

        return {
          ...v,
          columns
        }
      } else {
        return this.processItem(v)
      }
    })
    return (
      <ReactTable
        ref={this.refTable}
        {...rest}
        columns={newColumns}
        data={data}
        defaultPageSize={defaultPageSize}
        pageSize={Math.max(data.length, 1)} // 展示完整，传多少显示多少。避免被 pageSize 截断
        showPagination={showPagination}
        className={classNames(
          'gm-react-table -striped -highlight',
          {
            'gm-react-table-no-data': data.length === 0,
            'gm-react-table-tiled': tiled
          },
          className
        )}
      />
    )
  }
}

const NoDataCom = () => (
  <Flex
    alignCenter
    justifyCenter
    style={{ position: 'absolute', top: '58px', width: '100%' }}
  >
    <div>
      <Flex justifyCenter>
        <SVGEmpty style={{ width: '70px', height: '70px' }} />
      </Flex>
      <div
        className='gm-text-fourth'
        style={{ textAlign: 'center', opacity: '0.5' }}
      >
        {getLocale('没有更多数据了')}
      </div>
    </div>
  </Flex>
)

BaseTable.propTypes = {
  loading: PropTypes.bool,
  /** 表格数据 */
  data: PropTypes.array.isRequired,
  /** 列定义 */
  columns: PropTypes.array.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  /** table是否平铺 */
  tiled: PropTypes.bool,
  /** 额外，忽略，不一一列了，参考 ReactTable */
  showPagination: PropTypes.bool,
  defaultPageSize: PropTypes.number
}

BaseTable.defaultProps = {
  tiled: false,
  /** 不使用自带的分页组件 */
  showPagination: false,
  /** 没有数据的文案 */
  NoDataComponent: NoDataCom,
  /** 加载中的文案 */
  loadingText: getLocale('加载数据中...')
}

export default BaseTable
