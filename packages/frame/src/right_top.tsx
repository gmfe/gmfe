import React, { ReactNode, FC, useContext, ComponentType } from 'react'
import { Flex } from '@gmfe/react'
import _ from 'lodash'
import Context from './context'

export interface RightTopProps {
  breadcrumb?: ComponentType | ReactNode
  info?: ComponentType | ReactNode
  onMenuBtnClick?: void
}

const RightTop: FC<RightTopProps> = ({ breadcrumb, onMenuBtnClick = _.noop, info }) => {
  const { leftWidth } = useContext(Context)

  return (
    <div className='gm-framework-right-top-default'>
      <Flex
        style={{ left: leftWidth }}
        className='gm-framework-right-top-default-inner'
        alignCenter
      >
        <Flex
          alignCenter
          className='gm-framework-right-top-default-mobile-nav'
          onClick={() => onMenuBtnClick()}
        >
          <i className='glyphicon glyphicon-menu-hamburger gm-padding-lr-10 gm-cursor' />
        </Flex>
        <Flex flex className='gm-framework-breadcrumb'>
          {breadcrumb}
        </Flex>
        <div className='gm-framework-info'>{info}</div>
      </Flex>
    </div>
  )
}

export default RightTop
