# @gmfe/sortable

## 简介

基于 [SortableJS](https://github.com/SortableJS/Sortable) 封装的 React 拖拽排序组件库，提供三种粒度的拖拽排序组件：

- **SortableBase**：底层基础组件，对 SortableJS 的 React 封装，提供最大灵活性。
- **Sortable**：数据驱动的排序组件，传入数据数组即可实现拖拽排序。
- **GroupSortable**：分组排序组件，支持多个排序列表之间的跨列表拖拽。

## 安装

```bash
npm install @gmfe/sortable
```

**peerDependencies：**

| 包名 | 版本 |
| --- | --- |
| react | ^16.12.0 |
| react-dom | ^16.12.0 |

## 使用

### 快速开始

```jsx
import React, { useState } from 'react'
import { Sortable } from '@gmfe/sortable'

function App() {
  const [data, setData] = useState([
    { value: 0, text: '大白菜' },
    { value: 1, text: '牛肉' },
    { value: 2, text: '鸡肉' },
    { value: 3, text: '鸭肉' },
    { value: 4, text: '大闸蟹' }
  ])

  return <Sortable data={data} onChange={setData} />
}
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
| --- | --- | --- |
| Sortable | 组件 | 数据驱动的单列表拖拽排序组件 |
| GroupSortable | 组件 | 多列表分组拖拽排序组件，使用 render props 模式 |
| SortableBase | 组件 | SortableJS 的 React 底层封装 |

### Sortable

数据驱动的拖拽排序组件，内部基于 SortableBase 实现，通过 `data` 和 `onChange` 实现受控模式。

| 属性 | 说明 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 数据数组，每项需包含 `value` 和 `text` 字段，格式为 `[{value, text, ...}, ...]` | `array` | 是 | - |
| onChange | 排序变化时的回调函数，参数为排序后的新数据数组 | `(newData: array) => void` | 否 | - |
| groupValues | 当 `options.group` 有值时需要传入，`data` 为全量数据，`groupValues` 为当前组件展示的数据 value 集合 | `array` | 否 | - |
| renderItem | 自定义每项的渲染函数 | `(item: object, index: number) => ReactNode` | 否 | `(item) => item.text` |
| itemProps | 传递给每个拖拽包裹元素的额外属性（如 className、style 等） | `object` | 否 | `{}` |
| tag | 容器标签，支持 ref 的组件或 HTML 标签字符串 | `React.Component \| string` | 否 | - |
| options | SortableJS 的配置项，内部默认设置 `animation: 150`，可覆盖 | `object` | 否 | `{}` |
| disabled | 是否禁用拖拽 | `boolean` | 否 | - |
| style | 容器的内联样式 | `object` | 否 | - |

### SortableBase

SortableJS 的低级 React 封装，直接包装 SortableJS 的能力。适用于需要更精细控制的场景，一般推荐使用 `Sortable` 组件。

| 属性 | 说明 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| options | SortableJS 的完整配置项，支持 `onChoose`、`onStart`、`onEnd`、`onAdd`、`onUpdate`、`onSort`、`onRemove`、`onFilter`、`onMove`、`onClone` 等事件回调 | `object` | 否 | `{}` |
| onChange | 拖拽排序变化时的回调，接收排序后的 id 数组、sortable 实例和事件对象。若不传则组件为非受控模式 | `(items: string[], sortable: Sortable, evt: Event) => void` | 否 | - |
| disabled | 是否禁用拖拽 | `boolean` | 否 | - |
| tag | 容器标签 | `React.Component \| string` | 否 | `'div'` |
| style | 容器的内联样式 | `object` | 否 | `{}` |
| children | 子元素 | `ReactNode` | 是 | - |

> 详细的 SortableJS 配置选项请参考 [SortableJS 官方文档](https://github.com/SortableJS/Sortable#options)。

### GroupSortable

多列表分组拖拽排序组件，支持在多个列表之间拖拽移动元素。内部会将每个子数组对应的 `value` 集合作为 `groupValues` 传递给 `Sortable`，并自动设置 `group: 'group'`。使用 render props 模式，通过 `children` 函数接收渲染好的各分组排序项。

| 属性 | 说明 | 类型 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 二维数据数组，每个子数组表示一个分组，格式为 `[[{value, text, ...}, ...], ...]` | `arrayOf(array)` | 是 | - |
| onChange | 排序变化时的回调函数，参数为排序后的新二维数组 | `(newData: array[]) => void` | 是 | - |
| renderItem | 自定义每项的渲染函数 | `(item: object, index: number) => ReactNode` | 否 | `(item) => item.text` |
| itemProps | 传递给每个拖拽包裹元素的额外属性 | `object` | 否 | `{}` |
| tag | 每个分组的容器标签 | `React.Component \| string` | 否 | - |
| options | SortableJS 的配置项，会自动设置 `group: 'group'` | `object` | 否 | `{}` |
| children | 渲染函数，接收渲染好的各分组排序项数组 | `(items: ReactNode[]) => ReactNode` | 是 | - |

## 示例

### 示例一：基本排序

```jsx
import React, { useState } from 'react'
import { Sortable } from '@gmfe/sortable'

const App = () => {
  const [data, setData] = useState([
    { value: 0, text: '大白菜' },
    { value: 1, text: '牛肉' },
    { value: 2, text: '鸡肉' },
    { value: 3, text: '鸭肉' },
    { value: 4, text: '大闸蟹' }
  ])

  return <Sortable data={data} onChange={setData} />
}
```

### 示例二：自定义渲染项

```jsx
import React, { useState } from 'react'
import { Sortable } from '@gmfe/sortable'

const App = () => {
  const [data, setData] = useState([
    { value: 0, text: '大白菜' },
    { value: 1, text: '牛肉' },
    { value: 2, text: '鸡肉' }
  ])

  return (
    <Sortable
      data={data}
      onChange={setData}
      renderItem={item => (
        <div className='gm-border gm-padding-10'>{item.text}</div>
      )}
    />
  )
}
```

### 示例三：指定拖拽手柄

通过 `options.handle` 指定拖拽手柄的选择器，只有点击手柄区域才能触发拖拽。

```jsx
import React, { useState } from 'react'
import { Sortable } from '@gmfe/sortable'

const App = () => {
  const [data, setData] = useState([
    { value: 0, text: '大白菜' },
    { value: 1, text: '牛肉' },
    { value: 2, text: '鸡肉' }
  ])

  return (
    <Sortable
      data={data}
      onChange={setData}
      options={{
        handle: '.b-sortable-handle'
      }}
      renderItem={item => (
        <div className='gm-border gm-padding-10'>
          <span className='b-sortable-handle gm-cursor-grab'>move</span>
          &nbsp;&nbsp;
          {item.text}
        </div>
      )}
    />
  )
}
```

### 示例四：禁用拖拽

通过 `disabled` 属性动态控制拖拽的启用和禁用。

```jsx
import React, { useState } from 'react'
import { Sortable } from '@gmfe/sortable'

const App = () => {
  const [data, setData] = useState([
    { value: 0, text: '大白菜' },
    { value: 1, text: '牛肉' },
    { value: 2, text: '鸡肉' }
  ])
  const [disabled, setDisabled] = useState(true)

  return (
    <div>
      <button onClick={() => setDisabled(!disabled)}>
        {disabled ? '启用拖拽' : '禁用拖拽'}
      </button>
      <Sortable data={data} onChange={setData} disabled={disabled} />
    </div>
  )
}
```

### 示例五：分组排序

使用 `GroupSortable` 实现多个列表之间的拖拽排序，跨列表拖拽时 `onChange` 会在两个列表都更新完毕后才触发一次。

```jsx
import React, { useState } from 'react'
import { GroupSortable } from '@gmfe/sortable'

const App = () => {
  const [groupData, setGroupData] = useState([
    [
      { value: 0, text: '大白菜' },
      { value: 1, text: '牛肉' }
    ],
    [
      { value: 2, text: '鸡肉' }
    ],
    [
      { value: 3, text: '鸭肉' },
      { value: 4, text: '大闸蟹' }
    ]
  ])

  return (
    <GroupSortable
      data={groupData}
      onChange={setGroupData}
      renderItem={item => (
        <div className='gm-border gm-margin-5 gm-padding-5'>
          {item.text} {item.value}
        </div>
      )}
    >
      {items => (
        <div>
          {items.map((item, i) => (
            <div key={i}>
              {item}
              {i < items.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </GroupSortable>
  )
}
```

## 注意事项

- 建议阅读 [SortableJS 官方文档](https://github.com/SortableJS/Sortable) 以了解更多配置项和高级用法。
- 每个数据项需提供唯一的 `value` 标识，`value` 会被 `JSON.stringify` 后存储在 DOM 的 `data-id` 属性中，因此务必保证唯一性。
- 拖拽排序期间尽量保持 `data` 不变，拖拽过程中数据发生变化可能导致排序结果异常。
- 推荐使用封装的 `Sortable` / `GroupSortable` 组件，不建议直接使用 SortableJS 原生用法。
- `SortableBase` 在 `onChange` 未传入时为非受控模式，`shouldComponentUpdate` 返回 `false`，React 不会重新渲染该组件。
- `GroupSortable` 的 `children` 必须是一个函数（render props 模式），接收渲染好的各分组元素数组。
- `GroupSortable` 跨列表拖拽时，`onChange` 会分别触发两次（每个列表一次），组件内部会在两次都完成后统一通知；列表内拖拽则只触发一次。
- `GroupSortable` 使用时传入 `data` 需要是新的引用（如 `.slice()`），避免直接引用导致状态同步问题。

## 相关包

| 包名 | 说明 |
| --- | --- |
| [@gmfe/react](/packages/react/README.md) | 基础 UI 组件库，提供 Flex、List 等基础组件 |
| [sortablejs](https://github.com/SortableJS/Sortable) | 底层拖拽排序库 |
