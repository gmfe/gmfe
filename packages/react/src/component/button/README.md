# Button

## 简介
按钮组件 - 封装了原生按钮的基本功能，支持多种类型、尺寸和自动 loading 状态。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Button } from '@gmfe/react'

// 基础按钮
<Button>默认按钮</Button>
<Button type='primary'>主色按钮</Button>
<Button type='success'>成功按钮</Button>
<Button type='danger'>危险按钮</Button>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'danger' \| 'link'` | `'default'` | 否 |
| plain | 是否为朴素按钮（只有边框，无背景色） | `bool` | - | 否 |
| size | 按钮大小，目前支持 large | `'large'` | - | 否 |
| block | 是否为块级按钮（撑满父容器宽度） | `bool` | - | 否 |
| htmlType | 原生 type 属性 | `string` | `'button'` | 否 |
| loading | 是否显示 loading 状态 | `bool` | - | 否 |
| href | 链接地址，type 为 link 时有效 | `string` | - | 否 |
| onClick | 点击回调，返回 Promise 时自动显示 loading | `func` | `_.noop` | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<Button>默认</Button>
<Button type='primary'>主色</Button>
<Button type='success'>成功</Button>
<Button type='danger'>危险</Button>
<Button type='link'>Link</Button>
```

### 朴素按钮
```jsx
<Button plain>默认</Button>
<Button plain type='primary'>主色</Button>
<Button plain type='success'>成功</Button>
<Button plain type='danger'>危险</Button>
```

### 链接按钮
```jsx
<Button type='link' href='https://example.com' target='_blank'>
  链接
</Button>
```

### Loading 状态
```jsx
// 手动控制 loading
<Button loading>loading</Button>

// onClick 返回 Promise 时自动显示 loading
<Button onClick={async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
}}>点击显示 loading</Button>
```

### 大按钮
```jsx
<Button size='large'>大按钮</Button>
```

### 禁用状态
```jsx
<Button disabled>禁用按钮</Button>
<Button disabled type='primary'>禁用主色</Button>
```

## 注意事项
- `type='link'` 配合 `href` 属性使用时，组件会渲染为 `<a>` 标签
- `htmlType` 控制的是原生 form type 属性（如 `submit`），与 `type` 属性不同
- 当 `onClick` 返回 `Promise` 时，按钮会自动显示 loading 状态，Promise resolve 后自动恢复
- `loading` 和 `disabled` 同时生效时，按钮都会被禁用
- `plain` 属性对 `type='link'` 类型的按钮无效
