import { ComponentClass, ComponentType, ReactNode } from 'react'

interface SelectTableProps<Original extends { [key: string]: any }> {
  /** 选择类型 */
  selectType?: 'checkbox' | 'radio'
  /** 自定义被选中项的id */
  keyField?: string
  /** 每一行的 checkBox 或 radio 的disable设置函数 */
  isSelectorDisable?: (row: Original) => boolean
  /** 自定义批量操作栏 */
  batchActionBar?: ReactNode
  /** 被选中项数组[keyField] */
  selected: any[]
  /** 选中一行的回调 */
  onSelect(selected: any[]): void
  /** 选中所有行的回调 */
  onSelectAll(isSelectedAll: boolean): void
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function selectTableV2HOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): ComponentClass<Props & SelectTableProps<Original>>
export default selectTableV2HOC
