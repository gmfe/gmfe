import React, { FC } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { QuickSelectListOptions } from './types'
import { getLocale } from '@gmfe/locales'
import { setTimes } from './util'

const defaultQuickList: QuickSelectListOptions[] = [
  {
    range: [
      [0, 'day'],
      [0, 'day'],
    ],
    text: getLocale('今天'),
  },
  {
    range: [
      [-1, 'day'],
      [-1, 'day'],
    ],
    text: getLocale('昨天'),
  },
  {
    range: [
      [-6, 'day'],
      [0, 'day'],
    ],
    text: getLocale('近7天'),
  },
  {
    range: [
      [-29, 'day'],
      [0, 'day'],
    ],
    text: getLocale('近30天'),
  },
]

interface LeftProps {
  onSelect(begin: Date | null, end: Date | null): void
  begin?: Date | null
  end?: Date | null
  enabledTimeSelect?: boolean
  defaultTimes?: { begin?: Date; end?: Date }
  customQuickSelectList?: QuickSelectListOptions[]
}

const Left: FC<LeftProps> = ({
  end,
  begin,
  onSelect,
  defaultTimes,
  enabledTimeSelect,
  customQuickSelectList,
}) => {
  let list = defaultQuickList
  if (customQuickSelectList && customQuickSelectList.length) {
    list = customQuickSelectList
  }

  const handleClick = (item: QuickSelectListOptions): void => {
    const [b, e] = item.range
    const begin = moment().startOf('day').add(b[0], b[1])
    const end = moment().endOf('day').add(e[0], e[1])

    // 判断是否需要处理时间
    if (enabledTimeSelect) {
      const _begin = setTimes(begin, moment(defaultTimes?.begin))
      const _end = setTimes(end, moment(defaultTimes?.end))

      onSelect(_begin.toDate(), _end.toDate())
      return
    }
    onSelect(begin.toDate(), end.toDate())
  }

  const isActive = (item: QuickSelectListOptions): boolean => {
    const [b, e] = item.range
    const _begin = moment().startOf('day').add(b[0], b[1])
    const _end = moment().endOf('day').add(e[0], e[1])
    return (
      +moment(begin ?? undefined).startOf('day') === +_begin.startOf('day') &&
      +moment(end ?? undefined).startOf('day') === +_end.startOf('day')
    )
  }

  return (
    <div className='gm-border-right gm-margin-top-0' style={{ width: '70px' }}>
      {list.map((item) => (
        <div
          key={item.text}
          className={classNames(
            'gm-padding-lr-10',
            'gm-cursor',
            'gm-date-range-picker-left-item',
            { 'gm-text-primary': isActive(item) }
          )}
          onClick={() => handleClick(item)}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default Left
