import React, { HTMLAttributes, TableHTMLAttributes, UIEvent, CSSProperties } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { TableXProps } from '../types'
import { useInitTable, afterScroll } from '../utils'
import { Empty, Loading } from '../components'
import Thead from './thead'
import Tr from './tr'

function TableX<Original extends object>({
  columns,
  data,
  loading,
  SubComponent,
  keyField = 'value' as keyof Original,
  className,
  tiled,
  onScroll,
  isTrHighlight = () => false,
  isTrDisable = () => false,
  id = _.uniqueId('TABLE-X-'),
  ...rest
}: TableXProps<Original>) {
  const {
    getTableProps,
    getTableBodyProps,
    totalWidth,
    prepareRow,
    headerGroups,
    rows,
  } = useInitTable<Original>(columns, data)

  const gtp = getTableProps()
  const tableProps: TableHTMLAttributes<HTMLTableElement> = {
    ...gtp,
    style: { minWidth: `${totalWidth}px` },
    className: classNames('gm-table-x-table', gtp.className),
  }

  const gtbp = getTableBodyProps()
  const tableBodyProps: HTMLAttributes<HTMLTableSectionElement> = {
    ...gtbp,
    className: 'gm-table-x-tbody',
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    onScroll && onScroll(event)
    afterScroll()
  }

  const renderRow = ({ index, style }: { index: number; style: CSSProperties }) => {
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
        isTrHighlight={isTrHighlight}
        isTrDisable={isTrDisable}
      />
    )
  }

  return (
    <div
      id={id}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled,
        },
        className
      )}
      {...rest}
      onScroll={handleScroll}
    >
      <table {...tableProps}>
        <Thead headerGroups={headerGroups} totalWidth={totalWidth} />
        <tbody {...tableBodyProps}>
          {rows.map((row) => renderRow({ index: row.index, style: {} }))}
        </tbody>
      </table>
      {loading && <Loading />}
      {!loading && !data.length && <Empty />}
    </div>
  )
}

export default TableX
