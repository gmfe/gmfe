# @gmfe/tour

## 简介

`@gmfe/tour` 是一个用户引导组件，用于在页面上展示分步引导教程。通过 SVG 遮罩高亮目标元素，配合步骤说明引导用户了解新功能或页面布局。

## 安装

```bash
npm install @gmfe/tour
```

## 使用

```jsx
import React, { useState } from 'react'
import Tour from '@gmfe/tour'

function App() {
  const [isOpen, setIsOpen] = useState(true)

  const steps = [
    {
      target: '#step1',
      content: '这是第一步引导，点击这里开始操作'
    },
    {
      target: '#step2',
      content: '这是第二步引导，这里是核心功能区域'
    }
  ]

  return (
    <div>
      <div id="step1">步骤一</div>
      <div id="step2">步骤二</div>

      <Tour
        isOpen={isOpen}
        steps={steps}
        currentStep={0}
        onPrev={() => {}}
        onNext={() => {}}
        onRequestClose={() => setIsOpen(false)}
        disableInteraction={false}
      />
    </div>
  )
}
```

## API

### Tour

引导组件，默认导出。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| isOpen | 是否显示引导 | `boolean` | `false` | 否 |
| steps | 引导步骤数组 | `array` | - | 否 |
| currentStep | 当前步骤索引 | `number` | `0` | 否 |
| onPrev | 上一步回调 | `function` | - | 否 |
| onNext | 下一步回调 | `function` | - | 否 |
| onRequestClose | 关闭引导回调 | `function` | - | 否 |
| disableInteraction | 是否禁用与高亮元素的交互 | `boolean` | `false` | 否 |

## 注意事项

- 引导组件仅在 `isOpen` 为 `true` 时渲染。
- 使用 SVG 遮罩实现高亮效果，点击遮罩区域可关闭引导。
- 组件需要 `react` >= 16.13.0 和 `styled-components` ^5.1.0 作为 peer dependency。
- 步骤内容通过 children 或步骤配置传入。
