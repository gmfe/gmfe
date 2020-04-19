import React from 'react'
import { action, observable } from 'mobx'
import { storiesOf } from '@storybook/react'
import { TableXColumn, TableXSortType } from '../types'
import { TableX } from '../base'
import { observer } from 'mobx-react'
import { EditButton, SortHeader } from '../components'
import moment from 'moment'

export interface InitialDataOptions {
  totalMoney: number
  id: string
  skuMoney: string
  supplierCustomerId: string
  submitTime: string
  status: number
  supplierName: string
  dateTime: string
  deltaMoney: number
  settleSupplierId: string
  address: {
    value: number
    text: string
  }
}

export const initialData: InitialDataOptions[] = [
  {
    totalMoney: 111,
    id: 'T5991-JHD-2018-07-25-00027',
    skuMoney: '2390.00',
    supplierCustomerId: 'LDP20180117',
    submitTime: '2018-07-25',
    status: 2,
    supplierName: '-',
    dateTime: '2018-07-25',
    deltaMoney: 0,
    settleSupplierId: 'T10953',
    address: {
      value: 33,
      text: '西乡fdsfsdf9',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00026',
    skuMoney: '176.00',
    supplierCustomerId: 'A2926',
    submitTime: '2018-07-26',
    status: 2,
    supplierName: '段虎',
    dateTime: '2018-07-25',
    deltaMoney: 0,
    settleSupplierId: 'T14319',
    address: {
      value: 9,
      text: '西乡9',
    },
  },
  {
    totalMoney: 279,
    id: 'T5991-JHD-2018-07-25-00025',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
]

export const columns: TableXColumn<InitialDataOptions>[] = [
  {
    Header: '序号',
    id: 'index',
    Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
    width: 50,
  },
  { Header: '建单时间', show: false, accessor: 'submitTime' },
  { Header: '地址', accessor: 'address.text' as any, width: 200, maxWidth: 200 },
  { Header: '供应商信息', accessor: (data) => data.supplierName, id: 'supplierName' },
  {
    Header: '入库金额',
    accessor: 'totalMoney',
    Cell: (cellProps) => {
      return <div>{cellProps.row.original.totalMoney}</div>
    },
  },
]

const groupColumns: TableXColumn<InitialDataOptions>[] = [
  {
    Header: '序号',
    columns: [
      {
        Header: '序号',
        accessor: 'index',
        Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
      },
    ],
  },
  {
    Header: '其他信息',
    columns: [
      { Header: '建单时间', accessor: 'submitTime', show: false },
      {
        Header: '入库金额',
        accessor: 'totalMoney',
        Cell: (cellProps) => {
          return <div>{cellProps.row.original.totalMoney}</div>
        },
      },
    ],
  },
  {
    Header: '供应商信息',
    columns: [
      { Header: '地址', accessor: 'address.text', width: 200 },
      { Header: '供应商名字', accessor: (data) => data.supplierName, id: 'supplierName' },
    ],
  },
]

const sortColumns: TableXColumn<InitialDataOptions>[] = [
  {
    Header: observer(() => (
      <div>
        建单时间
        <SortHeader type={store.sortType} onChange={(type) => store.setSortType(type)} />
      </div>
    )),
    accessor: 'submitTime',
  },
  { Header: '供应商信息', accessor: (data) => data.supplierName, id: 'supplierName' },
  {
    Header: '入库金额',
    accessor: 'totalMoney',
    Cell: (cellProps) => {
      return <div>{cellProps.row.original.totalMoney}</div>
    },
  },
]

const editColumns: TableXColumn<InitialDataOptions>[] = [
  {
    Header: '名字',
    id: 'name',
    Cell: () => (
      <div>
        <input type='text' />
        <EditButton
          popupRender={() => (
            <div>lalala12312313412341324123412387409123874098712304987123098470132</div>
          )}
        />
      </div>
    ),
  },
  {
    Header: '年龄',
    id: 'age',
    Cell: () => (
      <div>
        <input type='text' />
        <EditButton
          popupRender={() => (
            <div>
              141j23po4ij1p2o3ij4poi123j4poiu45098rehwoiasudnfaoisjfpo8134upoj4p23o1i4j123;f;askl;aslk
            </div>
          )}
        />
      </div>
    ),
  },
]

class Store {
  @observable data = initialData

  @observable sortType: TableXSortType = null

  @action setSortType = (type: TableXSortType): void => {
    this.sortType = type

    if (!type) {
      this.data = initialData
    }

    let newData = this.data.slice().sort((a, b) => +moment(a.dateTime).isBefore(moment(b.dateTime)))
    if (type === 'desc') {
      newData = newData.reverse()
    }
    this.data = newData
  }
}

const store = new Store()

storiesOf('TableX|TableX', module)
  .add('说明', () => <div />, {
    info: {
      text: `
react-table 文档见 https://github.com/tannerlinsley/react-table

用法见 story 源码，不要用 story 之外的，如果有，联系我补充 story。

较 Table 新增
- hoc select 增加 fixedSelect, hoc expand fixedExpand 用来固定
- 其他 hoc， sortableTableXHOC
- TableXVirtualized

Table 切 TableX 关注点：
- Cell 不提供 index original，即 Cell: ({index, original}) => () 不 work，用 Cell: ({ row }) => (row.index row.original)
- 取消单元格没内容显示 -
- fixedColumn column 可以不提供 width
- selectTable 废弃 onSelectAll ，因为没有意义
- OperationHeader 是一个组件
- EditTableOperation 换成  EditOperation
- 宽度常量收归到 TableUtil.TABLE_X
`,
    },
  })
  .add('default', () => <TableX columns={columns} data={store.data} />)
  .add('group', () => <TableX columns={groupColumns} data={store.data} />)
  .add('loading & empty & tiled', () => (
    <>
      <TableX columns={columns} data={store.data} loading />
      <TableX columns={columns} data={[]} />
      <TableX columns={columns} data={[]} tiled className='gm-margin-10' />
    </>
  ))
  .add('sort', () => <TableX columns={sortColumns} data={store.data} />)
  .add('limit height', () => (
    <TableX columns={columns} data={store.data} style={{ height: '200px' }} />
  ))
  .add('edit button', () => <TableX columns={editColumns} data={store.data} />)
  .add('isTrDisable & isTrHighlight', () => (
    <TableX
      columns={columns}
      data={store.data}
      isTrHighlight={(_, index) => index === 0}
      isTrDisable={(_, index) => index % 2 === 0}
    />
  ))
