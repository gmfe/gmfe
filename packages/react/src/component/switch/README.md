# Switch

## 简介
开关组件 - 用于表示两种状态之间的切换，支持多种颜色类型和自定义开/关文案。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Switch } from '@gmfe/react'

<Switch
  checked={checked}
  onChange={setChecked}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 是否开启 | `bool` | - | 是 |
| onChange | 状态变化回调，参数为当前 checked 值 | `func` | `_.noop` | 否 |
| type | 颜色类型 | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| on | 开启时显示的文案 | `any` | `''` | 否 |
| off | 关闭时显示的文案 | `any` | `''` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<Switch
  checked={isWork}
  onChange={checked => setIsWork(checked)}
/>
```

### 带文案
```jsx
<Switch
  checked={checked}
  onChange={setChecked}
  on='开'
  off='关'
/>
```

### 不同颜色类型
```jsx
<Switch type='default' checked onChange={_.noop} />
<Switch type='primary' checked onChange={_.noop} />
<Switch type='success' checked onChange={_.noop} />
<Switch type='info' checked onChange={_.noop} />
<Switch type='warning' checked onChange={_.noop} />
<Switch type='danger' checked onChange={_.noop} />
```

### 禁用状态
```jsx
<Switch disabled checked onChange={_.noop} />
<Switch disabled onChange={_.noop} />
```

### 在表单中使用
```jsx
<FormItem label='是否工作' required>
  <Switch
    checked={isWork}
    onChange={checked => setIsWork(checked)}
  />
</FormItem>
```

## 注意事项
- `checked` 为必填属性，建议使用受控模式
- 组件宽度会根据 `on` 和 `off` 文案自动调整，取两者中较宽者
- 建议保持 `on` 和 `off` 文案宽度一致，以获得更好的视觉效果
- 开关的最小宽度为 34px
- 非受控模式下（未传入 `checked`），组件内部自行管理状态
- 组件挂载时会自动计算开关宽度，确保文案完整显示
