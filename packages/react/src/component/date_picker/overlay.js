import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Button from '../button'
import { getLocale } from '@gmfe/locales'
import Flex from '../flex'
import Calendar from '../calendar/calendar'
import TimeSelect from './time_select'
import { setTimes, getTimeCells } from '../date_range_picker/util'

const Overlay = props => {
  const {
    date,
    willActiveSelected,
    min,
    max,
    onSelect,
    timeLimit,
    disabledDate,
    enabledTimeSelect,
    renderBottom
  } = props

  const [selectedDate, setSelectedDate] = useState(date)

  // 选择日期后渲染时间，有默认时间则展示，无展示为可选的第一个时间
  const getTime = () => {
    const { defaultTime, disabledSpan, timeSpan } = timeLimit || {}
    if (defaultTime) {
      return defaultTime
    }

    const cells = getTimeCells(timeSpan)
    cells.pop() // 去掉 24:00
    if (disabledSpan) {
      const index = _.findIndex(cells, cell => {
        const _cell = setTimes(date, cell)
        const disabled = disabledSpan ? disabledSpan(_cell, date) : false
        return !disabled
      })
      return cells[index]
    }
    return cells[0]
  }

  const handleSelect = (value, type) => {
    if (!enabledTimeSelect) {
      onSelect(value)
      return
    }

    let date = null
    let time = null
    if (type === 'date') {
      date = value
      time = getTime()
    } else {
      date = selectedDate
      time = value
    }
    const newDate = setTimes(date, time)
    setSelectedDate(newDate)
  }

  return (
    <Flex column className='gm-date-picker'>
      <Calendar
        className='gm-date-picker'
        selected={selectedDate}
        onSelect={value => handleSelect(value, 'date')}
        willActiveSelected={willActiveSelected}
        min={min}
        max={max}
        disabledDate={disabledDate}
      />
      <TimeSelect
        date={selectedDate}
        timeLimit={timeLimit}
        onSelectTime={value => handleSelect(value, 'time')}
        enabledTimeSelect={enabledTimeSelect}
      />
      {enabledTimeSelect && (
        <Flex
          justifyEnd
          className='gm-border-top gm-padding-lr-10 gm-padding-tb-5'
        >
          <Button
            type='primary'
            className='gm-padding-lr-20'
            disabled={!selectedDate}
            onClick={() => onSelect(selectedDate)}
            style={{ height: '28px' }}
          >
            {getLocale('确定')}
          </Button>
        </Flex>
      )}
      {renderBottom && renderBottom}
    </Flex>
  )
}

Overlay.propTypes = {
  date: PropTypes.object,
  willActiveSelected: PropTypes.object,
  min: PropTypes.object,
  max: PropTypes.object,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  timeLimit: PropTypes.shape({
    defaultTime: PropTypes.object,
    disabledSpan: PropTypes.func,
    timeSpan: PropTypes.number
  }),
  enabledTimeSelect: PropTypes.bool,
  renderBottom: PropTypes.element
}

export default Overlay
