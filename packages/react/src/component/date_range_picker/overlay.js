import React, { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getLocale } from '@gmfe/locales'

import Flex from '../flex'
import Two from './two'
import Left from './left'
import TimeRangeSelect from './bottom'
import { setTimes, getTimeCells } from './util'

const Bottom = props => {
  const { begin, end, enabledTimeSelect, onSelectDateAndTime } = props

  if (!enabledTimeSelect) {
    return null
  }

  return (
    <Flex justifyEnd className='gm-border-top gm-padding-10'>
      <button
        className='btn btn-primary gm-padding-lr-15'
        disabled={(begin && !end) || (!begin && end)}
        onClick={onSelectDateAndTime}
        style={{ height: '30px' }}
      >
        {getLocale('确定')}
      </button>
    </Flex>
  )
}

Bottom.propTypes = {
  enabledTimeSelect: PropTypes.bool,
  begin: PropTypes.object,
  end: PropTypes.object,
  onSelectDateAndTime: PropTypes.func
}

/**
 * 日期段选择
 * 形态上不支持全键盘，所以不做相关逻辑
 * */
const Overlay = props => {
  const {
    begin,
    end,
    onOK,
    min,
    max,
    timeSpan,
    disabledDate,
    enabledTimeSelect,
    beginTimeSelect,
    endTimeSelect,
    customQuickSelectList
  } = props

  // 日期选择
  const [_begin, setBegin] = useState(begin)
  const [_end, setEnd] = useState(end)

  // 首次展示 取第一个 可选 时间点
  const getDefaultTimes = (timeSelect, type, begin, end) => {
    const cells = getTimeCells(timeSpan)
    if (type === 'end') {
      cells.reverse()
    }

    // 无限制 取第一个时间点
    if (!timeSelect) {
      return cells[0]
    }

    const { defaultTime, disabledSpan, min, max } = timeSelect
    // 有默认时间，取默认时间
    if (defaultTime) {
      return defaultTime
    }

    // 无默认时间， 开始时间 取第一个可选时间点, 结束时间取最后一个可选时间点
    if (disabledSpan || min || max) {
      const dMin = min ? moment(min) : moment().startOf('day')
      const dMax = max ? moment(max) : moment().endOf('day')

      const index = _.findIndex(cells, cell => {
        const disabled = disabledSpan
          ? disabledSpan(cell, { begin, end })
          : false
        return moment(cell) <= dMax && moment(cell) >= dMin && !disabled
      })
      return cells[index]
    }
  }

  const defaultTimes = {
    begin: getDefaultTimes(beginTimeSelect, 'begin', _begin, _end),
    end: getDefaultTimes(endTimeSelect, 'end', _begin, _end)
  }

  const handleSelect = (begin, end) => {
    let b = begin
    let e = end

    // 未完成日期选择，选择时需设定该日期时间点
    if (enabledTimeSelect && !(_begin && _end)) {
      if (begin) {
        const time = getDefaultTimes(beginTimeSelect, 'begin', begin, end)
        b = setTimes(begin, time)
      }

      if (end) {
        const time = getDefaultTimes(endTimeSelect, 'end', begin, end)
        e = setTimes(end, time)
      }
    }

    setBegin(b)
    setEnd(e)

    // 不需选择时间，直接关闭
    if (!enabledTimeSelect && begin && end) {
      onOK(begin, end)
    }
  }

  const handleSelectDateAndTime = () => {
    onOK(_begin, _end)
  }

  return (
    <Flex column className='gm-date-range-picker-overlay gm-border-0'>
      <Flex>
        <Left
          begin={_begin}
          end={_end}
          onSelect={enabledTimeSelect ? handleSelect : onOK}
          enabledTimeSelect={enabledTimeSelect}
          defaultTimes={defaultTimes}
          customQuickSelectList={customQuickSelectList}
        />
        <Flex column>
          <Two
            begin={_begin}
            end={_end}
            onSelect={handleSelect}
            min={min}
            max={max}
            disabledDate={disabledDate}
            enabledTimeSelect={enabledTimeSelect}
          />
          <TimeRangeSelect
            begin={_begin}
            end={_end}
            enabledTimeSelect={enabledTimeSelect}
            beginTimeSelect={beginTimeSelect}
            endTimeSelect={endTimeSelect}
            onSelect={handleSelect}
            timeSpan={timeSpan}
          />
        </Flex>
      </Flex>
      <Bottom
        begin={_begin}
        end={_end}
        enabledTimeSelect={enabledTimeSelect}
        onSelectDateAndTime={handleSelectDateAndTime}
      />
    </Flex>
  )
}

Overlay.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  min: PropTypes.object,
  max: PropTypes.object,
  disabledDate: PropTypes.func,
  enabledTimeSelect: PropTypes.bool,
  renderTime: PropTypes.func,
  timeSpan: PropTypes.number,
  customQuickSelectList: PropTypes.array,
  beginTimeSelect: PropTypes.shape({
    defaultTime: PropTypes.object,
    max: PropTypes.object,
    min: PropTypes.object,
    /** 禁用时间段函数，传入参数为Date对象，返回时间段 */
    disabledSpan: PropTypes.func
  }),
  endTimeSelect: PropTypes.shape({
    defaultTime: PropTypes.object,
    max: PropTypes.object,
    min: PropTypes.object,
    disabledSpan: PropTypes.func
  })
}

export default Overlay
