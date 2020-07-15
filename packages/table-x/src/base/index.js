import React from 'react'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import {
  Empty,
  Loading,
  afterScroll,
  __DEFAULT_COLUMN,
  sortTableXColumnsById,
} from '../util'
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
  columns = React.useMemo(
    () => sortTableXColumnsById(columns).filter((c) => c && c.show !== false),
    [columns]
  )

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
  })

  let totalWidth = 0
  if (rows[0] && rows[0].cells.length > 0) {
    prepareRow(rows[0])
    const last = rows[0].cells[rows[0].cells.length - 1].column
    totalWidth = last.totalLeft + last.totalWidth
  }

  const gtp = getTableProps()
  const tableProps = {
    ...gtp,
    style: { minWidth: totalWidth + 'px' },
    className: classNames('gm-table-x-table', gtp.className),
  }

  const gtbp = getTableBodyProps()
  const tableBodyProps = {
    ...gtbp,
    className: 'gm-table-x-tbody',
  }

  const handleScroll = (e) => {
    onScroll && onScroll(e)
    afterScroll()
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

  return (
    <div
      {...rest}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled,
        },
        className
      )}
      onScroll={handleScroll}
    >
      <table {...tableProps}>
        <THead headerGroups={headerGroups} totalWidth={totalWidth} />
        <tbody {...tableBodyProps}>
          {_.map(rows, (row) =>
            RenderRow({
              index: row.index,
              style: {},
            })
          )}
        </tbody>
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
  style: PropTypes.object,
}

TableX.defaultProps = {
  keyField: 'value',
  tiled: false,
  isTrDisable: () => false,
  isTrHighlight: () => false,
}

export default TableX
