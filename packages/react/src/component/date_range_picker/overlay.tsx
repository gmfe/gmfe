import React, { FC, useState, MouseEvent } from 'react'
import { QuickSelectListOptions } from './types'
import moment from 'moment'
import { TimeLimit } from '../date_picker/types'
import { Flex } from '../flex'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'
import Left from './left'
import { getTimeCells, setTimes } from './util'
import Two from './two'
import TimeRangeSelect from './time_range_select'

interface OverlayTimeLimit extends Omit<TimeLimit, 'timeSpan'> {
  /* 最大可选时间 */
  max?: Date
  /* 最小可选时间 */
  min?: Date
}

interface OverlayProps {
  begin?: Date | null
  end?: Date | null
  onOK(begin: Date | null, end: Date | null): void
  onCancel(): void
  min?: Date
  max?: Date
  disabledDate?(date: Date, selected: { begin?: Date; end?: Date }): boolean
  enabledTimeSelect?: boolean
  timeSpan?: number
  customQuickSelectList?: QuickSelectListOptions[]
  beginTimeSelect?: OverlayTimeLimit
  endTimeSelect?: OverlayTimeLimit
}

/**
 * 日期段选择
 * 形态上不支持全键盘，所以不做相关逻辑
 */
const Overlay: FC<OverlayProps> = ({
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
  customQuickSelectList,
}) => {
  const [_begin, setBegin] = useState(begin)
  const [_end, setEnd] = useState(end)

  // 首次展示，取缔一个可选时间点
  const getFirstSelectTime = (
    timeSelect: OverlayTimeLimit,
    type: 'begin' | 'end',
    begin: Date,
    end: Date
  ): Date | undefined => {
    const cells = getTimeCells(timeSpan!)
    if (type === 'end') {
      cells.reverse()
    }
    const date = type === 'begin' ? begin : end

    // 无限制 取第一个时间点
    if (!timeSelect) {
      return cells[0].toDate()
    }

    const { defaultTime, disabledSpan } = timeSelect
    // 有默认时间取默认时间
    if (defaultTime) {
      return defaultTime
    }

    // 无默认时间，开始时间取第一个可选时间，结束时间取最后一个可选时间
    if (disabledSpan) {
      const index = cells.findIndex((cell) => {
        const _cell = setTimes(moment(date), cell)
        const disabled = disabledSpan
          ? disabledSpan(_cell.toDate(), { begin, end })
          : false
        return !disabled
      })
      if (index === -1) {
        return cells[0].toDate()
      }
      return cells[index].toDate()
    }
    return undefined // 原代码没有，转成ts后加上
  }

  // 第三个字段没有找到传入的地方
  const handleSelect = (begin: Date, end: Date, updateEndTime?: boolean): void => {
    let b = begin
    let e = end
    if (enabledTimeSelect) {
      // 未完成日期选择，需要得到所选日期的展示时间
      if (begin && !(_begin && _end)) {
        const time = getFirstSelectTime(beginTimeSelect!, 'begin', begin, end)
        b = setTimes(moment(begin), moment(time)).toDate()
      }

      // 结束时间可能与开始时间选择相关，通过传入字段决定是否更新
      if (end && updateEndTime) {
        const time = getFirstSelectTime(endTimeSelect!, 'end', begin, end)
        e = setTimes(moment(end), moment(time)).toDate()
      }
    }

    setBegin(b)
    setEnd(e)

    // 不需选择时间，直接关闭
    if (!enabledTimeSelect && begin && end) {
      onOK(begin, end)
    }
  }

  const handleSelectDateAndTime = (): void => {
    onOK(_begin!, _end!)
  }

  const defaultTimes = {
    begin: getFirstSelectTime(beginTimeSelect!, 'begin', _begin!, _end!),
    end: getFirstSelectTime(endTimeSelect!, 'end', _begin!, _end!),
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

export default Overlay

interface BottomProps {
  enabledTimeSelect?: boolean
  begin?: Date | null
  end?: Date | null
  onSelectDateAndTime?(event: MouseEvent<HTMLButtonElement>): void
}

const Bottom: FC<BottomProps> = ({
  enabledTimeSelect,
  begin,
  end,
  onSelectDateAndTime,
}) => {
  if (!enabledTimeSelect) {
    return null
  }
  return (
    <Flex justifyEnd className='gm-border-top gm-padding-10'>
      <Button
        type='primary'
        className='gm-padding-lr-20'
        disabled={!!(begin && !end) || !!(!begin && end)}
        onClick={onSelectDateAndTime}
      >
        {getLocale('确定')}
      </Button>
    </Flex>
  )
}
