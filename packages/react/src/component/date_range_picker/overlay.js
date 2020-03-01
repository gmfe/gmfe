import React, { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'

import Flex from '../flex'
import Two from './two'
import Left from './left'
import TimeRangeSelect from './time_range_select'
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
  const getFirstSelectTime = (timeSelect, type, begin, end) => {
    const cells = getTimeCells(timeSpan)
    if (type === 'end') {
      cells.reverse()
    }

    const date = type === 'begin' ? begin : end

    // 无限制 取第一个时间点
    if (!timeSelect) {
      return cells[0]
    }

    const { defaultTime, disabledSpan } = timeSelect
    // 有默认时间，取默认时间
    if (defaultTime) {
      return defaultTime
    }

    // 无默认时间， 开始时间 取第一个可选时间点, 结束时间取最后一个可选时间点
    if (disabledSpan) {
      const index = _.findIndex(cells, cell => {
        const _cell = setTimes(date, cell)
        const disabled = disabledSpan
          ? disabledSpan(_cell, { begin, end })
          : false
        return !disabled
      })
      if (index === -1) return cells[0]
      return cells[index]
    }
  }

  const handleSelect = (begin, end, updateEndTime) => {
    let b = begin
    let e = end

    if (enabledTimeSelect) {
      // 未完成日期选择，需要得到所选日期的展示时间
      if (begin && !(_begin && _end)) {
        const time = getFirstSelectTime(beginTimeSelect, 'begin', begin, end)
        b = setTimes(begin, time)
      }

      // 结束时间可能与开始时间选择相关，通过传入字段决定是否更新
      if (end && updateEndTime) {
        const time = getFirstSelectTime(endTimeSelect, 'end', begin, end)
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

  const defaultTimes = {
    begin: getFirstSelectTime(beginTimeSelect, 'begin', _begin, _end),
    end: getFirstSelectTime(endTimeSelect, 'end', _begin, _end)
  }

  return (
    <Flex column className='gm-date-range-picker-overlay'>
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
