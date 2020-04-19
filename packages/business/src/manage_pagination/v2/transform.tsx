import React, { FC } from 'react'
import _ from 'lodash'
import { PaginationBase, PaginationDataOptions } from '@gmfe/react'

interface TransformProps {
  limit: number
  currentIndex: number
  count?: number
  peek: number
  more: boolean
  onChange(pagination: { limit: number; currentIndex: number }): void
}

const Transform: FC<TransformProps> = ({ limit, currentIndex, count, peek, more, onChange }) => {
  let newCount: number = count as number
  if (_.isNil(count)) {
    if (peek) {
      newCount = currentIndex * limit + peek
    } else {
      newCount = 0
    }
  }

  const _peekInfo = !count ? { peek, more } : undefined

  const handleChange = ({ offset, limit }: PaginationDataOptions) => {
    onChange({ limit, currentIndex: offset / limit })
  }
  return (
    <PaginationBase
      data={{ offset: currentIndex * limit, limit, count: newCount }}
      onChange={handleChange}
      _peekInfo={_peekInfo}
      showCount={!_.isNil(count)}
    />
  )
}

export default Transform
