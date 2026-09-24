import { createContext } from 'react'

/**
 * 勾选上下文拆分为两个，避免勾选一棵 checkbox 导致整表重渲染：
 * - SelectedSetContext：选中集合（每行 checkbox 关心，值用 Set 保证引用仅在集合内容变化时更新）
 * - SelectOperationContext：操作回调（onSelect/onSelectAll/isSelectAll），引用稳定，
 *   仅表头全选框与极少数消费方使用
 */
const SelectedSetContext = createContext({
  selectedSet: new Set(),
  isSelectAll: false
})

const SelectOperationContext = createContext({
  onSelect: () => {},
  onSelectAll: () => {}
})

export { SelectedSetContext, SelectOperationContext }
