# ProgressCircle

## 简介
环形进度条组件 - 使用 SVG 绘制的圆环进度指示器，支持自定义大小、颜色、线宽和文字位置

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { ProgressCircle } from '@gmfe/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比，取值范围 0~100 | `number` | `0` | 否 |
| text | 自定义显示文字，不传则显示百分比 | `string` | - | 否 |
| showText | 是否显示文字 | `bool` | `true` | 否 |
| textPosition | 文字显示位置 | `'left' \| 'center' \| 'right'` | `'center'` | 否 |
| status | 进度条状态 | `'success' \| 'exception'` | `'success'` | 否 |
| size | 圆环整体尺寸（像素） | `string \| number` | `'40'` | 否 |
| lineWidth | 圆环线条宽度 | `string \| number` | `'60'` | 否 |
| progressColor | 进度条颜色 | `string` | - | 否 |
| bgColor | 背景圆环颜色 | `string` | `'#e4e8f1'` | 否 |

## 示例

### 基础用法

```jsx
<ProgressCircle percentage={60} />
<ProgressCircle percentage={80} status='exception' />
```

### 不显示文字

```jsx
<ProgressCircle percentage={50} showText={false} />
<ProgressCircle percentage={80} status='exception' showText={false} />
```

### 自定义文字和位置

```jsx
// 文字在右侧
<ProgressCircle percentage={75} textPosition='right' />

// 文字在左侧，自定义文字
<ProgressCircle percentage={60} textPosition='left' text='60/100' />
```

### 自定义大小和线宽

```jsx
// 大尺寸
<ProgressCircle percentage={80} size='100' />

// 细线条
<ProgressCircle percentage={80} size='100' lineWidth={20} />
```

### 自定义颜色

```jsx
<ProgressCircle
  percentage={80}
  size='100'
  lineWidth={20}
  progressColor='orange'
/>

<ProgressCircle
  percentage={80}
  size='100'
  lineWidth={20}
  progressColor='orange'
  bgColor='gray'
/>
```

## 注意事项

- ProgressCircle 使用 SVG 绘制，内部固定 viewBox 为 `300x300`，通过 `size` 属性控制实际渲染尺寸。
- 默认状态为 `success`（绿色），可设为 `exception`（红色）来表示异常状态。
- `textPosition='center'` 时文字渲染在圆环中央（SVG text 元素），`left` 和 `right` 时文字显示在圆环外侧。
- `lineWidth` 控制圆环线条的粗细，值越大圆环越粗。当线条较粗时，建议使用较小的值以避免线条溢出。
- `size` 和 `lineWidth` 支持 `string` 和 `number` 类型。
- 百分比超过 100 时会被自动限制为 100。
