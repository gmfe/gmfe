import React, { useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import { Empty, Loading, afterScroll, __DEFAULT_COLUMN, TABLE_X } from '../util'
import classNames from 'classnames'
import _ from 'lodash'
import THead from './thead'
import Tr from './tr'
import { VariableSizeList, areEqual } from 'react-window'

// 见
// https://react-window.now.sh/#/api/FixedSizeList innerElementType
// https://react-window.now.sh/#/examples/list/memoized-list-items

/** 非吸顶：index0 为表头占位 */
const RenderRow = React.memo(({ data, index, style }) => {
  if (index === 0) {
    return <div style={{ ...style, pointerEvents: 'none' }} />
  }

  index = index - 1

  const {
    prepareRow,
    rows,
    SubComponent,
    keyField,
    totalWidth,
    isTrDisable,
    isTrHighlight
  } = data

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
}, areEqual)

RenderRow.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
}

/** 吸顶：表头已外置，虚拟列表只渲染数据行 */
const RenderBodyRow = React.memo(({ data, index, style }) => {
  const {
    prepareRow,
    rows,
    SubComponent,
    keyField,
    totalWidth,
    isTrDisable,
    isTrHighlight
  } = data

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
}, areEqual)

RenderBodyRow.propTypes = RenderRow.propTypes

// 给定初始值，交由getColumnStyle控制。width逻辑保持跟react-table（v6）的用法一致。
const defaultColumn = __DEFAULT_COLUMN

const TableXVirtualized = ({
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

  virtualizedHeight,
  virtualizedItemSize,
  refVirtualized,

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
    const last = headerGroups[0].headers[headerGroups[0].headers.length - 1]
    totalWidth = (last.totalLeft || 0) + (last.totalWidth || 0)
  }

  const gtp = getTableProps()
  const tableProps = {
    ...gtp,
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
    requestAnimationFrame(() => {
      syncingScroll.current = false
    })
  }, [])

  const handleScroll = e => {
    onScroll && onScroll(e)
    afterScroll()
  }

  const handleHeaderScroll = e => {
    syncScroll(e.currentTarget, bodyScrollRef.current)
  }

  // 虚拟列表 outer 节点横向滚动时同步表头
  useEffect(() => {
    if (!headerSticky) return undefined
    const body = bodyScrollRef.current
    if (!body) return undefined
    const onScroll = () => {
      syncScroll(body, headerScrollRef.current)
      afterScroll()
    }
    body.addEventListener('scroll', onScroll)
    return () => body.removeEventListener('scroll', onScroll)
  }, [headerSticky, syncScroll, rows.length, totalWidth])

  // 非吸顶：表头在 inner table 内，index0 占位
  const Container = React.useMemo(() => {
    return React.forwardRef(({ children, style, ...restProps }, ref) => {
      return (
        <table
          ref={ref}
          {...restProps}
          {...tableProps}
          style={{ ...style, minWidth: totalWidth + 'px' }}
        >
          <THead headerGroups={headerGroups} totalWidth={totalWidth} />
          <tbody {...tableBodyProps}>{children}</tbody>
        </table>
      )
    })
  }, [columns, totalWidth])

  // 吸顶：表头外置，虚拟列表仅 tbody
  const BodyContainer = React.useMemo(() => {
    return React.forwardRef(({ children, style, ...restProps }, ref) => {
      return (
        <table
          ref={ref}
          {...restProps}
          {...tableProps}
          style={{ ...style, minWidth: totalWidth + 'px' }}
        >
          <tbody {...tableBodyProps}>{children}</tbody>
        </table>
      )
    })
  }, [columns, totalWidth])

  const itemSize = index => {
    if (index === 0) {
      return TABLE_X.HEIGHT_HEAD_TR
    }

    if (_.isFunction(virtualizedItemSize)) {
      return virtualizedItemSize(index - 1)
    }

    return virtualizedItemSize
  }

  const bodyItemSize = index => {
    if (_.isFunction(virtualizedItemSize)) {
      return virtualizedItemSize(index)
    }
    return virtualizedItemSize
  }

  const itemData = {
    rows,
    prepareRow,
    SubComponent,
    keyField,
    totalWidth,
    isTrDisable,
    isTrHighlight
  }

  const rootClassName = classNames(
    'gm-table-x',
    {
      'gm-table-x-empty': data.length === 0,
      'gm-table-x-tiled': tiled
    },
    className
  )

  // 吸顶：表头拆出，虚拟列表高度去掉原表头占位
  // 额外预留横向滚动条高度，避免短表时滚动条贴在表头下方造成「遮挡」观感
  if (headerSticky) {
    const SCROLLBAR_RESERVE = 17
    const rowSize =
      typeof virtualizedItemSize === 'number' ? virtualizedItemSize : 0
    const listHeight = Math.max(
      (virtualizedHeight || 0) - TABLE_X.HEIGHT_HEAD_TR,
      rowSize + SCROLLBAR_RESERVE,
      rowSize
    )

    return (
      <div {...rest} className={rootClassName}>
        <div
          ref={headerScrollRef}
          className='gm-table-x-affix-header'
          onScroll={handleHeaderScroll}
        >
          <table {...tableProps} style={{ minWidth: totalWidth + 'px' }}>
            <THead headerGroups={headerGroups} totalWidth={totalWidth} />
          </table>
        </div>
        <VariableSizeList
          ref={refVirtualized}
          outerRef={bodyScrollRef}
          height={listHeight}
          itemCount={rows.length}
          itemData={itemData}
          itemSize={bodyItemSize}
          innerElementType={BodyContainer}
          className='gm-table-x-virtualized gm-table-x-body-scroll'
          onScroll={() => {
            // react-window 纵向滚动；横向由 outer scroll 监听同步
            afterScroll()
          }}
        >
          {RenderBodyRow}
        </VariableSizeList>
        {loading && <Loading />}
        {!loading && data.length === 0 && <Empty />}
      </div>
    )
  }

  return (
    <div {...rest} className={rootClassName} onScroll={handleScroll}>
      <VariableSizeList
        ref={refVirtualized}
        height={virtualizedHeight}
        itemCount={rows.length + 1}
        itemData={itemData}
        itemSize={itemSize}
        innerElementType={Container}
        className='gm-table-x-virtualized'
      >
        {RenderRow}
      </VariableSizeList>
      {loading && <Loading />}
      {!loading && data.length === 0 && <Empty />}
    </div>
  )
}

TableXVirtualized.propTypes = {
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
  style: PropTypes.object,

  // 虚拟列表相关
  /** 需要提供 table 的高度 */
  virtualizedHeight: PropTypes.number.isRequired,
  /** 行的高度 */
  virtualizedItemSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
    .isRequired,
  refVirtualized: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

TableXVirtualized.defaultProps = {
  keyField: 'value',
  tiled: false,
  isTrDisable: () => false,
  isTrHighlight: () => false
}

export default TableXVirtualized
