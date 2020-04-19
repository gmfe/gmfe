import React, { FC } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'
import Day from './day'

interface ContentProps {
  /* 开始日期 */
  begin: Moment | null
  /* 结束日期 */
  end: Moment | null
  /* 选中日期 */
  onSelect(date: Moment): void
  /* 键盘用 */
  will: Moment
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义可选日期 */
  disabledDate?(date: Date, options: { begin?: Date | null; end?: Date | null }): boolean
  /* 当前鼠标hover日期 */
  hoverDay?: Moment
  /* 鼠标hover日期修改函数 */
  onHoverDay?(date: Moment): void
}

const Content: FC<ContentProps> = (props) => {
  const { begin, end, onSelect, will, hoverDay, onHoverDay } = props

  const day = moment(will).startOf('month').day(0).add(-1, 'day')

  const group = _.groupBy(_.range(42), (v) => parseInt(`${v / 7}`))

  const getDisabled = (m: Moment): boolean => {
    const { disabledDate } = props
    let min: Moment | null = null
    if (props.min) {
      min = moment(props.min).startOf('day')
    }
    let max: Moment | null = null
    if (props.max) {
      max = moment(props.max).startOf('day')
    }
    let disabled = false
    if (disabledDate) {
      disabled = disabledDate(m.toDate(), {
        begin: begin && begin.toDate(),
        end: end && end.toDate(),
      })
    } else {
      if (min && m < min) {
        disabled = true
      }
      if (max && m > max) {
        disabled = true
      }
    }
    return disabled
  }

  return (
    <div className='gm-calendar-content'>
      {_.map(group, (v, i) => (
        <div key={i} className='gm-calendar-content-div'>
          {_.map(v, (_, index) => {
            const mm = moment(day.add(1, 'day'))
            return (
              <Day
                key={index}
                value={mm}
                begin={begin}
                end={end}
                disabled={getDisabled(mm)}
                onClick={onSelect}
                will={will}
                hoverDay={hoverDay}
                onHoverDay={onHoverDay}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Content
