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
  // 重要：二级分类的 fixed 应该与一级分类保持一致
  // 所以验证时，所有子列应该使用一级表头的 fixed（column.fixed）
  const expectedFixed = column.fixed !== undefined ? column.fixed : undefined
  const fixedStates = subColumns.map(subCol => {
    // 子列的 fixed 应该与一级表头一致，如果有不一致的，记录实际的 fixed 用于检查
    return subCol.fixed !== undefined ? subCol.fixed : expectedFixed
  })

  const allSame = fixedStates.every(fixed => fixed === expectedFixed)

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

  // 分离普通列和特殊列（特殊列需要单独处理）
  const normalColumns = []
  const specialColumns = []

  columns.forEach(column => {
    if (specialColumnIds.includes(column.id)) {
      specialColumns.push(column)
    } else {
      normalColumns.push(column)
    }
  })

  // 处理普通列（保持原始顺序）
  normalColumns.forEach((column, index) => {
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

      // 确定统一的 fixed 状态
      // 重要：只使用一级表头的 fixed 属性，二级分类的 fixed 应该与一级分类保持一致
      const unifiedFixed = column.fixed !== undefined ? column.fixed : undefined

      // 转换为 react-table 的嵌套结构（只使用可见的子列）
      transformedColumns.push({
        Header: column.Header,
        id: column.id || `group_${transformedColumns.length}`,
        fixed: unifiedFixed,
        columns: visibleSubCols.map(subCol => {
          // 移除子列自己的 fixed 属性，强制使用一级表头的 fixed
          const { fixed: _subColFixed, ...subColWithoutFixed } = subCol
          return {
            ...subColWithoutFixed,
            fixed: unifiedFixed // 二级分类的 fixed 与一级分类保持一致
          }
        })
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

  // 处理特殊列（select、diy、expand）
  // 特殊列需要根据它们的 fixed 属性来决定位置
  // fixed: 'left' 的特殊列（如 diy）需要放在最前面
  // 其他特殊列放在最后
  const leftFixedSpecialColumns = specialColumns.filter(
    col => col.fixed === 'left'
  )
  const otherSpecialColumns = specialColumns.filter(col => col.fixed !== 'left')

  // 处理 fixed: 'left' 的特殊列，放在最前面（使用倒序遍历 + unshift 保持顺序）
  for (let i = leftFixedSpecialColumns.length - 1; i >= 0; i--) {
    const column = leftFixedSpecialColumns[i]
    transformedColumns.unshift(column)
    firstLevelHeaders.unshift({
      ...column,
      hasSubColumns: false,
      subColumnCount: 1,
      isSpecialColumn: true
    })
  }

  // 处理其他特殊列，放在最后
  // 注意：移除特殊列的 fixed: 'left' 属性，让它们按数组顺序显示在最后（不固定）
  // 如果用户需要特殊列固定在右边，可以手动设置 fixed: 'right'
  otherSpecialColumns.forEach(column => {
    const { fixed, ...columnWithoutFixed } = column
    const adjustedColumn = {
      ...columnWithoutFixed,
      // 特殊列应该在最后，移除 fixed: 'left'，让它们按数组顺序显示
      // 如果需要固定在右边，可以改为 fixed: 'right'
      fixed: fixed === 'left' ? undefined : fixed
    }
    transformedColumns.push(adjustedColumn)
    firstLevelHeaders.push({
      ...adjustedColumn,
      hasSubColumns: false,
      subColumnCount: 1,
      isSpecialColumn: true
    })
  })

  return { transformedColumns, firstLevelHeaders }
}
