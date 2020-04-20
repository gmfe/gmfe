import { Component, ReactNode } from 'react'

interface DateRangePickerProps {
  begin?: Date
  end?: Date
  onChange?(begin: Date, end: Date): void
  disabled?: boolean
  min?: Date
  max?: Date
  disabledDate?(date: Date): boolean
  renderDate?(begin: Date, end: Date): ReactNode
  canClear?: boolean
  className?: string
  customQuickSelectList?: QuickSelectListOptions[]
  enabledTimeSelect?: boolean
  timeSpan?: number
  beginTimeSelect?: {
    defaultTime?: Date
    disabledSpan?(date: Date): boolean
  }
  endTimeSelect?: {
    defaultTime?: Date
    disabledSpan?(date: Date): boolean
  }
}

interface QuickSelectListOptions {
  range: Array<[number, 'day']>
  text: string
}

declare class DateRangePicker extends Component<DateRangePickerProps, void> {
  static defaultProps: {
    onChange(begin: Date, end: Date): void
    enabledTimeSelect: boolean
    timeSpan: number
  }

  apiDoFocus
}
export default DateRangePicker
export { DateRangePickerProps, QuickSelectListOptions }
