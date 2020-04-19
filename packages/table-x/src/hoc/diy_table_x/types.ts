import { TableXColumn } from '../../types'

type DiyTableXColumn<Original extends object> = TableXColumn<Original> & {
  diyEnable?: boolean
  diyItemText?: string
  diyGroupName: string
  key?: string
  /**
   * DiyTableX 中的 show 与其他 TableX 不同，
   * DiyTableX 中的 show 代表的是默认是否展示
   */
  show?: boolean
}

interface DiyTableXProps<Original extends object> {
  id: string
  /* 分组排序 */
  diyGroupSorting: string[]
  columns: DiyTableXColumn<Original>[]
}

export type { DiyTableXColumn, DiyTableXProps }
