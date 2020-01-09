import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Flex from '../flex'
import TimeSpanPicker from '../time_span/time_span_picker'
import { setTimes, renderTime } from './util'

const TimeRangeSelect = props => {
  const {
    begin,
    end,
    enabledTimeSelect,
    beginTimeSelect,
    endTimeSelect,
    onSelect,
    timeSpan
  } = props

  let b = <span className='gm-text-desc'>开始日期</span>
  let e = <span className='gm-text-desc'>结束日期</span>

  if (begin) {
    b = moment(begin).format('YYYY-MM-DD')
  }

  if (end) {
    e = moment(end).format('YYYY-MM-DD')
  }

  const handleTimeSelect = (time, type) => {
    let b = begin
    let e = end
    let updateEndTime = false

    if (type === 'begin') {
      b = setTimes(begin, time)
      updateEndTime = true
    }

    if (type === 'end') {
      e = setTimes(end, time)
    }

    // 选择防止同一天出现 开始 > 结束, 做一下判断
    if (moment(b).isAfter(moment(e))) {
      e = setTimes(end, time)
    }

    onSelect(b, e, updateEndTime)
  }

  // 做一步处理，防止不同日期可选时间段不同
  const handleDisabledSpan = (time, type) => {
    if (type === 'begin') {
      if (beginTimeSelect && beginTimeSelect.disabledSpan) {
        const date = setTimes(begin, time)
        return beginTimeSelect.disabledSpan(date, { begin, end })
      }
      return false
    }

    if (type === 'end') {
      const date = setTimes(end, time)
      let isAfterBeginTime = true
      // 同一天，结束时间小于/等于开始时间
      if (moment(begin).isSame(moment(end), 'day')) {
        isAfterBeginTime = moment(date).isSameOrAfter(moment(begin))
      }

      if (endTimeSelect && endTimeSelect.disabledSpan) {
        return (
          endTimeSelect.disabledSpan(date, { begin, end }) || !isAfterBeginTime
        )
      }
      return !isAfterBeginTime
    }
  }

  const renderTimeSelect = type => {
    const isDisabled = enabledTimeSelect && begin && end
    let time = null

    if (type === 'begin') {
      time = begin
    }

    if (type === 'end') {
      time = end
    }

    return (
      isDisabled && (
        <TimeSpanPicker
          date={time}
          onChange={value => handleTimeSelect(value, type)}
          span={timeSpan}
          disabledSpan={date => handleDisabledSpan(date, type)}
          renderItem={renderTime}
          enabledEndTimeOfDay
          isInPopup
        >
          <button className='gm-date-range-picker-bottom-time'>
            {renderTime(time)}
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

TimeRangeSelect.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  enabledTimeSelect: PropTypes.bool,
  onSelectDateAndTime: PropTypes.func,
  onSelect: PropTypes.func,
  renderTime: PropTypes.func,
  timeSpan: PropTypes.number,
  beginTimeSelect: PropTypes.shape({
    defaultTime: PropTypes.object,
    /** 禁用时间段函数，传入参数为Date对象，返回时间段 */
    disabledSpan: PropTypes.func
  }),
  endTimeSelect: PropTypes.shape({
    defaultTime: PropTypes.object,
    disabledSpan: PropTypes.funcxs
  })
}

export default TimeRangeSelect
