# Tree

## 简介
树形选择组件 - 支持多级嵌套、搜索过滤、全选、自定义渲染的树形控件

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Tree } from '@gmfe/react'

<Tree
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 树形数据，格式：`[{value, name, children: []}]` | `array` | - | 是 |
| selectedValues | 已选中的叶子节点 value 数组 | `array` | - | 是 |
| onSelectValues | 选择值变化回调 | `function` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| title | 标题 | `string` | - | 否 |
| withFilter | 过滤函数，默认自带拼音搜索，不需要则传 `false` | `func \| bool` | `true` | 否 |
| placeholder | 搜索框占位文本 | `string` | `'搜索'` | 否 |
| disableSelectAll | 是否禁用全选 | `bool` | `false` | 否 |
| showGroupCheckbox | 控制分组节点是否显示 checkbox，传入函数 `(group) => boolean` | `function` | `() => true` | 否 |
| onClickCheckbox | 勾选 checkbox 时的通知回调，纯通知 | `function` | - | 否 |
| onClickExpand | 点击展开/收起时的通知回调，纯通知 | `function` | - | 否 |
| onClickLeafName | 点击叶子节点名称的回调 | `function` | - | 否 |
| onClickGroupName | 点击分组节点名称的回调 | `function` | - | 否 |
| renderLeafItem | 自定义叶子节点渲染，参数为 `(item)` | `function` | - | 否 |
| renderGroupItem | 自定义分组节点渲染，参数为 `(item, next)`，`next` 为切换展开收起的函数 | `function` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式，默认 `{width: '250px', height: '350px'}` | `object` | `{width: '250px', height: '350px'}` | 否 |
| isForManage | 是否用于分类管理模式 | `bool` | - | 否 |

## 示例

### 基础用法
```jsx
<Tree
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

### 带标题
```jsx
<Tree
  title="我是标题"
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

### 禁用全选
```jsx
<Tree
  disableSelectAll
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

### 自定义渲染
```jsx
<Tree
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
  renderGroupItem={item => `group ${item.name}`}
  renderLeafItem={item => <div>leaf {item.name}</div>}
/>
```

### 纯树（无搜索、无全选）
```jsx
<Tree
  withFilter={false}
  disableSelectAll
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

## 注意事项
- 默认搜索使用拼音过滤，搜索有 300ms 的防抖
- `isForManage` 模式下会添加管理样式的类名
