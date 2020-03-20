import React, { cloneElement, useRef } from 'react'
import PropTypes from 'prop-types'
import { ToolTip } from '@gmfe/react'
import styled from 'styled-components'

const Tip = styled.div`
  padding: 8px;
`

const OperationIconTip = ({ children, tip }) => {
  const tipRef = useRef()

  const handleClick = fc => {
    tipRef.current.apiDoSetActive()
    fc && fc()
  }

  return (
    <ToolTip showArrow popup={<Tip>{tip}</Tip>} ref={tipRef}>
      {cloneElement(children, {
        onClick: () => handleClick(children.props.onClick)
      })}
    </ToolTip>
  )
}

OperationIconTip.propTypes = {
  children: PropTypes.object.isRequired,
  tip: PropTypes.string.isRequired
}

export default OperationIconTip
