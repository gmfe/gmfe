import { TableXColumn } from '../types'
import { __DEFAULT_COLUMN } from './constant'
import { useMemo } from 'react'
import { useTable } from 'react-table'

// 给定初始值，交由getColumnStyle控制。width逻辑保持跟react-table（v6）的用法一致。
const defaultColumn = __DEFAULT_COLUMN

function useInitTable<Original extends object>(
  columns: TableXColumn<Original>[],
  data: Original[]
) {
  // 自己实现隐藏显示
  columns = useMemo(() => columns.filter((column) => column.show !== false), [columns])
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } = useTable<Original>({
    data,
    columns,
    defaultColumn,
  })
  let totalWidth = 0
  if (rows[0] && rows[0].cells.length > 0) {
    prepareRow(rows[0])
    const last = rows[0].cells[rows[0].cells.length - 1].column
    totalWidth = last.totalLeft + last.totalWidth
  }

  return { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups, totalWidth }
}

export default useInitTable
