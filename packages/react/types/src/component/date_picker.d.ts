import { CSSProperties, ReactNode, KeyboardEvent, Component } from 'react'
import { Moment } from 'moment'

export interface DatePickerProps {
  date?: Date
  onChange(date: Date): void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  disabledDate?(date: Date): boolean
  renderDate?(date: Date): ReactNode
  popoverType?: 'focus' | 'realFocus'
  className?: string
  style?: CSSProperties
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
  enabledTimeSelect?: boolean
  timeLimit?: {
    defaultTime?: Date
    disabledSpan?(date: Date): boolean
    timeSpan?: number
  }
}

interface DatePickerState {
  willActiveSelected: Moment
}

declare class DatePicker extends Component<DatePickerProps, DatePickerState> {
  static defaultProps: {
    onKeyDown(event: KeyboardEvent<HTMLDivElement>): void
    timeLimit: {
      timeSpan: number
    }
    enabledTimeSelect: boolean
  }

  readonly state: DatePickerState
  public apiDoFocus(): void
  public apiDoSelectWillActive(): void
}
export default DatePicker
