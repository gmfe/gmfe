import {
  TABLE_X_SELECT_ID,
  TABLE_X_DIY_ID,
  TABLE_X_EXPAND_ID
} from '../../util'

/**
 * 根据扁平化的 columns 重建嵌套结构
 * 输入：
 *   - flatColumns: 处理后的扁平 columns（每个 subColumn 都带有 parentKey、parentHeader、parentFixed 属性）
 * 输出：重建的嵌套结构（严格按照 flatColumns 的顺序输出）
 */
export function rebuildNestedColumnsFromFlat(flatColumns) {
  const nested = []
  const specialColumnIds = [
    TABLE_X_SELECT_ID,
    TABLE_X_DIY_ID,
    TABLE_X_EXPAND_ID
  ]

  // 特殊列（select、diy）放在最前面
  const specialCols = flatColumns.filter(col =>
    specialColumnIds.includes(col.id)
  )
  nested.push(...specialCols)
  // 普通列（排除特殊列）
  const normalCols = flatColumns.filter(
    col => !specialColumnIds.includes(col.id)
  )
  // 收集分组数据：parentKey -> { parentHeader, parentFixed, subCols: [] }
  const groupMap = new Map()

  // 遍历一次：收集所有分组的数据
  normalCols.forEach(col => {
    if (col.parentKey) {
      // 有 parentKey：二级分类的子列
      if (!groupMap.has(col.parentKey)) {
        groupMap.set(col.parentKey, {
          parentHeader: col.parentHeader,
          parentFixed: col.parentFixed,
          subCols: []
        })
      }
      // 移除临时属性并添加到分组
      const {
        parentKey: _p,
        parentHeader: _h,
        parentFixed: _f,
        ...colWithoutParent
      } = col
      groupMap.get(col.parentKey).subCols.push(colWithoutParent)
    }
  })

  // 再次遍历：按 flatColumns 的顺序输出
  const processedGroups = new Set()

  normalCols.forEach(col => {
    if (col.parentKey) {
      // 有 parentKey：在第一次遇到的位置输出分组
      if (!processedGroups.has(col.parentKey)) {
        processedGroups.add(col.parentKey)
        const group = groupMap.get(col.parentKey)
        const visibleSubCols = group.subCols.filter(
          subCol => subCol.show !== false
        )
        if (visibleSubCols.length > 0) {
          nested.push({
            Header: group.parentHeader,
            id: col.parentKey,
            fixed: group.parentFixed,
            subColumns: visibleSubCols
          })
        }
      }
    } else {
      // 无 parentKey：单独列，直接输出
      if (col.show !== false) {
        nested.push(col)
      }
    }
  })

  return nested
}
