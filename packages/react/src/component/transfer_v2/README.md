# TransferV2

## 简介
穿梭框组件 V2 - 基于虚拟化树形控件的新版穿梭框，支持左右栏独立搜索过滤和自定义渲染

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { TransferV2 } from '@gmfe/react'

<TransferV2
  list={data}
  selectedValues={selectedValues}
  onSelectValues={selected => setSelectedValues(selected)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 数据源（支持树形数据和平铺数据） | `array` | - | 是 |
| selectedValues | 已选中的 value 数组 | `array` | - | 是 |
| onSelectValues | 选中值变化回调 | `function` | - | 是 |
| rightTree | 右边是否以树状结构展示 | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| leftTitle | 左栏标题 | `string` | `'待选择'` | 否 |
| leftPlaceholder | 左栏搜索框占位文本 | `string` | - | 否 |
| leftWithFilter | 左栏过滤函数 | `func \| bool` | - | 否 |
| leftRenderLeafItem | 左栏叶子节点自定义渲染 | `function` | - | 否 |
| leftRenderGroupItem | 左栏分组节点自定义渲染 | `function` | - | 否 |
| leftStyle | 左栏自定义样式 | `object` | `{width: '300px', height: '500px'}` | 否 |
| leftClassName | 左栏自定义类名 | `string` | - | 否 |
| rightTitle | 右栏标题 | `string` | `'已选择'` | 否 |
| rightPlaceholder | 右栏搜索框占位文本 | `string` | - | 否 |
| rightWithFilter | 右栏过滤函数 | `func \| bool` | - | 否 |
| rightRenderLeafItem | 右栏叶子节点自定义渲染 | `function` | - | 否 |
| rightRenderGroupItem | 右栏分组节点自定义渲染 | `function` | - | 否 |
| rightStyle | 右栏自定义样式 | `object` | `{width: '300px', height: '500px'}` | 否 |
| rightClassName | 右栏自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<TransferV2
  list={flatData}
  selectedValues={selected}
  onSelectValues={selected => setSelectedValues(selected)}
  rightTree
/>
```

### 树形数据
```jsx
<TransferV2
  list={treeData}
  selectedValues={selected}
  onSelectValues={selected => setSelectedValues(selected)}
/>
```

### 自定义标题和渲染
```jsx
<TransferV2
  list={treeData}
  selectedValues={selected}
  onSelectValues={selected => setSelectedValues(selected)}
  leftTitle="修改左边的标题"
  rightTitle="修改右边的标题"
  rightStyle={{ width: '500px', height: '500px' }}
  rightRenderLeafItem={data => (
    <div>{data.parent.text} -- {data.text}</div>
  )}
/>
```

## 注意事项
- 左右栏默认尺寸为 `300px x 500px`
- 内部基于 `TreeV2` 组件，支持大数据量虚拟化渲染
- 设置 `rightTree` 后右侧会以树状结构展示，否则为扁平列表
