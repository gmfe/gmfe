import React, { FC } from 'react'
import classNames from 'classnames'
import { getLocale } from '@gmfe/locales'
import { FlexProps } from '../flex/flex'
import DefaultContainer from './default_container'

const DefaultImage: FC<FlexProps> = ({ className, children, ...rest }) => {
  return (
    <DefaultContainer {...rest} className={classNames('gm-text-12', className)}>
      {children ?? getLocale('+ 加图')}
    </DefaultContainer>
  )
}

export default DefaultImage
