# @gmfe/table-x

## 简介

`@gmfe/table-x` 是基于 [react-table v7](https://github.com/tannerlinsley/react-table)（7.0.0-rc.11）封装的高级表格组件包，是 `@gmfe/table` 的升级版本。采用 Hooks API 和 Context API，提供更现代的表格功能扩展。支持虚拟滚动、选择、展开、固定列、排序、子表格、自定义列和可编辑表格等功能。

## 安装

```bash
npm install @gmfe/table-x
```

## 使用

### 基础表格

```jsx
import React from 'react'
import { TableX } from '@gmfe/table-x'

const columns = [
  { Header: '名称', accessor: 'name' },
  { Header: '年龄', accessor: 'age' }
]

const data = [
  { value: 1, name: '张三', age: 28 },
  { value: 2, name: '李四', age: 32 }
]

function App() {
  return <TableX columns={columns} data={data} />
}
```

### 带选择功能的表格

```jsx
import React, { useState } from 'react'
import { TableX, selectTableXHOC } from '@gmfe/table-x'

const SelectTableX = selectTableXHOC(TableX)

function App() {
  const [selected, setSelected] = useState([])

  return (
    <SelectTableX
      columns={columns}
      data={data}
      selected={selected}
      onSelect={(selected) => setSelected(selected)}
    />
  )
}
```

### 虚拟滚动表格

```jsx
import { TableXVirtualized } from '@gmfe/table-x'

function App() {
  return (
    <TableXVirtualized
      columns={columns}
      data={largeData}
      virtualizedHeight={600}
      virtualizedItemSize={40}
    />
  )
}
```

## API

### TableX

基础表格组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| columns | 列定义 | `array` | - | 是 |
| data | 表格数据 | `array` | - | 是 |
| loading | 是否加载中 | `boolean` | `false` | 否 |
| keyField | 行唯一标识字段 | `string` | `'value'` | 否 |
| tiled | 是否平铺 | `boolean` | `false` | 否 |
| isTrDisable | 行禁用判断函数 | `function(row): boolean` | `() => false` | 否 |
| isTrHighlight | 行高亮判断函数 | `function(row): boolean` | `() => false` | 否 |
| SubComponent | 展开行渲染函数 | `function(row)` | - | 否 |
| onScroll | 滚动回调 | `function` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### TableXVirtualized

虚拟滚动表格组件，继承 TableX 的所有属性，额外支持：

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| virtualizedHeight | 表格容器高度 | `number` | - | 是 |
| virtualizedItemSize | 行高（数字或函数） | `number \| function` | - | 是 |
| refVirtualized | 虚拟列表 ref | `object \| function` | - | 否 |

### HOC 组件

#### selectTableXHOC(TableX)

选择功能表格 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| selected | 已选中项数组 | `array` | - | 是 |
| onSelect | 选中回调 | `function(selected: array)` | - | 是 |
| selectType | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` | 否 |
| keyField | 行唯一标识字段 | `string` | `'value'` | 否 |
| isSelectorDisable | 行选择禁用函数 | `function(row): boolean` | `() => false` | 否 |
| batchActionBar | 自定义批量操作栏 | `ReactElement` | - | 否 |
| fixedSelect | 是否固定选择列 | `boolean` | `false` | 否 |

#### expandTableXHOC(TableX)

展开行表格 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| SubComponent | 展开内容渲染函数 | `function(row)` | - | 是 |
| expanded | 展开行对象（受控模式） | `object` | - | 否 |
| onExpand | 展开/折叠回调 | `function(expanded: object)` | - | 否 |
| fixedExpand | 是否固定展开列 | `boolean` | `false` | 否 |

#### fixedColumnsTableXHOC(TableX)

固定列 HOC。列定义中通过 `fixed: 'left'` 或 `fixed: 'right'` 指定固定方向。固定列需要设置 `width` 属性。

#### sortableTableXHOC(TableX)

可拖拽排序表格 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| onSortChange | 排序变化回调 | `function(data: array)` | - | 是 |
| keyField | 行唯一标识字段 | `string` | `'value'` | 否 |

#### editTableXHOC(TableX)

可编辑表格 HOC，添加 `.gm-table-x-edit-table` 样式类。

#### subTableXHOC(TableX)

子表格 HOC，添加缩进列。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| subTableIndent | 子表格缩进宽度 | `number` | `TABLE_X.WIDTH_FUN` | 否 |

#### diyTableXHOC(TableX)

自定义列管理 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| id | 唯一标识，用于保存列配置到 localStorage | `string` | - | 是 |
| diyGroupSorting | 分组排序配置 | `array` | - | 是 |

- 列定义中需要 `diyGroupName` 和 `Header`（或 `diyItemText`）字段。

### TableXUtil

表格工具集。

| 属性/方法 | 说明 |
|-----------|------|
| `TABLE_X` | 表格常量配置（宽度、高度等） |
| `BatchActionBar` | 批量操作栏组件 |
| `OperationHeader` | 操作列表头组件 |
| `OperationDelete` | 删除操作组件 |
| `OperationRecover` | 恢复操作组件 |
| `OperationDetail` | 详情操作组件 |
| `OperationCell` | 操作单元格组件 |
| `OperationRowEdit` | 行编辑操作组件 |
| `OperationIconTip` | 图标提示操作组件 |
| `EditButton` | 编辑按钮组件 |
| `EditOperation` | 编辑操作组件 |
| `SortHeader` | 排序表头组件 |

## 示例

### 多功能组合

```jsx
import { TableX, selectTableXHOC, expandTableXHOC, fixedColumnsTableXHOC } from '@gmfe/table-x'

// HOC 组合：选择 + 展开 + 固定列
const EnhancedTable = fixedColumnsTableXHOC(selectTableXHOC(expandTableXHOC(TableX)))

const columns = [
  { Header: '名称', accessor: 'name', fixed: 'left', width: 200 },
  { Header: '描述', accessor: 'desc' },
  { Header: '操作', accessor: 'action', fixed: 'right', width: 150 }
]

function App() {
  return (
    <EnhancedTable
      columns={columns}
      data={data}
      selected={selected}
      onSelect={setSelected}
      SubComponent={(row) => <div>展开内容：{row.original.name}</div>}
    />
  )
}
```

## 注意事项

- `keyField` 默认为 `'value'`，确保数据中有该字段作为行唯一标识。
- 固定列必须设置 `width` 属性，否则会报错。
- `show: false` 的列会被自动过滤。
- 虚拟列表（`TableXVirtualized`）适用于大数据量场景，需要指定 `virtualizedHeight` 和 `virtualizedItemSize`。
- `selectTableXHOC` 不再提供 `onSelectAll` 回调，选中全部的逻辑通过 `isSelectorDisable` 和内部计算实现。
- 此包需要 `styled-components ^5.1.0` 作为 peer dependency。

---

## tableX 踩的坑，阅读后改代码更自信

- 注意不要随意升级版本，目前使用 7.0.0-rc.11
- 7.0.0-rc.11 天然不支持 column.show, 所以自行实现了 column.show 的支持.[issue](https://github.com/tannerlinsley/react-table/issues/1665)
- defaultColumn 的值不要轻易改动，具体看代码。目前实现了 minWidth，width，maxWidth 逻辑与 v6 一致，且需语义一致。
- 使用 useResizeColumns 后，无法兼容到 v6 的 minWidth，width，maxWidth 的实现，所以去掉了 useResizeColumns
- 斑马线，不能用 css 的 `:even` 和 `:odd` 实现。因为在使用虚拟列表的时候有坑。
- 使用.gm-table-x-td 定义 background 是有原因的，比如 使用 fixedColumnHOC 时候的背景穿透问题
- 虚拟列表的实现是 copy 了一份 TableX，请保证一致
- 改动需要考虑 keyboard 那边
- keyboard 测试 向上下左右是否有问题，特别是不在显示区域的是否可以滚动到显示区域
- keyboard 新增一行的性能，行数很大的时候的性能
- keyboard 的 input 不会因为新增而换掉 dom。即 控制台打出该 dom，在新增后 hover 到控制台的 dom 还能找到
