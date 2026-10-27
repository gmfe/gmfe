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

  // 吸顶时 thead 移出 rt-table，表头、表体各有一个横向滚动容器。两边都要同步，
  // 否则在表头上横滑时表体不会跟着走（原先只监听了表体）。
  syncHorizontalScroll = source => {
    if (this._syncingScroll) return
    const from = source === 'header' ? this._boundWrap : this._boundRt
    const to = source === 'header' ? this._boundRt : this._boundWrap
    if (!from || !to || to.scrollLeft === from.scrollLeft) return
    this._syncingScroll = true
    to.scrollLeft = from.scrollLeft
    requestAnimationFrame(() => {
      this._syncingScroll = false
    })
  }

  onBodyScroll = () => this.syncHorizontalScroll('body')

  onHeaderScroll = () => this.syncHorizontalScroll('header')

  bindStickyScroll = (rtTable, wrap) => {
    if (this._boundRt === rtTable && this._boundWrap === wrap) return
    this.unbindStickyScroll()
    this._boundRt = rtTable
    this._boundWrap = wrap
    rtTable.addEventListener('scroll', this.onBodyScroll)
    wrap.addEventListener('scroll', this.onHeaderScroll)
  }

  unbindStickyScroll = () => {
    if (this._boundRt) {
      this._boundRt.removeEventListener('scroll', this.onBodyScroll)
    }
    if (this._boundWrap) {
      this._boundWrap.removeEventListener('scroll', this.onHeaderScroll)
    }
    this._boundRt = null
    this._boundWrap = null
  }

  setupStickyThead = () => {
    const dom = findDOMNode(this.refTable.current)
    if (!dom) return
    if (!dom.classList.contains('gm-react-table-header-sticky')) {
      this.teardownStickyThead()
      return
    }

    const rtTable = dom.querySelector(':scope > .rt-table')
    if (!rtTable) return

    let wrap = dom.querySelector(':scope > .gm-react-table-sticky-thead-wrap')
    if (!wrap) {
      // 只用本表直接子级 thead，避免把嵌套子表的表头搬出来
      const thead = rtTable.querySelector(':scope > .rt-thead')
      if (!thead) return
      wrap = document.createElement('div')
      wrap.className = 'gm-react-table-sticky-thead-wrap'
      rtTable.removeChild(thead)
      wrap.appendChild(thead)
      dom.insertBefore(wrap, rtTable)
    }

    // 表体节点可能被 React 换掉，每次更新都重新绑到当前节点。只在新绑定时对齐一次，避免刷新把用户正在滑的位置拽回去
    const needsBind = this._boundRt !== rtTable || this._boundWrap !== wrap
    this.bindStickyScroll(rtTable, wrap)
    if (needsBind) this.syncHorizontalScroll('body')
  }

  teardownStickyThead = () => {
    const dom = findDOMNode(this.refTable.current)
    if (!dom) return
    const wrap = dom.querySelector(':scope > .gm-react-table-sticky-thead-wrap')
    if (!wrap) return
    const rtTable = dom.querySelector(':scope > .rt-table')
    const thead = wrap.querySelector(':scope > .rt-thead, .rt-thead')
    this.unbindStickyScroll()
    if (rtTable && thead) {
      rtTable.insertBefore(thead, rtTable.firstChild)
    }
    dom.removeChild(wrap)
  }

  componentDidMount() {
    const dom = findDOMNode(this.refTable.current)
    dom
      .getElementsByClassName('rt-table')[0]
      .addEventListener('scroll', this.doScroll)

    dom
      .getElementsByClassName('rt-tbody')[0]
      .addEventListener('scroll', this.doScroll)

    this.setupStickyThead()
  }

  componentDidUpdate() {
    // 吸顶 class 可能后续切换；重新校准
    this.setupStickyThead()
  }

  componentWillUnmount() {
    const dom = findDOMNode(this.refTable.current)
    dom
      .getElementsByClassName('rt-table')[0]
      .removeEventListener('scroll', this.doScroll)

    dom
      .getElementsByClassName('rt-tbody')[0]
      .removeEventListener('scroll', this.doScroll)

    this.teardownStickyThead()
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
