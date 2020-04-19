import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './select'
import { observable } from 'mobx'

const list = [
  {
    value: 0,
    text: '南山',
  },
  {
    value: 1,
    text: '福田',
  },
  {
    value: 2,
    text: '宝安',
  },
  {
    value: 3,
    text: '宝安不可用',
    disabled: true,
  },
  {
    value: 3,
    text: '罗湖',
  },
]

const store = observable({
  value: 0,
  setValue(value: number) {
    this.value = value
  },
})

storiesOf('Select', module)
  .add('default', () => (
    <Select<number>
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
    />
  ))
  .add('disabled', () => (
    <Select<number>
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
      disabled
    />
  ))
  .add('canShowClose', () => (
    <Select<number>
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
      canShowClose
    />
  ))
  .add('clean 模式', () => (
    <Select<number>
      clean
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
    />
  ))
