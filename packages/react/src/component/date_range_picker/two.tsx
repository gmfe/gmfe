import React, { FC, useEffect, useState } from 'react'
import moment from 'moment'
import { isNull } from 'lodash'
import { Flex } from '../flex'
import { RangeCalendar } from '../calendar'

interface TwoProps {
  begin?: Date | null
  end?: Date | null
  onSelect(begin: Date | null, end: Date | null, updateEndTime: boolean): void
  min?: Date
  max?: Date
  disabledDate?(date: Date, selected: { begin?: Date; end?: Date }): boolean
  enabledTimeSelect?: boolean
}

const Two: FC<TwoProps> = ({
  begin,
  end,
  onSelect,
  min,
  max,
  disabledDate,
  enabledTimeSelect,
}) => {
  const _will = begin ?? moment().toDate()
  // eslint-disable-next-line camelcase
  let _will_end: Date

  // 判断 begin && end 是否同月份，确定日历2 应该显示的月份
  if (begin && end) {
    const isSameMonth = moment(begin).month() === moment(end).month()
    // eslint-disable-next-line camelcase
    _will_end = isSameMonth ? moment(begin).add(1, 'month').toDate() : end
  } else {
    // eslint-disable-next-line camelcase
    _will_end = moment().add(1, 'month').toDate()
  }

  // 告诉 日历1 应该显示的月份
  const [will, setWill] = useState(_will)
  // 告诉 日历2 应该显示的月份
  // eslint-disable-next-line camelcase
  const [will_end, setWillEnd] = useState(_will_end)
  // 告诉 此时hover的日期
  const [hoverDay, setHoverDay] = useState<Date | null>()

  // 可以选择时间时，针对快速选择日期想需要更新日历
  useEffect(() => {
    const beginMonth = moment(begin ?? undefined).month()
    const endMonth = moment(end ?? undefined).month()

    if (enabledTimeSelect && begin && end) {
      // begin && end 同月份
      if (beginMonth === endMonth) {
        const willMonth = moment(will).month()
        const willEndMonth = moment(will_end).month()
        // 当前选择月份不在展示中 -- 针对快速选择
        if (beginMonth !== willMonth && beginMonth !== willEndMonth) {
          setWill(begin)
          setWillEnd(moment(begin).add(1, 'month').toDate)
        }
      } else {
        setWill(begin)
        setWillEnd(end)
      }
    }
    // eslint-disable-next-line camelcase
  }, [begin, end, enabledTimeSelect, will, will_end])

  const handleWillChange = (date: Date): void => {
    setWill(date)
  }

  const handleWillChangeByEnd = (date: Date): void => {
    setWillEnd(date)
  }

  const disabledYearOrMonth = (): boolean => {
    // 两个日历显示为 同年相邻月份，disabled相应的 年 / 月 切换按钮
    const _begin = moment(will).startOf('month').add(1, 'month').toDate()
    const _end = moment(will_end).startOf('month').toDate()

    return +_begin === +_end
  }

  return (
    <Flex className='gm-padding-5'>
      <RangeCalendar
        className='gm-date-range-picker-overlay-calendar'
        begin={begin}
        end={end}
        willActiveSelected={will}
        onWillActiveSelected={handleWillChange}
        onSelect={(begin, end) => onSelect(begin, end, true)}
        min={min}
        max={max}
        disabledDate={disabledDate}
        disabledYearAndMonth={disabledYearOrMonth() ? 'right' : undefined}
        hoverDay={isNull(hoverDay) ? hoverDay : moment(hoverDay)}
        onHoverDay={(moment) => setHoverDay(moment ? moment.toDate() : moment)}
      />
      <RangeCalendar
        className='gm-date-range-picker-overlay-calendar'
        begin={begin}
        end={end}
        // eslint-disable-next-line camelcase
        willActiveSelected={will_end}
        onWillActiveSelected={handleWillChangeByEnd}
        onSelect={(begin, end) => onSelect(begin, end, true)}
        min={min}
        max={max}
        disabledDate={disabledDate}
        disabledYearAndMonth={disabledYearOrMonth() ? 'left' : undefined}
        hoverDay={isNull(hoverDay) ? hoverDay : moment(hoverDay)}
        onHoverDay={(moment) => setHoverDay(moment ? moment.toDate() : moment)}
      />
    </Flex>
  )
}

export default Two
