import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import TimeSpan from './time_span'
import Popover from '../popover'
import _ from 'lodash'
import classNames from 'classnames'
import Selection from '../selection'

const TimeSpanPicker = props => {
  const refPopover = useRef(null)
  const {
    min,
    max,
    disabledSpan,
    span,
    date,
    children,
    disabled,
    renderItem,
    onChange,
    className,
    isInPopup,
    enabledEndTimeOfDay,
    beginTime,
    endTime,
    ...rest
  } = props

  const handleSelectTime = date => {
    refPopover.current.apiDoSetActive(false)
    onChange(date)
  }

  // 只有 null 的情况
  const handleSelect = () => {
    onChange(null)
  }

  const popup = (
    <TimeSpan
      beginTime={beginTime}
      endTime={endTime}
      min={min}
      max={max}
      span={span}
      selected={date}
      onSelect={handleSelectTime}
      disabledSpan={disabledSpan}
      renderItem={renderItem}
      enabledEndTimeOfDay={enabledEndTimeOfDay}
    />
  )

  const selected = date ? { value: date, text: renderItem(date) } : null

  return (
    <Popover ref={refPopover} popup={popup} isInPopup={isInPopup} animName>
      {children !== undefined ? (
        children
      ) : (
        <Selection
          {...rest}
          selected={selected}
          onSelect={handleSelect}
          className={classNames('gm-time-span-picker', className)}
          disabled={disabled}
          disabledClose
        />
      )}
    </Popover>
  )
}

TimeSpanPicker.propTypes = {
  /** Date对象，表示选择的时间 */
  date: PropTypes.object.isRequired,
  /** 点击选择回调，传入参数为Date对象 */
  onChange: PropTypes.func,
  /** Date对象，默认一天的开始时间 */
  disabled: PropTypes.bool,
  min: PropTypes.object,
  /** Date对象，默认一天的结束时间 */
  max: PropTypes.object,
  /** 定义时间跨度，默认为 30 分钟 */
  span: PropTypes.number,
  /** 禁用时间段函数，传入参数为Date对象，返回时间段 */
  disabledSpan: PropTypes.func,
  /** 渲染时间文本展示格式，默认为 HH:mm */
  renderItem: PropTypes.func,

  /** 自定义渲染的开始时间, 不传默认开始时间从 00:00 开始 */
  beginTime: PropTypes.number,
  /** 自定义渲染的结束时间 */
  endTime: PropTypes.number,

  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
  isInPopup: PropTypes.bool,

  /** 不知道取啥名字, 目前是日期组件选择时间为了展示 24:00 用 */
  enabledEndTimeOfDay: PropTypes.bool
}

TimeSpanPicker.defaultProps = {
  renderItem: value => moment(value).format('HH:mm'),
  onChange: _.noop,
  isInPopup: false
}

export default TimeSpanPicker
