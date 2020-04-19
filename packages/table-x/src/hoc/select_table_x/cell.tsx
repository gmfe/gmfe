import React from 'react'
import { Row } from 'react-table'
import _ from 'lodash'
import { SelectTableXProps } from './hoc'
import SelectTableXContext from './context'
import { Checkbox, Radio } from '@gmfe/react'

interface SelectCellProps<Original extends object>
  extends Required<
    Pick<SelectTableXProps<Original>, 'selectType' | 'keyField' | 'isSelectorDisable'>
  > {
  row: Row<Original>
}

function SelectCell<Original extends object>({
  selectType,
  keyField,
  isSelectorDisable,
  row,
}: SelectCellProps<Original>) {
  const value = row.original[keyField]

  return (
    <SelectTableXContext.Consumer>
      {({ selected, onSelect }) => {
        const isChecked = selected.includes(value)
        const disabled = isSelectorDisable(row.original)

        if (selectType === 'checkbox') {
          return (
            <Checkbox
              className='gm-table-x-select'
              disabled={disabled}
              checked={isChecked}
              onChange={() => {
                onSelect(_.xor(selected, [value]))
              }}
            />
          )
        } else {
          return (
            <Radio
              className='gm-table-x-select'
              disabled={disabled}
              checked={isChecked}
              onClick={() => {
                onSelect(isChecked ? [] : [value])
              }}
            />
          )
        }
      }}
    </SelectTableXContext.Consumer>
  )
}

export default SelectCell
