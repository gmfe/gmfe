import React from 'react'
import { SelectedSetContext, SelectOperationContext } from './util'
import { Checkbox } from '@gmfe/react'
import PropTypes from 'prop-types'

const SelectHeader = React.memo(({ selectType }) => {
  if (selectType !== 'checkbox') {
    return null
  }

  return (
    <SelectedSetContext.Consumer>
      {({ isSelectAll }) => (
        <SelectOperationContext.Consumer>
          {({ onSelectAll }) => (
            <Checkbox
              className='gm-table-x-select'
              checked={isSelectAll}
              onChange={onSelectAll}
            />
          )}
        </SelectOperationContext.Consumer>
      )}
    </SelectedSetContext.Consumer>
  )
})

SelectHeader.propTypes = {
  selectType: PropTypes.string.isRequired
}

export default SelectHeader
