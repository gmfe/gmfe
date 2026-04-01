# LayoutRoot

## 简介
层级根容器组件 - 管理应用中的弹出层（Popup）、抽屉（Drawer）、模态框（Modal）、提示（Tip）、全屏加载（FullLoading）和顶部进度条（NProgress）等层级组件的统一挂载容器。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import LayoutRoot from '@gmfe/react/lib/layout_root'

// 在应用根节点渲染
class App extends React.Component {
  render() {
    return (
      <div>
        {/* 页面内容 */}
        <LayoutRoot />
      </div>
    )
  }
}

// 在其他组件中弹出层
LayoutRoot.setComponent(LayoutRoot.TYPE.DRAWER, <Drawer>内容</Drawer>)
LayoutRoot.removeComponent(LayoutRoot.TYPE.DRAWER)
```

## API

### 静态方法

#### `LayoutRoot.setComponent(type, component)`
设置单例层级组件。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| type | 组件类型 | `TYPE` 枚举值 | 是 |
| component | React 元素 | `ReactElement` | 是 |

#### `LayoutRoot.removeComponent(type)`
移除单例层级组件。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| type | 组件类型 | `TYPE` 枚举值 | 是 |

#### `LayoutRoot._setComponentPopup(id, component)`
添加 Popup 弹出层组件（支持多个同时存在）。

#### `LayoutRoot._removeComponentPopup(id)`
移除指定 id 的 Popup 弹出层组件。

#### `LayoutRoot._setComponentTip(id, component)`
添加 Tip 提示组件（支持多个同时存在）。

#### `LayoutRoot._removeComponentTip(id)`
移除指定 id 的 Tip 提示组件。

#### `LayoutRoot._removeComponentTipAll()`
移除所有 Tip 提示组件。

### TYPE 枚举

| 值 | 说明 |
|------|------|
| `DRAWER` | 抽屉 |
| `_POPUP` | 弹出层（内部使用） |
| `MODAL` | 模态框 |
| `_TIP` | 提示信息（内部使用） |
| `FULLLOADING` | 全屏加载 |
| `NPROGRESS` | 顶部进度条 |

## 示例

### 基础用法 —— 在应用入口挂载

```jsx
import React from 'react'
import { render } from 'react-dom'
import LayoutRoot from '@gmfe/react/lib/layout_root'
import App from './App'

render(
  <div>
    <App />
    <LayoutRoot />
  </div>,
  document.getElementById('root')
)
```

### 显示全屏加载

```jsx
import { LayoutRoot, LoadingFullScreen } from '@gmfe/react'

// 显示全屏加载
LayoutRoot.setComponent(LayoutRoot.TYPE.FULLLOADING, <LoadingFullScreen />)

// 关闭全屏加载
LayoutRoot.removeComponent(LayoutRoot.TYPE.FULLLOADING)
```

### 配合异步操作使用

```jsx
import React from 'react'
import { LayoutRoot, LoadingFullScreen } from '@gmfe/react'

function SaveButton() {
  const handleSave = async () => {
    LayoutRoot.setComponent(LayoutRoot.TYPE.FULLLOADING, <LoadingFullScreen />)
    try {
      await api.saveData(formData)
      Tip.show('保存成功')
    } catch (e) {
      Tip.show('保存失败')
    } finally {
      LayoutRoot.removeComponent(LayoutRoot.TYPE.FULLLOADING)
    }
  }

  return <button onClick={handleSave}>保存</button>
}
```

### 使用自定义弹窗内容

```jsx
// 使用 LayoutRoot 弹出自定义模态框
LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, (
  <Modal
    title="确认操作"
    onOK={() => {
      // 处理逻辑
      LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
    }}
    onHide={() => {
      LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
    }}
  >
    <div>确定要执行此操作吗？</div>
  </Modal>
))

// 关闭模态框
LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
```

### 使用 Popup 多实例

```jsx
// 添加多个 Popup（支持同时存在）
LayoutRoot._setComponentPopup('popup-1', <Popover target={ref1}>内容1</Popover>)
LayoutRoot._setComponentPopup('popup-2', <Popover target={ref2}>内容2</Popover>)

// 移除指定 Popup
LayoutRoot._removeComponentPopup('popup-1')
```

### 使用 Tip 多实例

```jsx
// 添加多个 Tip
LayoutRoot._setComponentTip('tip-1', <Tip>操作成功</Tip>)
LayoutRoot._setComponentTip('tip-2', <Tip>数据已更新</Tip>)

// 移除指定 Tip
LayoutRoot._removeComponentTip('tip-1')

// 移除所有 Tip
LayoutRoot._removeComponentTipAll()
```

## 注意事项
- LayoutRoot 必须在应用初始化时挂载，否则调用静态方法时会输出警告：`LayerRoot is uninitialized`
- 组件有层级关系，从上到下依次为：Popup > Drawer > Modal > Tip > FullLoading > NProgress
- Popup 和 Tip 支持多个同时存在，Drawer、Modal、FullLoading、NProgress 为单例模式
- 下划线开头的类型（`_POPUP`、`_TIP`）为内部使用，一般不应直接调用
