import { getLocale } from '@gmfe/locales'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import { Checkbox } from '../checkbox'
import { getValues } from './util'

const Bottom = ({ list, selectedValues, onChange }) => {
  const values = useMemo(() => {
    return getValues(list)
  }, [list])

  const checkedAll =
    values.length !== 0 && values.length === selectedValues.length

  return (
    <Flex justifyBetween alignCenter className='gm-border-top gm-padding-5'>
      <Checkbox checked={checkedAll} onChange={() => onChange(!checkedAll)}>
        {getLocale('全选')}
      </Checkbox>
      <div className='gm-padding-lr-5 gm-text-desc'>
        {selectedValues.length}/{values.length}
      </div>
    </Flex>
  )
}

Bottom.propTypes = {
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Bottom
