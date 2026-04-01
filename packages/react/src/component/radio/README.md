# Radio

## 简介
单选框组件 - 用于单选场景，支持单个使用和分组使用（RadioGroup）。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Radio, RadioGroup } from '@gmfe/react'

// 单个使用
<Radio checked onChange={onChange}>选项</Radio>

// 分组使用
<RadioGroup name='city' value={value} onChange={setValue}>
  <Radio value={1}>广州</Radio>
  <Radio value={2}>深圳</Radio>
  <Radio value={3}>成都</Radio>
</RadioGroup>
```

## API

### Radio Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 是否选中 | `bool` | - | 否 |
| onChange | 变化回调 | `func` | `_.noop` | 否 |
| onClick | 点击回调 | `func` | `_.noop` | 否 |
| value | 选项值，配合 RadioGroup 使用 | `any` | - | 否 |
| children | 显示文本 | `any` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| inline | 是否行内显示 | `bool` | - | 否 |
| block | 是否整行可点击 | `bool` | - | 否 |
| name | input name 属性 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### RadioGroup Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| name | 表单名称，必填 | `string` | - | 是 |
| value | 当前选中的值 | `any` | - | 否 |
| onChange | 变化回调，参数为选中的 value | `func` | `_.noop` | 否 |
| inline | 是否行内显示 | `bool` | - | 否 |
| children | Radio 子组件 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<Radio checked>选中状态</Radio>
<Radio>未选中状态</Radio>
```

### 禁用状态
```jsx
<Radio checked disabled>选中禁用</Radio>
<Radio disabled>未选中禁用</Radio>
```

### 行内显示
```jsx
<Radio checked inline>选项1</Radio>
<Radio inline>选项2</Radio>
```

### 整行可点击
```jsx
<Radio
  block
  checked={checked}
  onChange={() => setChecked(!checked)}
>
  整行都可以点击
</Radio>
```

### 分组使用
```jsx
<RadioGroup
  name='city'
  value={value}
  onChange={value => console.log(value)}
>
  <Radio value={1}>广州</Radio>
  <Radio value={2}>深圳</Radio>
  <Radio value={3} disabled>成都</Radio>
</RadioGroup>
```

## 注意事项
- `RadioGroup` 的 `name` 属性为必填项
- `RadioGroup` 内部会自动管理选中状态，通过 `value` 和 `onChange` 控制受控模式
- `block` 模式下整行都可以触发选中操作
- 非行内模式下，每个 Radio 独占一行
- `RadioGroup` 的 `onChange` 回调参数为选中项的 `value` 值
