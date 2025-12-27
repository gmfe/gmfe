import {
  TABLE_X_SELECT_ID,
  TABLE_X_DIY_ID,
  TABLE_X_EXPAND_ID
} from '../../util'

/**
 * 检查一级表头下的子列 fixed 状态是否一致
 */
function validateSubColumnsFixed(column) {
  if (!column.subColumns || column.subColumns.length === 0) {
    return { valid: true }
  }

  const subColumns = column.subColumns
  const fixedStates = subColumns.map(subCol => {
    return subCol.fixed !== undefined ? subCol.fixed : column.fixed
  })

  const firstFixed = fixedStates[0]
  const allSame = fixedStates.every(fixed => fixed === firstFixed)

  if (!allSame) {
    return {
      valid: false,
      error:
        `一级表头 "${column.Header || column.id}" 下的子列 fixed 状态不一致。` +
        `为了避免滚动时表头宽度错位，请确保同一一级表头下的所有子列要么全部固定，要么全部不固定。`
    }
  }

  return { valid: true }
}

/**
 * 将带有 subColumns 的 columns 转换为 react-table 可以理解的嵌套结构
 * 输入：[{ Header: '菜品信息', subColumns: [...] }]
 * 输出：[{ Header: '菜品信息', columns: [...] }] (react-table 格式)
 */
export function transformColumnsForTwoLevel(columns) {
  const transformedColumns = []
  const firstLevelHeaders = []
  const specialColumnIds = [
    TABLE_X_SELECT_ID,
    TABLE_X_DIY_ID,
    TABLE_X_EXPAND_ID
  ]

  columns.forEach((column, index) => {
    // 特殊列（由其他 HOC 添加）直接添加，不进行转换
    if (specialColumnIds.includes(column.id)) {
      transformedColumns.push(column)
      firstLevelHeaders.push({
        ...column,
        hasSubColumns: false,
        subColumnCount: 1,
        isSpecialColumn: true
      })
      return
    }

    if (column.subColumns && column.subColumns.length > 0) {
      // 过滤可见的子列
      const visibleSubCols = column.subColumns.filter(
        subCol => subCol.show !== false
      )

      // 如果所有子列都被隐藏，跳过这个一级表头
      if (visibleSubCols.length === 0) {
        return
      }

      // 验证 fixed 状态（使用可见的子列）
      const validation = validateSubColumnsFixed({
        ...column,
        subColumns: visibleSubCols
      })
      if (!validation.valid) {
        console.error(
          `[TwoLevelTableX] 配置错误 (第 ${index + 1} 个列):`,
          validation.error
        )
        if (process.env.NODE_ENV === 'development') {
          throw new Error(validation.error)
        }
      }

      firstLevelHeaders.push({
        ...column,
        hasSubColumns: true,
        subColumnCount: visibleSubCols.length // 使用可见子列的数量
      })

      // 确定统一的 fixed 状态（使用可见的子列）
      const unifiedFixed =
        visibleSubCols[0]?.fixed !== undefined
          ? visibleSubCols[0].fixed
          : column.fixed !== undefined
          ? column.fixed
          : undefined

      // 转换为 react-table 的嵌套结构（只使用可见的子列）
      transformedColumns.push({
        Header: column.Header,
        id: column.id || `group_${transformedColumns.length}`,
        fixed: unifiedFixed,
        columns: visibleSubCols.map(subCol => ({
          ...subCol,
          fixed: subCol.fixed !== undefined ? subCol.fixed : unifiedFixed
        }))
      })
    } else {
      // 没有 subColumns，直接添加（会占两行）
      firstLevelHeaders.push({
        ...column,
        hasSubColumns: false,
        subColumnCount: 1
      })

      transformedColumns.push(column)
    }
  })

  return { transformedColumns, firstLevelHeaders }
}
