import React, { FC, ReactNode } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '../flex'

interface GetTime {
  (time?: Date): Moment | null
}

const getTime: GetTime = (time) => {
  if (time) {
    const year = moment().year()
    const month = moment().month()
    const date = moment().date()
    return moment(time).set({ year, month, date })
  }
  return null
}

export interface TimeSpanProps {
  /* 最小可选时间，默认一天的开始时间 */
  min?: Date
  /* 最大可选时间，默认一天的结束时间 */
  max?: Date
  /* 禁用使劲啊函数，优先级大于min，max */
  disabledSpan?(date: Date): boolean
  /* 时间跨度，默认30分钟 */
  span?: number
  /* 选中时间 */
  selected?: Date
  /* 渲染选中 */
  renderItem?(date: Date): ReactNode
  /* 选中回调 */
  onSelect?(date: Date): void
  /* 自定义开始时间，默认从00:00开始 */
  beginTime?: Date
  /* 自定义结束使劲啊 */
  endTime?: Date
  /* 展示24:00用 */
  enabledEndTimeOfDay?: boolean
}

const TimeSpan: FC<TimeSpanProps> = ({
  min,
  max,
  disabledSpan,
  span,
  selected,
  renderItem,
  onSelect,
  beginTime,
  enabledEndTimeOfDay,
  endTime,
}) => {
  const _beginTime = getTime(beginTime) ?? moment().startOf('day')
  const _endTime = getTime(endTime) ?? moment().endOf('day')

  const getTimeCells = () => {
    let time = _beginTime
    const cells = []
    while (time <= _endTime) {
      cells.push(time)
      time = moment(+time + span!)
    }
    if (enabledEndTimeOfDay) {
      cells.push(moment().endOf('day'))
    }

    // 分三列
    let len = Math.ceil(cells.length / 3)
    if (len % 2) {
      len++
    }
    const firstCells = cells.slice(0, len)
    const middleCells = cells.slice(len, 2 * len)
    const finalCells = cells.slice(2 * len)
    return [firstCells, middleCells, finalCells]
  }

  const handleSelectTime = (value: Moment): void => {
    onSelect && onSelect(value.toDate())
  }

  const isActive = (value: Moment): boolean => {
    const select = moment(selected)

    // 判断时/分 是否相同
    return value.hour() === select.hour() && value.minute() === select.minute()
  }

  const isDisable = (time: Moment): boolean => {
    // 无需限制
    if (!max && !min && !disabledSpan) {
      return false
    }
    const dMax = max ? moment(max) : _endTime
    const dMin = min ? moment(min) : _beginTime
    const dTime = moment(time)
    return (
      !(dTime <= dMax && dTime >= dMin) ||
      ((disabledSpan && disabledSpan(time.toDate())) as boolean)
    )
  }

  const renderTimesList = (cells: Moment[]): ReactNode => {
    let width = '50px'
    if (span! >= 60 * 60 * 1000) {
      width = '100px'
    }

    return (
      <Flex wrap row className='gm-time-span-list'>
        {cells.map((value) => {
          const disabled = isDisable(value)
          return (
            <span
              key={value.format('HH:mm')}
              className={classNames('gm-time-span-list-cell', {
                active: isActive(value),
                disabled,
              })}
              style={{ width }}
              onClick={disabled ? _.noop : () => handleSelectTime(value)}
            >
              {renderItem!(value.toDate())}
            </span>
          )
        })}
      </Flex>
    )
  }

  const cells = getTimeCells()
  const totalWidth = cells.filter((cell) => cell.length).length * 130

  return (
    <Flex row className='gm-time-span' style={{ width: `${totalWidth}px` }}>
      {cells.map((cell, index) => {
        if (!cell.length) {
          // 时间间隔比较大时，某一列无数据的情况
          return null
        }
        return (
          <Flex
            key={index}
            className={classNames({
              'gm-border-right': index !== cells.length - 1,
            })}
            alignStart
          >
            {renderTimesList(cell)}
          </Flex>
        )
      })}
    </Flex>
  )
}

TimeSpan.defaultProps = {
  min: moment().startOf('day').toDate(),
  max: moment().endOf('day').toDate(),
  span: 30 * 60 * 1000,
  renderItem(date: Date): React.ReactNode {
    return moment(date).format('HH:mm')
  },
  onSelect: _.noop,
}

export default TimeSpan
