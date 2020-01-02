import React from 'react'
import { SelectContext } from './util'
import { Checkbox } from '@gmfe/react'
import PropTypes from 'prop-types'

const SelectHeader = React.memo(({ selectType }) => {
  console.log('render SelectHeader')
  if (selectType !== 'checkbox') {
    return null
  }

  return (
    <SelectContext.Consumer>
      {({ dataLength, isSelectAll, onSelectAll }) => {
        console.log('SelectContext.Consumer')

        return (
          <Checkbox
            className='gm-table-x-select'
            disabled={dataLength === 0} // eslint-disable-line
            checked={isSelectAll}
            onChange={onSelectAll}
          />
        )
      }}
    </SelectContext.Consumer>
  )
})

SelectHeader.propTypes = {
  selectType: PropTypes.string.isRequired
}

export default SelectHeader
