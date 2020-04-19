import React from 'react'
import { storiesOf } from '@storybook/react'
import InputNumberV2 from './input_number_v2'
import { observable } from 'mobx'
import InputNumber from './input_number'

const store = observable({
  value: null,
  setValue(value) {
    this.value = value
  },
})

storiesOf('InputNumberV2', module)
  .add('default', () => (
    <InputNumberV2
      value={store.value}
      onChange={(value) => {
        store.setValue(value)
      }}
    />
  ))
  .add('common', () => (
    <InputNumber
      value={store.value}
      minus
      onChange={(value) => {
        console.log(value)
        store.setValue(value)
      }}
    />
  ))
