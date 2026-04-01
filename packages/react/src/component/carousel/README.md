# Carousel

## 简介
轮播组件 - 支持淡入淡出切换、自动轮播、鼠标悬浮暂停的图片/内容轮播

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Carousel } from '@gmfe/react'

<Carousel style={{ width: '1000px', height: '200px' }}>
  <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>内容1</div>
  <div style={{ backgroundColor: 'green', height: '100%', width: '100%' }}>内容2</div>
  <div style={{ backgroundColor: 'blue', height: '100%', width: '100%' }}>内容3</div>
</Carousel>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 轮播内容，支持 element 元素数组 | `arrayOf(element)` | - | 否 |
| defaultIndex | 初始展示的索引 | `number` | `0` | 否 |
| delay | 轮播间隔时间（毫秒） | `number` | `3000` | 否 |
| transitionTime | 切换动画时长（毫秒） | `number` | `1000` | 否 |
| onIndexChange | 索引变化回调 | `function` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| isStopByHoverContent | 鼠标悬浮在内容区域时是否暂停轮播 | `bool` | `true` | 否 |

## 示例

### 基础用法
```jsx
<Carousel
  style={{ width: '1000px', height: '200px' }}
  onIndexChange={index => console.log(index)}
>
  <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>内容1</div>
  <div style={{ backgroundColor: 'green', height: '100%', width: '100%' }}>内容2</div>
  <div style={{ backgroundColor: 'yellow', height: '100%', width: '100%' }}>内容3</div>
  <div style={{ backgroundColor: 'blue', height: '100%', width: '100%' }}>内容4</div>
</Carousel>
```

## 注意事项
- 子元素支持动态添加，组件会自动适应子元素数量变化
- 鼠标离开轮播区域后会自动恢复轮播
- 底部有圆点指示器，支持鼠标悬停切换
