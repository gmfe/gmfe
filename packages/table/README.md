# @gmfe/table

## 简介

`@gmfe/table` 是基于 [react-table-v6](https://github.com/tannerlinsley/react-table/tree/v6/) 封装的高级表格组件包，提供丰富的表格功能扩展。包含基础表格、可编辑表格以及多个 HOC（高阶组件），支持选择、展开、固定列、排序、子表格、自定义列等功能。

> **注意：** 此包基于 react-table v6，推荐使用 `@gmfe/table-x`（基于 react-table v7）。

## 安装

```bash
npm install @gmfe/table
```

## 使用

### 基础表格

```jsx
import React from 'react'
import { Table } from '@gmfe/table'

const columns = [
  { Header: '名称', accessor: 'name' },
  { Header: '年龄', accessor: 'age' }
]

const data = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 }
]

function App() {
  return <Table data={data} columns={columns} />
}
```

### 带选择功能的表格

```jsx
import React, { useState } from 'react'
import { selectTableV2HOC } from '@gmfe/table'

const SelectTable = selectTableV2HOC(Table)

function App() {
  const [selected, setSelected] = useState([])

  return (
    <SelectTable
      data={data}
      columns={columns}
      selected={selected}
      onSelect={(selected) => setSelected(selected)}
      onSelectAll={(selected) => setSelected(selected)}
    />
  )
}
```

### 组合多个 HOC

```jsx
import { fixedColumnsTableHOC, selectTableV2HOC, expandTableHOC } from '@gmfe/table'

// HOC 可以组合使用
const EnhancedTable = fixedColumnsTableHOC(selectTableV2HOC(expandTableHOC(Table)))
```

## API

### Table

基础表格组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 表格数据 | `array` | - | 是 |
| columns | 列定义 | `array` | - | 是 |
| loading | 是否加载中 | `boolean` | `false` | 否 |
| tiled | 是否平铺（不使用分页） | `boolean` | `false` | 否 |
| showPagination | 是否显示分页 | `boolean` | `false` | 否 |
| defaultPageSize | 默认每页条数 | `number` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### EditTable

可编辑表格组件，继承 Table 的所有属性，添加 `.gm-react-edit-table` 样式类。

### HOC 组件

#### fixedColumnsTableHOC(Table)

固定列表格 HOC。

- 列定义中通过 `fixed: 'left'` 或 `fixed: 'right'` 指定固定方向。
- 固定列必须设置 `width` 属性。
- 内部会重新排列列顺序：左固定 → 普通 → 右固定。

#### fixedFirstColumnsTableHOC(Table)

固定前几列表格 HOC。

#### selectTableV2HOC(Table)

选择功能表格 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| selectType | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` | 否 |
| selected | 已选中项数组 | `array` | - | 是 |
| onSelect | 单行选中回调 | `function(selected: array)` | - | 是 |
| onSelectAll | 全选/取消全选回调 | `function(selected: array)` | - | 是 |
| isSelectorDisable | 行选择禁用函数 | `function(row): boolean` | - | 否 |
| keyField | 行唯一标识字段 | `string` | `'value'` | 否 |
| batchActionBar | 自定义批量操作栏 | `ReactElement` | - | 否 |

#### expandTableHOC(Table)

展开行表格 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| SubComponent | 展开内容渲染函数 | `function(row)` | - | 是 |
| keyField | 行唯一标识字段 | `string` | - | 是 |
| expanded | 展开行数组（受控模式） | `array` | - | 否 |
| onExpand | 展开/折叠回调 | `function(expanded: array)` | - | 否 |
| showRowExpan | 是否显示展开图标 | `function(original, index): boolean` | - | 否 |
| expandHeader | 是否显示全选展开 | `boolean` | `true` | 否 |

#### subTableHOC(Table)

子表格 HOC，添加空白缩进列。

#### diyTableHOC(Table)

自定义列管理 HOC。

| 额外属性 | 说明 | 类型 | 默认值 | 必填 |
|----------|------|------|--------|------|
| id | 唯一标识，用于保存列配置到 localStorage | `string` | - | 是 |
| diyGroupSorting | 分组排序配置 | `array` | - | 是 |

- 列定义中需要 `diyGroupName` 和 `Header`（或 `diyItemText`）字段。

#### sortableTable

可拖拽排序表格 HOC，集成 SortableJS。

### TableUtil

表格工具集。

| 属性/方法 | 说明 |
|-----------|------|
| `OperationHeader` | 操作列表头组件 |
| `OperationDelete` | 删除操作组件 |
| `OperationDetail` | 详情操作组件 |
| `OperationCell` | 操作单元格组件 |
| `OperationRowEdit` | 行编辑操作组件 |
| `OperationIconTip` | 图标提示操作组件 |
| `SortHeader` | 排序表头组件 |
| `EditTableOperation` | 可编辑表格操作组件 |
| `EditContentInputNumber` | 可编辑数字输入组件 |
| `EditContentInput` | 可编辑文本输入组件 |
| `EditButton` | 编辑按钮组件 |
| `BatchActionBar` | 批量操作栏组件 |
| `referOfWidth` | 列宽引用常量 |

## 示例

### 固定列 + 选择功能

```jsx
import { fixedColumnsTableHOC, selectTableV2HOC } from '@gmfe/table'

const EnhancedTable = fixedColumnsTableHOC(selectTableV2HOC(Table))

const columns = [
  { Header: '名称', accessor: 'name', fixed: 'left', width: 200 },
  { Header: '描述', accessor: 'desc' },
  { Header: '操作', accessor: 'action', fixed: 'right', width: 150 }
]
```

## 注意事项

- 此包基于 react-table v6，已标记为 deprecated，推荐使用 `@gmfe/table-x`。
- 空值单元格会自动显示 `-`。
- 可排序列表头会自动转换为 `SortHeader` 组件。
- `showPagination` 默认为 `false`，需要分页时请手动开启或使用 `@gmfe/business` 的分页组件。
- HOC 组合顺序有影响，建议先 `selectTableV2HOC` 再 `fixedColumnsTableHOC`。
