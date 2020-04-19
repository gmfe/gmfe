import React, { FC } from 'react'
import classNames from 'classnames'
import { Flex, FlexProps } from '../flex'
import SVGPlus from '../../../svg/plus.svg'

const DefaultContainer: FC<FlexProps> = ({ className, children, ...rest }) => {
  return (
    <Flex
      {...rest}
      alignCenter
      justifyCenter
      className={classNames('gm-uploader-default', 'gm-text-primary', className)}
    >
      {children ?? <SVGPlus />}
    </Flex>
  )
}

export default DefaultContainer
