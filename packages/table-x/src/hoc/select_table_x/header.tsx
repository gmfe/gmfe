import React, { FC, memo } from 'react'
import { SelectTableXProps } from './hoc'
import SelectTableXContext from './context'
import { Checkbox } from '@gmfe/react'

const SelectHeader: FC<Pick<SelectTableXProps<any>, 'selectType'>> = ({ selectType }) => {
  if (selectType !== 'checkbox') {
    return null
  }
  return (
    <SelectTableXContext.Consumer>
      {({ isSelectAll, onSelectAll }) => (
        <Checkbox onChange={onSelectAll} checked={isSelectAll} className='gm-table-x-select' />
      )}
    </SelectTableXContext.Consumer>
  )
}

export default memo(SelectHeader)
