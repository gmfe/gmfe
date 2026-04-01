# FilterSelect

## 简介
过滤选择组件 - 支持搜索过滤的下拉选择器，提供单选和多选两个版本

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { FilterSelect, MultipleFilterSelect } from '@gmfe/react'

// 单选
<FilterSelect
  id="filter-1"
  list={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>

// 多选
<MultipleFilterSelect
  id="filter-2"
  list={list}
  selected={selectedList}
  onSelect={selectedList => setSelectedList(selectedList)}
/>
```

## API

### FilterSelect Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识 | `string` | - | 是 |
| list | 数据源数组 | `array` | - | 是 |
| selected | 当前选中项 | `any` | - | 否 |
| onSelect | 选中回调 | `function` | - | 是 |
| disabled | 是否禁用 | `bool` | `false` | 否 |
| isGroupList | 数据是否为分组格式 | `bool` | `false` | 否 |
| onSearch | 搜索回调，参数为 `query` | `function` | `_.noop` | 否 |
| withFilter | 过滤函数，参数为 `(list, query)` | `function` | `(v) => v` | 否 |
| delay | 搜索防抖延迟（毫秒） | `number` | `500` | 否 |
| listMaxHeight | 列表最大高度 | `string` | `'250px'` | 否 |
| placeholder | 搜索框占位文本 | `string` | `''` | 否 |
| isScrollToSelected | 是否滚动到选中项 | `bool` | `false` | 否 |
| onInputFocus | 搜索框获取焦点回调 | `function` | `_.noop` | 否 |
| disableSearch | 是否禁用搜索 | `bool` | `false` | 否 |
| renderItemName | 自定义列表项渲染 | `function` | `(v) => v.name` | 否 |
| showClear | 是否显示清除按钮 | `bool` | `false` | 否 |
| className | 外层自定义类名 | `string` | - | 否 |
| inputClassName | 列表项自定义类名 | `string` | - | 否 |

### MultipleFilterSelect Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识 | `string` | - | 是 |
| list | 数据源数组 | `array` | - | 是 |
| selected | 已选中的项数组 | `array` | - | 是 |
| onSelect | 选中回调 | `function` | - | 是 |
| disabled | 是否禁用 | `bool` | `false` | 否 |
| isGroupList | 数据是否为分组格式 | `bool` | `false` | 否 |
| onSearch | 搜索回调，参数为 `query` | `function` | `_.noop` | 否 |
| withFilter | 过滤函数，参数为 `(list, query)` | `function` | `(v) => v` | 否 |
| delay | 搜索防抖延迟（毫秒） | `number` | `500` | 否 |
| listMaxHeight | 列表最大高度 | `string` | `'250px'` | 否 |
| placeholder | 搜索框占位文本 | `string` | `''` | 否 |
| isScrollToSelected | 是否滚动到选中项 | `bool` | `false` | 否 |
| onInputFocus | 搜索框获取焦点回调 | `function` | `_.noop` | 否 |
| disableSearch | 是否禁用搜索 | `bool` | `false` | 否 |
| renderItemName | 自定义列表项渲染 | `function` | `(v) => v.name` | 否 |
| className | 外层自定义类名 | `string` | - | 否 |
| inputClassName | 列表项自定义类名 | `string` | - | 否 |

## 示例

### 单选
```jsx
<FilterSelect
  id="my-filter"
  list={[{ value: 1, name: '选项1' }, { value: 2, name: '选项2' }]}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  placeholder="请选择"
/>
```

### 多选
```jsx
<MultipleFilterSelect
  id="my-multi-filter"
  list={[{ value: 1, name: '选项1' }, { value: 2, name: '选项2' }]}
  selected={selectedList}
  onSelect={selectedList => setSelectedList(selectedList)}
  placeholder="请选择"
/>
```

## 注意事项
- 必须提供 `id` 属性，否则会在控制台输出警告
- 单选选中后会自动关闭弹出框
- 多选模式下已选项会以标签形式展示，可单独关闭
- 支持键盘上下键导航和回车键选中
- `onSearch` 返回 Promise 时，搜索期间会显示 Loading 状态
