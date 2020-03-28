import React from 'react'
import { storiesOf } from '@storybook/react'
import { Framework, RightTop, Info, FullTab, Breadcrumb } from './index'

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
            name: '报价单管理'
          },
          {
            link: '/merchandise/manage/list',
            name: '商品库'
          },
          {
            link: '/merchandise/manage/spu_remark',
            name: '商品备注'
          }
        ]
      },
      {
        name: '营销',
        link: '/merchandise/marketing_tool',
        sub: [
          {
            link: '/merchandise/marketing_tool/price_rule',
            name: '限时锁价'
          }
        ]
      }
    ]
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
            name: '税率规则'
          }
        ]
      }
    ]
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
            name: '订单列表'
          }
        ]
      },
      {
        name: '分拣',
        link: '/supply_chain/sorting',
        sub: [
          {
            link: '/supply_chain/sorting/schedule',
            name: '分拣进度'
          },
          {
            link: '/supply_chain/sorting/detail',
            name: '分拣明细'
          },
          {
            link: '/supply_chain/sorting/method',
            name: '分拣方式'
          }
        ]
      }
    ]
  }
]

storiesOf('框架|FrameWork', module).add('default', () => (
  <div>
    <Framework
      leftWidth='100px'
      menu={
        <div
          style={{ width: '100px', height: '100vh', backgroundColor: 'red' }}
        >
          adfafa
        </div>
      }
      rightTop={
        <RightTop
          breadcrumb={
            <Breadcrumb
              breadcrumbs={[]}
              navConfig={data}
              pathname='/merchandise/manage/tax_rate'
              onSelect={item => console.log(item)}
            />
          }
          info={
            <Info
              more={[
                {
                  text: 'adfasf',
                  onClick: () => {
                    console.log('123')
                  }
                }
              ]}
            />
          }
        />
      }
    >
      <FullTab tabs={['按订单查看', '按商品查看']} active={1}>
        <div>按订单查看</div>
        <div>按商品查看</div>
      </FullTab>
    </Framework>
  </div>
))
