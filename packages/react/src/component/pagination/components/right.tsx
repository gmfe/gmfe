import React, { FC, useCallback, useContext, useEffect, useState, KeyboardEvent } from 'react'
import paginationContext, { PaginationContextOptions } from '../utils/context'
import getIndex from '../utils/get_index'
import { Flex } from '../../flex'
import { InputNumberV2 } from '../../input_number'

const Right: FC = () => {
  const { data, onChange } = useContext(paginationContext) as PaginationContextOptions
  const [index, setIndex] = useState(getIndex(data))

  // 响应外部的 index 变化
  useEffect(() => {
    setIndex(getIndex(data))
  }, [data])

  const all = Math.ceil(data.count / data.limit)

  const handleInput = useCallback((value: number) => {
    setIndex(value)
  }, [])

  const handleEnsureIndex = useCallback(() => {
    if (index === null) {
      setIndex(getIndex(data))
      return
    }
    onChange({ offset: (index - 1) * data.limit, limit: data.limit })
  }, [index, data, onChange])

  const handleBlur = useCallback(() => {
    handleEnsureIndex()
  }, [handleEnsureIndex])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnsureIndex()
      }
    },
    [handleEnsureIndex]
  )

  return (
    <Flex className='gm-pagination-right'>
      <InputNumberV2
        precision={0}
        value={index}
        onChange={handleInput}
        min={1}
        max={all}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className='form-control'
        style={{ width: '40px' }}
      />
      <div className='gm-pagination-right-total-page'>{`/${all}页`}</div>
    </Flex>
  )
}

export default Right
