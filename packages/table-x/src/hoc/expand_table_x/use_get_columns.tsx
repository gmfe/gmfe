import React, { useMemo } from 'react'
import { TableXColumn } from '../../types'
import { TABLE_X, TABLE_X_EXPAND_ID } from '../../utils'
import ExpandHeader from './header'
import ExpandCell from './cell'
import { CellProps } from 'react-table'

function useGetColumns<Original extends object>(
  columns: TableXColumn<Original>[],
  fixedExpand: boolean
): TableXColumn<Original>[] {
  return useMemo(
    () => [
      {
        id: TABLE_X_EXPAND_ID,
        width: TABLE_X.WIDTH_FUN,
        maxWidth: TABLE_X.WIDTH_FUN,
        fixed: fixedExpand ? 'left' : null,
        thClassName: 'gm-table-x-icon',
        tdClassName: 'gm-table-x-icon',
        Header: () => <ExpandHeader />,
        Cell: ({ row }: CellProps<Original>) => <ExpandCell row={row} />,
      },
      ...columns,
    ],
    [columns]
  )
}

export default useGetColumns
