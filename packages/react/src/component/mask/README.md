# Mask

## 简介
遮罩层组件 - 提供可自定义透明度的半透明黑色遮罩层，适用于覆盖在内容上方

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Mask } from '@gmfe/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| opacity | 遮罩透明度，取值范围 0~1 | `number` | `0.5` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法

```jsx
<Mask />
```

### 自定义透明度

```jsx
// 较浅的遮罩
<Mask opacity={0.2} />

// 较深的遮罩
<Mask opacity={0.8} />

// 完全透明（仅作为覆盖层）
<Mask opacity={0} />
```

### 配合定位使用

```jsx
<div style={{ position: 'relative' }}>
  <div>被遮罩的内容</div>
  <Mask
    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    opacity={0.6}
  />
</div>
```

## 注意事项

- Mask 组件仅渲染一个 `div` 元素，不会自动铺满父容器，需要通过 CSS 定位（如 `position: absolute`）来控制覆盖范围。
- `opacity` 通过 `rgba(0,0,0, opacity)` 设置背景色，值越大遮罩越深。
- 遮罩层会透传其他 HTML 属性（通过 `...rest`），可以绑定 `onClick` 等事件。
- 如需带关闭功能的遮罩层，建议使用 Modal 或 Drawer 组件。
