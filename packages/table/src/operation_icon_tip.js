import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ToolTip } from '@gmfe/react'
import styled from 'styled-components'

const Tip = styled.div`
  padding: 8px;
`

const OperationIconTip = ({ children, tip }, ref) => {
  return (
    <ToolTip showArrow popup={<Tip>{tip}</Tip>} ref={ref}>
      {children}
    </ToolTip>
  )
}

OperationIconTip.propTypes = {
  children: PropTypes.object.isRequired,
  tip: PropTypes.string.isRequired
}

export default forwardRef(OperationIconTip)
