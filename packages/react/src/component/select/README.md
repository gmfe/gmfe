# Select

## 简介
下拉选择组件 - 通过弹出层展示选项列表，支持键盘上下键选择、禁用选项和清除功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Select } from '@gmfe/react'

const list = [
  { value: 0, text: '南山' },
  { value: 1, text: '福田' },
  { value: 2, text: '宝安' },
  { value: 3, text: '宝安不可用', disabled: true },
  { value: 4, text: '罗湖' }
]

<Select
  data={list}
  value={value}
  onChange={setValue}
/>
```

## API

### Select Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 选项数据，每项包含 text、value、disabled | `array` | - | 是 |
| value | 当前选中的值 | `any` | - | 是 |
| onChange | 选择变化回调，参数为选中的 value | `func` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| canShowClose | 是否显示清除按钮 | `bool` | `false` | 否 |
| clean | 清洁模式 | `bool` | - | 否 |
| listProps | 传递给列表组件的属性 | `object` | - | 否 |
| popoverType | 弹出层触发方式 | `'focus' \| 'realFocus'` | - | 否 |
| isInPopup | 是否在弹出层中 | `bool` | - | 否 |
| onKeyDown | 键盘事件回调 | `func` | `_.noop` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 兼容旧用法，使用 Option 子组件 | `any` | - | 否 |

### Option Props（已废弃）
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 选项值 | `any` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| children | 选项显示文本 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 方法（通过 ref 调用）
| 方法 | 说明 |
|------|------|
| apiDoFocus | 聚焦到选择框 |
| apiDoSelectWillActive | 选择键盘高亮的当前项 |

## 示例

### 基础用法
```jsx
const list = [
  { value: 0, text: '南山' },
  { value: 1, text: '福田' },
  { value: 2, text: '宝安' }
]

<Select
  data={list}
  value={value}
  onChange={setValue}
/>
```

### 禁用选项
```jsx
const list = [
  { value: 0, text: '南山' },
  { value: 1, text: '福田' },
  { value: 2, text: '宝安', disabled: true }
]

<Select
  data={list}
  value={value}
  onChange={setValue}
/>
```

### 可清除
```jsx
<Select
  data={list}
  value={value}
  onChange={setValue}
  canShowClose
/>
```

### 清洁模式
```jsx
<Select
  clean
  data={list}
  value={value}
  onChange={setValue}
/>
```

## 注意事项
- 推荐使用 `data` 属性传入选项数据，`Option` 子组件方式已废弃
- 选项数据格式为 `[{ value, text, disabled }]`，其中 `disabled` 可选
- `canShowClose` 属性允许用户清除已选值
- 支持键盘上下键切换选项
- 列表最大高度为 `250px`，超出部分可滚动
- 弹出层默认使用 Popover 组件
