# @gmfe/cropper

## 简介

`@gmfe/cropper` 是基于 [cropperjs](https://github.com/fengyuanchen/cropperjs) 封装的图片裁剪组件，提供弹窗模式和组件模式两种使用方式。支持图片预览、固定比例裁剪、自定义裁剪尺寸等功能。

## 安装

```bash
npm install @gmfe/cropper
```

## 使用

### 组件模式

```jsx
import React from 'react'
import { Cropper } from '@gmfe/cropper'

function EditAvatar() {
  return (
    <Cropper
      url="https://example.com/avatar.jpg"
      options={{ aspectRatio: 1 }}
      croppedOptions={{ width: 720, height: 720 }}
      onCancel={() => console.log('取消')}
      onOK={(blob) => {
        // 处理裁剪结果
        const formData = new FormData()
        formData.append('file', blob)
      }}
    />
  )
}
```

### 弹窗模式（Promise）

```jsx
import React from 'react'
import { Cropper } from '@gmfe/cropper'

async function handleEdit() {
  try {
    const blob = await Cropper.render({
      url: 'https://example.com/avatar.jpg',
      options: { aspectRatio: 1 },
      croppedOptions: { width: 720, height: 720 }
    })
    console.log('裁剪成功', blob)
  } catch (e) {
    console.log('用户取消裁剪')
  }
}
```

## API

### Cropper

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| url | 图片 URL 地址（`url` 和 `file` 二选一） | `string` | - | 否 |
| file | 图片文件对象（需包含 `preview` 属性） | `object` | - | 否 |
| options | cropperjs 配置项 | `object` | `{ aspectRatio: 1, viewMode: 1 }` | 否 |
| croppedOptions | 裁剪输出配置 | `{ width: number, height: number }` | - | 否 |
| onCancel | 取消裁剪的回调 | `function` | - | 是 |
| onOK | 确认裁剪的回调，参数为 Blob 对象 | `function(blob: Blob)` | - | 是 |

#### 静态属性

| 属性 | 说明 | 类型 |
|------|------|------|
| Cropper.SIZE.SKU | SKU 图片裁剪尺寸 | `{ width: 720, height: 720 }` |
| Cropper.SIZE.LOGO | LOGO 图片裁剪尺寸 | `{ width: 720, height: 720 }` |

#### 静态方法

**Cropper.render(props): Promise\<Blob\>**

以弹窗方式打开裁剪器，返回 Promise。确认裁剪 resolve Blob，取消裁剪 reject。

**Cropper.hide()**

关闭弹窗裁剪器（等同于 `Modal.hide`）。

## 示例

### 固定比例裁剪

```jsx
import React from 'react'
import { Cropper } from '@gmfe/cropper'

function BannerEditor({ url }) {
  return (
    <Cropper
      url={url}
      options={{
        aspectRatio: 16 / 9,
        viewMode: 1,
        dragMode: 'move'
      }}
      croppedOptions={{ width: 1920, height: 1080 }}
      onCancel={() => console.log('取消')}
      onOK={(blob) => {
        const formData = new FormData()
        formData.append('file', blob)
      }}
    />
  )
}
```

### 使用预设尺寸

```jsx
import React from 'react'
import { Cropper } from '@gmfe/cropper'

function AvatarUploader() {
  return (
    <Cropper
      file={{ preview: 'blob:xxx' }}
      croppedOptions={Cropper.SIZE.SKU}
      onCancel={() => {}}
      onOK={(blob) => console.log('裁剪结果', blob)}
    />
  )
}
```

## 注意事项

- 使用 `file` 方式传入时，需要确保 file 对象上有 `preview` 属性（图片预览 URL），可使用 `URL.createObjectURL(file)` 生成。
- `file` 和 `url` 二选一，优先使用 `url`。
- 通过 URL 方式传入时，组件会根据 URL 后缀名推断输出格式（`.png` -> `image/png`，`.jpg/.jpeg` -> `image/jpeg`），无法推断则默认使用 `image/jpeg`。
- 弹窗模式依赖 `@gmfe/react` 包中的 `Modal`、`Flex`、`Button` 组件。
- 使用 `Cropper.render` 时，务必使用 `try/catch` 处理取消操作。
