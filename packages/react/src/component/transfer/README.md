# Transfer

## 简介
穿梭框组件 - 用于在左右两栏之间转移选项，支持普通列表和分组树形列表

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Transfer, TransferGroup } from '@gmfe/react'

// 普通穿梭框
<Transfer
  list={list}
  selectedValues={selectedValues}
  onSelect={values => setSelectedValues(values)}
/>

// 分组穿梭框
<TransferGroup
  list={groupList}
  selectedValues={selectedValues}
  onSelect={values => setSelectedValues(values)}
/>
```

## API

### Transfer Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 数据源，格式：`[{value, name}]` | `array` | - | 是 |
| selectedValues | 已选中的 value 数组 | `array` | - | 是 |
| onSelect | 选中值变化回调 | `function` | - | 是 |
| listStyle | 左右两栏的样式 | `object` | `{width: '250px', height: '350px'}` | 否 |
| leftTitle | 左栏标题 | `string` | `'待选择'` | 否 |
| leftWithFilter | 左栏搜索过滤函数 | `func \| bool` | `true` | 否 |
| leftPlaceHolder | 左栏搜索框占位文本 | `string` | `'搜索'` | 否 |
| rightTitle | 右栏标题 | `string` | `'已选择'` | 否 |
| rightWithFilter | 右栏搜索过滤函数 | `func \| bool` | `true` | 否 |
| rightPlaceHolder | 右栏搜索框占位文本 | `string` | `'搜索'` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| isVirtual | 是否使用虚拟滚动 | `bool` | `false` | 否 |
| itemSize | 虚拟滚动时每项的高度 | `number` | `25` | 否 |

### TransferGroup Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 树形数据源，格式：`[{value, name, children: [{value, name, children: []}]}]` | `array` | - | 是 |
| selectedValues | 已选中的叶子节点 value 数组 | `array` | - | 是 |
| onSelect | 选中值变化回调 | `function` | - | 是 |
| listStyle | 左右两栏的样式 | `object` | `{width: '250px', height: '350px'}` | 否 |
| leftTitle | 左栏标题 | `string` | `'待选择'` | 否 |
| leftWithFilter | 左栏搜索过滤函数 | `func \| bool` | `true` | 否 |
| leftPlaceHolder | 左栏搜索框占位文本 | `string` | `'搜索'` | 否 |
| rightTitle | 右栏标题 | `string` | `'已选择'` | 否 |
| rightWithFilter | 右栏搜索过滤函数 | `func \| bool` | `true` | 否 |
| rightPlaceHolder | 右栏搜索框占位文本 | `string` | `'搜索'` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础穿梭框
```jsx
<Transfer
  list={list}
  selectedValues={selectedValues}
  onSelect={values => setSelectedValues(values)}
/>
```

### 虚拟滚动
```jsx
<Transfer
  isVirtual
  list={largeList}
  selectedValues={selectedValues}
  onSelect={values => setSelectedValues(values)}
/>
```

### 分组穿梭框
```jsx
<TransferGroup
  list={groupList}
  selectedValues={selectedValues}
  onSelect={values => setSelectedValues(values)}
/>
```

## 注意事项
- `Transfer` 适用于扁平列表数据
- `TransferGroup` 适用于树形分组数据，左侧为 Tree 组件，右侧为普通列表
- 启用虚拟滚动 (`isVirtual`) 后可处理大量数据
