# Cascader

## 简介
级联选择组件 - 支持多级数据联动选择，可搜索过滤，提供 Cascader（基础级联）和 CascaderSelect（可选多级值）两个组件。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Cascader } from '@gmfe/react'

const data = [
  {
    value: '110000',
    name: '北京市',
    children: [
      {
        value: '150600000000',
        name: '东城区',
        children: [
          { value: '150600800000', name: '东单' },
          { value: '150600900000', name: '东四' }
        ]
      }
    ]
  }
]

<Cascader
  data={data}
  value={selected}
  onChange={ids => setSelected(ids)}
/>
```

## API

### Cascader Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 级联数据，格式 `[{value, name, children: [{...}]}]` | `array` | - | 是 |
| value | 当前选中的值数组，如 `[1, 2, 3]` | `array` | - | 否 |
| defaultValue | 默认选中的值数组 | `array` | - | 否 |
| onChange | 选择变化回调，参数为选中的值数组 | `func` | `_.noop` | 否 |
| inputProps | 传递给内部 input 的属性（没有 children 时有效） | `object` | `{}` | 否 |
| valueRender | 自定义显示值的渲染函数 | `func` | - | 否 |
| children | 自定义触发元素 | `any` | - | 否 |
| disabled | 是否禁用 | `bool` | `false` | 否 |
| filtrable | 是否可搜索 | `bool` | - | 否 |
| onlyChildSelectable | 是否只允许选择末级节点（有 children 则清空输入框） | `bool` | `false` | 否 |
| popoverStyle | 弹出层样式 | `object` | - | 否 |
| className | 弹出层自定义类名 | `string` | - | 否 |
| style | 弹出层自定义样式 | `object` | - | 否 |

### CascaderSelect Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 级联数据，格式同 Cascader | `array` | - | 是 |
| selected | 已选中的项数组（每项为完整的 value 对象数组） | `array` | - | 否 |
| onSelect | 选择回调，单选返回单个值，多选返回数组 | `func` | - | 是 |
| multiple | 是否多选 | `bool` | - | 否 |
| selectedRender | 自定义已选项渲染函数 | `func` | - | 否 |
| inputProps | 传递给内部 Cascader input 的属性 | `object` | `{}` | 否 |
| disabled | 是否禁用 | `bool` | `false` | 否 |
| valueRender | 自定义 Cascader 显示值渲染函数 | `func` | - | 否 |
| filtrable | 是否可搜索 | `bool` | `false` | 否 |
| onlyChildSelectable | 是否只允许选择末级节点 | `bool` | `false` | 否 |

## 示例

### 基础级联选择
```jsx
const data = [
  {
    value: '110000',
    name: '北京市',
    children: [
      {
        value: '150600000000',
        name: '东城区',
        children: [
          { value: '150600800000', name: '东单' },
          { value: '150600900000', name: '东四' }
        ]
      }
    ]
  }
]

<Cascader
  data={data}
  value={selected}
  onChange={ids => setSelected(ids)}
/>
```

### 可搜索级联
```jsx
<Cascader
  filtrable
  data={data}
  value={selected}
  onChange={ids => setSelected(ids)}
/>
```

### 只允许选择末级节点
```jsx
<Cascader
  filtrable
  onlyChildSelectable
  data={data}
  value={selected}
  onChange={ids => setSelected(ids)}
/>
```

### CascaderSelect 多选
```jsx
import { CascaderSelect } from '@gmfe/react'

<CascaderSelect
  multiple
  data={data}
  selected={selectedItems}
  onSelect={items => setSelectedItems(items)}
/>
```

## 注意事项
- `data` 数据格式要求每项包含 `value`、`name`，子级数据放在 `children` 中
- `value` 属性为各级 value 组成的数组，如选中"北京市 > 东城区 > 东单"则为 `['110000', '150600000000', '150600800000']`
- 启用 `filtrable` 后支持中文搜索和拼音搜索（全拼、首字母）
- `onlyChildSelectable` 开启后，选择有 children 的节点会清空输入框
- CascaderSelect 支持单选和多选模式
- CascaderSelect 的 `selected` 是完整的值对象数组（每项为各级对象的数组），而非简单的 value
- 支持键盘上下键和回车键操作
- 组件会深拷贝传入的 `data` 并在内部维护 `_path` 属性
