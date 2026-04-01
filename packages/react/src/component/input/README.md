# Input

## 简介
输入框组件 - 基于原生 input 封装，添加了 `gm-input` 类名以配合 UI 库的样式。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Input } from '@gmfe/react'

<Input type='text' placeholder='请输入' />
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| className | 自定义类名 | `string` | - | 否 |

除上述属性外，支持原生 input 的所有属性（如 `value`、`onChange`、`placeholder`、`type`、`disabled` 等），会直接透传到原生 input 元素上。

## 示例

### 基础用法
```jsx
<Input type='text' placeholder='请输入用户名' />
```

### 配合 Form 使用
```jsx
<FormItem label='名字' required>
  <Input type='text' value={name} onChange={e => setName(e.target.value)} />
</FormItem>
```

### 自定义类名
```jsx
<Input className='my-custom-input' placeholder='自定义样式' />
```

## 注意事项
- 该组件是对原生 `<input>` 的轻量封装，主要添加了 `gm-input` CSS 类名
- 所有原生 input 属性均可直接使用
- 支持 `forwardRef`，可通过 ref 获取原生 input DOM 元素
- 组件本身不包含样式，需要配合 `@gmfe/react` 的样式体系使用
- 在 Form 中使用时，FormItem 会自动为 input 添加 `form-control` 类名
