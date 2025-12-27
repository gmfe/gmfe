import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { flattenColumnsForSelectAndDiy } from './two_level_header_table_x/flatten_helper'

/**
 * 两级表头 HOC
 * 功能：将带 subColumns 的 columns 扁平化，传递给内部 Component 处理
 *
 * 使用方式：
 * const TwoLevelTable = twoLevelHeaderTableXHOC(
 *   selectTableXHOC(
 *     diyTableXHOC(TwoLevelTableX)
 *   )
 * )
 *
 * 注意：内部 Component（TwoLevelTableX）只需要接收 columns prop（已扁平化，包含 parentKey、parentHeader、parentFixed）
 */
function twoLevelHeaderTableXHOC(Component) {
  const TwoLevelHeaderTableXWrapper = props => {
    const { columns: originalColumns, ...rest } = props

    // 扁平化 columns（用于 select 和 diy 处理，每个 subColumn 会添加 parentKey、parentHeader、parentFixed）
    const flattenedColumns = useMemo(() => {
      return flattenColumnsForSelectAndDiy(originalColumns)
    }, [originalColumns])

    // 传递给内部 Component
    return <Component {...rest} columns={flattenedColumns} />
  }

  TwoLevelHeaderTableXWrapper.propTypes = {
    columns: PropTypes.array.isRequired
  }

  return TwoLevelHeaderTableXWrapper
}

export default twoLevelHeaderTableXHOC
