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
      selector: '#step1',
      content: '这是第一步引导，点击这里开始操作'
    },
    {
      selector: '#step2',
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
        startAt={0}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  )
}
```

## API

### Tour

引导组件，默认导出。支持通过 `ref` 调用实例方法。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| isOpen | 是否显示引导 | `boolean` | - | 是 |
| children | 自定义内容，渲染在引导气泡内 | `ReactNode` | - | 否 |
| className | 引导气泡的自定义类名 | `string` | - | 否 |
| steps | 引导步骤配置数组，详见下方 Step 配置 | `array<Step>` | - | 否 |
| startAt | 开始时展示的步骤索引 | `number` | `0` | 否 |
| scrollDuration | 自动滚动到目标元素的动画时长（秒） | `number` | `1` | 否 |
| maskSpace | 高亮区域与引导内容的间隙（像素） | `number` | `10` | 否 |
| maskClassName | SVG 遮罩层的自定义类名 | `string` | - | 否 |
| closeWithMask | 是否允许点击遮罩关闭引导 | `boolean` | `false` | 否 |
| disableButtons | 是否隐藏内置的上一步/下一步按钮 | `boolean` | `false` | 否 |
| disableInteraction | 是否禁止与高亮元素的交互 | `boolean` | `true` | 否 |
| disableInteractionClassName | 禁用交互时覆盖层的自定义类名 | `string` | - | 否 |
| rounded | 高亮区域的圆角大小（像素） | `number` | `3` | 否 |
| onAfterOpen | 引导打开后的回调，参数为 helper DOM 节点 | `function(helper)` | - | 否 |
| onBeforeClose | 引导关闭前的回调，参数为 helper DOM 节点 | `function(helper)` | - | 否 |
| onRequestClose | 关闭引导的回调 | `function` | - | 否 |

#### Step 配置

`steps` 数组中每项的字段说明：

| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| selector | 目标元素的 CSS 选择器 | `string` | 是 |
| content | 引导内容，支持文本或 React 元素 | `ReactNode` | 是 |
| position | 引导气泡的位置 | `'top' \| 'right' \| 'bottom' \| 'left' \| 'center' \| number[]` | 否 |
| observe | 监听 DOM 变化的观察节点选择器 | `string` | 否 |
| actionBefore | 步骤展示前的钩子，支持异步函数 | `function` | 否 |
| actionAfter | 步骤展示后（离开前）的钩子，参数为目标 DOM 节点，支持异步 | `function(node)` | 否 |
| style | 引导气泡的自定义样式 | `object` | 否 |
| stepInteraction | 当前步骤是否允许用户与高亮元素交互 | `boolean` | 否 |

#### 实例方法（通过 ref 调用）

| 方法 | 说明 | 参数 |
|------|------|------|
| `apiToNextStep()` | 切换到下一步 | - |
| `apiClose()` | 关闭引导 | - |
| `apiRecalculate()` | 重新计算引导位置（窗口变化后手动触发） | - |

## 示例

### 基础分步引导

```jsx
import Tour from '@gmfe/tour'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <div id="step-create" data-id="btn-create">
        <button>新建订单</button>
      </div>
      <div data-id="table-area">
        <table>...</table>
      </div>

      <Tour
        isOpen={isOpen}
        steps={[
          {
            selector: '[data-id="btn-create"]',
            content: '点击这里创建新订单'
          },
          {
            selector: '[data-id="table-area"]',
            content: '这里是订单列表，可以查看和管理所有订单'
          }
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  )
}
```

### 带位置控制的多步引导

```jsx
import Tour from '@gmfe/tour'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button className="btn-start">开始</button>
      <input className="input-search" placeholder="搜索..." />
      <button className="btn-submit">提交</button>

      <Tour
        isOpen={isOpen}
        startAt={0}
        maskSpace={10}
        rounded={3}
        steps={[
          {
            selector: '.btn-start',
            content: '点击开始按钮启动流程',
            position: 'bottom'
          },
          {
            selector: '.input-search',
            content: '输入关键词进行搜索',
            position: 'bottom',
            stepInteraction: true
          },
          {
            selector: '.btn-submit',
            content: '确认无误后点击提交',
            position: 'top'
          }
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  )
}
```

### 自定义操作按钮

```jsx
import Tour from '@gmfe/tour'
import { useState, useRef } from 'react'
import { Flex, Button } from '@gmfe/react'

function App() {
  const [isOpen, setIsOpen] = useState(true)
  const tourRef = useRef(null)

  const handleNext = () => {
    tourRef.current.apiToNextStep()
  }

  const handleClose = () => {
    tourRef.current.apiClose()
  }

  return (
    <div>
      <div className="target-1">目标元素 1</div>
      <div className="target-2">目标元素 2</div>

      <Tour
        ref={tourRef}
        disableButtons
        isOpen={isOpen}
        steps={[
          {
            selector: '.target-1',
            content: (
              <div>
                <div>第一步：点击"下一步"继续</div>
                <Flex justifyEnd className="gm-padding-top-10">
                  <Button type="primary" onClick={handleNext}>下一步</Button>
                </Flex>
              </div>
            )
          },
          {
            selector: '.target-2',
            content: (
              <div>
                <div>第二步：点击"知道了"完成引导</div>
                <Flex justifyEnd className="gm-padding-top-10">
                  <Button type="primary" onClick={handleClose}>知道了</Button>
                </Flex>
              </div>
            )
          }
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  )
}
```

### 配合按钮触发引导

```jsx
import Tour from '@gmfe/tour'
import { useState } from 'react'
import { Button } from '@gmfe/react'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>查看操作指引</Button>

      <div className="guide-step-1">功能区域一</div>
      <div className="guide-step-2">功能区域二</div>

      <Tour
        isOpen={isOpen}
        closeWithMask={false}
        disableInteraction={true}
        steps={[
          {
            selector: '.guide-step-1',
            content: '这是功能区域一，展示核心数据'
          },
          {
            selector: '.guide-step-2',
            content: '这是功能区域二，支持筛选和导出',
            stepInteraction: true
          }
        ]}
        onAfterOpen={() => console.log('引导已打开')}
        onBeforeClose={() => console.log('引导即将关闭')}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  )
}
```

## 注意事项

- 引导组件仅在 `isOpen` 为 `true` 时渲染，组件内部使用 Portal 渲染到 body 下。
- 使用 SVG 遮罩实现高亮效果，默认不可通过点击遮罩关闭（需设置 `closeWithMask: true`）。
- `disableInteraction` 默认为 `true`，即禁止用户与高亮元素交互；可通过单个步骤的 `stepInteraction: true` 覆盖。
- 组件需要 `react` >= 16.13.0 和 `styled-components` ^5.1.0 作为 peer dependency。
- 目标元素不在视口中时会自动滚动到该元素，滚动时长由 `scrollDuration` 控制。
- 组件内部使用 MutationObserver 监听 DOM 变化，自动更新引导位置。
- `actionAfter` 钩子在离开当前步骤前执行，参数为目标 DOM 节点，支持异步函数（如 `await node.click()`）。
