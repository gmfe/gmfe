import React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio, RadioGroup } from './'
import { observable } from 'mobx'

const store = observable({
  value: 3,
  data: [
    {
      value: 1,
      text: '广州'
    },
    {
      value: 2,
      text: '深圳'
    },
    {
      value: 3,
      text: '成都',
      disabled: true
    }
  ],
  setValue(value) {
    console.log(value)
    this.value = value
  },
  checked: false,
  setChecked(checked) {
    console.log('setChecked', checked)
    this.checked = checked
  }
})

storiesOf('Radio', module)
  .add('default', () => (
    <div>
      <div>
        <h1>常规</h1>
        <Radio checked>radio</Radio>
        <Radio>radio</Radio>
      </div>
      <div>
        <h1>disabled</h1>
        <Radio checked disabled>
          radio
        </Radio>
        <Radio disabled>radio</Radio>
      </div>
      <div>
        <h1>inline</h1>
        <Radio checked inline>
          radio
        </Radio>
        <Radio inline>radio</Radio>
      </div>
      <div>
        <h1>block</h1>
        <Radio
          block
          checked={store.checked}
          onChange={() => store.setChecked(!store.checked)}
        >
          radio
        </Radio>
      </div>
    </div>
  ))
  .add('RadioGroup', () => (
    <RadioGroup
      name='city'
      value={store.value}
      onChange={value => store.setValue(value)}
    >
      {store.data.map(v => (
        <Radio key={v.value} value={v.value} disabled={v.disabled}>
          {v.text}
        </Radio>
      ))}
    </RadioGroup>
  ))
