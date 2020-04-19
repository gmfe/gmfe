import { CSSProperties, FC } from 'react'

export interface RangeCalendarProps {
  begin?: Date
  end?: Date
  onSelect?(date: Date): void
  willActiveSelected?: Date
  onWillActiveSelected?(date: Date): void
  min?: Date
  max?: Date
  disabledDate?(date: Date): boolean
  disabledYearAndMonth?: 'left' | 'right'
  className?: string
  style?: CSSProperties
  hoverDay?: Date
  onHoverDay?(date: Date): void
  onKeyDown?(): void // todo
}

declare const RangeCalendar: FC<RangeCalendarProps>
export default RangeCalendar
