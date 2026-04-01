# Progress

## 简介
进度条组件 - 用于展示操作进度的线性进度条，支持自定义颜色、粗细、文字显示位置和状态

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Progress } from '@gmfe/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比，取值范围 0~100 | `number` | - | 是 |
| text | 自定义显示文字，不传则显示百分比 | `string` | - | 否 |
| status | 进度条状态 | `'success' \| 'exception'` | - | 否 |
| strokeWidth | 进度条高度（像素） | `number` | - | 否 |
| textInside | 是否将文字显示在进度条内部 | `bool` | `false` | 否 |
| textInsideFix | 文字在进度条内部的对齐方式（需配合 `textInside` 使用） | `'left' \| 'right' \| 'center'` | - | 否 |
| showText | 是否显示文字 | `bool` | `true` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| textColor | 文字颜色 | `string` | - | 否 |
| strokeColor | 进度条颜色 | `string` | - | 否 |
| bgColor | 进度条背景颜色 | `string` | - | 否 |

## 示例

### 基础用法

```jsx
<Progress percentage={30} />
<Progress percentage={70} />
<Progress percentage={100} />
```

### 不显示文字

```jsx
<Progress percentage={50} showText={false} />
```

### 自定义文字

```jsx
<Progress percentage={20} text='20斤/100斤' strokeWidth={18} />
```

### 文字内置

```jsx
// 文字显示在进度条内部
<Progress percentage={70} textInside strokeWidth={18} />
```

### 文字内对齐方式

```jsx
<Progress percentage={70} textInside textInsideFix='center' strokeWidth={18} />
<Progress percentage={70} textInside textInsideFix='left' strokeWidth={18} />
<Progress percentage={70} textInside textInsideFix='right' strokeWidth={18} />
```

### 自定义颜色

```jsx
<Progress
  percentage={70}
  textInside
  textInsideFix='center'
  strokeWidth={18}
  textColor='black'
  strokeColor='orange'
  bgColor='lightgray'
/>
```

### 状态展示

```jsx
// 成功状态 - 显示绿色和对勾图标
<Progress percentage={100} status='success' />

// 异常状态 - 显示红色和错误图标
<Progress percentage={50} status='exception' />
```

## 注意事项

- `percentage` 为必填属性，取值范围 0~100。
- 设置 `status='success'` 时进度条变为绿色并显示对勾图标，`status='exception'` 时进度条变为红色并显示错误图标。状态图标仅在文字显示在进度条外部（`textInside=false`）时可见。
- `textInsideFix` 仅在 `textInside` 为 `true` 时生效，可控制文字在进度条内部的对齐方向。
- `textInside` 设为 `true` 时建议同时设置 `strokeWidth` 以确保进度条有足够的高度容纳文字。
