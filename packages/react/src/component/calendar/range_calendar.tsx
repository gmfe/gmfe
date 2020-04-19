import React, { useState, useEffect, CSSProperties, KeyboardEvent, FC } from 'react'
import moment, { Moment } from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import Week from './week'
import Content from './content'
import Head from './head'
import { DisabledYearAndMonth } from './types'

export interface RangeCalendarProps {
  /* 开始日期 */
  begin?: Date | null
  /* 结束日期 */
  end?: Date | null
  /* 日期选中回调函数 */
  onSelect?(begin: Date | null, end: Date | null): void
  /* 键盘 和 日期显示的月份 */
  willActiveSelected?: Date
  onWillActiveSelected?(value: Date): void
  /* 可选最小日期 */
  min?: Date
  /* 可选最大日期 */
  max?: Date
  /* 自定义日期可选，优先度大于max，min */
  disabledDate?(date: Date, selected: { begin?: Date; end?: Date }): boolean
  /* 禁用年 / 月 切换按钮，可以通过 onWillActiveSelected 变更此设置 */
  disabledYearAndMonth?: DisabledYearAndMonth
  className?: string
  style?: CSSProperties
  /* 当前鼠标hover日期 */
  hoverDay?: Moment
  /* 鼠标hover回调 */
  onHoverDay?(value: Moment): void
  /* 键盘用 */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

const RangeCalendar: FC<RangeCalendarProps> = (props) => {
  const {
    begin,
    end,
    onSelect,
    willActiveSelected,
    onWillActiveSelected,

    min,
    max,
    disabledDate,

    disabledYearAndMonth,

    hoverDay,
    onHoverDay,

    className,
    ...rest
  } = props

  // 如果 willActiveSelected 就取 begin，否则当前
  const _will = willActiveSelected ? moment(willActiveSelected) : begin ? moment(begin) : moment()

  // 需要有状态，因为 willActiveSelected 非必传
  const [will, setWill] = useState(_will)
  // 响应 willActiveSelected 的变化，重新设置 will
  useEffect(() => {
    setWill(_will)
  }, [willActiveSelected])

  const handleSelectDay = (m: Moment): void => {
    if (!onSelect) {
      return
    }
    // 如果都有，则当做选 begin
    if (begin && end) {
      onSelect(m.toDate(), null)
    } else if (begin) {
      // 如果相等，选中同一天
      if (+begin === +m) {
        onSelect(m.toDate(), m.toDate())
      }

      // 根据大小调整 begin end
      if (+begin < +m) {
        onSelect(begin, m.toDate())
      } else {
        onSelect(m.toDate(), begin)
      }
    } else if (end) {
      // 如果相等，选中同一天
      if (+end === +m) {
        onSelect(m.toDate(), m.toDate())
        // return
      }

      // 根据大小调整 begin end
      if (+end < +m) {
        onSelect(end, m.toDate())
      } else {
        onSelect(m.toDate(), end)
      }
    }
    // 如果都没有，则当做选 begin
    else {
      onSelect(m.toDate(), null)
    }
  }

  const handleChangeHead = (m: Moment): void => {
    setWill(m)

    onWillActiveSelected && onWillActiveSelected(m.toDate())
  }

  return (
    <div {...rest} className={classNames('gm-calendar', className)}>
      <Head value={will} onChange={handleChangeHead} disabledYearAndMonth={disabledYearAndMonth!} />
      <Week />
      <Content
        begin={(begin && moment(begin))!}
        end={(end && moment(end))!}
        onSelect={handleSelectDay}
        will={will}
        min={min}
        max={max}
        disabledDate={disabledDate}
        hoverDay={hoverDay}
        onHoverDay={onHoverDay}
      />
    </div>
  )
}

RangeCalendar.defaultProps = {
  onSelect: _.noop,
  onWillActiveSelected: _.noop,
  onKeyDown: _.noop,
}

export default RangeCalendar
