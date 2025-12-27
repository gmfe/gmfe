/**
 * 扁平化 columns（用于 select 和 diy 处理）
 * 将带有 subColumns 的 columns 展开为扁平结构
 *
 * 对于有 subColumns 的列，会给每个 subColumn 添加：
 * - parentKey: 父级列的 id（用于重建时识别分组）
 * - parentHeader: 父级列的 Header（用于重建时显示一级表头）
 * - parentFixed: 父级列的 fixed 属性（用于重建时设置 fixed）
 */
export function flattenColumnsForSelectAndDiy(columns) {
  const flattened = []
  columns.forEach(column => {
    if (column.subColumns && column.subColumns.length > 0) {
      // 如果有 subColumns，将子列展开，并添加父级信息
      column.subColumns.forEach(subCol => {
        flattened.push({
          ...subCol,
          parentKey: column.id || column.Header, // 父级标识
          parentHeader: column.Header, // 父级表头文本
          parentFixed: column.fixed // 父级 fixed 属性
        })
      })
    } else {
      // 没有 subColumns，直接添加
      flattened.push(column)
    }
  })
  return flattened
}
