# ImagePreview

## 简介
图片预览组件 - 全屏模态框展示大图，支持左右切换、缩略图导航和键盘操作

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { ImagePreview } from '@gmfe/react'

// 点击按钮触发预览
<button onClick={() => {
  ImagePreview({
    images: ['url1.jpg', 'url2.jpg', 'url3.jpg'],
    thumbnails: ['thumb1.jpg', 'thumb2.jpg', 'thumb3.jpg'],
    index: 0
  })
}}>
  预览图片
</button>
```

## API

### 参数
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| images | 图片 URL 数组 | `array` | - | 是 |
| thumbnails | 缩略图 URL 数组，底部展示缩略图列表 | `array` | - | 否 |
| index | 初始展示的图片索引 | `number` | - | 是 |

## 示例

### 基础用法
```jsx
ImagePreview({
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  index: 0
})
```

### 带缩略图
```jsx
ImagePreview({
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  thumbnails: ['thumb1.jpg', 'thumb2.jpg', 'thumb3.jpg'],
  index: 1
})
```

## 注意事项
- `ImagePreview` 不是 React 组件，而是一个函数调用，内部使用 `CleanModal` 渲染全屏模态框
- 支持键盘左右箭头键切换图片
- 缩略图多于一行时，会自动显示左右滚动按钮
- 点击模态框右上角的关闭按钮可关闭预览
