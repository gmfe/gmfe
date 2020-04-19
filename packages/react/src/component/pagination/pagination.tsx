import React, { FC, useCallback } from 'react'
import _ from 'lodash'
import { PaginationDataOptions, PaginationProps } from './utils/types'
import PaginationBase from './pagination_base'

const Pagination: FC<PaginationProps> = ({
  data = { offset: 0, limit: 10 },
  toPage,
  nextDisabled,
  ...rest
}) => {
  const handleChange = useCallback(
    (pagination: PaginationDataOptions) => {
      toPage(pagination)
    },
    [toPage]
  )

  if (!_.isNil(data.count)) {
    return (
      <PaginationBase
        {...rest}
        data={data as Required<PaginationDataOptions>}
        onChange={handleChange}
        showCount
      />
    )
  }
  let count = data.offset + data.limit * 2
  if (nextDisabled) {
    count = data.offset + data.limit
  }

  return <PaginationBase {...rest} data={{ ...data, count }} onChange={handleChange} />
}

Pagination.displayName = 'Pagination'

export default Pagination
