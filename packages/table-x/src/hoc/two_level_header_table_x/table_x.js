import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import { Empty, Loading, afterScroll, __DEFAULT_COLUMN } from '../../util'
import classNames from 'classnames'
import _ from 'lodash'
import TwoLevelTHead from './thead'
import Tr from './tr'
import { transformColumnsForTwoLevel } from './transform_helper'

const defaultColumn = __DEFAULT_COLUMN

/**
 * 支持两级表头的 TableX 组件
 */
const TwoLevelTableX = ({
  columns,
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
  const { transformedColumns, firstLevelHeaders } = useMemo(() => {
    return transformColumnsForTwoLevel(columns)
  }, [columns])

  const visibleColumns = useMemo(() => {
    return transformedColumns.filter(c => c.show !== false)
  }, [transformedColumns])

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

  let totalWidth = 0
  if (rows[0] && rows[0].cells.length > 0) {
    prepareRow(rows[0])
    const last = rows[0].cells[rows[0].cells.length - 1].column
    totalWidth = last.totalLeft + last.totalWidth
  }

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
        'gm-table-x-two-level',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled
        },
        className
      )}
      onScroll={handleScroll}
      style={{
        // 设置 CSS 变量，用于 Mask 组件
        '--gm-table-x-header-height': '92px',
        ...rest.style
      }}
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
