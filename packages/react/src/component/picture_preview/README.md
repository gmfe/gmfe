# PicturePreview

## 简介
图片预览组件 - 基于 `react-photo-view` 的图片查看器，点击图片可放大预览

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { PicturePreview } from '@gmfe/react'

<PicturePreview
  images={['img1.jpg', 'img2.jpg', 'img3.jpg']}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| images | 图片 URL 数组 | `array` | `[]` | 否 |
| className | 图片自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<PicturePreview
  images={[
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg'
  ]}
/>
```

### 自定义样式
```jsx
<PicturePreview
  images={['img1.jpg', 'img2.jpg']}
  className="custom-img-class"
/>
```

## 注意事项
- 底层依赖 `react-photo-view`，需要确保该包已安装
- 图片点击后会进入全屏预览模式，支持缩放、滑动等手势操作
- 如果 `images` 为空或 `undefined`，不会渲染任何内容
