# ColorPicker

## 简介
颜色选择器组件 - 提供预设颜色和自定义颜色选择的弹出式颜色选择器

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { ColorPicker } from '@gmfe/react'

<ColorPicker color={color} onChange={value => setColor(value)}>
  <button>选择颜色</button>
</ColorPicker>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| color | 当前选中的颜色值（十六进制格式） | `string` | - | 否 |
| onChange | 颜色变化回调，参数为十六进制颜色值 | `function` | `_.noop` | 否 |
| children | 触发器元素 | `any` | - | 是 |

### 预设颜色
组件内置以下预设颜色：
- 红色 `#e02020`
- 橙色 `#fa6400`
- 黄色 `#f7b500`
- 绿色 `#6dd400`
- 蓝色 `#0091ff`
- 紫色 `#b620e0`
- 灰色 `#6d7278`

## 示例

### 基础用法
```jsx
<ColorPicker color="#ff0000" onChange={value => setColor(value)}>
  <button>颜色选择器: {color}</button>
</ColorPicker>
```

## 注意事项
- 组件内部使用 `Popover` 以点击方式触发弹出
- 支持手动输入十六进制颜色值
- 支持通过系统取色器选择自定义颜色
- 点击"确定"后触发 `onChange`，点击"取消"关闭弹窗
