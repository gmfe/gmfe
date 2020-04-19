import { getLocale } from '@gmfe/locales'
import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Flex } from '@gmfe/react'

const Bottom = (props) => {
  const { checkedAll, onChange, selectValuesLength, leafListLength, disabled } = props

  return (
    <Flex justifyBetween alignCenter className='gm-border-top gm-padding-5'>
      <Checkbox value checked={checkedAll} onChange={onChange} disabled={disabled}>
        {getLocale('全选')}
      </Checkbox>
      <div className='gm-padding-lr-5 gm-text-desc'>
        {selectValuesLength}/{leafListLength}
      </div>
    </Flex>
  )
}

Bottom.propTypes = {
  checkedAll: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  selectValuesLength: PropTypes.number.isRequired,
  leafListLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
}

export default Bottom
