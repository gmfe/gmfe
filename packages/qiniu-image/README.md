# @gmfe/qiniu-image

## 简介

`@gmfe/qiniu-image` 是基于七牛云图片服务的工具包，提供图片上传和图片处理两大功能。支持图片上传至七牛云存储，以及通过 URL 参数方式实现图片缩放、裁剪、水印、格式转换等操作。

## 安装

```bash
npm install @gmfe/qiniu-image
```

## 使用

```js
import { uploadImage, imageView2, watermark, pipeline } from '@gmfe/qiniu-image'

// 上传图片
const result = await uploadImage(blob, {
  getToken: async () => {
    const res = await fetch('/api/qiniu/token')
    const data = await res.json()
    return data.token
  }
})

// 图片缩放
const thumbnail = imageView2('https://image.document.guanmai.cn/photo.jpg', {
  w: 200,
  h: 200
})
```

## API

### uploadImage(blob, options)

上传图片到七牛云存储。

**参数：**

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| blob | 要上传的图片 Blob 对象 | `Blob` | - | 是 |
| options.prefix | 上传路径前缀 | `string` | `''` | 否 |
| options.uploadUrl | 七牛上传接口地址 | `string` | `'https://upload-z2.qiniup.com/'` | 否 |
| options.domain | 上传后的访问域名 | `string` | `'https://image.document.guanmai.cn'` | 否 |
| options.getToken | 获取七牛上传 token 的函数，返回 `Promise<string>` | `function` | - | 是 |
| options.timeout | token 缓存有效时间（毫秒） | `number` | `86400000`（24小时） | 否 |

**返回值：** `Promise<{ url: string, key: string }>`

- 如果 `blob.type` 不是以 `image/` 开头，会抛出错误 `need image`。
- 如果未提供 `getToken` 函数，会抛出错误 `need getToken`。
- `getToken` 返回的 token 会缓存在 `localStorage` 中，在 timeout 时间内（默认 24 小时）不会重复请求。

### imageSlim(url)

对图片进行瘦身处理（需七牛 CDN 融合处理已开启）。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 原始图片 URL | `string` | 是 |

**返回值：** `string`

### imageView2(url, options)

七牛 imageView2 图片处理接口，支持缩放和裁剪。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 原始图片 URL | `string` | 是 |
| options | 图片处理参数（mode, w, h, q 等） | `object` | 是 |

**返回值：** `string`

> 详细的 mode 参数和可用选项请参考 [七牛 imageView2 文档](https://developer.qiniu.com/dora/api/3683/img-directions-for-use)。

### imageMogr2(url, options)

七牛 imageMogr2 图片高级处理接口，支持旋转、裁剪、格式转换等。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 原始图片 URL | `string` | 是 |
| options | 图片处理参数 | `object` | 是 |

**返回值：** `string`

### watermark(url, options)

为图片添加水印，支持文字水印、图片水印以及混合水印。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 原始图片 URL | `string` | 是 |
| options | 水印配置，支持单个对象或对象数组（混合水印） | `object \| object[]` | 是 |

**单个水印配置：**

```js
watermark(url, {
  mode: 1,              // 水印模式
  text: '灌麦科技',     // 水印文字（自动 URL Safe Base64 编码）
  gravity: 'SouthWest', // 水印位置
  dx: 10,              // X 轴偏移
  dy: 10,              // Y 轴偏移
  fontsize: 500        // 字体大小
})
```

**返回值：** `string`

### pipeline(url, arr)

图片处理管道，将多个图片处理操作串联执行。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| url | 原始图片 URL | `string` | 是 |
| arr | 处理步骤数组 | `{ fun: string, options: object }[]` | 是 |

**返回值：** `string`

## 示例

### 图片上传

```js
import { uploadImage } from '@gmfe/qiniu-image'

async function handleFileUpload(file) {
  const result = await uploadImage(file, {
    prefix: 'avatars',
    getToken: async () => {
      const res = await fetch('/api/upload/token')
      const data = await res.json()
      return data.token
    }
  })
  console.log('上传成功：', result.url)
  return result.url
}
```

### 管道操作 —— 缩放 + 水印

```js
import { pipeline, imageView2, watermark } from '@gmfe/qiniu-image'

const processed = pipeline('https://image.document.guanmai.cn/photo.jpg', [
  { fun: 'imageView2', options: { mode: 2, w: 800, h: 600, q: 80 } },
  { fun: 'watermark', options: { mode: 1, text: '灌麦科技', gravity: 'SouthEast', dx: 10, dy: 10, fontsize: 300 } }
])
```

## 注意事项

- `imageMogr2` 函数内部生成的 URL 参数名为 `imageMor2`（缺少字母 g），这是代码中的已知行为，不影响使用。
- 调用 `uploadImage` 时必须提供 `getToken` 回调函数。
- `imageView2`、`imageMogr2`、`watermark` 等函数仅生成带有处理参数的 URL，实际图片处理由七牛云 CDN 在请求时完成。
- `watermark` 的 `text` 和 `image` 参数会自动进行 URL Safe Base64 编码，无需手动编码。
