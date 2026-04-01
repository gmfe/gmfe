# FlipNumber

## 简介
数字翻滚动画组件 - 以滚动方式从起始数字过渡到目标数字，支持小数、千分符和自定义缓动函数

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { FlipNumber } from '@gmfe/react'

<FlipNumber to={12345} />
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| to | 最终要显示的数字 | `number` | - | 是 |
| from | 滚动的起始数字 | `number` | `0` | 否 |
| delay | 延迟开始时间（毫秒） | `number` | `0` | 否 |
| duration | 滚动动画时长（毫秒） | `number` | `1500` | 否 |
| easeFn | 缓动函数，控制滚动的加速度 | `function` | 默认起末慢、中间快的三次方缓动 | 否 |
| individually | 是否逐个数字滚动 | `bool` | `true` | 否 |
| decimal | 小数点后保留位数 | `number` | `0` | 否 |
| useGroup | 是否启用大数逗号分组（千分符） | `bool` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<FlipNumber to={12345} />
```

### 带小数和千分符
```jsx
<FlipNumber
  to={709394}
  from={234.23}
  decimal={2}
  useGroup
  delay={1000}
  className="gm-text-20"
/>
```

## 注意事项
- 动画使用 `requestAnimationFrame` 实现，性能良好
- 支持负数显示
- 自定义缓动函数可参考 [easing-js](https://github.com/danro/easing-js) 库
