import React from 'react'
import classNames from 'classnames'
import { NavFC } from './types'
import { Flex } from '../flex'
import Item from './item'
import SingleItem from './single_item'

const Nav: NavFC = ({
  logo,
  logoActive,
  data,
  selected,
  onSelect,
  showActive,
  other,
  className,
  style,
  ...rest
}) => (
  <Flex column {...rest} className={classNames('gm-nav', className)}>
    <div className={classNames('gm-nav-logo', { active: logoActive })}>{logo}</div>
    <Flex flex column className='gm-nav-content'>
      {data.map((one, index) => (
        <Item
          key={index}
          showActive={showActive}
          data={one}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
      <div style={{ height: '100px' }} />
      {other}
    </Flex>
    <div id='gmNavPopupContainer' />
  </Flex>
)

Nav.Item = Item
Nav.SingleItem = SingleItem

export default Nav
