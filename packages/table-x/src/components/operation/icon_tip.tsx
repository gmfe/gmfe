import React, { cloneElement, FC, MouseEvent, ReactElement, useRef } from 'react'
import styled from 'styled-components'
import { Tooltip, Popover } from '@gmfe/react'

const Icon = styled.div`
  padding: 8px;
`

interface OperationIconTipProps {
  tip: string
}

const OperationIconTip: FC<OperationIconTipProps> = ({ tip, children }) => {
  const tipRef = useRef<Popover>(null)

  const handleClick = (fc: (event: MouseEvent) => void, event: MouseEvent): void => {
    tipRef.current!.apiDoSetActive()
    fc && fc(event)
  }

  return (
    <Tooltip popup={<Icon>{tip}</Icon>} showArrow ref={tipRef}>
      {cloneElement(children as ReactElement, {
        onClick: handleClick.bind(null, (children as ReactElement).props.onClick),
      })}
    </Tooltip>
  )
}

export default OperationIconTip
