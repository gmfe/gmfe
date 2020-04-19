import React from 'react'
import { storiesOf } from '@storybook/react'
import InputNumberV2 from './input_number_v2'
import { observable } from 'mobx'

const store = observable({
  value: null,
  setValue(value: number | null) {
    // @ts-ignore
    this.value = value
  },
})

storiesOf('InputNumberV2', module).add('default', () => (
  <InputNumberV2
    value={store.value}
    onChange={(value) => {
      store.setValue(value)
    }}
  />
))
