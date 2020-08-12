import React, { FC } from 'react'
import { TimeLimit } from './types'
import moment from 'moment'
import classNames from 'classnames'
import { Flex } from '../flex'
import { getLocale } from '@gmfe/locales'
import TimeSpanPicker from '../time_span/time_span_picker'
import { Button } from '../button'
import { setTimes } from '../date_range_picker/util'

interface TimeSelectProps {
  date?: Date
  timeLimit?: TimeLimit
  enabledTimeSelect?: boolean
  onSelectTime?(value: Date): void
}

const TimeSelect: FC<TimeSelectProps> = ({ date, timeLimit, onSelectTime, enabledTimeSelect }) => {
  if (!enabledTimeSelect) {
    return null
  }

  const handleDisabledSpan = (value: Date): boolean => {
    if (timeLimit && timeLimit.disabledSpan) {
      const d = setTimes(moment(date), moment(value))
      return timeLimit.disabledSpan(d.toDate(), date)
    }
    return false
  }

  return (
    <Flex alignCenter className='gm-date-picker-date'>
      <span className={classNames({ 'gm-text-primary': !!date })}>
        {date ? moment(date).format('YYYY-MM-DD') : getLocale('选择日期')}
      </span>
      {date && (
        <TimeSpanPicker
          date={date}
          onChange={onSelectTime}
          span={timeLimit && timeLimit.timeSpan}
          disabledSpan={handleDisabledSpan}
          isInPopup
        >
          <Button className='gm-date-picker-select-time'>{moment(date).format('HH:mm')}</Button>
        </TimeSpanPicker>
      )}
    </Flex>
  )
}

export default TimeSelect
