# TableSelect

## 简介
表格选择器组件 - 以表格形式展示选项列表的下拉选择器，支持多列显示和搜索过滤

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { TableSelect } from '@gmfe/react'

<TableSelect
  data={data}
  columns={columns}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据源，全部展示，没有内部过滤 | `array` | - | 是 |
| selected | 当前选中的值 | `any` | - | 否 |
| onSelect | 选中回调 | `function` | - | 是 |
| columns | 列定义，类似 ReactTable，格式：`[{Header, accessor, Cell, width}]` | `array` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| onSearch | 搜索回调，参数为 `(searchValue, data)` | `function` | - | 否 |
| delay | 搜索防抖延迟（毫秒） | `number` | - | 否 |
| searchPlaceholder | 搜索框占位文本 | `string` | - | 否 |
| renderListFilter | 列表过滤函数，参数为 `(searchValue, data)` | `function` | - | 否 |
| renderListFilterType | 指定默认的过滤类型 | `'default' \| 'pinyin'` | - | 否 |
| placeholder | 占位文本 | `string` | - | 否 |
| renderSelected | 定制已选区域的展示，参数为 `selected` | `function` | - | 否 |
| listHeight | 列表高度 | `string` | - | 否 |
| popoverType | 弹出框触发方式 | `'focus' \| 'realFocus'` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| popupClassName | 弹出框自定义类名 | `string` | - | 否 |
| isKeyboard | 是否启用键盘导航 | `bool` | - | 否 |
| onKeyDown | 键盘事件回调 | `function` | - | 否 |

### columns 配置
| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| Header | 列标题 | `string` | 是 |
| accessor | 字段访问器，支持字符串路径或函数 | `string \| function` | 否 |
| Cell | 自定义单元格渲染，参数为 `{original, index}` | `function` | 否 |
| width | 列宽度（px），建议设置 | `number` | 否 |

## 示例

### 基础用法
```jsx
const data = [
  { value: 'D1', text: '大白菜', original: { sku_id: 'D1', sku_name: '大白菜', supplier: '供应商A' } },
  { value: 'D2', text: '小白菜', original: { sku_id: 'D2', sku_name: '小白菜', supplier: '供应商B' } }
]

const columns = [
  { Header: 'ID', accessor: 'original.sku_id', width: 100 },
  { Header: '名字', accessor: 'original.sku_name', width: 100 },
  { Header: '供应商', accessor: 'original.supplier', width: 100 }
]

<TableSelect
  data={data}
  columns={columns}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 自定义单元格渲染
```jsx
const columns = [
  {
    Header: '名字',
    accessor: 'original.sku_name',
    width: 100,
    Cell: ({ original }) => <strong>{original.sku_name}</strong>
  }
]
```

## 注意事项
- 建议为每列设置 `width`，未设置时会在控制台输出警告
- 数据项需要包含 `value`、`text` 和 `original` 字段
- 空值单元格会显示为 `-`
