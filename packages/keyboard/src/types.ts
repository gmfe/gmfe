import { TableXColumn } from '@gmfe/table-x'

type KeyboardTableXColumn<Original extends object> = {
  isKeyboard?: boolean
} & TableXColumn<Original>

interface KeyboardTableXProps<Original extends object> {
  /* 通过 id 来确定本单元格内通信，避免多表格时混了。请确保 id 唯一 */
  id: string
  columns: KeyboardTableXColumn<Original>[]
  /* 增加一行数据 */
  onAddRow(): void
  onBeforeDispatch?(options: {
    actionName: string
    to: { rowKey: number; columnKey: string }
    from: { rowKey: number; columnKey: string }
  }): boolean
}

type KeyboardDirection = 'left' | 'right' | 'up' | 'down'
interface KeyboardCustomEvent {
  cellKey: string
  direction: KeyboardDirection
}

interface WrapDataOptions {
  id: string
  fixedWidths: {
    leftFixedWidth: number
    rightFixedWidth: number
  }
}
export type {
  KeyboardTableXProps,
  KeyboardTableXColumn,
  KeyboardCustomEvent,
  KeyboardDirection,
  WrapDataOptions,
}
