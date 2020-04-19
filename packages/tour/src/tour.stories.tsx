// @ts-nocheck
/* eslint-disable */
import React, { Suspense, Fragment, useRef, useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import { selectTableXHOC, TableX, TableXUtil } from '@gmfe/table-x'

import { BoxTable, Flex, Button } from '@gmfe/react'
import Tour from './tour'

const initData = [
  {
    total_money: 111,
    id: 'T5991-JHD-2018-07-25-00027',
    sku_money: '2390.00',
    supplier_customer_id: 'LDP20180117',
    submit_time: '2018-07-25',
    status: 2,
    supplier_name: '',
    date_time: '2018-07-25',
    delta_money: 0,
    settle_supplier_id: 'T10953',
    address: null,
  },
  {
    total_money: 176,
    id: 'T5991-JHD-2018-07-25-00026',
    sku_money: '176.00',
    supplier_customer_id: 'A2926',
    submit_time: '2018-07-26',
    status: 2,
    supplier_name: '段虎',
    date_time: '2018-07-25',
    delta_money: 0,
    settle_supplier_id: 'T14319',
    address: {
      value: 9,
      text: '西乡9',
    },
  },
  {
    total_money: 279,
    id: 'T5991-JHD-2018-07-25-00025',
    sku_money: '279.02',
    supplier_customer_id: 'sc215',
    submit_time: '2018-07-27',
    status: 2,
    supplier_name: '黑市桥蔬菜批发',
    date_time: '2018-07-25',
    delta_money: -2.0,
    settle_supplier_id: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    total_money: 176,
    id: 'T5991-JHD-2018-07-25-00024',
    sku_money: '279.02',
    supplier_customer_id: 'sc215',
    submit_time: '2018-07-27',
    status: 2,
    supplier_name: '黑市桥蔬菜批发',
    date_time: '2018-07-25',
    delta_money: -2.0,
    settle_supplier_id: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
]

const columns = [
  // 获取索引
  {
    Header: '序号',
    accessor: 'index',
    Cell: ({ row }) => row.index + 1,
  },
  // 常规用法
  {
    Header: '建单时间',
    accessor: 'submit_time',
  },
  // accessor 有点用法
  {
    Header: '地址',
    accessor: 'address.text',
    width: 200, // 定宽
  },
  // accessor 是 func，需要提供 id
  {
    Header: '供应商信息',
    accessor: (data) => data.supplier_name,
    id: 'supplier_name',
  },
  // 自定义整个单元格
  {
    Header: '入库金额',
    accessor: 'total_money',
    Cell: (cellProps) => {
      const { row } = cellProps
      return <div>{row.original.total_money}</div>
    },
  },
]

const store = observable({
  isTourOpen: true,
  isSelectAllPage: false,
  data: initData.slice(),
  selected: [],
  toggleIsSelectAllPage(bool) {
    this.isSelectAllPage = bool
  },
  setSelected(selected) {
    this.selected = selected
  },
  setOpen(bool) {
    this.isTourOpen = bool
  },
})

const SelectTableX = selectTableXHOC(TableX)

storiesOf('Tour|Tour', module)
  .add('默认', () => {
    const [start, setStart] = useState(false)
    return (
      <BoxTable
        action={
          <>
            <Button
              className='btn-primary'
              data-id='button-test'
              onClick={() => {
                setStart(true)
              }}
            >
              新建车间
            </Button>
            <div data-id='button-start'>{start && <Button>start</Button>}</div>
          </>
        }
      >
        <SelectTableX
          data={store.data.slice()}
          columns={columns}
          keyField='id'
          selected={store.selected}
          onSelect={(selected) => store.setSelected(selected)}
          batchActionBar={
            store.selected.length > 0 ? (
              <TableXUtil.BatchActionBar
                onClose={() => store.setSelected([])}
                toggleSelectAll={(bool) => store.toggleIsSelectAllPage(bool)}
                batchActions={[
                  {
                    name: <div className='func-test'>下达加工单</div>,
                    onClick: () => {},
                  },
                ]}
                count={store.isSelectAllPage ? null : store.selected.length}
                isSelectAll={store.isSelectAllPage}
              />
            ) : null
          }
        />
        <Suspense fallback={<Fragment />}>
          <Tour
            disableInteraction={false}
            steps={[
              {
                selector: '[data-id="button-test"]',
                observe: '[data-id="button-start"]',
                content: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
              },
              {
                selector: '.gm-table-x-tbody .gm-checkbox.gm-table-x-select',
                content:
                  'checkbox 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                stepInteraction: true,
                actionAfter: async function (node) {
                  if (node) {
                    console.log(1111, node)
                    node?.click()
                  }
                },
              },
              {
                selector: '.func-test',
                content: (
                  <div>
                    func-test 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                  </div>
                ),
              },
            ]}
            isOpen={store.isTourOpen}
            rounded={3}
            onRequestClose={() => store.setOpen(false)}
          />
        </Suspense>
      </BoxTable>
    )
  })
  .add('自定义', () => {
    const tourRef = useRef(null)
    const [show, setShow] = useState(false)
    useEffect(() => {
      setTimeout(() => {
        handleShow()
      }, 1000)
    }, [])

    const handleShow = () => {
      setShow(true)
      tourRef.current.apiRecalculate()
    }

    const next = () => {
      tourRef.current.apiToNextStep()
    }

    const close = () => {
      tourRef.current.apiClose()
    }

    return (
      <BoxTable
        key='BoxTable'
        action={
          <Button className='btn-primary' data-id='button-test' onClick={() => {}}>
            新建xxx
          </Button>
        }
      >
        {show ? <div className='gm-padding-15' /> : null}
        <SelectTableX
          data={store.data.slice()}
          columns={columns}
          keyField='id'
          selected={store.selected}
          onSelect={(selected) => store.setSelected(selected)}
          batchActionBar={
            store.selected.length > 0 ? (
              <TableXUtil.BatchActionBar
                onClose={() => store.setSelected([])}
                toggleSelectAll={(bool) => store.toggleIsSelectAllPage(bool)}
                batchActions={[
                  {
                    name: <div className='func-test'>下达加工单</div>,
                    onClick: () => {},
                  },
                ]}
                count={store.isSelectAllPage ? null : store.selected.length}
                isSelectAll={store.isSelectAllPage}
              />
            ) : null
          }
        />
        <Suspense fallback={<Fragment />}>
          <Tour
            ref={tourRef}
            disableButtons
            steps={[
              {
                selector: '.gm-table-x-tbody .gm-checkbox.gm-table-x-select',
                content: (
                  <div>
                    <div>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
                    <Flex justifyEnd className='gm-padding-top-10'>
                      <Button type='primary' onClick={next}>
                        下一步
                      </Button>
                    </Flex>
                  </div>
                ),
                actionAfter: async function (node) {
                  if (node) {
                    console.log(1111, node)
                    node?.click()
                  }
                },
              },
              {
                selector: '.func-test',
                content: (
                  <div>
                    <div>
                      func-test 测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </div>
                    <Flex justifyEnd className='gm-padding-top-10'>
                      <Button type='primary' onClick={close}>
                        知道了
                      </Button>
                    </Flex>
                  </div>
                ),
              },
            ]}
            isOpen={store.isTourOpen}
            onRequestClose={() => store.setOpen(false)}
          />
        </Suspense>
      </BoxTable>
    )
  })
