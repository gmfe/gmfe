import React, { useMemo } from 'react'
import { TableXColumn } from '../../types'
import { TABLE_X, TABLE_X_SELECT_ID } from '../../utils'
import SelectHeader from './header'
import SelectCell from './cell'
import { CellProps } from 'react-table'

function useGetColumns<Original extends object>(
  columns: TableXColumn<Original>[],
  fixedSelect: boolean,
  selectType: 'checkbox' | 'radio',
  keyField: keyof Original,
  isSelectorDisable: (item: Original) => boolean
): TableXColumn<Original>[] {
  return useMemo(
    () => [
      {
        id: TABLE_X_SELECT_ID,
        width: TABLE_X.WIDTH_FUN,
        maxWidth: TABLE_X.WIDTH_FUN,
        thClassName: 'gm-table-x-icon',
        tdClassName: 'gm-table-x-icon',
        fixed: fixedSelect ? 'left' : null,
        Header: () => <SelectHeader selectType={selectType} />,
        Cell: ({ row }: CellProps<Original>) => (
          <SelectCell
            keyField={keyField}
            selectType={selectType}
            row={row}
            isSelectorDisable={isSelectorDisable}
          />
        ),
      },
      ...columns,
    ],
    [columns]
  )
}

export default useGetColumns
