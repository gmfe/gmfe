import classNames from 'classnames'
import { getColumnStyle, SortHeader, Resizer } from '../util'
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

  const handleMouseDown = column._onResize
    ? e => {
        e.preventDefault()
        e.stopPropagation()
        const startX = e.pageX
        // 使用 DOM 实际渲染宽度，而非 react-table 的 totalWidth（未显式设置宽度时该值为默认值 17.77）
        const startWidth = e.currentTarget.parentElement.offsetWidth
        const minWidth = Math.max(column.minWidth, 48)

        const handleMouseMove = e => {
          const newWidth = Math.max(startWidth + e.pageX - startX, minWidth)
          column._onResize(column.id, newWidth)
        }

        const handleMouseUp = () => {
          document.body.style.cursor = ''
          document.body.style.userSelect = ''
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
    : undefined

  return (
    <th {...thProps}>
      {column.render('Header')}
      {column.canSort && (
        <SortHeader
          {...column.getSortByToggleProps()}
          type={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : null}
        />
      )}
      {column._onResize && (
        <Resizer
          onMouseDown={handleMouseDown}
          onClick={e => e.stopPropagation()}
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
