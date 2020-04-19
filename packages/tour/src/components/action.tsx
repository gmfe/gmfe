import React, { FC, MouseEvent } from 'react'
import { Button } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'

interface ActionProps {
  isLastItem: boolean
  onNextStep(): void
  onClose(event: MouseEvent): void
}

const Action: FC<ActionProps> = ({ isLastItem, onNextStep, onClose }) => {
  return (
    <div className='gm-flex gm-flex-justify-end gm-padding-top-10'>
      {isLastItem ? (
        <Button type='primary' onClick={onClose}>
          {getLocale('马上尝试')}
        </Button>
      ) : (
        <Button type='primary' onClick={onNextStep}>
          {getLocale('下一步')}
        </Button>
      )}
    </div>
  )
}

export default Action
