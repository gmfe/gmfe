import React, { useRef, useState } from 'react'
import { action, computed, observable } from 'mobx'
import { storiesOf } from '@storybook/react'
import _ from 'lodash'
import { VariableSizeList } from 'react-window'
import {
  Button,
  Input,
  InputNumberV2,
  MoreSelect,
  MoreSelectNormalDataOptions,
} from '@gmfe/react'
import { columns, initialData, InitialDataOptions } from './default.stories'
import {
  FixedColumnsTableXColumn,
  fixedColumnsTableXHOC,
  sortableTableXHOC,
  editTableXHOC,
  diyTableXHOC,
  DiyTableXColumn,
} from '../hoc'
import { TableX, TableXVirtualized } from '../base'
import { TABLE_X } from '../utils'
import { TableXColumn } from '../types'
import { OperationHeader } from '../components/operation'
import { EditOperation } from '../components/edit'

const FixedColumnsTableX = fixedColumnsTableXHOC<InitialDataOptions>(TableX)
const SortableTableX = sortableTableXHOC<InitialDataOptions>(TableX)
const EditTableX = editTableXHOC<InitialDataOptions>(TableX)
const DiyTableX = diyTableXHOC<InitialDataOptions>(TableX)

const selectData: MoreSelectNormalDataOptions<number>[] = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' },
  { value: 4, text: '宝安' },
]

class Store {
  @observable data = initialData

  @action setData = (data: InitialDataOptions[]) => {
    this.data = data
  }

  @computed get virtualData() {
    return _.times(200, () => {
      return initialData
    }).reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
  }
}

const store = new Store()

const fixedColumns: FixedColumnsTableXColumn<InitialDataOptions>[] = [
  {
    Header: '序号',
    id: 'index',
    fixed: 'left',
    width: 150,
    Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
  },
  { Header: '编号', accessor: 'id', width: 100, fixed: 'left' },
  { Header: '地址', accessor: 'address.text' as any, width: 500 },
  { Header: '商品价格', accessor: 'skuMoney', width: 300 },
  { Header: '供应商编号', accessor: 'supplierCustomerId', width: 300 },
  { Header: '提交时间', accessor: 'submitTime', width: 300 },
  { Header: 'delta money', accessor: 'deltaMoney', width: 300 },
  {
    Header: '供应商信息',
    width: 500,
    accessor: (data) => data.supplierName,
    id: 'supplierName',
  },
  {
    Header: '入库金额',
    width: 200,
    fixed: 'right',
    Cell: (cellProps: { row: { original: { totalMoney: React.ReactNode } } }) => (
      <div>{cellProps.row.original.totalMoney}</div>
    ),
  },
]

const editColumns: TableXColumn<InitialDataOptions>[] = [
  {
    Header: '序号',
    id: 'no',
    width: TABLE_X.WIDTH_NO,
    maxWidth: TABLE_X.WIDTH_NO,
    Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
  },
  {
    id: 'operation',
    Header: <OperationHeader />,
    width: TABLE_X.WIDTH_OPERATION,
    maxWidth: TABLE_X.WIDTH_OPERATION,
    Cell: (cellProps: { row: { index: number } }) => (
      <EditOperation
        onAddRow={
          cellProps.row.index !== 2
            ? () => console.log('增加一行', cellProps.row.index)
            : undefined
        }
        onDeleteRow={
          cellProps.row.index !== 1
            ? () => console.log('删除一行', cellProps.row.index)
            : undefined
        }
      />
    ),
  },
  {
    Header: '地址',
    Cell: (cellProps: {
      row: {
        original: {
          address:
            | MoreSelectNormalDataOptions<number>
            | MoreSelectNormalDataOptions<number>[]
        }
      }
    }) => (
      <MoreSelect
        selected={cellProps.row.original.address}
        data={selectData}
        onSelect={(selected) => console.log(selected)}
      />
    ),
  },
  {
    Header: '入库金额',
    Cell: (cellProps: {
      row: { original: { totalMoney: number | null | undefined } }
    }) => (
      <InputNumberV2
        value={cellProps.row.original.totalMoney}
        onChange={(value) => console.log(value)}
      />
    ),
  },
  {
    Header: '商品金额',
    Cell: (cellProps: {
      row: { original: { skuMoney: string | number | string[] | undefined } }
    }) => (
      <Input
        value={cellProps.row.original.skuMoney}
        onChange={(event) => console.log(event.target.value)}
      />
    ),
  },
]

const diyTableColumns: DiyTableXColumn<InitialDataOptions>[] = [
  {
    Header: '序号',
    id: 'index',
    diyGroupName: '基础',
    Cell: (cellProps: { row: { index: any } }) => cellProps.row.index,
  },
  { Header: 'id', accessor: 'id', diyEnable: true, diyGroupName: '基础' },
  {
    Header: '地址',
    accessor: 'address.text' as any,
    diyEnable: false,
    diyGroupName: '基础',
  },
  {
    Header: '供应商信息',
    accessor: (data) => data.supplierName,
    id: 'supplierName',
    diyGroupName: '其他',
  },
  {
    show: false,
    diyGroupName: '其他',
    diyEnable: true,
    Header: '入库金额',
    accessor: 'totalMoney',
    Cell: (cellProps) => {
      return <div>{cellProps.row.original.totalMoney}</div>
    },
  },
]

storiesOf('TableX|HOC', module)
  .add('fixed columns', () => (
    <FixedColumnsTableX data={store.data} columns={fixedColumns} />
  ))
  .add('sortable', () => (
    <SortableTableX
      columns={columns}
      data={store.data}
      keyField='id'
      onSortChange={(newData) => {
        console.log(newData.map((value) => value.id))
        store.setData(newData)
      }}
    />
  ))
  .add('virtualized', () => {
    const [highlightIndex, setHighlightIndex] = useState<number>()
    const ref = useRef<VariableSizeList>(null)
    const height =
      TABLE_X.HEIGHT_HEAD_TR + Math.min(10, store.virtualData.length) * TABLE_X.HEIGHT_TR

    return (
      <div>
        <div>
          <Button
            onClick={() => {
              setHighlightIndex(9)
              ref.current!.scrollToItem(9, 'start')
            }}
          >
            滚到第 10 行
          </Button>
        </div>
        <TableXVirtualized
          virtualizedHeight={height}
          virtualizedItemSize={TABLE_X.HEIGHT_TR}
          isTrHighlight={(_, index) => index === highlightIndex}
          refVirtualized={ref}
          columns={columns}
          data={store.virtualData}
        />
      </div>
    )
  })
  .add('edit', () => <EditTableX columns={editColumns} data={store.data} />)
  .add('diy', () => (
    <DiyTableX
      data={store.data}
      id='default'
      diyGroupSorting={['基础', '其他']}
      columns={diyTableColumns}
    />
  ))
