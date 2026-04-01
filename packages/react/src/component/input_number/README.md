# InputNumber

## 简介
数字输入框组件 - 限制用户只能输入合法数字，支持精度控制、最大最小值限制和负数输入。提供 `InputNumber`（旧版）和 `InputNumberV2`（推荐）两个版本。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { InputNumberV2 } from '@gmfe/react'

<InputNumberV2
  value={value}
  onChange={setValue}
/>
```

## API

### InputNumberV2（推荐）
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前值 | `number` | `null` | 否 |
| onChange | 值变化回调 | `func` | 是 | 是 |
| max | 最大值 | `number` | - | 否 |
| min | 最小值 | `number` | - | 否 |
| precision | 精确度，保留几位小数 | `number` | `2` | 否 |
| placeholder | 占位文字 | `string` | - | 否 |
| forceInnerValue | 修复场景：删除 1.09 会将 .0 一起删除的问题 | `bool` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### InputNumber（旧版）
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前值 | `number \| string` | - | 否 |
| onChange | 值变化回调 | `func` | 是 | 是 |
| max | 最大值 | `number` | - | 否 |
| min | 最小值 | `number` | - | 否 |
| precision | 精确度，保留几位小数 | `number` | `2` | 否 |
| minus | 是否支持输入负数 | `bool` | `false` | 否 |
| placeholder | 占位文字 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<InputNumberV2
  value={value}
  onChange={setValue}
/>
```

### 设置精度
```jsx
<InputNumberV2
  value={value}
  onChange={setValue}
  precision={3}
/>
```

### 设置最大最小值
```jsx
<InputNumberV2
  value={value}
  onChange={setValue}
  min={0}
  max={100}
/>
```

### 旧版支持负数
```jsx
import { InputNumber } from '@gmfe/react'

<InputNumber
  value={value}
  onChange={setValue}
  minus
/>
```

## 注意事项
- 推荐使用 `InputNumberV2`，它有更好的状态管理和精度处理
- `InputNumberV2` 的 `onChange` 回调参数为 `number` 类型（空值时为 `null`）
- `InputNumber`（旧版）的 `onChange` 回调参数可能是 `string` 或 `number`
- 两个版本都使用中文句号（`。`）自动转换为小数点（`.`）
- 在 Form 中使用时，FormItem 会自动为其添加 `form-control` 类名
- `forceInnerValue` 属性用于修复输入过程中删除字符时的边界情况，如有异常输入行为可尝试开启
