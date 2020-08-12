import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { Row } from 'react-table'
import classNames from 'classnames'
import { typedMemo } from '../utils'
import Td from './td'

export interface TrProps<Original extends object> {
  row: Row<Original>
  SubComponent?(row: Row<Original>): ReactNode
  keyField: keyof Original
  style: CSSProperties
  totalWidth: number
  isTrDisable(original: Original, index: number): boolean
  isTrHighlight(original: Original, index: number): boolean
}

function Tr<Original extends object>({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable,
  isTrHighlight,
}: TrProps<Original>) {
  // 手动设置active态
  const props: HTMLAttributes<HTMLTableRowElement> = {
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      'gm-table-x-tr-highlight': isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0,
    }),
  }

  // 目前视为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const dataId = row.original[keyField]
  return (
    <>
      <tr data-id={dataId} {...props}>
        {row.cells.map((cell, index) => (
          <Td key={index} totalWidth={totalWidth} cell={cell} />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

Tr.whyDidYouRender = true

export default typedMemo(Tr)
