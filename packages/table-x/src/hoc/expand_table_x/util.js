import React, { createContext } from 'react'
import SVGCloseup from '../../../svg/closeup.svg'
import SVGExpand from '../../../svg/expand.svg'
import PropTypes from 'prop-types'

const ExpandContext = createContext({
  dataLength: 0,
  expanded: [],
  isExpandAll: false,
  onExpand: () => {},
  onExpandAll: () => {}
})

const Expand = ({ active, onChange }) => {
  return (
    <div className='gm-cursor gm-table-x-expand' onClick={onChange}>
      {active ? <SVGCloseup className='gm-text-primary' /> : <SVGExpand />}
    </div>
  )
}

Expand.propTypes = {
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export { ExpandContext, Expand }
