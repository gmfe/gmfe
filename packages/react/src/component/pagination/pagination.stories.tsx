import React from 'react'
import { storiesOf } from '@storybook/react'
import Pagination from './pagination'
import PaginationV2 from './pagination_v2'
import { observable } from 'mobx'

const store = observable({
  data: {
    count: 0,
    offset: 0,
    limit: 10,
  },
  setData(data: any) {
    console.log(data)
    this.data = {
      ...this.data,
      ...data,
    }
  },
  noCountData: {
    offset: 0,
    limit: 10,
  },
  setNoCountData(data: any) {
    console.log(data)
    this.noCountData = {
      ...this.noCountData,
      ...data,
    }
  },
})

storiesOf('Pagination', module)
  .add('分页规范', () => <a href='https://www.yuque.com/iyum9i/cudrs0/etfogz'>此分页规范详情</a>)
  .add('with count', () => <Pagination data={store.data} toPage={(data) => store.setData(data)} />)
  .add('without count', () => (
    <Pagination
      data={store.noCountData}
      toPage={(data) => store.setNoCountData(data)}
      nextDisabled
    />
  ))

storiesOf('PaginationV2', module)
  .addParameters({
    info: {
      text: '**一般不会直接用到，而是用 PaginationBox**',
    },
  })
  .add('分页规范', () => <a href='https://www.yuque.com/iyum9i/cudrs0/etfogz'>此分页规范详情</a>)
  .add('default', () => <PaginationV2 data={store.data} onChange={(data) => store.setData(data)} />)
  .add('showCount', () => (
    <PaginationV2 data={store.data} onChange={(data) => store.setData(data)} showCount />
  ))
  .add(
    '给 PaginationBox 定制',
    () => (
      <PaginationV2
        data={store.data}
        onChange={(data) => store.setData(data)}
        _peekInfo={{
          peek: 60,
          more: true,
        }}
      />
    ),
    {
      info: {
        text: '仅内部演示，一般不会用到',
      },
    }
  )
