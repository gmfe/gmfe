# ToolTip

## 简介
文字提示组件 - 基于Popover封装的悬浮提示气泡，鼠标悬停时显示提示内容，默认显示问号图标

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { ToolTip } from '@gmfe/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| popup | 提示气泡内容 | `element` | - | 否 |
| children | 自定义触发元素，不传时默认显示问号图标 | `element` | - | 否 |
| right | 是否右对齐弹出 | `bool` | `false` | 否 |
| top | 是否向上弹出 | `bool` | `false` | 否 |
| center | 是否居中弹出 | `bool` | `false` | 否 |
| showArrow | 是否显示三角箭头 | `bool` | `true` | 否 |
| className | 自定义类名（作用于默认问号图标） | `string` | - | 否 |
| style | 自定义样式（作用于默认问号图标） | `object` | - | 否 |

## 示例

### 基础用法 - 默认问号图标

```jsx
<ToolTip popup={<div>这是一段提示文字</div>} />
```

### 自定义触发元素

```jsx
<ToolTip popup={<div style={{ width: '100px', height: '100px' }}>详细说明内容</div>}>
  <span>悬浮查看提示</span>
</ToolTip>
```

### 右对齐弹出

```jsx
<ToolTip
  right
  popup={<div>右对齐的提示内容</div>}
>
  <span>右对齐提示</span>
</ToolTip>
```

### 居中弹出

```jsx
<ToolTip
  center
  popup={<div>居中的提示内容</div>}
>
  <span>居中提示</span>
</ToolTip>
```

### 向上弹出

```jsx
<ToolTip
  top
  popup={<div>向上弹出的提示</div>}
>
  <span>上方提示</span>
</ToolTip>
```

## 注意事项

- ToolTip 底层基于 `Popover` 组件，默认使用 `type='hover'`（鼠标悬浮触发）和 `offset={-8}` 的配置。
- 不传 `children` 时，组件会渲染一个默认的问号图标（带 `gm-text-desc` 样式类）。
- 传 `children` 时会使用自定义元素作为触发器，替代默认的问号图标。
- `popup` 属性支持传入任意 React 元素作为气泡内容。
- ToolTip 使用 `forwardRef` 实现，支持通过 `ref` 获取组件实例并调用 `apiDoSetActive` 等底层方法。
