import React from 'react'
import { storiesOf } from '@storybook/react'
import SearchInput from '.'
import { observable } from 'mobx'

const store = observable({
  data: [
    { text: '徒步浪' },
    { text: '快乐星猫' },
    { text: '哆啦A梦' },
    { text: '铁甲小宝' },
    { text: '围棋小子' },
    { text: '中华小当家' },
    { text: '弹珠小子' },
    { text: '神厨小富贵' },
    { text: '虹猫蓝兔七侠传' },
    { text: '蓝猫淘气三千问' },
    { text: '四驱兄弟' }
  ],
  value: '',
  setValue(value) {
    this.value = value
  },
})

storiesOf('SearchInput', module)
  .add('default', () => {
    return (
      <SearchInput
        data={store.data}
        value={store.value}
        onChange={value => store.setValue(value)}
        placeholder='请输入'
      />
    )
  })
  .add('disabled', () => {
    return (
      <SearchInput
        data={store.data}
        value={store.value}
        onChange={value => store.setValue(value)}
        disabled
      />
    )
  })
