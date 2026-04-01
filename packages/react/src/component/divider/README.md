# Divider

## 简介
分割线组件 - 用于在内容区域之间插入带文字或不带文字的水平分割线。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Divider from '@gmfe/react/lib/divider'

<Divider>分割文字</Divider>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 分割线中的内容，传入字符串时使用默认字号，传入 React 元素时自定义渲染 | `any` | - | 否 |

## 示例

### 基础用法
```jsx
// 带文字的分割线
<Divider>文字内容</Divider>

// 不带文字的分割线
<Divider />

// 自定义内容
<Divider>
  <span style={{ color: 'red' }}>自定义内容</span>
</Divider>
```

## 注意事项
- children 传入字符串时，会使用 `gm-text-16` 样式类渲染
- children 传入非字符串（React 元素等）时，会直接渲染原始内容
