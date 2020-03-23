import classNames from 'classnames'
import { getColumnStyle, SortHeader } from '../util'
import PropTypes from 'prop-types'
import React from 'react'

const Th = ({ column, totalWidth }) => {
  const hp = column.getHeaderProps()
  const { thClassName, style } = column
  const thProps = {
    ...hp,
    className: classNames('gm-table-x-th', hp.className, thClassName, {
      'gm-table-x-fixed-left': column.fixed === 'left',
      'gm-table-x-fixed-right': column.fixed === 'right'
    }),
    style: {
      ...hp.style,
      ...style,
      ...getColumnStyle(column)
    }
  }

  if (column.fixed === 'left') {
    thProps.style.left = column.totalLeft
  } else if (column.fixed === 'right') {
    thProps.style.right = totalWidth - column.totalLeft - column.totalWidth
  }

  return (
    <th {...thProps}>
      {column.render('Header')}
      {column.canSort && (
        <SortHeader
          {...column.getSortByToggleProps()}
          type={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : null}
        />
      )}
    </th>
  )
}

Th.whyDidYouRender = true

Th.propTypes = {
  column: PropTypes.object.isRequired,
  totalWidth: PropTypes.number.isRequired
}

export default React.memo(Th)
