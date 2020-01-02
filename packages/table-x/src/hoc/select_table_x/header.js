import React from 'react'
import { SelectContext } from './util'
import { Checkbox } from '@gmfe/react'
import PropTypes from 'prop-types'

const SelectHeader = React.memo(({ selectType }) => {
  if (selectType !== 'checkbox') {
    return null
  }

  return (
    <SelectContext.Consumer>
      {({ isSelectAll, onSelectAll }) => (
        <Checkbox
          className='gm-table-x-select'
          checked={isSelectAll}
          onChange={onSelectAll}
        />
      )}
    </SelectContext.Consumer>
  )
})

SelectHeader.propTypes = {
  selectType: PropTypes.string.isRequired
}

export default SelectHeader
