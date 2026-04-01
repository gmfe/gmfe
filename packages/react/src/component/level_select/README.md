# LevelSelect

## 简介
级联选择器组件 - 下拉面板式多级联动选择器，支持键盘方向键导航和自定义渲染

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { LevelSelect } from '@gmfe/react'

<LevelSelect
  data={data}
  selected={selected}
  onSelect={value => setSelected(value)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据源，格式：`[{value, text, children}]`，支持多级嵌套 | `array` | - | 是 |
| selected | 已选中的 value 数组 | `array` | - | 是 |
| onSelect | 选中回调 | `function` | - | 是 |
| titles | 各级列的标题数组 | `array` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| renderSelected | 自定义已选区域的展示，参数为选中的 item 数组 | `function` | `(items) => items.map(v => v.text).join(',')` | 否 |
| onlySelectLeaf | 是否仅能选择叶子节点 | `bool` | - | 否 |
| popoverType | 弹出框触发方式 | `'focus' \| 'realFocus'` | - | 否 |
| right | 下拉面板是否右对齐 | `bool` | `false` | 否 |
| onKeyDown | 键盘事件回调 | `function` | `_.noop` | 否 |
| placeholder | 占位文本 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<LevelSelect
  data={[
    {
      value: 'A',
      text: '广州',
      children: [
        { value: 1, text: '越秀' },
        { value: 2, text: '天河' }
      ]
    },
    {
      value: 'B',
      text: '深圳',
      children: [
        { value: 1, text: '福田' },
        { value: 2, text: '南山' }
      ]
    }
  ]}
  selected={selected}
  onSelect={value => setSelected(value)}
/>
```

### 右对齐
```jsx
<LevelSelect
  data={data}
  selected={selected}
  onSelect={value => setSelected(value)}
  right
/>
```

## 注意事项
- 支持键盘方向键导航：上下键切换选项，左右键切换级别
- 内部使用 `Popover` 和 `LevelList` 组件
- 选中项会以逗号分隔展示
