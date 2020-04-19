import { FC } from 'react'

export interface DayProps {
  value: Date
  begin?: Date
  end?: Date
  onClick(date: Date): void
  disabled: boolean
  will: Date
  hoverDay?: Date
  onHoverDay?: (date: Date) => void
}

declare const Day: FC<DayProps>
export default Day
