import classNames from 'classnames'
import { getColumnStyle } from '../util'
import PropTypes from 'prop-types'
import React from 'react'

// cell.render('Cell') 是一个react组件,如果这个组件return undefined,那就就会报错
// 这里是为了兼容 cell.render('Cell') 返回undefined的情况
class TdCatchErr extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.warn(error)
    console.warn(errorInfo.componentStack)
  }

  render() {
    return this.props.children
  }
}

const Td = ({ cell, totalWidth }) => {
  const cp = cell.getCellProps()
  const tdProps = {
    ...cp,
    className: classNames('gm-table-x-td', cell.column.className, {
      'gm-table-x-fixed-left': cell.column.fixed === 'left',
      'gm-table-x-fixed-right': cell.column.fixed === 'right'
    }),
    style: {
      ...cp.style,
      ...getColumnStyle(cell.column)
    }
  }

  if (cell.column.fixed === 'left') {
    // 用到 fixed，可以利用 totalLeft
    tdProps.style.left = cell.column.totalLeft
  } else if (cell.column.fixed === 'right') {
    tdProps.style.right =
      totalWidth - cell.column.totalLeft - cell.column.totalWidth
  }

  return (
    <td {...tdProps}>
      <TdCatchErr>{cell.render('Cell')}</TdCatchErr>
    </td>
  )
}

Td.whyDidYouRender = true

Td.propTypes = {
  cell: PropTypes.object.isRequired,
  totalWidth: PropTypes.number.isRequired
}

export default React.memo(Td)
