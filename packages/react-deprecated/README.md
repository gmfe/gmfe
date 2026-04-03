# @gmfe/react-deprecated

## 简介

`@gmfe/react-deprecated` 包含已废弃的 React 组件，这些组件在新项目中不建议使用，但为了向后兼容仍保留在此包中。建议使用 `@gmfe/react` 中的替代组件。

## 安装

```bash
npm install @gmfe/react-deprecated
```

## 使用

```jsx
import { SearchSelect, TreeSelect, QuickPanel, QuickTab, QuickFilter, PaginationFuck } from '@gmfe/react-deprecated'
```

## API

### SearchSelect

可搜索的下拉选择组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 下拉列表数据 | `array` | - | 是 |
| onSearch | 搜索请求函数 | `function` | - | 是 |
| onSelect | 选中回调 | `function` | - | 是 |
| selected | 当前选中项（多选时为数组） | `any \| array` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| multiple | 是否多选 | `boolean` | `false` | 否 |
| delay | 搜索延迟（毫秒） | `number` | `500` | 否 |
| listMaxHeight | 下拉列表最大高度 | `string` | `'250px'` | 否 |
| renderListCell | 自定义列表项渲染 | `function` | `(v) => v.name` | 否 |
| isGroupList | 是否分组列表 | `boolean` | `false` | 否 |
| placeholder | 占位文本 | `string` | `''` | 否 |
| isScrollToSelected | 聚焦时是否滚动到选中项 | `boolean` | `false` | 否 |
| onInputFocus | 输入框聚焦回调 | `function` | `_.noop` | 否 |
| isSelectedChangeValue | 选中时是否更新输入框值 | `boolean` | `false` | 否 |

### FilterSearchSelect

本地过滤的可搜索选择组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 下拉列表数据 | `array` | - | 是 |
| onFilter | 过滤函数，接收 query 返回过滤后的列表 | `function` | - | 是 |
| onSelect | 选中回调 | `function` | - | 是 |
| selected | 当前选中项 | `any \| array` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| delay | 搜索延迟（毫秒） | `number` | `500` | 否 |
| listMaxHeight | 下拉列表最大高度 | `string` | `'250px'` | 否 |
| placeholder | 占位文本 | `string` | `''` | 否 |
| isGroupList | 是否分组列表 | `boolean` | `false` | 否 |
| isScrollToSelected | 聚焦时是否滚动到选中项 | `boolean` | `false` | 否 |

### TreeSelect

树形选择组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 树形数据数组 | `array` | `[]` | 是 |
| selected | 选中值数组 | `array` | - | 否 |
| onSelect | 选中变化回调 | `function` | - | 否 |
| label | "选择全部"文本 | `string` | `'选择全部'` | 否 |
| disabledSelected | 是否禁用选择功能 | `boolean` | `false` | 否 |

### PaginationFuck

分页组件（特殊分页模式）。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| limit | 每页条数 | `number` | `10` | 是 |
| pagination | 分页对象，包含 `page_obj`、`peek`（带总数）、`more`（不带总数） | `object` | - | 是 |
| onChange | 页码变化回调，接收分页参数 | `function` | - | 是 |
| showCount | 是否显示数字页码 | `boolean` | `true` | 否 |

### QuickPanel

快速面板组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 面板标题 | `string \| ReactElement` | - | 是 |
| collapse | 是否可折叠 | `boolean` | `true` | 否 |
| in | 初始是否展开 | `boolean` | `true` | 否 |
| right | 右侧内容 | `ReactElement` | - | 否 |

### QuickTab

快速标签页组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 标签页名称数组 | `array` | - | 是 |
| active | 当前激活的标签页索引 | `number` | - | 否 |
| onChange | 标签页切换回调 | `function(index: number)` | - | 否 |
| right | 右侧内容 | `ReactElement` | - | 否 |
| isStatic | 是否同时显示所有标签页内容 | `boolean` | `false` | 否 |
| justified | 标签页是否两端对齐 | `boolean` | `false` | 否 |

### QuickFilter

快速筛选组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| collapseRender | 折叠区域渲染函数 | `function` | - | 否 |
| expand | 初始是否展开 | `boolean` | `false` | 否 |

### QuickDesc

快速描述组件（用于展示结果信息）。

### QuickDetailThird

快速详情展示组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| result | 主结果对象，包含 `name` 和 `value` | `object` | - | 是 |
| process | 流程步骤数组，每项包含 `name` 和 `value` | `array` | - | 是 |
| unit | 单位文字 | `string` | - | 是 |

## 示例

### SearchSelect 搜索选择

```jsx
import { SearchSelect } from '@gmfe/react-deprecated'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <SearchSelect
      list={searchResults}
      onSearch={async (query) => {
        const res = await api.search(query)
        return res.list
      }}
      onSelect={(item) => setSelected(item)}
      selected={selected}
      placeholder="请搜索商品"
    />
  )
}
```

### SearchSelect 多选模式

```jsx
import { SearchSelect } from '@gmfe/react-deprecated'

function App() {
  const [selected, setSelected] = useState([])

  return (
    <SearchSelect
      list={searchResults}
      onSearch={async (query) => await api.search(query)}
      onSelect={(item) => setSelected(item)}
      selected={selected}
      multiple
      renderListCell={(item) => `${item.name}（${item.code}）`}
    />
  )
}
```

### TreeSelect 树形选择

```jsx
import { TreeSelect } from '@gmfe/react-deprecated'

function App() {
  const treeData = [
    {
      name: '华东区域',
      id: 1,
      sub: [
        { name: '上海', id: 11, sub: [{ name: '浦东新区', id: 111 }] },
        { name: '浙江', id: 12 }
      ]
    }
  ]

  const [selected, setSelected] = useState([])

  return (
    <TreeSelect
      list={treeData}
      selected={selected}
      onSelect={(ids) => setSelected(ids)}
    />
  )
}
```

### QuickPanel + QuickTab 组合使用

```jsx
import { QuickPanel, QuickTab } from '@gmfe/react-deprecated'

function App() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <QuickPanel title="数据概览">
      <QuickTab
        tabs={['按订单查看', '按商品查看', '按司机查看']}
        active={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 0 && <div>订单数据</div>}
      {activeTab === 1 && <div>商品数据</div>}
      {activeTab === 2 && <div>司机数据</div>}
    </QuickPanel>
  )
}
```

### 废弃组件迁移指南

以下示例展示如何将废弃组件迁移到推荐替代方案：

```jsx
// ❌ 废弃用法 - SearchSelect
import { SearchSelect } from '@gmfe/react-deprecated'
<SearchSelect list={list} onSearch={fn} onSelect={fn} />

// ✅ 推荐替代 - MoreSelect
import { MoreSelect } from '@gmfe/react'
<MoreSelect list={list} onChange={fn} />

// ❌ 废弃用法 - TreeSelect
import { TreeSelect } from '@gmfe/react-deprecated'
<TreeSelect list={treeData} onSelect={fn} />

// ✅ 推荐替代 - TreeV2
import { TreeV2 } from '@gmfe/react'
<TreeV2 data={treeData} onSelect={fn} />

// ❌ 废弃用法 - QuickPanel
import { QuickPanel } from '@gmfe/react-deprecated'
<QuickPanel title="标题">内容</QuickPanel>

// ✅ 推荐替代 - Collapse
import { Collapse } from '@gmfe/react'
<Collapse in title="标题">内容</Collapse>

// ❌ 废弃用法 - QuickTab
import { QuickTab } from '@gmfe/react-deprecated'
<QuickTab tabs={['A', 'B']} active={0} onChange={fn} />

// ✅ 推荐替代 - Tabs
import { Tabs } from '@gmfe/react'
<Tabs tabs={['A', 'B']} active={0} onChange={fn} />
```

## 注意事项

- 此包中的组件已废弃，新项目建议使用 `@gmfe/react` 中的对应组件替代。
- `SearchSelect` 可用 `@gmfe/react` 的 `Select` 或 `MoreSelect` 替代。
- `TreeSelect` 可用 `@gmfe/react` 的 `TreeV2` 替代。
- `PaginationFuck` 可用 `@gmfe/business` 的 `ManagePaginationV2` 替代。
- `QuickPanel`、`QuickTab`、`QuickFilter` 等可用 `@gmfe/react` 的 `Collapse`、`Tabs` 等组合替代。
