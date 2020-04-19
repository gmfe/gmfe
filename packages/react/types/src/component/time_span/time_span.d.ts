import { FC, ReactNode } from 'react'

export interface TimeSpanProps {
  min?: Date
  max?: Date
  disabledSpan?(date: Date): boolean
  span?: number
  selected?: Date
  renderItem?(selected: Date): ReactNode
  onSelect?(selected: Date): void
}

declare const TimeSpan: FC<TimeSpanProps>
export default TimeSpan
