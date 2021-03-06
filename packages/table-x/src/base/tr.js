import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Td from './td'

const Tr = ({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable,
  isTrHighlight,
}) => {
  const props = {
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      'gm-table-x-tr-highlight': isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0
    })
  }

  // 目前视为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const dataId = row.original[keyField]

  return (
    <>
      <tr data-id={dataId} {...props}>
        {row.cells.map((cell, cellIndex) => (
          <Td key={cellIndex} cell={cell} totalWidth={totalWidth} />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

Tr.whyDidYouRender = true

Tr.propTypes = {
  row: PropTypes.object.isRequired,
  SubComponent: PropTypes.func,
  keyField: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  totalWidth: PropTypes.number.isRequired,
  isTrDisable: PropTypes.func,
  isTrHighlight: PropTypes.func
}

export default React.memo(Tr)
