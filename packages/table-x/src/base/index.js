import React, { useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import { Empty, Loading, afterScroll, __DEFAULT_COLUMN } from '../util'
import classNames from 'classnames'
import _ from 'lodash'
import THead from './thead'
import Tr from './tr'

// 给定初始值，交由getColumnStyle控制。width逻辑保持跟react-table（v6）的用法一致。
const defaultColumn = __DEFAULT_COLUMN

const TableX = ({
  columns,
  data,
  loading,
  SubComponent,
  keyField,
  className,
  tiled,
  onScroll,
  isTrDisable,
  isTrHighlight,
  ...rest
}) => {
  // diy fixed(最新rc12不支持column.show,自己实现)
  columns = React.useMemo(() => columns.filter(c => c.show !== false), [
    columns
  ])

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn
  })

  let totalWidth = 0
  if (rows[0] && rows[0].cells.length > 0) {
    prepareRow(rows[0])
    const last = rows[0].cells[rows[0].cells.length - 1].column
    totalWidth = last.totalLeft + last.totalWidth
  } else if (headerGroups[0] && headerGroups[0].headers.length > 0) {
    const last =
      headerGroups[0].headers[headerGroups[0].headers.length - 1]
    totalWidth = (last.totalLeft || 0) + (last.totalWidth || 0)
  }

  const gtp = getTableProps()
  const tableProps = {
    ...gtp,
    style: { minWidth: totalWidth + 'px' },
    className: classNames('gm-table-x-table', gtp.className)
  }

  const gtbp = getTableBodyProps()
  const tableBodyProps = {
    ...gtbp,
    className: 'gm-table-x-tbody'
  }

  const headerSticky = classNames(className).includes(
    'gm-table-x-header-sticky'
  )

  const headerScrollRef = useRef(null)
  const bodyScrollRef = useRef(null)
  const syncingScroll = useRef(false)

  const syncScroll = useCallback((source, target) => {
    if (!target || syncingScroll.current) return
    if (target.scrollLeft === source.scrollLeft) return
    syncingScroll.current = true
    target.scrollLeft = source.scrollLeft
    // 下一帧解除，避免滚动事件回环
    requestAnimationFrame(() => {
      syncingScroll.current = false
    })
  }, [])

  const handleScroll = e => {
    onScroll && onScroll(e)
    afterScroll()
  }

  const handleBodyScroll = e => {
    if (headerSticky) {
      syncScroll(e.currentTarget, headerScrollRef.current)
    }
    handleScroll(e)
  }

  const handleHeaderScroll = e => {
    syncScroll(e.currentTarget, bodyScrollRef.current)
  }

  // eslint-disable-next-line
  const RenderRow = ({ index, style }) => {
    const row = rows[index]
    prepareRow(row)

    return (
      <Tr
        key={row.index}
        row={row}
        SubComponent={SubComponent}
        keyField={keyField}
        style={style}
        totalWidth={totalWidth}
        isTrDisable={isTrDisable}
        isTrHighlight={isTrHighlight}
      />
    )
  }

  const tbodyRows = _.map(rows, row =>
    RenderRow({
      index: row.index,
      style: {}
    })
  )

  const rootClassName = classNames(
    'gm-table-x',
    {
      'gm-table-x-empty': data.length === 0,
      'gm-table-x-tiled': tiled
    },
    className
  )

  // 吸顶模式：表头/表体拆成两个横向滚动容器并同步 scrollLeft，
  // 这样纵向可相对页面 sticky，横向仍能用 sticky left/right 固定列
  if (headerSticky) {
    return (
      <div {...rest} className={rootClassName}>
        <div
          ref={headerScrollRef}
          className='gm-table-x-affix-header'
          onScroll={handleHeaderScroll}
        >
          <table {...tableProps}>
            <THead headerGroups={headerGroups} totalWidth={totalWidth} />
          </table>
        </div>
        <div
          ref={bodyScrollRef}
          className='gm-table-x-body-scroll'
          onScroll={handleBodyScroll}
        >
          <table {...tableProps}>
            <tbody {...tableBodyProps}>{tbodyRows}</tbody>
          </table>
        </div>
        {loading && <Loading />}
        {!loading && data.length === 0 && <Empty />}
      </div>
    )
  }

  return (
    <div {...rest} className={rootClassName} onScroll={handleScroll}>
      <table {...tableProps}>
        <THead headerGroups={headerGroups} totalWidth={totalWidth} />
        <tbody {...tableBodyProps}>{tbodyRows}</tbody>
      </table>
      {loading && <Loading />}
      {!loading && data.length === 0 && <Empty />}
    </div>
  )
}

TableX.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  SubComponent: PropTypes.func,
  /** 由其他 hoc 传下来 */
  keyField: PropTypes.string,
  /** table是否平铺 */
  tiled: PropTypes.bool,
  /** 当前行是否disable */
  isTrDisable: PropTypes.func,
  /** 当前行是否高亮 */
  isTrHighlight: PropTypes.func,
  onScroll: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

TableX.defaultProps = {
  keyField: 'value',
  tiled: false,
  isTrDisable: () => false,
  isTrHighlight: () => false
}

export default TableX
