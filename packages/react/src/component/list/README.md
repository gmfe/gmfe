# List

## 简介
列表组件 - 支持单选、多选、分组展示和滚动定位的通用列表

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { List } from '@gmfe/react'

// 基础单选
<List
  data={[
    { value: '南山', text: '南山' },
    { value: '福田', text: '福田', disabled: true },
    { value: '龙岗', text: '龙岗' }
  ]}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据源，普通列表格式：`[{value, text, disabled}]`，分组列表格式：`[{label, children: [{value, text, disabled}]}]` | `array` | - | 是 |
| selected | 选中值，单选为 value，多选为 `[value, value]`。多选请务必提供数组 | `any` | - | 否 |
| onSelect | 选中回调，单选返回 value，多选返回 `[value, value]` | `function` | `_.noop` | 否 |
| multiple | 是否多选 | `bool` | `false` | 否 |
| isGroupList | 数据是否为分组格式 | `bool` | `false` | 否 |
| renderItem | 自定义列表项渲染，参数为 `(item, index)` | `function` | `(item) => item.text` | 否 |
| willActiveIndex | 即将激活的索引，用于键盘导航 | `number` | - | 否 |
| isScrollTo | 是否滚动到选中项 | `bool` | `false` | 否 |
| getItemProps | 给列表项更多自定义属性，参数为 `(item)` | `function` | `() => ({})` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础单选
```jsx
<List
  data={data}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 多选
```jsx
<List
  multiple
  data={data}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 分组列表
```jsx
<List
  data={groupData}
  isGroupList
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 自定义渲染项
```jsx
<List
  data={data}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  renderItem={(item, index) => item.text + index}
/>
```

### 滚动到选中项
```jsx
<List
  data={data}
  selected="罗湖5"
  onSelect={selected => setSelected(selected)}
  isScrollTo
  style={{ maxHeight: '100px' }}
/>
```

## 注意事项
- 多选情况下 `selected` 请务必传递数组类型
- `data` 中单个项支持 `disabled` 属性来禁用该项
