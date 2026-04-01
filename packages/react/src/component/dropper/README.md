# Dropper

## 简介
文件拖放组件 - 支持拖放上传和点击选择文件

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Dropper } from '@gmfe/react'

<Dropper
  onDrop={(files, e) => console.log(files)}
  accept="image/*"
>
  <div>点击或拖拽文件到此处上传</div>
</Dropper>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| multiple | 是否支持多文件选择 | `bool` | `false` | 否 |
| onDrop | 文件放置/选择后的回调，参数为 `(files, event)`，`files` 数组中每项包含 `preview` 属性（blob URL） | `function` | - | 是 |
| accept | 接受的文件类型，同 `<input type="file">` 的 accept 属性 | `string` | - | 否 |
| children | 自定义内容区域 | `any` | - | 否 |
| className | 自定义内容区域的类名，默认使用 `gm-dropper-default` | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<Dropper onDrop={(files) => handleFiles(files)}>
  <div>点击或拖拽文件到此处</div>
</Dropper>
```

### 多文件上传
```jsx
<Dropper
  multiple
  onDrop={(files) => handleFiles(files)}
  accept="image/*"
>
  <div>支持多文件图片上传</div>
</Dropper>
```

## 注意事项
- 在微信浏览器中 `multiple` 属性无效，会自动禁用
- 每个文件对象会自动添加 `preview` 属性，值为 `URL.createObjectURL(file)` 生成的 blob URL
- 使用完毕后建议手动释放 blob URL 以避免内存泄漏
