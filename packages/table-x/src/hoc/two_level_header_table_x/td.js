import classNames from 'classnames'
import { getColumnStyle } from '../../util'
import PropTypes from 'prop-types'
import React from 'react'

// cell.render('Cell') 是一个react组件,如果这个组件return undefined,那就就会报错
// 这里是为了兼容 cell.render('Cell') 返回undefined的情况
class TdCatchErr extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // 捕获子组件树中的错误，返回新的 state
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 静默处理错误，不打印日志
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    const children = this.props.children
    // 如果 children 是 undefined 或 null，返回 null（React 允许返回 null）
    if (children === undefined || children === null) {
      return null
    }
    return children
  }
}

// 创建一个包装组件，用于包装 Cell 组件的 type，确保它总是返回有效值
// 这个组件会包装原始的 Cell 组件，如果原始组件返回 undefined，就返回 null
const SafeCellWrapper = OriginalComponent => {
  return function WrappedCell(props) {
    try {
      const result = OriginalComponent(props)
      // 如果原始组件返回 undefined，返回 null
      return result === undefined ? null : result
    } catch (error) {
      return null
    }
  }
}

// 错误边界组件，专门用于捕获 Cell 组件返回 undefined 的错误
class SafeCellErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 静默处理错误
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

const Td = ({ cell, totalWidth }) => {
  const cp = cell.getCellProps()
  const { tdClassName } = cell.column
  const tdProps = {
    ...cp,
    className: classNames('gm-table-x-td', tdClassName, {
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

  // 如果 Cell 返回 undefined，转换为 null（null 不会报错，undefined 会）
  let cellContent = cell.render('Cell')

  // cellContent 是一个 React 元素，但它的 type（组件）在渲染时可能返回 undefined
  // 我们需要用一个包装组件来替换原始的 type，确保总是返回有效值
  if (cellContent && React.isValidElement(cellContent)) {
    // 创建一个新的 React 元素，用包装组件替换原始的 type
    const OriginalComponent = cellContent.type
    const WrappedComponent = SafeCellWrapper(OriginalComponent)
    cellContent = React.createElement(
      SafeCellErrorBoundary,
      null,
      React.createElement(WrappedComponent, cellContent.props)
    )
  } else if (cellContent === undefined || cellContent === null) {
    cellContent = null
  }

  return (
    <td {...tdProps}>
      <TdCatchErr>{cellContent}</TdCatchErr>
    </td>
  )
}

Td.whyDidYouRender = true

Td.propTypes = {
  cell: PropTypes.object.isRequired,
  totalWidth: PropTypes.number.isRequired
}

export default React.memo(Td)
