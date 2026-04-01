# Popup

## 简介
弹出定位组件 - 基于目标元素位置的弹出层容器，自动计算弹出位置并支持视窗边界检测，通常配合 Popover 组件使用

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Popup, PopupContentConfirm } from '@gmfe/react'
```

## API

### Popup 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 弹出层内容 | `any` | - | 否 |
| rect | 目标元素的位置信息（包含 `top`、`left`、`width`、`height`） | `object` | - | 是 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| top | 是否向上弹出 | `bool` | `false` | 否 |
| right | 是否右对齐弹出 | `bool` | `false` | 否 |
| center | 是否居中对齐弹出 | `bool` | `false` | 否 |
| offset | 偏移量（像素） | `number` | `0` | 否 |
| showArrow | 是否显示三角标 | `bool` | `false` | 否 |
| arrowLeft | 三角标的左偏移位置 | `string` | - | 否 |
| predictingHeight | 预判高度，因弹出层宽高可变无法自动判断视窗内是否能放得下时可手动设置 | `number` | - | 否 |
| pureContainer | 是否使用纯粹容器（无背景色、无阴影） | `bool` | `false` | 否 |

### PopupContentConfirm 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 确认类型，决定底部按钮的展示方式 | `'save' \| 'delete'` | `'save'` | 否 |
| title | 标题 | `string` | - | 否 |
| onCancel | 取消回调 | `func` | - | 是 |
| onDelete | 删除回调（`type='delete'` 时使用） | `func` | - | 否 |
| onSave | 保存回调（`type='save'` 时使用） | `func` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| hideClose | 是否隐藏关闭按钮 | `bool` | `false` | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 内容 | `any` | - | 否 |

## 示例

### Popup 基础用法

Popup 通常由 Popover 组件内部调用，以下展示直接使用的场景：

```jsx
<Popup
  rect={{ top: 100, left: 200, width: 100, height: 40 }}
  showArrow
>
  <div>弹出层内容</div>
</Popup>
```

### Popup 向上弹出

```jsx
<Popup
  rect={{ top: 300, left: 200, width: 100, height: 40 }}
  top
  showArrow
>
  <div>向上弹出的内容</div>
</Popup>
```

### PopupContentConfirm - 保存类型

```jsx
<PopupContentConfirm
  title="编辑信息"
  onCancel={() => console.log('取消')}
  onSave={() => console.log('保存')}
>
  <div>
    <input placeholder="请输入内容" />
  </div>
</PopupContentConfirm>
```

### PopupContentConfirm - 删除类型

```jsx
<PopupContentConfirm
  type="delete"
  title="确认删除"
  onCancel={() => console.log('取消')}
  onDelete={() => console.log('删除')}
>
  <div>确定要删除这条数据吗？</div>
</PopupContentConfirm>
```

### PopupContentConfirm - 隐藏关闭按钮

```jsx
<PopupContentConfirm
  title="不可关闭"
  hideClose
  onCancel={() => console.log('取消')}
  onSave={() => console.log('保存')}
>
  <div>内容区域</div>
</PopupContentConfirm>
```

## 注意事项

- Popup 通常不直接使用，而是由 Popover 组件内部管理。如需弹出层功能，建议直接使用 Popover 组件。
- Popup 具有自动边界检测能力：当向上弹出空间不足时会自动切换到向下弹出，反之亦然。
- `rect` 属性是必填项，需要包含目标元素的 `top`、`left`、`width`、`height` 信息。
- `pureContainer` 为 `true` 时，弹出层将去除背景色和阴影，适用于需要自定义外观的场景。
- PopupContentConfirm 是一个预设布局的弹出内容组件，提供了标题、内容区和底部操作按钮的标准结构。
- PopupContentConfirm 的 `type` 属性控制底部按钮：`save` 显示"取消"和"保存"按钮，`delete` 显示"取消"和红色"删除"按钮。
