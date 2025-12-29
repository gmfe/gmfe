import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

/**
 * 递归过滤嵌套结构中的 show === false 的列
 * 如果一级分类的 show === false，递归设置所有子列的 show = false
 */
function filterColumnsByShow(columns) {
  return columns
    .map(column => {
      // 如果有 subColumns，递归处理
      if (column.subColumns && column.subColumns.length > 0) {
        // 如果一级分类 show === false，递归设置所有子列 show = false
        if (column.show === false) {
          const filteredSubCols = column.subColumns.map(subCol => ({
            ...subCol,
            show: false
          }))
          return {
            ...column,
            subColumns: filteredSubCols
          }
        } else {
          // 如果一级分类显示，递归过滤子列
          const filteredSubCols = filterColumnsByShow(column.subColumns).filter(
            subCol => subCol.show !== false
          )
          // 如果所有子列都被隐藏，整个一级分类也应该隐藏
          if (filteredSubCols.length === 0) {
            return null
          }
          return {
            ...column,
            subColumns: filteredSubCols
          }
        }
      } else {
        // 没有 subColumns，直接返回（如果是 show === false，会在后面被过滤掉）
        return column
      }
    })
    .filter(column => column !== null && column.show !== false)
}

/**
 * 两级表头 HOC
 * 功能：过滤嵌套结构中的 show === false 的列，然后传递给内部 Component 处理
 *
 * 使用方式
 * const TwoLevelTable = diyTableXHOC(
 *   twoLevelHeaderTableXHOC(TwoLevelTableX)
 * )
 */
function twoLevelHeaderTableXHOC(Component) {
  const TwoLevelHeaderTableXWrapper = props => {
    const { columns: originalColumns, ...rest } = props
    const filteredColumns = useMemo(() => {
      // 过滤掉 show === false 的列（递归处理嵌套结构）
      // 返回的仍然是嵌套结构
      return filterColumnsByShow(originalColumns)
    }, [originalColumns])

    return <Component {...rest} columns={filteredColumns} />
  }

  TwoLevelHeaderTableXWrapper.propTypes = {
    columns: PropTypes.array.isRequired
  }

  return TwoLevelHeaderTableXWrapper
}

export default twoLevelHeaderTableXHOC
