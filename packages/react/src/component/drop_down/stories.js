import React from 'react'
import { DropDown, DropDownItem, DropDownItems } from './index'
import Button from '../button'

export const normal = () => {
  return (
    <DropDown
      popup={
        <DropDownItems>
          <DropDownItem onClick={() => console.log('123')}>123</DropDownItem>
          <DropDownItem onClick={() => console.log('23')}>23</DropDownItem>
        </DropDownItems>
      }
    >
      lala
    </DropDown>
  )
}

export const split = () => {
  return (
    <DropDown
      split
      popup={
        <DropDownItems>
          <DropDownItem onClick={() => console.log('123')}>123</DropDownItem>
          <DropDownItem onClick={() => console.log('23')}>23</DropDownItem>
        </DropDownItems>
      }
    >
      <Button>asdfas</Button>
    </DropDown>
  )
}

export default {
  title: 'DropDown'
}
