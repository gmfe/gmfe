import React, { CSSProperties, FC, KeyboardEvent } from 'react'
import RangeCalendar from './range_calendar'
import _ from 'lodash'

export interface CalendarProps {
  /* 日期 */
  selected?: Date | null
  /* 日期选中回调函数 */
  onSelect?(selected: Date): void
  /* 键盘 */
  willActiveSelected?: Date
  onWillActiveSelected?(selected: Date): void
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义可选日期，优先度大于min，max */
  disabledDate?(date: Date): boolean
  className?: string
  style?: CSSProperties
  /* 全键盘 */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

const Calendar: FC<CalendarProps> = (props) => {
  const { selected, onSelect, ...rest } = props

  const handleSelect = (begin: Date): void => {
    onSelect && onSelect(begin)
  }

  return (
    <RangeCalendar
      {...rest}
      begin={selected}
      end={selected}
      onSelect={handleSelect}
      disabledYearAndMonth={undefined}
    />
  )
}

Calendar.defaultProps = {
  onSelect: _.noop,
}

export default Calendar
