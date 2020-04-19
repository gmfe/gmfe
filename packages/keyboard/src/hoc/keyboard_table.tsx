import React, { ComponentType, FC } from 'react'
import { TableXProps } from '@gmfe/table-x'
import { devWarnForHook } from '@gm-common/tool'

import { KeyboardTableXColumn, KeyboardTableXProps } from '../types'
import { getColumnKey, CellKeyContext } from '../utils'
import Wrap from '../components/wrap'

function keyboardTableHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const KeyboardTable: FC<Props & KeyboardTableXProps<Original>> = ({
    id,
    onAddRow,
    onBeforeDispatch,
    ...tableProps
  }) => {
    const { data, columns } = tableProps
    const keyboardColumns = columns.filter(
      (column: KeyboardTableXColumn<Original>) =>
        column.isKeyboard && column.show !== false
    )

    devWarnForHook(() => {
      keyboardColumns.forEach((column) => {
        if (getColumnKey<Original>(column) === null) {
          console.error('column need accessor or id', column)
        } else if (!column.Cell) {
          console.error('column need Cell', column)
        }
      })
    })

    const columnKeys: string[] = []
    const newColumns = columns.map((column: KeyboardTableXColumn<Original>) => {
      if (!(column.isKeyboard && column.show !== false)) return column
      const columnKey = getColumnKey<Original>(column)
      columnKeys.push(columnKey!)

      const oldCell = column.Cell

      return {
        ...column,
        Cell: (cellProps: any) => (
          <CellKeyContext.Provider value={`${cellProps.index}_${columnKey}`}>
            {oldCell(cellProps)}
          </CellKeyContext.Provider>
        ),
      }
    })

    let leftFixedWidth = 0
    let rightFixedWidth = 0
    columns.forEach((column: KeyboardTableXColumn<Original>) => {
      if (column.show !== false) {
        if (column.fixed === 'left' && column.width) {
          leftFixedWidth += column.width as number
        } else if (column.fixed === 'right' && column.width) {
          rightFixedWidth += column.width as number
        }
      }
    })

    return (
      <Wrap
        id={id}
        onAddRow={onAddRow}
        columnKeys={columnKeys}
        dataLength={data.length}
        fixedWidths={{ leftFixedWidth, rightFixedWidth }}
        onBeforeDispatch={onBeforeDispatch}
      >
        <Table columns={newColumns} {...(tableProps as any)} id={id} />
      </Wrap>
    )
  }

  return KeyboardTable
}

export default keyboardTableHOC
