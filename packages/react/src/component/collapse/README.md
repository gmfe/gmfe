# Collapse

## 简介
折叠面板组件 - 通过 `in` 属性控制内容的展开和折叠，带有高度和透明度的过渡动画效果。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Collapse from '@gmfe/react/lib/collapse'

<Collapse in={true}>
  <div>折叠的内容</div>
</Collapse>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| in | 控制展开/折叠状态，`true` 为展开，`false` 为折叠 | `bool` | - | 是 |
| children | 折叠面板中的内容 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义内联样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
import React, { useState } from 'react'
import Collapse from '@gmfe/react/lib/collapse'

const App = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '收起' : '展开'}
      </button>
      <Collapse in={isExpanded}>
        <div>这是可以折叠的内容区域</div>
      </Collapse>
    </div>
  )
}
```

### 配合自定义样式
```jsx
import React, { useState } from 'react'
import Collapse from '@gmfe/react/lib/collapse'

const App = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '收起详情' : '查看详情'}
      </button>
      <Collapse in={isExpanded}>
        <div style={{ padding: '12px', background: '#f5f5f5' }}>
          这里是详情内容，点击按钮可以切换展开和折叠状态。
        </div>
      </Collapse>
    </div>
  )
}
```

## 注意事项
- `in` 属性为必填项，必须由父组件手动控制展开/折叠状态
- 展开时过渡动画持续 0.5s，使用 ease 缓动曲线
- 折叠状态下 `overflow` 被设置为 `hidden`，高度为 0，透明度为 0
- 组件根节点会添加 `gm-collapse` 类名，可通过 `className` 进行覆盖或扩展
- `style` 属性会与组件内部的过渡样式进行合并，同名属性以 `style` 为准
