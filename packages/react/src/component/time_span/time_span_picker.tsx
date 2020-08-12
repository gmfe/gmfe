import React, { CSSProperties, FC, ReactNode, useRef } from 'react'
import moment from 'moment'
import _ from 'lodash'
import classNames from 'classnames'
import { Popover } from '../popover'
import { Selection } from '../selection'
import TimeSpan from './time_span'

export interface TimeSpanPickerProps {
  /* 选择时间 */
  date: Date
  /* 选择回调 */
  onChange?(date: Date | null): void
  disabled?: boolean
  /* 最小可选时间，默认一天开始时间 */
  min?: Date
  /* 最大可选时间，默认一天结束时间 */
  max?: Date
  /* 定义时间跨度，默认为30分钟 */
  span?: number
  /* 自定义禁用时间，优先级高于min，max */
  disabledSpan?(date: Date): boolean
  /* 渲染时间文本展示格式，默认为 HH:mm */
  renderItem?(date: Date): ReactNode
  /* 自定义渲染开始时间，默认为00:00 */
  beginTime?: Date
  /* 自定义渲染结束时间 */
  endTime?: Date
  className?: string
  style?: CSSProperties
  isInPopup?: boolean
  /* 为了展示24:00 */
  enabledEndTimeOfDay?: boolean
}

const TimeSpanPicker: FC<TimeSpanPickerProps> = ({
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
}) => {
  const popoverRef = useRef<Popover>(null)

  const handleSelectTime = (date: Date): void => {
    popoverRef.current!.apiDoSetActive()
    onChange && onChange(date)
  }

  const handleSelect = (): void => {
    onChange && onChange(null)
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

  const selected = date ? { value: date, text: renderItem!(date) } : null

  return (
    <Popover popup={popup} ref={popoverRef} isInPopup={isInPopup}>
      {children ?? (
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

TimeSpanPicker.defaultProps = {
  renderItem(date: Date): React.ReactNode {
    return moment(date).format('HH:mm')
  },
  onChange: _.noop,
}

export default TimeSpanPicker
