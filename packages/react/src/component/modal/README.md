# Modal

## 简介
模态框组件 - 用于在页面中显示模态对话框，支持多种尺寸和展示样式，包含标准模态框、右侧抽屉式模态框和简洁模态框三种变体

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Modal, RightSideModal, CleanModal } from '@gmfe/react'
```

## API

### Modal 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示 | `bool` | - | 是 |
| type | 模态框类型，设置后使用简化样式，不设置则为标准模态框 | `string` | - | 否 |
| title | 标题 | `string` | - | 否 |
| size | 尺寸 | `'lg' \| 'md' \| 'sm'` | `'md'` | 否 |
| children | 内容 | `any` | - | 否 |
| onHide | 关闭回调 | `func` | `_.noop` | 否 |
| onOk | 确认回调（type 模式下使用） | `func` | - | 否 |
| onCancel | 取消回调（type 模式下使用） | `func` | - | 否 |
| disableMaskClose | 是否禁止点击遮罩关闭 | `bool` | `false` | 否 |
| opacityMask | 是否使用半透明遮罩 | `bool` | `false` | 否 |
| noContentPadding | 是否取消内容区内边距 | `bool` | `false` | 否 |
| noCloseBtn | 是否隐藏关闭按钮 | `bool` | `false` | 否 |
| okBtnClassName | 确认按钮的自定义 className（type 模式下使用） | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### Modal 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Modal.render(props)` | 通过命令式渲染模态框 | `props: Object` | - |
| `Modal.hide()` | 隐藏命令式渲染的模态框 | - | - |

> 注意：`Modal.confirm`、`Modal.info`、`Modal.success`、`Modal.warning` 已废弃，请使用 `Dialog` 组件替代。

### RightSideModal 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `RightSideModal.render(props)` | 从右侧滑入显示模态框 | `props: Object` | - |
| `RightSideModal.hide()` | 隐藏右侧模态框 | - | - |

#### RightSideModal Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示 | `bool` | - | 是 |
| onHide | 关闭回调 | `func` | `_.noop` | 否 |
| disableMaskClose | 是否禁止点击遮罩关闭 | `bool` | `false` | 否 |
| size | 尺寸 | `'lg' \| 'md' \| 'sm'` | `'md'` | 否 |
| title | 标题 | `string` | - | 否 |
| okBtnClassName | 确认按钮的自定义 className | `string` | - | 否 |
| noContentPadding | 是否取消内容区内边距 | `bool` | `false` | 否 |

### CleanModal 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `CleanModal.render(props)` | 显示简洁样式的模态框（无阴影边框） | `props: Object` | - |
| `CleanModal.hide()` | 隐藏简洁模态框 | - | - |

#### CleanModal Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示 | `bool` | - | 是 |
| onHide | 关闭回调 | `func` | `_.noop` | 否 |
| disableMaskClose | 是否禁止点击遮罩关闭 | `bool` | `false` | 否 |
| size | 尺寸 | `'lg' \| 'md' \| 'sm'` | `'md'` | 否 |
| title | 标题 | `string` | - | 否 |
| okBtnClassName | 确认按钮的自定义 className | `string` | - | 否 |
| noContentPadding | 是否取消内容区内边距 | `bool` | `false` | 否 |

## 示例

### 标准模态框 - 命令式渲染

```jsx
// 显示
Modal.render({
  show: true,
  title: '标题',
  children: <div>模态框内容</div>,
  onHide: () => {
    Modal.hide()
  }
})

// 隐藏
Modal.hide()
```

### 右侧抽屉式模态框

```jsx
// 显示
RightSideModal.render({
  show: true,
  title: '详情',
  children: <div>右侧抽屉内容</div>,
  onHide: () => {
    RightSideModal.hide()
  }
})

// 隐藏
RightSideModal.hide()
```

### 简洁模态框

```jsx
// 显示
CleanModal.render({
  show: true,
  title: '编辑信息',
  children: <div>简洁模态框内容</div>,
  onHide: () => {
    CleanModal.hide()
  }
})

// 隐藏
CleanModal.hide()
```

### 禁止遮罩关闭

```jsx
Modal.render({
  show: true,
  disableMaskClose: true,
  title: '不可关闭',
  children: <div>点击遮罩不会关闭</div>,
  onHide: () => Modal.hide()
})
```

## 注意事项

- Modal 是 Dialog 组件的底层依赖，一般情况下建议优先使用 `Dialog` 组件的静态方法。
- Modal 的静态方法 `confirm`、`info`、`success`、`warning` 已被标记为废弃（Deprecated），调用时会在控制台输出警告。
- 按下 `Esc` 键可以关闭模态框（通过 `onHide` 回调）。
- `RightSideModal` 使用 `fade-in-left` 动画从右侧滑入。
- `CleanModal` 提供无阴影、无边框的简洁展示风格。
- `opacityMask` 设置为 `true` 时，遮罩将变为半透明样式，同时模态框会显示边框和底部阴影。
