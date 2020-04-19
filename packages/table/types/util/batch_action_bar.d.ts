import { FC } from 'react'

interface BatchActionBarProps {
  /** pure=true,不展示[勾选所有页内容]按钮,也没有勾选所有页相关操作 */
  pure?: boolean
  /** 是否选中所有页 */
  isSelectAll?: boolean
  /** 选中多少项 */
  count?: number | object
  /** 批量操作按钮 */
  batchActions: {
    name: string
    show?: boolean
    type: 'edit' | 'business' | 'delete'
    onClick?(): void
  }[]
  /** 所有页/当前页 切换函数 */
  toggleSelectAll?(selected: boolean): void
  /** 点击关闭BatchActionBar的回调函数 */
  onClose(): void
}

declare const BatchActionBar: FC<BatchActionBarProps>
export default BatchActionBar
