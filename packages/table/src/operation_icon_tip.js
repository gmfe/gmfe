import React, { cloneElement, useRef } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@gmfe/react'
import styled from 'styled-components'

const Tip = styled.div`
  padding: 8px;
`

const OperationIconTip = ({ children, tip }) => {
  const tipRef = useRef()

  const handleClick = (fc, event) => {
    tipRef.current.apiDoSetActive()
    fc && fc(event)
  }

  return (
    <Tooltip showArrow popup={<Tip>{tip}</Tip>} ref={tipRef}>
      {cloneElement(children, {
        onClick: (event) => handleClick(children.props.onClick, event),
      })}
    </Tooltip>
  )
}

OperationIconTip.propTypes = {
  children: PropTypes.object.isRequired,
  tip: PropTypes.string.isRequired,
}

export default OperationIconTip
