# Checkbox

## 简介
复选框组件 - 用于多选场景，支持单个使用和分组使用（CheckboxGroup）。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Checkbox, CheckboxGroup } from '@gmfe/react'

// 单个使用
<Checkbox checked onChange={onChange}>选项</Checkbox>

// 分组使用
<CheckboxGroup name='city' value={value} onChange={setValue}>
  <Checkbox value={1}>广州</Checkbox>
  <Checkbox value={2}>深圳</Checkbox>
  <Checkbox value={3}>成都</Checkbox>
</CheckboxGroup>
```

## API

### Checkbox Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 是否选中 | `bool` | - | 否 |
| onChange | 变化回调 | `func` | `_.noop` | 否 |
| value | 选项值，配合 CheckboxGroup 使用 | `any` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| children | 显示文本 | `any` | - | 否 |
| indeterminate | 半选状态（仅 checked 为 false 时有效，只控制样式） | `bool` | - | 否 |
| inline | 是否行内显示 | `bool` | - | 否 |
| block | 是否整行可点击 | `bool` | - | 否 |
| col | 配合 group 使用，设置列数下的宽度占比 | `number` | - | 否 |
| name | input name 属性 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### CheckboxGroup Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| name | 表单名称，必填 | `string` | - | 是 |
| value | 已选中的值数组 | `array` | - | 是 |
| onChange | 变化回调，参数为最新的值数组 | `func` | `_.noop` | 否 |
| inline | 是否行内显示 | `bool` | - | 否 |
| block | 是否整行可点击 | `bool` | - | 否 |
| col | 列数，子元素会按百分比分配宽度 | `number` | - | 否 |
| children | Checkbox 子组件 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<Checkbox checked>选中状态</Checkbox>
<Checkbox>未选中状态</Checkbox>
<Checkbox indeterminate>半选状态</Checkbox>
```

### 禁用状态
```jsx
<Checkbox checked disabled>选中禁用</Checkbox>
<Checkbox disabled>未选中禁用</Checkbox>
<Checkbox indeterminate disabled>半选禁用</Checkbox>
```

### 行内显示
```jsx
<Checkbox checked inline>选项1</Checkbox>
<Checkbox inline>选项2</Checkbox>
```

### 整行可点击
```jsx
<Checkbox block checked={checked} onChange={() => setChecked(!checked)}>
  整行都可以点击
</Checkbox>
```

### 分组使用
```jsx
<CheckboxGroup
  name='city'
  value={[1, 4]}
  onChange={value => console.log(value)}
>
  <Checkbox value={1}>广州</Checkbox>
  <Checkbox value={2} disabled>深圳</Checkbox>
  <Checkbox value={3}>成都</Checkbox>
  <Checkbox value={4} disabled>东莞</Checkbox>
</CheckboxGroup>
```

### 分组带列数
```jsx
<CheckboxGroup
  name='city'
  value={value}
  onChange={setValue}
  col={2}
  inline
>
  <Checkbox value={1}>广州</Checkbox>
  <Checkbox value={2}>深圳</Checkbox>
  <Checkbox value={3}>成都</Checkbox>
  <Checkbox value={4}>东莞</Checkbox>
</CheckboxGroup>
```

## 注意事项
- `CheckboxGroup` 的 `name` 属性为必填项
- `CheckboxGroup` 的 `value` 属性接收的是已选值的数组（非 Checkbox 的 value 对象）
- `indeterminate` 半选状态只影响样式，`checked` 为 `false` 时才生效
- `block` 模式下整行都可以触发选中/取消选中
- `col` 属性与 `CheckboxGroup` 配合使用，按百分比自动分配每列宽度
- 非行内模式下，每个 Checkbox 独占一行
