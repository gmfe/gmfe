import React from 'react'
import { Dropdown, DropdownItems, DropdownItem } from './'
import { Button } from '../button'

export const normal = () => {
  return (
    <Dropdown
      popup={
        <DropdownItems>
          <DropdownItem onClick={() => console.log('123')}>123</DropdownItem>
          <DropdownItem onClick={() => console.log('23')}>23</DropdownItem>
        </DropdownItems>
      }
    >
      lala
    </Dropdown>
  )
}

export const split = () => {
  return (
    <Dropdown
      split
      popup={
        <DropdownItems>
          <DropdownItem onClick={() => console.log('123')}>123</DropdownItem>
          <DropdownItem onClick={() => console.log('23')}>23</DropdownItem>
        </DropdownItems>
      }
    >
      <Button>asdfas</Button>
    </Dropdown>
  )
}

export default {
  title: 'Dropdown',
}
