import React, { useRef } from 'react'
import { action, observable } from 'mobx'
import { storiesOf } from '@storybook/react'

import { InitialDataOptions, initialData, columns } from './default.stories'
import { TableX, TableXVirtualized } from '../base'
import {
  selectTableXHOC,
  expandTableXHOC,
  ExpandTableXProps,
  subTableXHOC,
  SubTableXProps,
} from '../hoc'
import { BatchActionBar } from '../components'
import { TableXProps, TableXVirtualizedProps } from '../types'
import { TABLE_X } from '../utils'
import { VariableSizeList } from 'react-window'

const SelectTableX = selectTableXHOC<InitialDataOptions>(TableX)
const ExpandTableX = expandTableXHOC<InitialDataOptions>(TableX)
const SelectExpandTableX = selectTableXHOC<
  InitialDataOptions,
  ExpandTableXProps<InitialDataOptions> & TableXProps<InitialDataOptions>
>(expandTableXHOC<InitialDataOptions>(TableX))
const SubSelectTableX = selectTableXHOC<
  InitialDataOptions,
  SubTableXProps & TableXVirtualizedProps<InitialDataOptions>
>(subTableXHOC<InitialDataOptions, TableXVirtualizedProps<InitialDataOptions>>(TableXVirtualized))

class Store {
  @observable data = initialData

  @observable selected: string[] = []

  @action handleSelect = (selected: string[]) => {
    this.selected = selected
  }

  @observable isSelectedAll = false

  @action handleSetIsSelectedAll = (selected: boolean) => {
    this.isSelectedAll = selected
    this.selected = this.data.map((value) => value.id)
  }

  // eslint-disable-next-line gm-react-app/no-observable-empty-object
  @observable expanded: { [key: number]: boolean } = {}

  @action handleSetExpanded = (expanded: { [key: number]: boolean }) => {
    console.log(expanded)
    this.expanded = expanded
  }
}

const store = new Store()

storiesOf('TableX|select expand', module)
  .add('select', () => (
    <SelectTableX
      columns={columns}
      data={store.data}
      keyField='id'
      onSelect={(selected: string[]) => store.handleSelect(selected)}
      selected={store.selected}
    />
  ))
  .add('select batchActionBar', () => (
    <div style={{ paddingTop: '50px' }}>
      <SelectTableX
        columns={columns}
        data={store.data}
        keyField='id'
        selected={store.selected}
        onSelect={(selected: string[]) => store.handleSelect(selected)}
        batchActionBar={
          <BatchActionBar
            isSelectAll={store.isSelectedAll}
            count={store.selected.length}
            toggleSelectAll={store.handleSetIsSelectedAll}
            batchActions={[
              { name: '批量删除', type: 'delete' },
              { name: '批量修改', type: 'edit' },
              { name: '批量打印', type: 'business' },
            ]}
          />
        }
      />
    </div>
  ))
  .add('fixed select', () => (
    <SelectTableX
      columns={columns.map((column) => ({ ...column, width: 600 }))}
      data={store.data}
      keyField='id'
      selected={store.selected}
      onSelect={(selected: string[]) => store.handleSelect(selected)}
      fixedSelect
    />
  ))
  .add('select radio', () => (
    <SelectTableX
      columns={columns}
      data={store.data}
      keyField='id'
      selected={store.selected}
      onSelect={(selected: string[]) => store.handleSelect(selected)}
      selectType='radio'
    />
  ))
  .add('select isSelectorDisable', () => (
    <SelectTableX
      columns={columns}
      data={store.data}
      keyField='id'
      selected={store.selected}
      isSelectorDisable={(original) => original.totalMoney === 176}
      onSelect={(selected: string[]) => store.handleSelect(selected)}
    />
  ))
  .add('expand', () => (
    <ExpandTableX
      columns={columns}
      data={store.data}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
    />
  ))
  .add('受控 expand', () => (
    <ExpandTableX
      columns={columns}
      data={store.data}
      expanded={store.expanded}
      onExpand={(expanded) => store.handleSetExpanded(expanded)}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
    />
  ))
  .add('fixed expand', () => (
    <ExpandTableX
      columns={columns.map((column) => ({ ...column, width: 600 }))}
      data={store.data}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
      fixedExpand
    />
  ))
  .add('expand select', () => (
    <SelectExpandTableX
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
      columns={columns}
      data={store.data}
      keyField='id'
      selected={store.selected}
      onSelect={(selected: string[]) => store.handleSelect(selected)}
    />
  ))
  .add('expand select sub table', () => {
    const ref = useRef<VariableSizeList>(null)

    return (
      <SelectExpandTableX
        SubComponent={() => (
          <SubSelectTableX
            virtualizedHeight={200}
            virtualizedItemSize={TABLE_X.HEIGHT_TR}
            refVirtualized={ref}
            columns={columns}
            data={store.data}
            keyField='id'
            selected={store.selected}
            onSelect={(selected: string[]) => {
              store.handleSelect(selected)
            }}
          />
        )}
        columns={columns}
        data={store.data}
        keyField='id'
        selected={store.selected}
        onSelect={(selected: string[]) => store.handleSelect(selected)}
      />
    )
  })
