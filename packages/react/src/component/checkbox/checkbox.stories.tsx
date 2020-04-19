import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox, CheckboxGroup } from './index'
import { observable } from 'mobx'

const store = observable({
  value: [1, 4],
  data: [
    {
      value: 1,
      text: '广州',
    },
    {
      value: 2,
      text: '深圳',
      disabled: true,
    },
    {
      value: 3,
      text: '成都',
    },
    {
      value: 4,
      text: '东莞',
      disabled: true,
    },
  ],
  setValue(value: any) {
    console.log(value)
    this.value = value
  },
  checked: false,
  setChecked(checked: any) {
    this.checked = checked
  },
})

storiesOf('Checkbox', module)
  .add('default', () => (
    <div>
      <div>
        <h1>默认</h1>
        <Checkbox checked>选中 checked true</Checkbox>
        <Checkbox>checked false</Checkbox>
        <Checkbox indeterminate>checked indeterminate</Checkbox>
      </div>
      <div>
        <h1>disabled</h1>
        <Checkbox checked disabled>
          checked true
        </Checkbox>
        <Checkbox disabled>checked false</Checkbox>
        <Checkbox indeterminate disabled>
          checked indeterminate
        </Checkbox>
      </div>
      <div>
        <h1>inline</h1>
        <Checkbox checked inline>
          checked true
        </Checkbox>
        <Checkbox inline>checked false</Checkbox>
      </div>
      <div>
        <h1>block 整行都可以点</h1>
        <Checkbox block checked={store.checked} onChange={() => store.setChecked(!store.checked)}>
          checked
        </Checkbox>
      </div>
    </div>
  ))
  .add('CheckboxGroup', () => (
    <CheckboxGroup name='city' value={store.value} onChange={(value) => store.setValue(value)}>
      {store.data.map((v) => (
        <Checkbox key={v.value} value={v.value} disabled={v.disabled}>
          {v.text}
        </Checkbox>
      ))}
    </CheckboxGroup>
  ))
  .add('inline and col', () => (
    <CheckboxGroup
      name='city'
      value={store.value}
      onChange={(value) => store.setValue(value)}
      col={2}
      inline
    >
      {store.data.map((v) => (
        <Checkbox key={v.value} value={v.value} disabled={v.disabled}>
          {v.text}
        </Checkbox>
      ))}
    </CheckboxGroup>
  ))
