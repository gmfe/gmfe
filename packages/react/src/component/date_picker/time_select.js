import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'

import Flex from '../flex'
import TimeSpanPicker from '../time_span/time_span_picker'
import { setTimes } from '../date_range_picker/util'

const TimeSelect = props => {
  const { date, timeLimit, onSelectTime, enabledTimeSelect } = props

  if (!enabledTimeSelect) {
    return null
  }

  const handleDisabledSpan = value => {
    if (timeLimit && timeLimit.disabledSpan) {
      const d = setTimes(date, value)
      return timeLimit.disabledSpan(d, date)
    }
    return false
  }

  return (
    <Flex alignCenter className='gm-date-picker-date'>
      <span
        className={classNames({
          'gm-text-primary': date
        })}
      >
        {date ? moment(date).format('YYYY-MM-DD') : '选择日期'}
      </span>
      {date && (
        <TimeSpanPicker
          date={date}
          onChange={onSelectTime}
          span={timeLimit && timeLimit.timeSpan}
          disabledSpan={handleDisabledSpan}
          isInPopup
        >
          <button className='gm-date-picker-select-time'>
            {moment(date).format('HH:mm')}
          </button>
        </TimeSpanPicker>
      )}
    </Flex>
  )
}

TimeSelect.propTypes = {
  date: PropTypes.object,
  timeLimit: PropTypes.shape({
    defaultTime: PropTypes.object,
    disabledSpan: PropTypes.func,
    timeSpan: PropTypes.number
  }),
  enabledTimeSelect: PropTypes.bool,
  onSelectTime: PropTypes.func
}

export default TimeSelect
