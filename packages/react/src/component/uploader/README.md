# Uploader

## 简介
文件上传组件 - 提供文件选择和上传触发功能，支持自定义上传区域和图片上传占位。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Uploader } from '@gmfe/react'

<Uploader
  onUpload={(files, e) => console.log(files)}
  accept='image/*'
/>
```

## API

### Uploader Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onUpload | 上传回调，参数为 (files, event)，files 为 File 对象数组 | `func` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| accept | 接受的文件类型 | `string` | - | 否 |
| multiple | 是否支持多文件选择 | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 自定义上传区域内容 | `any` | - | 否 |

### Uploader.Default Props
默认上传区域占位组件，显示 `+` 图标。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| className | 自定义类名 | `string` | - | 否 |

### Uploader.DefaultImage Props
图片上传占位组件，显示 `+ 加图` 文字。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 默认上传
```jsx
<Uploader
  onUpload={(files, e) => console.log(files)}
  accept='image/*'
/>
```

### 禁用状态
```jsx
<Uploader
  disabled
  onUpload={(files, e) => console.log(files)}
  accept='image/*'
/>
```

### 自定义触发按钮
```jsx
<Uploader onUpload={(files, e) => console.log(files)} accept='.xlsx'>
  <Button>上传 Excel</Button>
</Uploader>
```

### 图片上传占位
```jsx
const { DefaultImage } = Uploader

<Uploader
  onUpload={(files, e) => console.log(files)}
  accept='image/*'
>
  <DefaultImage />
</Uploader>
```

### 替换图片上传
```jsx
const { DefaultImage } = Uploader

<Uploader
  onUpload={handleUpload}
  accept='image/*'
>
  <DefaultImage>
    {imageUrl && <img src={imageUrl} style={{ width: '100%', height: '100%' }} />}
  </DefaultImage>
</Uploader>
```

## 注意事项
- `onUpload` 的第一个参数 `files` 是 File 对象数组，每个 File 对象会附带 `preview` 属性（通过 `URL.createObjectURL` 创建）
- 在微信环境下 `multiple` 属性会被强制设为 `false`
- 不传 `children` 时，默认使用 `+` 图标作为上传区域
- `accept` 属性遵循原生 input 的 accept 属性格式，如 `image/*`、`.xlsx` 等
- 上传文件的验证（大小、类型等）需在 `onUpload` 回调中自行处理
- 禁用状态下点击不会触发文件选择
