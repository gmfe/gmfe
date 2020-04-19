import { CSSProperties, ReactNode } from 'react'
import { TimeLimit } from '../date_picker/types'

interface DateRangePickerProps {
  /* 开始日期 */
  begin?: Date | null
  /* 结束日期 */
  end?: Date | null
  /* 选择回调 */
  onChange?(begin: Date | null, end: Date | null): void
  disabled?: boolean
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义禁用日期，优先度高于min，max */
  disabledDate?(date: Date, selected: { begin?: Date; end?: Date }): boolean
  /* 自定义展示日期 */
  renderDate?(begin: Date, end: Date): ReactNode
  canClear?: boolean
  className?: string
  style?: CSSProperties
  /* 自定义左侧快速选项 */
  customQuickSelectList?: QuickSelectListOptions[]
  /* 时间选择 */
  enabledTimeSelect?: boolean
  /* 时间间隔 */
  timeSpan?: number
  /* 开始时间约束 */
  beginTimeSelect?: Omit<TimeLimit, 'timeSpan'>
  /* 结束时间约束 */
  endTimeSelect?: Omit<TimeLimit, 'timeSpan'>
}

interface QuickSelectListOptions {
  /* 数组第一个元素为距离今天的天数，第二个元素固定为'day' */
  range: Array<[number, 'day']>
  /* 展示的文字 */
  text: string
}

export type { DateRangePickerProps, QuickSelectListOptions }
