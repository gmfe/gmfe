import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  memo,
  TableHTMLAttributes,
  UIEvent,
  useMemo,
} from 'react'
import { areEqual, ReactElementType, VariableSizeList } from 'react-window'
import _ from 'lodash'
import classNames from 'classnames'
import { useInitTable, afterScroll, TABLE_X } from '../utils'
import { TableXVirtualizedProps } from '../types'
import { Empty, Loading } from '../components'
import Thead from './thead'
import Tr from './tr'

function TableXVirtualized<Original extends object>({
  columns,
  data,
  loading,
  SubComponent,
  keyField,
  className,
  tiled,
  onScroll,
  isTrDisable = () => false,
  isTrHighlight = () => false,

  virtualizedHeight,
  virtualizedItemSize,
  refVirtualized,
  ...rest
}: TableXVirtualizedProps<Original>) {
  const {
    getTableBodyProps,
    getTableProps,
    rows,
    prepareRow,
    headerGroups,
    totalWidth,
  } = useInitTable<Original>(columns, data)

  const gtp = getTableProps()
  const tableProps: TableHTMLAttributes<HTMLTableElement> = {
    ...gtp,
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

  const itemSize = (index: number): number => {
    if (index === 0) {
      return TABLE_X.HEIGHT_HEAD_TR
    }
    if (_.isFunction(virtualizedItemSize)) {
      return virtualizedItemSize(index - 1)
    }
    return virtualizedItemSize
  }

  const Container = useMemo((): ReactElementType => {
    const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
      ({ children, style, ...rest }, ref) => {
        return (
          <table
            ref={ref}
            {...rest}
            {...tableProps}
            style={{ ...style, minWidth: `${totalWidth}px` }}
          >
            <Thead totalWidth={totalWidth} headerGroups={headerGroups} />
            <tbody {...tableBodyProps}>{children}</tbody>
          </table>
        )
      }
    )
    Table.displayName = 'Table'
    return Table
  }, [columns, totalWidth])

  const itemData = {
    rows,
    prepareRow,
    SubComponent,
    keyField,
    totalWidth,
    isTrDisable,
    isTrHighlight,
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
      <VariableSizeList
        ref={refVirtualized}
        itemSize={itemSize}
        itemData={itemData}
        height={virtualizedHeight}
        itemCount={rows.length + 1}
        innerElementType={Container}
        width='100%'
        className='gm-table-x-virtualized'
      >
        {RenderRow}
      </VariableSizeList>
      {loading && <Loading />}
      {!loading && !data.length && <Empty />}
    </div>
  )
}

export default TableXVirtualized

interface RenderRowProps {
  data: any
  index: number
  style: CSSProperties
}
const RenderRow = memo(({ data, index, style }: RenderRowProps) => {
  if (index === 0) {
    return <div style={style} />
  }

  index = index - 1

  const {
    prepareRow,
    rows,
    SubComponent,
    keyField,
    isTrDisable,
    isTrHighlight,
    totalWidth,
  } = data
  const row = rows[index]
  prepareRow(row)
  return (
    <Tr
      key={row.index}
      totalWidth={totalWidth}
      row={row}
      SubComponent={SubComponent}
      keyField={keyField as never}
      style={style}
      isTrDisable={isTrDisable}
      isTrHighlight={isTrHighlight}
    />
  )
}, areEqual)

RenderRow.displayName = 'RenderRow'
