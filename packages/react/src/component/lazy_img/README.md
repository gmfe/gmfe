# LazyImg

## 简介
懒加载图片组件 - 监听指定容器的滚动事件，当图片进入可视区域时才加载真实图片

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { LazyImg } from '@gmfe/react'

<div id="scroll-container" style={{ height: '500px', overflowY: 'auto' }}>
  <LazyImg
    src="real-image.jpg"
    placeholder="placeholder.jpg"
    targetId="scroll-container"
  />
</div>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| src | 真实图片地址 | `string` | - | 否 |
| placeholder | 占位图片地址，图片未加载时显示 | `string` | - | 否 |
| targetId | 指定监听滚动的 DOM 元素的 ID | `string` | - | 是 |
| delay | 滚动事件防抖延迟时间（毫秒） | `number` | `100` | 否 |
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<div id="scroll-area" style={{ height: '500px', overflowY: 'auto' }}>
  <LazyImg
    src="https://example.com/large-image.jpg"
    placeholder="https://example.com/placeholder.jpg"
    targetId="scroll-area"
  />
</div>
```

### 自定义防抖延迟
```jsx
<LazyImg
  src="image.jpg"
  placeholder="placeholder.jpg"
  targetId="scroll-container"
  delay={200}
/>
```

## 注意事项
- 必须提供 `targetId`，对应一个存在的 DOM 元素的 ID
- 如果找不到指定 ID 的 DOM 元素，会在控制台输出错误信息
- 图片加载完成后会自动移除滚动事件监听，避免内存泄漏
