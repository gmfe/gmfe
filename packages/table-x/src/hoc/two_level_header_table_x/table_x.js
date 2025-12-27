import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import { Empty, Loading, afterScroll, __DEFAULT_COLUMN } from '../../util'
import classNames from 'classnames'
import _ from 'lodash'
import TwoLevelTHead from './thead'
import Tr from '../../base/tr'
import { rebuildNestedColumnsFromFlat } from './rebuild_helper'
import { transformColumnsForTwoLevel } from './transform_helper'

const defaultColumn = __DEFAULT_COLUMN

/**
 * 支持两级表头的 TableX 组件
 *
 * 接收：
 *   - columns: 处理后的扁平 columns（经过 select、diy HOC 处理，每个 subColumn 都带有 parentKey、parentHeader、parentFixed 属性）
 *
 * 功能：
 *   1. 根据 parentKey 重建嵌套结构
 *   2. 转换为 react-table 格式
 *   3. 使用 TwoLevelTHead 渲染两级表头
 */
const TwoLevelTableX = ({
  columns, // 处理后的扁平 columns
  data,
  loading,
  SubComponent,
  keyField = 'value',
  className,
  tiled = false,
  onScroll,
  isTrDisable = () => false,
  isTrHighlight = () => false,
  ...rest
}) => {
  // 步骤1: 根据扁平化的 columns 重建嵌套结构
  const rebuiltColumns = useMemo(() => {
    return rebuildNestedColumnsFromFlat(columns)
  }, [columns])

  // 步骤2: 转换为 react-table 格式
  const { transformedColumns, firstLevelHeaders } = useMemo(() => {
    return transformColumnsForTwoLevel(rebuiltColumns)
  }, [rebuiltColumns])

  // 步骤3: 过滤隐藏的列（与原 TableX 逻辑一致）
  const visibleColumns = useMemo(() => {
    return transformedColumns.filter(c => c.show !== false)
  }, [transformedColumns])

  // 步骤4: 使用 react-table 处理列和数据（与原 TableX 逻辑一致）
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow
  } = useTable({
    columns: visibleColumns,
    data,
    defaultColumn
  })

  // 步骤5: 计算总宽度（与原 TableX 逻辑完全一致）
  let totalWidth = 0
  if (rows[0] && rows[0].cells.length > 0) {
    prepareRow(rows[0])
    const last = rows[0].cells[rows[0].cells.length - 1].column
    totalWidth = last.totalLeft + last.totalWidth
  }

  // 步骤6: 准备 table props
  // 注意：对于 display: table，minWidth 可能不会自动扩展，需要同时设置 width: 100% 来撑满容器
  const gtp = getTableProps()
  const tableStyle =
    totalWidth > 0
      ? { width: '100%', minWidth: totalWidth + 'px' }
      : { width: '100%' }

  const tableProps = {
    ...gtp,
    style: tableStyle,
    className: classNames(
      'gm-table-x-table',
      'gm-table-x-table-two-level',
      gtp.className
    )
  }

  const gtbp = getTableBodyProps()
  const tableBodyProps = {
    ...gtbp,
    className: 'gm-table-x-tbody'
  }

  const handleScroll = e => {
    onScroll && onScroll(e)
    afterScroll()
  }

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

  return (
    <div
      {...rest}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled
        },
        className
      )}
      onScroll={handleScroll}
    >
      <table {...tableProps}>
        <TwoLevelTHead
          headerGroups={headerGroups}
          firstLevelHeaders={firstLevelHeaders}
          totalWidth={totalWidth}
        />
        <tbody {...tableBodyProps}>
          {_.map(rows, row =>
            RenderRow({
              index: row.index,
              style: {}
            })
          )}
        </tbody>
      </table>
      {loading && <Loading />}
      {!loading && data.length === 0 && <Empty />}
    </div>
  )
}

TwoLevelTableX.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  SubComponent: PropTypes.func,
  keyField: PropTypes.string,
  tiled: PropTypes.bool,
  isTrDisable: PropTypes.func,
  isTrHighlight: PropTypes.func,
  onScroll: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

TwoLevelTableX.defaultProps = {
  keyField: 'value',
  tiled: false,
  isTrDisable: () => false,
  isTrHighlight: () => false
}

export default TwoLevelTableX
