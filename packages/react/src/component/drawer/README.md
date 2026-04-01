# Drawer

## 简介
抽屉组件 - 从页面底部滑出的全宽内容面板，支持自定义样式和遮罩层

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Drawer } from '@gmfe/react'
```

## API

### 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 抽屉内容 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| onHide | 关闭回调 | `func` | `_.noop` | 否 |
| opacityMask | 是否使用半透明遮罩 | `bool` | `false` | 否 |

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Drawer.render(props)` | 命令式渲染抽屉 | `props: Object` | - |
| `Drawer.hide()` | 隐藏抽屉 | - | - |

## 示例

### 基础用法 - 命令式渲染

```jsx
import { Drawer } from '@gmfe/react'

// 显示抽屉
Drawer.render({
  children: (
    <div style={{ padding: 20 }}>
      <h3>抽屉标题</h3>
      <p>抽屉内容区域</p>
      <button onClick={() => Drawer.hide()}>关闭</button>
    </div>
  )
})

// 隐藏抽屉
Drawer.hide()
```

### 自定义样式

```jsx
Drawer.render({
  style: {
    maxHeight: '50vh'
  },
  className: 'custom-drawer',
  children: <div>自定义样式的抽屉</div>,
  onHide: () => Drawer.hide()
})
```

### 半透明遮罩

```jsx
Drawer.render({
  opacityMask: true,
  children: <div>带半透明遮罩的抽屉</div>
})
```

## 注意事项

- Drawer 推荐使用静态方法 `Drawer.render()` 和 `Drawer.hide()` 进行命令式调用，而非作为 React 组件直接使用。
- 按下 `Esc` 键可以关闭抽屉（通过 `onHide` 回调）。
- 点击遮罩层区域也会触发关闭操作。
- `opacityMask` 设置为 `true` 时，遮罩变为半透明样式，同时抽屉内容区域会显示边框和底部阴影。
- Drawer 内容区域滚动时会触发 `DRAWER_SCROLL` 事件，可用于联动其他组件。
