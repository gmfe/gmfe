import React, { ComponentType, FC, useMemo } from 'react'
import { TableXProps } from '@gmfe/table-x'
import { devWarnForHook } from '@gm-common/tool'

import { KeyboardTableXColumn, KeyboardTableXProps } from '../types'
import { getColumnKey, CellKeyContext } from '../utils'
import Wrap from '../components/wrap'

function keyboardTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  /**
   * 要求 props 是 id 和 onAddRow。
   * and column 需要标志 isKeyboard，同时需要 accessor or id
   * and 如果是 fixed，则需要提供 width，focus 的时候如果在 fixed 遮挡则需要滚动到可视区域，这时候就要用到 width 了
   * */
  const KeyboardTableX: FC<Props & KeyboardTableXProps<Original>> = ({
    id,
    onAddRow,
    onBeforeDispatch,
    ...tableProps
  }) => {
    const { data, columns } = tableProps

    // 检测下 columns
    // 需要提供能够 accessor or id
    // 用 isKeyboard 也必要会用到了 Cell
    devWarnForHook(() => {
      columns.forEach((column: KeyboardTableXColumn<Original>) => {
        if (column.isKeyboard && column.show !== false) {
          if (getColumnKey<Original>(column) === null) {
            console.error('column need accessor or id', column)
          } else if (!column.Cell) {
            console.error('column need Cell', column)
          }
        }

        if (column.fixed && !column.width) {
          console.error('column fixed need width', column)
        }
      })
    })

    // Cell 会产生新组建，所以需要 useMemo
    const { columnKeys, newColumns } = useMemo(() => {
      const columnKeys: string[] = []
      const newColumns = columns.map((column: KeyboardTableXColumn<Original>) => {
        if (!column.isKeyboard && column.show !== false) return column
        const columnKey: string = getColumnKey<Original>(column) as string
        columnKeys.push(columnKey)

        const oldCell = column.Cell

        // Cell 是个方法
        // 用 <Cell {...cellProps}/> 会导致重新渲染组件，不知道为什么

        return {
          ...column,
          Cell: (cellProps: any) => (
            <CellKeyContext.Provider value={`${cellProps.row.index}_${columnKey}`}>
              {oldCell(cellProps)}
            </CellKeyContext.Provider>
          ),
        }
      })
      return { columnKeys, newColumns }
    }, [columns])

    // fix hoc 带来的问题
    let leftFixedWidth = 0
    let rightFixedWidth = 0
    useMemo(() => {
      columns.forEach((column: KeyboardTableXColumn<Original>) => {
        if (column.show !== false) {
          if (column.fixed === 'left' && column.width) {
            leftFixedWidth += column.width as number
          } else if (column.fixed === 'right' && column.width) {
            rightFixedWidth += column.width as number
          }
        }
      })
    }, [columns])

    return (
      <Wrap
        id={id}
        columnKeys={columnKeys}
        fixedWidths={{ leftFixedWidth, rightFixedWidth }}
        dataLength={data.length}
        onAddRow={onAddRow}
        onBeforeDispatch={onBeforeDispatch}
      >
        <Table {...(tableProps as any)} id={id} columns={newColumns} />
      </Wrap>
    )
  }

  return KeyboardTableX
}

export default keyboardTableXHOC
