# Loading

## 简介
加载中组件 - 提供多种加载状态展示方式，包含基础旋转加载、区域块加载和全屏加载三种模式

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Loading, LoadingChunk, LoadingFullScreen } from '@gmfe/react'
```

## API

### Loading 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 加载文字 | `string` | - | 否 |
| size | 加载图标尺寸（像素） | `number` | `40` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### LoadingChunk 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| loading | 是否显示加载状态 | `bool` | `false` | 否 |
| children | 加载区域内容 | `any` | - | 否 |
| text | 加载文字 | `string` | - | 否 |
| size | 加载图标尺寸（像素） | `number` | `50` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### LoadingChunk 静态方法

无静态方法，仅作为组件使用。

### LoadingFullScreen 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `LoadingFullScreen.render(props)` | 显示全屏加载 | `props: Object` | - |
| `LoadingFullScreen.hide()` | 隐藏全屏加载 | - | - |

#### LoadingFullScreen Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 加载文字 | `string` | - | 否 |
| size | 加载图标尺寸（像素） | `number` | `50` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础旋转加载

```jsx
<Loading />
```

### 自定义大小

```jsx
<Loading size={100} />
```

### 带文字的加载

```jsx
<Loading text="正在加载中..." />
```

### 区域块加载（LoadingChunk）

```jsx
<LoadingChunk loading size={60}>
  <div style={{ height: '100px' }}>
    这是被遮罩的内容区域
  </div>
</LoadingChunk>
```

### 区域块加载带文字

```jsx
<LoadingChunk loading size={60} text="拼命加载中...">
  <div style={{ height: '100px' }}>
    被遮罩的内容
  </div>
</LoadingChunk>
```

### 全屏加载

```jsx
// 显示全屏加载
LoadingFullScreen.render({
  text: '拼命加载中...'
})

// 3秒后自动关闭
setTimeout(() => {
  LoadingFullScreen.hide()
}, 3000)
```

## 注意事项

- `Loading` 是基础的旋转加载图标组件，可嵌入到任何容器中。
- `LoadingChunk` 在内容区域上叠加一层遮罩和加载图标，适合包裹在卡片、表格等局部区域使用。不传 `children` 时会自动生成一个高度为 `size` 的占位区域。
- `LoadingFullScreen` 使用命令式调用，显示全屏加载遮罩时会自动在 `document.body` 上添加 `gm-loading-body-overflow` 类以禁止页面滚动，隐藏时自动移除。
- 全屏加载默认图标尺寸为 50px，大于基础 Loading 的默认 40px。
- `LoadingChunk` 的 `loading` 属性默认为 `false`，需要手动设置为 `true` 才会显示加载状态。
