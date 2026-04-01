# Selection

## 简介
选择器基础组件 - 可作为输入框形式的选择器，支持清除、干净模式等多种形态

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Selection } from '@gmfe/react'

<Selection
  selected={selected}
  onSelect={selected => setSelected(selected)}
  placeholder="请选择"
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| selected | 单选情况为 `null` 或 `{value, text}` 对象 | `any` | - | 否 |
| onSelect | 选中回调 | `function` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| renderSelected | 自定义选中项的展示，参数为 `selected` | `function` | `(item) => item.text` | 否 |
| placeholder | 占位文本 | `string` | - | 否 |
| funIcon | 代替默认的箭头图标 | `element` | - | 否 |
| clean | 干净模式，隐藏右侧图标和关闭按钮 | `bool` | `false` | 否 |
| disabledClose | 禁用关闭（x）按钮 | `bool` | `false` | 否 |
| onKeyDown | 键盘事件回调 | `function` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| isForSelect | 给 Select 定制的标记，使用 div 代替 input | `bool` | `false` | 否 |

## 示例

### 基础用法
```jsx
<Selection
  onSelect={selected => console.log(selected)}
  placeholder="请选择"
/>
```

### 已选中状态
```jsx
<Selection
  selected={{ value: 0, text: '选中项' }}
  onSelect={selected => console.log(selected)}
/>
```

### 自定义选中项展示
```jsx
<Selection
  selected={{ value: 0, text: '选中项' }}
  onSelect={selected => console.log(selected)}
  renderSelected={item => item.text + 'lalala'}
/>
```

### 干净模式
```jsx
<Selection
  clean
  selected={{ value: 0, text: '选中项' }}
  onSelect={selected => console.log(selected)}
  placeholder="请选择"
/>
```

### 禁用关闭按钮
```jsx
<Selection
  disabledClose
  selected={{ value: 0, text: '选中项' }}
  onSelect={selected => console.log(selected)}
/>
```

## 注意事项
- 这是基础组件，通常不单独使用，而是作为 `LevelSelect`、`TimeSpanPicker` 等组件的内部组件
- 选中后显示关闭按钮（x），点击可清除选中状态
- 默认右侧有上下箭头图标，选中状态下箭头图标会左移
