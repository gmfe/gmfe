import React, { ThHTMLAttributes } from 'react'
import classNames from 'classnames'
import { TableXColumnInstance } from '../types'
import { getColumnStyle, typedMemo } from '../utils'

interface ThProps<Original extends object> {
  column: TableXColumnInstance<Original>
  totalWidth: number
}

function Th<Original extends object>({ column, totalWidth }: ThProps<Original>) {
  const hp = column.getHeaderProps()
  const { thClassName, style } = column

  const thProps: ThHTMLAttributes<HTMLTableHeaderCellElement> = {
    ...hp,
    className: classNames('gm-table-x-th', hp.className, thClassName, {
      'gm-table-x-fixed-left': column.fixed === 'left',
      'gm-table-x-fixed-right': column.fixed === 'right',
    }),
    style: {
      ...hp.style,
      ...style,
      ...getColumnStyle(column),
    },
  }

  if (column.fixed === 'left') {
    thProps.style!.left = column.totalLeft
  } else if (column.fixed === 'right') {
    thProps.style!.right = totalWidth - column.totalLeft - column.totalWidth
  }

  return <th {...thProps}>{column.render('Header')}</th>
}

Th.whyDidYouRender = true

export default typedMemo(Th)
