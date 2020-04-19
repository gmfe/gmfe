import React, { FC, HTMLAttributes } from 'react'
import { Flex } from '../flex'
import classNames from 'classnames'
import _ from 'lodash'

interface StepProps {
  title?: string
  description?: string
  index: number
}

const Step: FC<StepProps> = (props) => {
  const { title, description, index } = props

  return (
    <Flex row className='gm-steps-step gm-margin-top-5'>
      <Flex column alignCenter className='gm-margin-right-10'>
        <div className='gm-steps-step-icon'>{index}</div>
        <div className='gm-steps-step-tag gm-margin-top-5' />
      </Flex>
      <div>
        {title && <div className='gm-steps-step-title'>{title}</div>}
        {description && <div className='gm-steps-step-description'>{description}</div>}
      </div>
    </Flex>
  )
}

export interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  data: StepsDataOptions[]
}

export interface StepsDataOptions {
  title: string
  description?: string
}

const Steps: FC<StepsProps> = (props) => {
  const { data, className, ...rest } = props

  const renderStep = () => {
    return _.map(data, (item, index) => {
      return (
        <Step
          index={index + 1}
          title={item.title}
          description={item.description}
          key={`step ${index}`}
        />
      )
    })
  }

  return (
    <div {...rest} className={classNames('gm-steps', className)}>
      {renderStep()}
    </div>
  )
}

export default Steps
