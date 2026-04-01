# TreeV2

## 简介
树形选择组件 V2 - 基于 `react-window` 的虚拟化树形控件，支持大数据量、搜索过滤、定位功能和半选状态

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { TreeV2 } from '@gmfe/react'

<TreeV2
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 树形数据，格式：`[{value, name/text, children: []}]`，支持平铺数据和多级嵌套 | `array` | - | 是 |
| selectedValues | 已选中的叶子节点 value 数组 | `array` | - | 是 |
| onSelectValues | 选择值变化回调 | `function` | - | 是 |
| onActiveValues | 激活项变化回调 | `function` | `() => []` | 否 |
| activeValue | 当前激活的 value | `string` | `null` | 否 |
| title | 标题 | `string` | - | 否 |
| withFilter | 过滤函数，默认自带，不需要则传 `false` | `func \| bool` | `true` | 否 |
| renderLeafItem | 自定义叶子节点渲染 | `function` | - | 否 |
| renderGroupItem | 自定义分组节点渲染 | `function` | - | 否 |
| placeholder | 搜索框占位文本 | `string` | `'搜索'` | 否 |
| showAllCheck | 全选开关是否显示 | `bool` | `true` | 否 |
| indeterminateList | 半勾选状态的 value 数组 | `array` | `[]` | 否 |
| withFindFilter | 定位过滤函数，默认自带，不需要则传 `false` | `func \| bool` | `false` | 否 |
| findPlaceholder | 定位输入框占位文本 | `string` | `'输入定位信息'` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 静态方法
| 方法 | 说明 |
|------|------|
| `TreeV2.filterGroupList(list, filter)` | 按条件过滤叶子节点 |
| `TreeV2.selectedValues2SelectedList(list, selectValues)` | 将选中的 value 数组转换为选中的节点列表 |

## 示例

### 基础用法
```jsx
<TreeV2
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

### 平铺数据
```jsx
<TreeV2
  list={flatData}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
/>
```

### 自定义渲染
```jsx
<TreeV2
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
  renderLeafItem={data => (
    <div>
      <span style={{backgroundColor: '#56a3f2', color: 'white', padding: '1px', borderRadius: '2px'}}>
        上架
      </span>
      {data.text}
    </div>
  )}
/>
```

### 定位功能
```jsx
<TreeV2
  list={data}
  selectedValues={selectedValues}
  onSelectValues={values => setSelectedValues(values)}
  withFindFilter={handleFind}
  withFilter={false}
/>
```

## 注意事项
- 搜索输入有 300ms 防抖
- 支持单层数据（平铺列表）和多级嵌套数据
- 使用了虚拟化渲染，适合大数据量场景
