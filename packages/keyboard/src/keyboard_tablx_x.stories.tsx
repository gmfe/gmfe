import React, { FC, useMemo } from 'react'
import { storiesOf } from '@storybook/react'
import { MoreSelectNormalDataOptions } from '@gmfe/react'
import _ from 'lodash'
import { action, observable } from 'mobx'
import {
  TableX,
  TableXUtil,
  selectTableXHOC,
  TableXProps,
  editTableXHOC,
} from '@gmfe/table-x'

import {
  KCMoreSelect,
  KeyboardTableXColumn,
  keyboardTableXHOC,
  KeyboardTableXProps,
  KCInput,
  KCDatePicker,
  KCSelect,
  KCInputNumberV2,
} from './'
import { observer } from 'mobx-react'

const { OperationCell, OperationHeader, EditOperation, TABLE_X } = TableXUtil
const SelectKeyboardTableX = selectTableXHOC<
  InitialDataOptions,
  KeyboardTableXProps<InitialDataOptions> & TableXProps<InitialDataOptions>
>(keyboardTableXHOC<InitialDataOptions>(editTableXHOC<InitialDataOptions>(TableX)))

export interface InitialDataOptions {
  id: number
  position: MoreSelectNormalDataOptions<number> | null
  name: string
  age: number | null
  date: Date | null
  status: number | null
}

export const selectData: MoreSelectNormalDataOptions<number>[] = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '宝安' },
  { value: 4, text: '罗湖' },
  { value: 5, text: '龙岗' },
  { value: 6, text: '龙华' },
  { value: 7, text: '光明' },
  { value: 8, text: '盐田' },
  { value: 9, text: '坪山' },
  { value: 10, text: '大鹏新区' },
]

const initialDataItem: InitialDataOptions = {
  id: Math.floor(Math.random() * 10),
  name: '',
  position: null,
  age: null,
  date: new Date(),
  status: 1,
}

const initialData: InitialDataOptions[] = _.times(
  5,
  (): InitialDataOptions => initialDataItem
)

class Store {
  @observable data = initialData

  @observable selected: number[] = []

  @action setSelected = (selected: number[]) => {
    this.selected = selected
  }

  @action handleAddRow = (index = this.data.length) => {
    this.data.splice(index, 0, initialDataItem)
  }

  @action handleDeleteRow = (index: number) => {
    this.data.splice(index, 1)
  }

  @action handleSetDataItem = (index: number, item: Partial<InitialDataOptions>) => {
    this.data[index] = { ...this.data[index], ...item }
  }
}

const store = new Store()

const Wrap: FC = observer(() => {
  const columns: KeyboardTableXColumn<InitialDataOptions>[] = useMemo(
    (): KeyboardTableXColumn<InitialDataOptions>[] => [
      {
        Header: '编号',
        id: 'no',
        fixed: 'left',
        width: TABLE_X.WIDTH_NO,
        Cell: (cellProps: { row: { index: number } }) => {
          return <div>{cellProps.row.index + 1}</div>
        },
      },
      {
        Header: OperationHeader,
        id: 'operation',
        fixed: 'left',
        width: TABLE_X.WIDTH_OPERATION,
        Cell: (cellProps: { row: { index: number } }) => {
          const { index } = cellProps.row
          return (
            <OperationCell>
              <EditOperation
                onAddRow={() => {
                  store.handleAddRow(index)
                }}
                onDeleteRow={
                  store.data.length > 1
                    ? () => {
                        store.handleDeleteRow(index)
                      }
                    : undefined
                }
              />
            </OperationCell>
          )
        },
      },
      {
        Header: '位置',
        id: 'position',
        width: TABLE_X.WIDTH_SELECT,
        isKeyboard: true,
        Cell: (cellProps: {
          row: {
            original: { position: MoreSelectNormalDataOptions<number> }
            index: number
          }
        }) => {
          const {
            original: { position },
            index,
          } = cellProps.row
          return (
            <KCMoreSelect<number>
              data={selectData}
              selected={position}
              onSelect={(selected: MoreSelectNormalDataOptions<number>) => {
                store.handleSetDataItem(index, { position: selected })
              }}
            />
          )
        },
      },
      {
        Header: '名字',
        id: 'name',
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { name: string }; index: number } }) => {
          const {
            original: { name },
            index,
          } = cellProps.row
          return (
            <KCInput
              value={name}
              onChange={(event) => {
                store.handleSetDataItem(index, { name: event.target.value })
              }}
            />
          )
        },
      },
      {
        Header: '年龄',
        id: 'age',
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { age: number }; index: number } }) => {
          const {
            original: { age },
            index,
          } = cellProps.row
          return (
            <KCInputNumberV2
              value={age}
              onChange={(value) => {
                store.handleSetDataItem(index, { age: value })
              }}
            />
          )
        },
      },
      {
        Header: '日期',
        id: 'date',
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { date: Date }; index: number } }) => {
          const {
            original: { date },
            index,
          } = cellProps.row
          return (
            <KCDatePicker
              onChange={(value) => {
                store.handleSetDataItem(index, { date: value })
              }}
              date={date}
            />
          )
        },
      },
      {
        Header: '状态',
        id: 'status',
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { status: number }; index: number } }) => {
          const {
            original: { status },
            index,
          } = cellProps.row
          return (
            <KCSelect<number>
              data={[
                { value: 0, text: '未验收' },
                { value: 1, text: '已验收' },
              ]}
              value={status}
              onChange={(value) => {
                store.handleSetDataItem(index, { status: value })
              }}
            />
          )
        },
      },
    ],
    []
  )

  return (
    <div>
      <SelectKeyboardTableX
        id='keyboard_table_x'
        columns={columns}
        onAddRow={() => {
          store.handleAddRow()
        }}
        data={store.data.slice()}
        keyField='id'
        selected={store.selected.slice()}
        onSelect={(selected: number[]) => {
          store.setSelected(selected)
        }}
      />
    </div>
  )
})

storiesOf('全键盘|Keyboard TableX', module)
  .add('Info', () => <div />, {
    info: {
      text: `
    各单元格宽度 具体见 TableX.TABLE_X。
    
    上述都是建议宽度，具体根据实际业务场景各自调整。
    
    具体用法看代码。
    `,
    },
  })
  .add('hoc', () => <Wrap />)
