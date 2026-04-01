# IconDownUp

## 简介
上下箭头图标组件 - 带有激活状态动画的下拉/上拉箭头图标

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { IconDownUp } from '@gmfe/react'

<IconDownUp active={isOpen} />
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| active | 是否激活（旋转 180 度） | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<IconDownUp active={isOpen} />
```

### 自定义样式
```jsx
<IconDownUp
  active={isOpen}
  className="custom-icon"
  style={{ fontSize: '12px' }}
/>
```

## 注意事项
- 这是纯图标组件，通常配合 `Popover`、`Selection` 等组件使用
- 激活状态时箭头会旋转 180 度，通过 CSS transition 实现平滑过渡
