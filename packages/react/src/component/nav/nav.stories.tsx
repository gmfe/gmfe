import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from './nav'
import { observable } from 'mobx'
import { NavData3RdOptions } from './types'

const data = [
  {
    link: '/merchandise',
    name: '商品',
    sub: [
      {
        name: '商品管理',
        link: '/merchandise/manage',
        sub: [
          {
            link: '/merchandise/manage/sale',
            name: '报价单管理',
          },
          {
            link: '/merchandise/manage/list',
            name: '商品库',
          },
          {
            link: '/merchandise/manage/spu_remark',
            name: '商品备注',
          },
        ],
      },
      {
        name: '营销',
        link: '/merchandise/marketing_tool',
        sub: [
          {
            link: '/merchandise/marketing_tool/price_rule',
            name: '限时锁价',
          },
        ],
      },
    ],
  },
  {
    link: '/merchandise',
    name: '商品',
    sub: [
      {
        name: '商品管理',
        link: '/merchandise/manage',
        sub: [
          {
            link: '/merchandise/manage/tax_rate',
            name: '税率规则',
          },
        ],
      },
    ],
  },
  {
    link: '/supply_chain',
    name: '供应链',
    sub: [
      {
        name: '订单',
        link: '/supply_chain/order',
        sub: [
          {
            link: '/supply_chain/order/list',
            name: '订单列表',
          },
        ],
      },
      {
        name: '分拣',
        link: '/supply_chain/sorting',
        sub: [
          {
            link: '/supply_chain/sorting/schedule',
            name: '分拣进度',
          },
          {
            link: '/supply_chain/sorting/detail',
            name: '分拣明细',
          },
          {
            link: '/supply_chain/sorting/method',
            name: '分拣方式',
          },
        ],
      },
    ],
  },
]

const application = {
  name: '应用中心',
  link: '/application_center',
}

const store = observable({
  selected: '/merchandise/manage/tax_rate',
  setSelect(selected: NavData3RdOptions) {
    console.log(selected)
    this.selected = selected.link
  },
})

storiesOf('Nav', module).add('default', () => (
  <div style={{ height: '700px' }}>
    <Nav
      logo={
        <img
          src='https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png'
          style={{
            maxHeight: '35px',
            maxWidth: '80px',
          }}
          alt=''
        />
      }
      data={data}
      selected={store.selected}
      onSelect={store.setSelect.bind(store)}
      other={
        <Nav.SingleItem
          data={application}
          selected={store.selected}
          onSelect={store.setSelect.bind(store)}
        />
      }
    >
      点击显示 loading
    </Nav>
  </div>
))
