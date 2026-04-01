# Tip

## 简介
提示信息组件 - 用于显示全局轻量级提示消息，支持 success、info、warning、danger 四种类型，提供组件和静态方法两种使用方式

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Tip } from '@gmfe/react'
```

## API

### 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 标题 | `string` | `''` | 否 |
| type | 提示类型，对应不同图标和颜色 | `'success' \| 'info' \| 'warning' \| 'danger'` | `'info'` | 否 |
| onClose | 关闭回调 | `func` | `_.noop` | 否 |
| children | 提示内容 | `any` | - | 否 |

### TipOverlay Props（静态方法内部使用）

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 标题 | `string` | - | 否 |
| type | 提示类型 | `string` | - | 否 |
| onClose | 关闭回调 | `func` | - | 否 |
| time | 自动关闭时间（毫秒），设为 0 则不自动关闭 | `number` | `3000` | 否 |
| children | 提示内容 | `any` | - | 否 |

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Tip.tip(options)` | 显示提示信息 | `options: Object` | `id: string` |
| `Tip.success(options)` | 显示成功提示，参数可为字符串或对象 | `string \| Object` | `id: string` |
| `Tip.info(options)` | 显示信息提示，参数可为字符串或对象 | `string \| Object` | `id: string` |
| `Tip.warning(options)` | 显示警告提示，参数可为字符串或对象 | `string \| Object` | `id: string` |
| `Tip.danger(options)` | 显示危险提示，参数可为字符串或对象 | `string \| Object` | `id: string` |
| `Tip.clear(id)` | 关闭指定 id 的提示 | `id: string` | - |
| `Tip.clearAll()` | 关闭所有提示 | - | - |

#### 静态方法 Options

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 提示内容 | `any` | - | 否 |
| type | 提示类型（由快捷方法自动设置） | `string` | - | 否 |
| title | 标题 | `string` | - | 否 |
| time | 自动关闭时间（毫秒），设为 0 则需手动关闭 | `number` | `3000` | 否 |
| onClose | 关闭回调 | `func` | - | 否 |

## 示例

### 基础用法 - 组件形式

```jsx
<Tip type='success'>操作成功</Tip>
<Tip type='info'>这是一条提示信息</Tip>
<Tip type='warning'>这是警告信息</Tip>
<Tip type='danger'>操作失败</Tip>
<Tip type='success' title='成功'>操作已完成</Tip>
```

### 静态方法 - 简写字符串

```jsx
// 默认 3 秒后自动关闭
Tip.info('这是一条提示信息')
Tip.success('操作成功')
Tip.warning('请注意')
Tip.danger('操作失败')
```

### 静态方法 - 完整配置

```jsx
// 显示成功提示，不自动关闭
const tipId = Tip.success({
  children: '需要用户自行关闭的提示',
  time: 0,
  onClose: () => console.log('提示已关闭')
})

// 手动关闭指定提示
Tip.clear(tipId)
```

### 关闭所有提示

```jsx
Tip.clearAll()
```

## 注意事项

- 静态方法支持字符串简写和对象两种参数形式。传入字符串时，会自动将其作为 `children` 使用。
- 静态方法返回一个唯一 `id`，可通过 `Tip.clear(id)` 关闭指定的提示消息。
- 设置 `time: 0` 可以禁用自动关闭，此时需要用户手动点击关闭按钮或调用 `Tip.clear(id)` 来关闭。
- 多条提示会依次排列显示在页面右上角。
- 组件形式的 Tip 适合嵌入到页面固定位置，静态方法适合在操作后临时弹出全局提示。
