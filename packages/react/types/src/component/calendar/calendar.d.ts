import { CSSProperties, FC } from 'react'

export interface CalendarProps {
  selected?: Date
  onSelect?(value: Date): void
  willActiveSelected?: Date
  onWillActiveSelected?(value: Date): void
  min?: Date
  max?: Date
  disabledDate?: (date: Date) => boolean
  className?: string
  style?: CSSProperties
  onKeyDown?: () => void // todo
}

declare const Calendar: FC<CalendarProps>

export default Calendar
