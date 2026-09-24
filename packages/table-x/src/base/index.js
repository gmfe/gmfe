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

  // 行渲染结果缓存：rows/渲染参数引用不变时直接复用上一次的 tbodyRows，
  // 避免「与行无关的重渲染（如勾选）」重复执行 prepareRow + 全量行元素构建。
  // prepareRow 每次都会重建 cell 对象，导致 React.memo(Td) 失效，因此必须在
  // 「构建」这一层做缓存，而不是依赖行内 memo。
  // 注意 1：缓存对象整体替换（不用 ref.current 扩展属性，React 会冻结 current，不可追加键）
  // 注意 2（使用约束）：本缓存以 data 引用为失效键。调用方更新数据必须「整组替换」
  // （新数组引用）；若保持数组引用不变、原地修改行字段（如 store.data[i].status = 2），
  // 普通（非 mobx observer）Cell 将显示旧值。开发态下方 devWarn 会采样检测并提示。
  // 注意 3（使用约束）：isTrDisable/isTrHighlight 回调应仅依赖 row 数据本身派生；
  // 若读取 data 之外的可变状态（页面 state/store），缓存命中期间行禁用/高亮态不会刷新。
  const tbodyRowsCacheRef = useRef(null)
  const cache = tbodyRowsCacheRef.current
  let tbodyRows =
    cache &&
    cache.rows === rows &&
    cache.SubComponent === SubComponent &&
    cache.totalWidth === totalWidth &&
    cache.keyField === keyField &&
    cache.isTrDisable === isTrDisable &&
    cache.isTrHighlight === isTrHighlight
      ? cache.tbodyRows
      : null

  // 开发态防线：缓存命中（rows 未重建）但 data 是新引用时——
  // 说明调用方在 data 变化后本组件重渲染，但 react-table 因列/行模型依赖
  // 未变而没有重建 rows。采样快照对比，检测「同引用行上的字段变化」并告警。
  if (
    process.env.NODE_ENV === 'development' &&
    cache &&
    tbodyRows &&
    cache.data !== data &&
    data.length > 0
  ) {
    const sampleIndex = [0, Math.floor(data.length / 2), data.length - 1]
    for (const i of sampleIndex) {
      const cachedRow = cache.data && cache.data[i]
      const currentRow = data[i]
      // 行引用相同但渲染缓存未失效 → 该行的字段若被原地修改将不会反映到界面
      if (
        cachedRow === currentRow &&
        !_.isEmpty(currentRow) &&
        _.some(currentRow, (v, k) => cache.rowSnapshots && cache.rowSnapshots[i] && cache.rowSnapshots[i][k] !== v)
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          `[gm-table-x] 检测到第 ${i} 行数据被原地修改但 data 数组引用未变，行渲染缓存不会刷新，` +
            `请改为整组替换 data（如 this.data = [...this.data]）。位置索引：${i}`
        )
        break
      }
    }
  }

  if (!tbodyRows) {
    tbodyRows = _.map(rows, row =>
      RenderRow({
        index: row.index,
        style: {}
      })
    )
    // 开发态快照：记录采样行的字段值，供下次缓存命中时做原地变更检测
    let rowSnapshots = null
    if (process.env.NODE_ENV === 'development' && data.length > 0) {
      rowSnapshots = {}
      ;[0, Math.floor(data.length / 2), data.length - 1].forEach(i => {
        rowSnapshots[i] = { ...data[i] }
      })
    }
    tbodyRowsCacheRef.current = {
      tbodyRows,
      rows,
      SubComponent,
      totalWidth,
      keyField,
      isTrDisable,
      isTrHighlight,
      data,
      rowSnapshots
    }
  }

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
