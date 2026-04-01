# Popover

## 简介
弹出层组件 - 提供灵活的弹出气泡功能，支持 focus、click、hover、realFocus 四种触发方式，可控制弹出位置、偏移和箭头方向

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Popover } from '@gmfe/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 触发方式：`focus` 类似 click 但不因二次点击关闭；`click` 点击切换；`hover` 鼠标悬浮；`realFocus` 原生 focus 事件，失焦隐藏 | `'focus' \| 'click' \| 'hover' \| 'realFocus'` | `'focus'` | 否 |
| popup | 弹出层内容，支持传入元素或返回元素的函数 | `element \| func` | - | 是 |
| children | 触发元素（仅支持单个子元素） | `any` | - | 是 |
| disabled | 是否禁用弹出，也可以通过 children 的 `disabled` 属性控制 | `bool` | `false` | 否 |
| className | 弹出层自定义类名 | `string` | - | 否 |
| style | 弹出层自定义样式 | `object` | - | 否 |
| right | 是否右对齐弹出 | `bool` | `false` | 否 |
| top | 是否向上弹出 | `bool` | `false` | 否 |
| center | 是否居中对齐弹出 | `bool` | `false` | 否 |
| offset | 偏移量（像素） | `number` | `0` | 否 |
| showArrow | 是否显示三角标 | `bool` | `false` | 否 |
| arrowLeft | 三角标的左偏移位置 | `string` | - | 否 |
| pureContainer | 是否使用纯粹容器（无背景色、无阴影） | `bool` | `false` | 否 |
| isInPopup | 弹出层是否嵌套在另一个 popup 中 | `bool` | `false` | 否 |
| predictingHeight | 预判高度。因为 popup 的宽高是可变的，无法自动判断视窗内是否能放得下，可手动设置 | `number` | - | 否 |

### 实例方法

| 方法 | 说明 | 参数 |
|------|------|------|
| `apiDoSetActive(active)` | 编程式控制弹出层的显示/隐藏 | `active: bool` |

## 示例

### 四种触发方式

```jsx
// focus 模式（默认）- 类似 click 但不因二次点击关闭
<Popover popup={renderPopup()}>
  <Button>focus me</Button>
</Popover>

// click 模式 - 点击切换显示/隐藏
<Popover type='click' popup={renderPopup()}>
  <Button>click me</Button>
</Popover>

// hover 模式 - 鼠标悬浮显示，移开隐藏
<Popover type='hover' showArrow popup={renderPopup()}>
  <Button>hover me</Button>
</Popover>

// realFocus 模式 - 原生 focus 事件，失焦自动隐藏
<Popover type='realFocus' showArrow popup={renderPopup()}>
  <Button>realFocus me</Button>
</Popover>
```

### 控制弹出位置

```jsx
// 默认 - 左下方弹出
<Popover popup={renderPopup()}>
  <Button>默认位置</Button>
</Popover>

// 右对齐 - 右下方弹出
<Popover right popup={renderPopup()}>
  <Button>右对齐</Button>
</Popover>

// 居中 - 正下方居中弹出
<Popover center popup={renderPopup()}>
  <Button>居中对齐</Button>
</Popover>

// 向上 - 上方弹出
<Popover top popup={renderPopup()}>
  <Button>向上弹出</Button>
</Popover>
```

### 偏移位置

```jsx
<Popover offset={20} popup={renderPopup()}>
  <Button>向下偏移 20px</Button>
</Popover>

<Popover offset={-20} popup={renderPopup()}>
  <Button>向上偏移 20px</Button>
</Popover>
```

### 带箭头

```jsx
<Popover showArrow popup={renderPopup()}>
  <Button>带箭头</Button>
</Popover>

// 自定义箭头位置
<Popover showArrow arrowLeft='0px' popup={renderPopup()}>
  <Button>箭头靠左</Button>
</Popover>
```

### 禁用状态

```jsx
// 通过 disabled 属性
<Popover disabled popup={renderPopup()}>
  <Button>已禁用</Button>
</Popover>

// 通过子元素的 disabled 属性
<Popover popup={renderPopup()}>
  <Button disabled>子元素禁用</Button>
</Popover>
```

### 使用函数作为 popup

```jsx
<Popover popup={() => <div>动态内容</div>}>
  <Button>函数式 popup</Button>
</Popover>
```

## 注意事项

- Popover 只接受单个子元素（`React.Children.only`），需要用一个容器元素包裹触发内容。
- `type` 为 `focus` 时，行为类似 click 但不会因二次点击而关闭弹出层；如需真正的原生 focus 效果（失焦隐藏），请使用 `type='realFocus'`。
- `popup` 属性不会随组件 re-render 自动更新，如需动态内容请使用函数形式传入。
- Popover 会自动监听 Modal 滚动、Drawer 滚动、浏览器滚动和表格滚动事件，滚动时自动重新计算弹出层位置。
- hover 模式下，鼠标移出触发元素后会有 500ms 的延迟才关闭弹出层。
- `disabled` 支持两种方式：通过 Popover 的 `disabled` 属性，或通过子元素的 `disabled` 属性自动检测。
