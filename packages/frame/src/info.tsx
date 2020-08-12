import React, { FC } from 'react'
import { Flex, Popover, List } from '@gmfe/react'
import _ from 'lodash'
import SVGMore from '../svg/more.svg'

interface moreOptions {
  text: string
  onClick(): void
}

export interface InfoProps {
  more: moreOptions[]
  children?: any
}

const Info: FC<InfoProps> = ({ more, children }) => {
  const listData = _.map(more, (v, i) => ({ value: i, text: v.text }))

  const handleSelect = (value: number): void => {
    more[value].onClick()
  }

  return (
    <Flex alignCenter className='gm-framework-info-default'>
      <Flex flex />
      <Flex>{children}</Flex>
      {more && (
        <Popover
          showArrow
          type='click'
          right
          className='gm-framework-info-default-setting-popover'
          popup={<List data={listData} onSelect={handleSelect} className='gm-border-0' />}
        >
          <div className='gm-framework-info-default-item'>
            <SVGMore style={{ transform: 'rotate(90deg)' }} />
          </div>
        </Popover>
      )}
    </Flex>
  )
}

export default Info
