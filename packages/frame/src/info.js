import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Popover, List } from '@gmfe/react'
import _ from 'lodash'

const Info = props => {
  const { more, children } = props

  const listData = _.map(more, (v, i) => ({ value: i, text: v.text }))

  const handleSelect = value => {
    more[value].onClick()
  }

  return (
    <Flex alignCenter className='gm-framework-info-default'>
      <Flex flex />
      <Flex>{children}</Flex>
      {more && (
        <Popover
          animName
          showArrow
          type='click'
          right
          className='gm-framework-info-default-setting-popover'
          popup={
            <List
              data={listData}
              onSelect={handleSelect}
              className='gm-border-0'
            />
          }
        >
          <div className='gm-framework-info-default-item gm-text-14'>更多</div>
        </Popover>
      )}
    </Flex>
  )
}

Info.propTypes = {
  more: PropTypes.array // [{text, onClick}]
}

export default Info
