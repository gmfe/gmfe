import { CSSProperties, FC, ReactNode } from 'react'

export interface TimeSpanPickerProps {
  date: Date
  onChange?(date: Date): void
  disabled?: boolean
  min?: Date
  max?: Date
  span?: number
  disabledSpan?(date: Date): void
  renderItem?(date: Date): ReactNode
  className?: string
  style?: CSSProperties
  isInPopup?: boolean
  /* 不知道取啥名字, 目前是日期组件选择时间为了展示 24:00 用 */
  enabledEndTimeOfDay?: boolean
}

declare const TimeSpanPicker: FC<TimeSpanPickerProps>
export default TimeSpanPicker
