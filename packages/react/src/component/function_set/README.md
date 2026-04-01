# FunctionSet

## 简介
功能集组件 - 以弹出菜单形式展示多个功能操作，支持多级嵌套子菜单

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { FunctionSet } from '@gmfe/react'

<FunctionSet
  data={[
    { text: '功能1', onClick: () => console.log('功能1') },
    { text: '功能2', onClick: () => console.log('功能2') }
  ]}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 功能项数据，格式：`[{text, disabled, show, onClick, children}]`，支持 `children` 嵌套子菜单 | `array` | - | 是 |
| right | 弹出层是否右对齐 | `bool` | `false` | 否 |
| disabled | 是否禁用整个功能集 | `bool` | `false` | 否 |
| showArrow | 是否显示三角箭头 | `bool` | `false` | 否 |
| children | 自定义触发器元素 | `any` | - | 否 |

### data 项配置
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 功能项文本 | `string` | - | 是 |
| onClick | 点击回调 | `function` | - | 否 |
| disabled | 是否禁用该项 | `bool` | `false` | 否 |
| show | 是否显示该项 | `bool` | `true` | 否 |
| children | 子菜单数据，格式与 `data` 相同 | `array` | - | 否 |

## 示例

### 基础用法
```jsx
<FunctionSet
  data={[
    { text: '功能1', onClick: () => alert('功能1') },
    { text: '功能2', onClick: () => alert('功能2') },
    { text: '功能3(不可用)', disabled: true },
    { text: '功能4(不显示)', show: false }
  ]}
/>
```

### 多级子菜单
```jsx
<FunctionSet
  data={[
    {
      text: '新建',
      children: [
        {
          text: '商品新建',
          children: [
            { text: '商品新建1', onClick: () => alert('商品新建1') },
            { text: '商品新建2', onClick: () => alert('商品新建2') }
          ]
        }
      ]
    }
  ]}
/>
```

### 自定义触发器
```jsx
<FunctionSet data={data}>
  <span className="gm-cursor">更多</span>
</FunctionSet>
```

### 三角箭头样式
```jsx
<FunctionSet showArrow data={data}>
  <span className="gm-cursor">...</span>
</FunctionSet>
```

## 注意事项
- 当 `data` 为空数组时，组件不会渲染任何内容
- 功能项必须配置 `onClick` 才能响应点击
- 子菜单使用 `LevelList` 组件渲染，支持多级嵌套
- 弹出层默认使用 `hover` 触发模式
