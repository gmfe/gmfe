# ImgUploader

## 简介
图片上传组件 - 支持多图上传、预览、删除和替换，提供统一的图片上传管理能力。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { ImgUploader } from '@gmfe/react'

const handleUpload = files => {
  // 调用上传接口
  return Promise.resolve(['https://example.com/image.png'])
}

<ImgUploader
  data={['https://example.com/image1.png']}
  onChange={data => setImageData(data)}
  onUpload={handleUpload}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 图片 URL 数组 | `array` | - | 是 |
| onChange | 图片列表变化回调，参数为新的 URL 数组 | `func` | - | 是 |
| onUpload | 上传回调，参数为 files，需返回 Promise resolve 回 [url] | `func` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| accept | 接受的图片类型 | `string` | `'image/*'` | 否 |
| multiple | 添加按钮是否支持多图选择 | `bool` | - | 否 |
| contentSize | 图片尺寸配置 | `shape` | - | 否 |
| contentSize.width | 图片宽度 | `string` | `'64px'` | 否 |
| contentSize.height | 图片高度 | `string` | `'64px'` | 否 |
| desc | 描述文本 | `string` | - | 否 |
| imgRender | 自定义图片渲染，参数为图片 URL，返回 ReactElement | `func` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
const handleUpload = files => {
  return Promise.resolve([
    'https://example.com/image.png'
  ])
}

<ImgUploader
  data={imageList}
  onUpload={handleUpload}
  onChange={data => setImageList(data)}
  accept='image/*'
  desc='图片尺寸720*720像素，大小小于1M'
  multiple
/>
```

### 禁用状态
```jsx
<ImgUploader
  disabled
  data={imageList}
  onUpload={handleUpload}
  onChange={data => setImageList(data)}
/>
```

### 自定义图片尺寸
```jsx
<ImgUploader
  data={imageList}
  onUpload={handleUpload}
  onChange={data => setImageList(data)}
  contentSize={{ width: '100px', height: '100px' }}
/>
```

## 注意事项
- `onUpload` 回调必须返回一个 `Promise`，`resolve` 的结果为上传后的 URL 数组
- `data` 属性存储的是图片 URL 数组，不是 File 对象
- 点击已有图片可替换该图片
- 每张图片右上角有关闭按钮，点击可删除（禁用状态下不显示）
- `multiple` 属性仅控制"添加"按钮是否支持多选，不影响已有图片
- 默认图片尺寸为 64px x 64px
- 图片尺寸和文件大小的验证需在使用时自行处理
