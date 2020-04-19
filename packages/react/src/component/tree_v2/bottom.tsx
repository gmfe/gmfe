import React, { useMemo } from 'react'
import { getLocale } from '@gmfe/locales'
import { TreeV2DataOptions } from './types'
import { getLeafValues } from './utils'
import { Flex } from '../flex'
import { Checkbox } from '../checkbox'

interface BottomProps<T> {
  list: TreeV2DataOptions<T>[]
  selectedValues: T[]
  onChange(checked: boolean): void
}

const Bottom = <T,>({ list, selectedValues, onChange }: BottomProps<T>) => {
  const leafValues = useMemo(() => getLeafValues(list), [list])
  const checkedAll = !!leafValues.length && leafValues.length === selectedValues.length
  const isIndeterminate = !!selectedValues.length && selectedValues.length < leafValues.length

  return (
    <Flex justifyBetween alignCenter className='gm-border-top gm-padding-5'>
      <Checkbox
        checked={checkedAll}
        indeterminate={isIndeterminate}
        onChange={() => onChange(!checkedAll)}
      >
        {getLocale('全选')}
      </Checkbox>
      <div className='gm-padding-lr-5 gm-text-desc'>
        {selectedValues.length}/{leafValues.length}
      </div>
    </Flex>
  )
}

export default Bottom
