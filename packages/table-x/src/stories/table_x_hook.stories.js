import React from 'react'
import { storiesOf } from '@storybook/react'
import { TableX, useDiyTableX } from '../index'
import { observable } from 'mobx/lib/mobx'
import moment from 'moment'
import { observer } from 'mobx-react'

const initData = [
  {
    total_money: 111,
    id: 'T5991-JHD-2018-07-25-00027',
    sku_money: '2390.00',
    supplier_customer_id: 'LDP20180117',
    submit_time: '2018-07-25',
    status: 2,
    supplier_name: '-',
    date_time: '2018-07-25',
    delta_money: 0,
    settle_supplier_id: 'T10953',
    address: {
      value: 33,
      text: '西乡fdsfsdf9',
    },
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

const store = observable({
  data: initData.slice(),
  sortTimeType: null,
  setSortTime(type) {
    this.sortTimeType = type

    if (!type) {
      this.data = initData.slice()
      return
    }

    let newData = this.data.sort((a, b) => {
      return sortDateTime(a.submit_time, b.submit_time)
    })

    if (type === 'desc') {
      newData = newData.reverse()
    }

    this.data = newData
  },
})

const diyColumns = [
  // 常规用法，column默认diy开启
  {
    Header: '序号',
    accessor: 'index',
    diyGroupName: '基础',
    Cell: ({ row }) => row.index + 1,
  },
  // 常规用法
  {
    Header: 'id',
    accessor: 'id',
    diyEnable: true,
    diyGroupName: '基础',
  },
  // 该column不允许diy
  {
    Header: '地址',
    accessor: 'address.text',
    diyEnable: false,
    diyGroupName: '基础',
  },
  // 其他diyGroup
  {
    Header: '供应商信息',
    accessor: (data) => data.supplier_name,
    id: 'supplier_name',
    diyGroupName: '其他',
  },
  // 初始花的时候不显示该column
  {
    show: false,
    diyGroupName: '其他',
    diyEnable: true,
    Header: '入库金额',
    accessor: 'total_money',
    Cell: (cellProps) => {
      const { row } = cellProps
      return <div>{row.original.total_money}</div>
    },
  },
]

const columnsList = [
  { name: '主表', diyGroupSorting: ['基础', '其他'], columns: diyColumns },
  { name: '子表', diyGroupSorting: ['基础', '其他'], columns: diyColumns },
]

storiesOf('TableX|hook', module).add('use_diy_table_x', () => {
  const [l1, l2] = useDiyTableX(columnsList, 'xx_diy')

  return <TableX data={store.data} columns={l1.columns} />
})
