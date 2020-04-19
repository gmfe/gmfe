import React, { Component, TdHTMLAttributes } from 'react'
import { Cell } from 'react-table'
import classNames from 'classnames'
import { typedMemo, getColumnStyle } from '../utils'
import { TableXColumnInstance } from '../types'

interface TdProps<Original extends object> {
  cell: Cell<Original>
  totalWidth: number
}

function Td<Original extends object>({ cell, totalWidth }: TdProps<Original>) {
  const column = cell.column as TableXColumnInstance<Original>
  const { tdClassName } = column
  const cp = cell.getCellProps()
  const tdProps: TdHTMLAttributes<HTMLTableDataCellElement> = {
    ...cp,
    className: classNames('gm-table-x-td', tdClassName, {
      'gm-table-x-fixed-left': column.fixed === 'left',
      'gm-table-x-fixed-right': column.fixed === 'right',
    }),
    style: {
      ...cp.style,
      ...getColumnStyle(cell.column),
    },
  }

  if (column.fixed === 'left') {
    // 用到 fixed，可以利用 totalLeft
    tdProps.style!.left = cell.column.totalLeft
  } else if (column.fixed === 'right') {
    tdProps.style!.right = totalWidth - cell.column.totalLeft - cell.column.totalWidth
  }

  return (
    <td {...tdProps}>
      <TdCacheError>{cell.render('Cell')}</TdCacheError>
    </td>
  )
}

Td.whyDidYouRender = true

export default typedMemo(Td)

class TdCacheError extends Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(`name: ${error.name}; message: ${error.message}; stack: ${error.stack}`)
    console.warn(errorInfo.componentStack)
  }

  render() {
    return this.props.children
  }
}
