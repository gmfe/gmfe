import React from 'react'
import { storiesOf } from '@storybook/react'
import MoreSelect from './more_select'
import _ from 'lodash'
import { observable, toJS } from 'mobx'
import { MoreSelectNormalDataOptions } from './types'

const store = observable({
  data: [
    {
      value: 1,
      text: '南山',
    },
    {
      value: 2,
      text: '福田',
    },
    {
      value: 3,
      text: '罗湖',
    },
    {
      value: 4,
      text: '宝安',
    },
    {
      value: 5,
      text: '福永',
    },
    {
      value: 6,
      text: '坪洲',
    },
    {
      value: 7,
      text:
        '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
    },
    {
      value: 8,
      text: '西乡8',
    },
    {
      value: 9,
      text: '西乡9',
    },
    {
      value: 10,
      text: '西乡10',
    },
    {
      value: 11,
      text: '西乡11',
    },
  ],
  dataGroup: [
    {
      label: '南山',
      children: [
        {
          value: 1,
          text: '科技园',
        },
        {
          value: 2,
          text: '大冲',
        },
        {
          value: 3,
          text: '大新',
        },
      ],
    },
    {
      label: '宝安',
      children: [
        {
          value: 21,
          text: '西乡',
        },
        {
          value: 22,
          text: '固戍',
        },
      ],
    },
  ],
  selected: null,
  setSelected(selected: MoreSelectNormalDataOptions<number>) {
    // @ts-ignore
    this.selected = selected
  },
  mulSelected: [],
  setMulSelected(selected: MoreSelectNormalDataOptions<number>[]) {
    // @ts-ignore
    this.mulSelected = selected
  },
})

storiesOf('MoreSelect', module)
  .add('default', () => (
    <MoreSelect
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
    />
  ))
  .add('disabled', () => (
    <MoreSelect
      disabled
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
    />
  ))
  .add('disabledClose', () => (
    <MoreSelect
      disabledClose
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
    />
  ))
  .add('内容多的时候', () => (
    <div style={{ width: '200px' }}>
      <MoreSelect
        data={store.data}
        selected={{
          value: 7,
          text:
            '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
        }}
        onSelect={(selected) => {
          store.setSelected(selected as MoreSelectNormalDataOptions<number>)
        }}
      />
    </div>
  ))
  .add('renderListFilterType', () => (
    <MoreSelect
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
      renderListFilterType='pinyin'
    />
  ))
  .add('placeholder', () => (
    <MoreSelect
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
      placeholder='啊啊啊'
      searchPlaceholder='search 啊啊啊a'
    />
  ))
  .add('scroll to selected', () => (
    <MoreSelect
      data={store.data}
      selected={{ value: 11, text: '西乡11' }}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
    />
  ))
  .add('onSearch 同步', () => (
    <MoreSelect
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
      onSearch={(searchValue) => {
        // 同步直接改变 data
        store.setSelected(
          // @ts-ignore
          _.filter(store.data, (item) => item.text.includes(searchValue))
        )
      }}
    />
  ))
  .add('onSearch 异步', () => (
    <MoreSelect
      data={store.data}
      selected={(store.selected as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
      onSearch={(searchValue) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              // @ts-ignore
              _.filter(store.data, (item) => item.text.includes(searchValue))
            )
          }, 1000)
        })
      }}
    />
  ))
  .add('multiple', () => (
    <MoreSelect
      multiple
      data={store.data}
      selected={store.mulSelected}
      onSelect={(selected) => {
        store.setMulSelected(selected as MoreSelectNormalDataOptions<number>[])
      }}
    />
  ))
  .add('multiple onSearch', () => {
    return (
      <MoreSelect
        multiple
        data={toJS(store.data)}
        selected={toJS(store.mulSelected)}
        onSelect={(selected) => {
          store.setMulSelected(selected as MoreSelectNormalDataOptions<number>[])
        }}
        onSearch={() => {
          store.data = [
            {
              value: 7,
              text:
                '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
            },
            {
              value: 8,
              text: '西乡8',
            },
          ]
        }}
      />
    )
  })
  .add('group', () => (
    <MoreSelect
      isGroupList
      data={toJS(store.dataGroup)}
      selected={(toJS(store.selected) as any) as MoreSelectNormalDataOptions<number>}
      onSelect={(selected) => {
        store.setSelected(selected as MoreSelectNormalDataOptions<number>)
      }}
    />
  ))
  .add('group multiple', () => (
    <MoreSelect
      isGroupList
      multiple
      data={toJS(store.dataGroup)}
      selected={toJS(store.mulSelected)}
      onSelect={(selected) => {
        store.setMulSelected(selected as MoreSelectNormalDataOptions<number>[])
      }}
    />
  ))
