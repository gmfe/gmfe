import { SelectContext } from './util'
import { Checkbox, Radio } from '@gmfe/react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

const SelectCell = ({ selectType, keyField, row, isSelectorDisable }) => {
  const value = row.original[keyField]

  return (
    <SelectContext.Consumer>
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
    </SelectContext.Consumer>
  )
}

SelectCell.propTypes = {
  selectType: PropTypes.string.isRequired,
  keyField: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  isSelectorDisable: PropTypes.func.isRequired
}

export default SelectCell
