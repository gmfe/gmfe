import React from 'react'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import ColorPicker from './color_picker'

const store = observable({
  color: '',
  setColor(color: string) {
    this.color = color
  },
})

storiesOf('ColorPicker', module).add('default', () => (
  <ColorPicker
    color={store.color}
    onChange={(value) => store.setColor(value)}
  />
))
