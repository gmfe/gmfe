import React, { FC, ReactNode } from 'react'
import { TimeLimit } from '../date_picker/types'
import moment from 'moment'
import { getLocale } from '@gmfe/locales'
import { renderTime, setTimes } from './util'
import TimeSpanPicker from '../time_span/time_span_picker'
import { Flex } from '../flex'

interface TimeRangeSelectProps {
  begin?: Date | null
  end?: Date | null
  enabledTimeSelect?: boolean
  /**
   * 组件代码没有找到这个方法使用的地方
   * @deprecated
   */
  onSelectDateAndTime?(): void
  onSelect?(begin: Date | null, end: Date, updateEndTime: boolean): void
  renderTime?(date: Date): ReactNode
  timeSpan?: number
  beginTimeSelect?: Omit<TimeLimit, 'timeSpan'>
  endTimeSelect?: Omit<TimeLimit, 'timeSpan'>
}

const TimeRangeSelect: FC<TimeRangeSelectProps> = ({
  begin,
  end,
  enabledTimeSelect,
  beginTimeSelect,
  endTimeSelect,
  onSelect,
  timeSpan,
}) => {
  let b: ReactNode = <span className='gm-text-desc'>{getLocale('开始日期')}</span>
  let e: ReactNode = <span className='gm-text-desc'>{getLocale('结束日期')}</span>

  if (begin) {
    b = moment(begin).format('YYYY-MM-DD')
  }
  if (end) {
    e = moment(end).format('YYYY-MM-DD')
  }

  const handleTimeSelect = (time: Date, type: 'begin' | 'end'): void => {
    let b = begin
    let e = end
    let updateEndTime = false

    if (type === 'begin') {
      b = setTimes(moment(begin ?? undefined), moment(time)).toDate()
      updateEndTime =
        (endTimeSelect &&
          endTimeSelect.disabledSpan?.(end!, {
            begin: b!,
            end: end!,
          })) ||
        false
    }

    if (type === 'end') {
      e = setTimes(moment(end ?? undefined), moment(time)).toDate()
    }

    // 选择防止同一天出现 开始 > 结束, 做一下判断
    if (moment(b ?? undefined).isAfter(moment(e ?? undefined))) {
      e = setTimes(moment(end ?? undefined), moment(time)).toDate()
    }
    onSelect && onSelect(b!, e!, updateEndTime)
  }

  // 做一步处理，防止不同日期可选时间段不同
  const handleDisabledSpan = (time: Date, type: 'begin' | 'end'): boolean => {
    if (type === 'begin') {
      if (beginTimeSelect && beginTimeSelect.disabledSpan) {
        const date = setTimes(moment(begin ?? undefined), moment(time)).toDate()
        return beginTimeSelect.disabledSpan(date, { begin: begin!, end: end! })
      }
      return false
    }

    if (type === 'end') {
      const date = setTimes(moment(end ?? undefined), moment(time)).toDate()
      let isAfterBeginTime = true
      // 同一天，结束时间小于/等于开始时间
      if (moment(begin ?? undefined).isSame(moment(end ?? undefined), 'day')) {
        isAfterBeginTime = moment(date).isSameOrAfter(moment(begin ?? undefined))
      }

      if (endTimeSelect && endTimeSelect.disabledSpan) {
        return (
          endTimeSelect.disabledSpan(date, { begin: begin!, end: end! }) ||
          !isAfterBeginTime
        )
      }
      return !isAfterBeginTime
    }
    return false
  }

  const renderTimeSelect = (type: 'begin' | 'end'): ReactNode => {
    const isDisabled = enabledTimeSelect && begin && end
    let time: Date | null = null

    if (type === 'begin') {
      time = begin as Date
    }

    if (type === 'end') {
      time = end as Date
    }

    return (
      isDisabled && (
        <TimeSpanPicker
          date={time!}
          onChange={(value) => handleTimeSelect(value!, type)}
          span={timeSpan}
          disabledSpan={(date) => handleDisabledSpan(date, type)}
          renderItem={(value) => renderTime(moment(value))}
          enabledEndTimeOfDay
          isInPopup
        >
          <button className='gm-date-range-picker-bottom-time'>
            {renderTime(moment(time!))}
          </button>
        </TimeSpanPicker>
      )
    )
  }

  return (
    <Flex
      alignCenter
      justifyBetween
      style={{ height: '25px', margin: '0px 5px 8px 15px' }}
    >
      <div className='gm-text-bold gm-date-range-picker-bottom-text'>
        <span>{b}</span>
        {enabledTimeSelect && renderTimeSelect('begin')}
        &nbsp;~&nbsp;
        <span>{e}</span>
        {enabledTimeSelect && renderTimeSelect('end')}
      </div>
    </Flex>
  )
}
export default TimeRangeSelect
