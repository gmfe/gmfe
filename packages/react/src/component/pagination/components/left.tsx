import React, { FC, useCallback, useContext } from 'react'
import { Flex } from '../../flex'
import paginationContext, { PaginationContextOptions } from '../utils/context'
import { Select } from '../../select'

interface LeftProps {
  showCount?: boolean
}

const Left: FC<LeftProps> = ({ showCount }) => {
  const { data, onChange } = useContext(paginationContext) as PaginationContextOptions
  const handleChange = useCallback(
    (limit: number) => {
      onChange({ offset: 0, limit })
    },
    [onChange]
  )

  return (
    <Flex alignCenter>
      {showCount && <span>共{data.count}条记录，&nbsp;</span>}
      <span>每页&nbsp;</span>
      <Limit value={data.limit} onChange={handleChange} />
      <span>&nbsp;条</span>
    </Flex>
  )
}

export default Left

interface LimitProps {
  value: number
  onChange(value: number): void
}

const LIMIT_DATA = [
  { value: 10, text: '10' },
  { value: 20, text: '20' },
  { value: 50, text: '50' },
]

const Limit: FC<LimitProps> = ({ value, onChange }) => {
  return <Select onChange={onChange} data={LIMIT_DATA} value={value} style={{ width: '60px' }} />
}
