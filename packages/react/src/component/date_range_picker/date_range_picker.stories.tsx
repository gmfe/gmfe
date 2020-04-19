import React from 'react'
import { storiesOf } from '@storybook/react'
import DateRangePicker from './date_range_picker'
import { observable } from 'mobx'
import moment from 'moment'
import { getLocale } from '@gmfe/locales'
import { QuickSelectListOptions } from './types'

const store = observable({
  begin: new Date(),
  end: new Date(),
  changeDate(begin: Date | null, end: Date | null) {
    this.begin = begin
    this.end = end
  },
})

const _store = {
  begin: null,
  end: null,
  changeDate(begin: Date | null, end: Date | null) {
    const value = moment(end!).format('YYYY-MM-DD')
    console.log(moment(end!).add(1, 'ms').isSame(moment(value).add(1, 'd')))
    this.begin = begin
    this.end = end
  },
}

const storeNull = observable(_store)
const store1 = observable(_store)

const store3 = observable({
  begin: moment().hour(14).minute(0).toDate(),
  end: moment().hour(18).minute(0).toDate(),
  changeDate(begin: Date | null, end: Date | null) {
    this.begin = begin
    this.end = end
  },
})

const disabledBegin = (date: Date) => {
  return moment(date).isSameOrBefore(moment(date).hour(11))
}

const lastDaysofLastMonth = moment().add(-1, 'month').endOf('month')
const diffDays = moment().diff(lastDaysofLastMonth, 'days')
const lastMonthDays = moment(
  lastDaysofLastMonth.format('YYYY-MM'),
  'YYYY-MM'
).daysInMonth()
const quickList: QuickSelectListOptions[] = [
  {
    range: [
      [0, 'day'],
      [0, 'day'],
    ],
    text: getLocale('今天'),
  },
  {
    range: [
      [-(lastMonthDays + diffDays), 'day'],
      [-(diffDays + 1), 'day'],
    ],
    text: getLocale('上个月'),
  },
]

storiesOf('DateRangePicker', module)
  .add('说明', () => <div />, {
    info: {
      text: `
        额外增加时间选择功能说明：

        时间选择展示以 00:00 ～ 24:00 表示一天

        24:00的返回形式为moment(date).endOf('day'),与第二天 00:00 相差 1ms

        调用方传给后台时需要自行加一层判断转换成 第二天的00:00

        若需要自定义 日期展示格式, 也需要自行处理这个情况
      `,
    },
  })
  .add('default', () => (
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
    />
  ))
  .add('begin end', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
    />
  ))
  .add('disabledDate', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      min={moment().toDate()}
      max={moment().add(10, 'day').toDate()}
    />
  ))
  .add(
    'disabledDate 限制一个月',
    () => (
      <DateRangePicker
        begin={storeNull.begin}
        end={storeNull.end}
        onChange={(begin, end) => storeNull.changeDate(begin, end)}
        disabledDate={(d, { begin }) => {
          if (begin) {
            if (+moment(d) > +moment(begin).add(1, 'month')) {
              return true
            }
          }
          return false
        }}
      />
    ),
    {
      info: {
        text: 'DateRangePicker 只能通过 disabledDate 限制一个月',
      },
    }
  )
  .add('disabled', () => <DateRangePicker disabled />)
  .add('canClear', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      canClear
    />
  ))
  .add('children 自定义', () => (
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
    >
      <div>
        开始
        {storeNull.begin
          ? moment(storeNull.begin ?? undefined).format('YYYY-MM-DD')
          : ''}
        结束
        {storeNull.end
          ? moment(storeNull.end ?? undefined).format('YYYY-MM-DD')
          : ''}
      </div>
    </DateRangePicker>
  ))
  .add('自定义日期展示格式', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      renderDate={(begin, end) =>
        `${moment(begin).format('YYYY-MM-DD')} - ${moment(end).format(
          'MM / DD'
        )}`
      }
    />
  ))
  .add('增加时间选择', () => {
    return (
      <DateRangePicker
        begin={store1.begin}
        end={store1.end}
        onChange={(begin, end) => store1.changeDate(begin, end)}
        enabledTimeSelect
        customQuickSelectList={quickList}
      />
    )
  })
  .add('增加时间选择(1小时间隔)', () => {
    return (
      <DateRangePicker
        begin={store3.begin}
        end={store3.end}
        onChange={(begin, end) => store3.changeDate(begin, end)}
        enabledTimeSelect
        beginTimeSelect={{
          defaultTime: moment().startOf('day').hour(12).toDate(),
          disabledSpan: disabledBegin,
        }}
        endTimeSelect={{
          disabledSpan: disabledBegin,
        }}
        timeSpan={60 * 60 * 1000}
      />
    )
  })
