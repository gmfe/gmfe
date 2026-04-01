# LevelList

## 简介
级联列表组件 - 用于展示多级联动列表，支持鼠标悬浮自动展开和反向排列

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { LevelList } from '@gmfe/react'

<LevelList
  data={data}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  willActiveSelected={willActiveSelected}
  onWillActiveSelect={willActiveSelected => setWillActiveSelected(willActiveSelected)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据源，格式：`[{value, text, children}]`，支持多级嵌套 | `array` | - | 是 |
| selected | 已选中的 value 数组 | `array` | - | 是 |
| onSelect | 选中回调 | `function` | - | 是 |
| willActiveSelected | 预激活的 value 数组，用于鼠标悬浮预选 | `array` | - | 是 |
| onWillActiveSelect | 预激活值变化回调 | `function` | - | 是 |
| titles | 各级列的标题数组 | `array` | `[]` | 否 |
| onlySelectLeaf | 是否仅能选择叶子节点（TODO） | `bool` | - | 否 |
| isReverse | 是否反向排列（从右向左） | `bool` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| isForFunctionSet | 内部使用，用于 FunctionSet 组件 | `bool` | `false` | 否 |

## 示例

### 基础用法
```jsx
<LevelList
  data={[
    {
      value: '1',
      text: '南山',
      children: [
        { value: '11', text: '科技园' },
        { value: '12', text: '西丽' }
      ]
    }
  ]}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  willActiveSelected={willActiveSelected}
  onWillActiveSelect={willActiveSelected => setWillActiveSelected(willActiveSelected)}
/>
```

### 反向排列
```jsx
<LevelList
  data={data}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  willActiveSelected={willActiveSelected}
  onWillActiveSelect={willActiveSelected => setWillActiveSelected(willActiveSelected)}
  isReverse
/>
```

## 注意事项
- `willActiveSelected` 和 `onWillActiveSelect` 需要配合使用，实现鼠标悬浮预选效果
- `isReverse` 适用于右对齐的场景
