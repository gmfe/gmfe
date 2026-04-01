# @gmfe/keyboard

## 简介

`@gmfe/keyboard` 是 gmfe 组件库的键盘导航扩展包，为 `@gmfe/table` 和 `@gmfe/table-x` 提供键盘操作能力。支持在表格单元格之间通过方向键、Tab 键和 Enter 键导航，并提供多种键盘单元格组件（输入框、选择器、日期选择器等）。

## 安装

```bash
npm install @gmfe/keyboard
```

## 使用

### 基本用法

```jsx
import React from 'react'
import { TableX } from '@gmfe/table-x'
import { keyboardTableXHOC, KCInput, KCSelect, KCDatePicker } from '@gmfe/keyboard'

// 包装 TableX 使其支持键盘导航
const KeyboardTableX = keyboardTableXHOC(TableX)

// 定义列，Cell 使用键盘单元格组件
const columns = [
  {
    Header: '名称',
    accessor: 'name',
    isKeyboard: true,
    Cell: ({ row }) => <KCInput value={row.original.name} onChange={(val) => handleChange(row.index, 'name', val)} />
  },
  {
    Header: '类型',
    accessor: 'type',
    isKeyboard: true,
    Cell: ({ row }) => <KCSelect list={typeList} value={row.original.type} onChange={(val) => handleChange(row.index, 'type', val)} />
  }
]

function App() {
  return (
    <KeyboardTableX
      id="my-table"
      columns={columns}
      data={data}
      onAddRow={() => addNewRow()}
    />
  )
}
```

## API

### HOC 组件

#### keyboardTableHoc(Table)

为 `@gmfe/table`（react-table-v6）添加键盘导航能力的高阶组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识，用于确定本表格内通信 | `string` | - | 是 |
| onAddRow | 新增一行数据的回调 | `function` | - | 是 |
| onBeforeDispatch | 键盘事件分发前的拦截函数 | `function` | - | 否 |

#### keyboardTableXHOC(TableX)

为 `@gmfe/table-x`（react-table v7）添加键盘导航能力的高阶组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识，用于确定本表格内通信 | `string` | - | 是 |
| onAddRow | 新增一行数据的回调 | `function` | - | 是 |
| onBeforeDispatch | 键盘事件分发前的拦截函数 | `function` | - | 否 |

### 键盘单元格组件

所有键盘单元格组件都继承自 `KC`（KeyboardCell），通过自定义事件实现单元格间通信。

#### KC（KeyboardCell）

核心键盘单元格组件，所有具体键盘单元格的基础。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| wrapData | Wrap 数据对象，包含表格信息 | `object` | - | 是 |
| cellKey | 单元格身份标识 | `string` | - | 是 |
| onFocus | 聚焦回调，需实现聚焦逻辑 | `function` | - | 是 |
| onScroll | 滚动回调，接收 fixedWidths 信息 | `function` | - | 是 |
| disabled | 是否禁用键盘响应 | `boolean` | `false` | 否 |

#### KCInput

键盘输入框单元格，继承 `@gmfe/react` 的 `Input` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| onFocus | 自定义聚焦处理 | `function` | - | 否 |
| ...Input.props | Input 组件的所有其他属性 | - | - | 否 |

#### KCInputNumberV2

键盘数字输入框单元格，继承 `InputNumberV2` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| onFocus | 自定义聚焦处理 | `function` | - | 否 |
| ...InputNumberV2.props | InputNumberV2 组件的所有其他属性 | - | - | 否 |

#### KCSelect

键盘选择器单元格，继承 `Select` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| ...Select.props | Select 组件的所有其他属性 | - | - | 否 |

#### KCMoreSelect

键盘多选选择器单元格，继承 `MoreSelect` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| ...MoreSelect.props | MoreSelect 组件的所有其他属性 | - | - | 否 |

#### KCLevelSelect

键盘层级选择器单元格，继承 `LevelSelect` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| ...LevelSelect.props | LevelSelect 组件的所有其他属性 | - | - | 否 |

#### KCTableSelect

键盘表格选择器单元格，继承 `TableSelect` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| ...TableSelect.props | TableSelect 组件的所有其他属性 | - | - | 否 |

#### KCDatePicker

键盘日期选择器单元格，继承 `DatePicker` 组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| onKeyDown | 自定义键盘事件处理 | `function` | - | 否 |
| ...DatePicker.props | DatePicker 组件的所有其他属性 | - | - | 否 |

### KeyboardUtil

键盘导航工具方法。

| 方法 | 说明 |
|------|------|
| `isInputUnBoundary(input, direction)` | 判断输入框光标是否在边界位置，决定是否应该导航到下一个单元格 |
| `scrollIntoViewFixedWidth(td, fixedWidths)` | 在有固定列的情况下，将单元格滚动到可视区域 |
| `doFocus(cellKey, id)` | 触发指定单元格的聚焦事件 |

## 注意事项

- 列定义中需要设置 `isKeyboard: true` 标记可键盘导航的列。
- `id` 属性必须唯一，用于区分不同表格实例间的键盘事件。
- 键盘单元格使用 `popoverType='realFocus'` 以支持正确的键盘行为。
- 方向键导航会自动处理固定列的滚动，确保目标单元格可见。
- 选择类组件（Select、MoreSelect 等）按 Enter 键触发选择。
- `onAddRow` 回调用于在用户按 Tab 键超出最后一行时自动新增行。
- 修改 table-x 相关代码时需要同步测试 keyboard 包的兼容性。
