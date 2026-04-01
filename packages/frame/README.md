# @gmfe/frame

## 简介

`@gmfe/frame` 是 gmfe 组件库的页面框架布局包，提供经典的后台管理系统布局结构，包括左侧菜单栏、顶部导航栏、内容区域、面包屑导航和标签页等功能组件。

## 安装

```bash
npm install @gmfe/frame
```

## 使用

```jsx
import React from 'react'
import { Framework, Left, RightTop, Breadcrumb, Info, CopyRight, FullTabV2 } from '@gmfe/frame'
import { Nav } from '@gmfe/react'

function App() {
  return (
    <Framework menu={<Nav data={menuData} />} leftWidth="220px">
      <RightTop
        breadcrumb={<Breadcrumb breadcrumbs={breadcrumbs} pathname={location.pathname} navConfig={navConfig} onSelect={handleNav} />}
        info={<Info more={[{ text: '退出', onClick: handleLogout }]}><span>管理员</span></Info>}
      />
      <FullTabV2 tabs={tabs} onChange={handleTabChange} activeKey={activeKey} />
      <CopyRight />
    </Framework>
  )
}
```

## API

### Framework

主布局框架组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| menu | 左侧菜单元素 | `ReactElement` | - | 否 |
| rightTop | 右上角内容元素 | `ReactElement` | - | 否 |
| leftWidth | 左侧菜单宽度 | `string` | - | 否 |
| isFullScreen | 是否全屏模式（不显示左侧菜单） | `boolean` | `false` | 否 |
| showMobileMenu | 是否显示移动端菜单按钮 | `boolean` | `false` | 否 |

**静态方法：**

| 方法 | 说明 |
|------|------|
| `Framework.scrollTop()` | 滚动到页面顶部 |

### Left

左侧菜单栏容器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| style | 自定义样式 | `object` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

### RightTop

右上角区域组件，包含面包屑、用户信息和移动端菜单按钮。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| breadcrumb | 面包屑导航元素 | `ReactElement` | - | 否 |
| info | 用户信息区域元素 | `ReactElement` | - | 否 |
| onMenuBtnClick | 移动端菜单按钮点击回调 | `function` | `_.noop` | 否 |

### Breadcrumb

面包屑导航组件，根据 navConfig 自动生成导航路径。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| breadcrumbs | 面包屑数据数组 | `array` | - | 是 |
| pathname | 当前路由路径 | `string` | - | 是 |
| navConfig | 三级菜单配置数组 | `array` | - | 是 |
| onSelect | 面包屑项点击回调 | `function` | - | 是 |

### Info

用户信息展示组件，支持弹出菜单。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| more | 更多操作项数组，每项包含 `text` 和 `onClick` | `array<{ text: string, onClick: function }>` | - | 否 |

### CopyRight

版权信息组件，无需传入任何属性。

### FullTab

全屏标签页组件（基于索引）。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 标签页配置数组 | `array` | - | 是 |
| active | 当前激活的标签页索引 | `number` | - | 否 |
| onChange | 标签页切换回调 | `function(index: number)` | - | 否 |
| isStatic | 是否同时显示所有标签页内容 | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### FullTabV2

全屏标签页组件 V2（基于 key）。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 标签页配置数组，每项包含 `name`、`key`、`content` | `array<{ name: string, key: string, content: ReactNode }>` | - | 是 |
| activeKey | 当前激活的标签页 key（受控模式） | `string` | - | 否 |
| defaultActiveKey | 默认激活的标签页 key（非受控模式） | `string` | - | 否 |
| onChange | 标签页切换回调 | `function(key: string)` | - | 否 |
| isLazy | 是否懒加载标签页内容 | `boolean` | `true` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 注意事项

- `Breadcrumb` 在移动端会自动隐藏。
- `FullTabV2` 不支持同时使用 `activeKey` 和 `defaultActiveKey`。
- `FullTabV2` 默认启用懒加载（`isLazy: true`），非当前标签页不会渲染内容。
- `Framework` 内部使用 React Context 传递 `leftWidth` 值，`Left`、`RightTop`、`FullTab` 等子组件会自动读取。
- `Info` 的 `more` 属性使用 `@gmfe/react` 的 `Popover` 组件实现弹出菜单。
