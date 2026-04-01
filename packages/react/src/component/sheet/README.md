# Sheet

## 简介
数据表格组件 - 用于展示结构化数据，支持列定义、操作列、选择框、批量操作、展开行和分页等功能。（已废弃，建议使用 Table 组件替代）

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Sheet, SheetColumn, SheetAction, SheetSelect, SheetBatchAction } from '@gmfe/react/lib/sheet'

<Sheet list={dataList}>
  <SheetColumn field='id' name='ID' />
  <SheetColumn field='name' name='名字' />
  <SheetColumn field='age' name='年龄' />
  <SheetAction>
    {(record, index) => <Button>操作</Button>}
  </SheetAction>
</Sheet>
```

## API

### Sheet Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 表格数据数组 | `array` | `[]` | 是 |
| loading | 是否显示加载状态 | `bool` | `false` | 否 |
| enableEmptyTip | 数据为空时的提示，传入 `true` 显示默认提示，也可传入字符串或 React 元素自定义提示 | `bool \| string \| ReactElement` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| getTrProps | 获取行属性，返回值会传递到 `<tr>` 上 | `(index: number) => object` | `() => ({})` | 否 |
| scrollX | 是否开启横向滚动 | `bool` | `false` | 否 |
| expandedRowRender | 展开行渲染函数 | `(index: number) => ReactElement` | - | 否 |
| onExpand | 单行展开/收起回调 | `(index: number) => void` | - | 否 |
| onExpandAll | 全部展开/收起回调 | `() => void` | - | 否 |
| children | 子组件（SheetColumn、SheetAction、SheetSelect、SheetBatchAction、Pagination 等） | `any` | - | 否 |

### SheetColumn Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| field | 对应 list 中的字段名 | `string` | - | 是 |
| name | 列标题，支持字符串或 React 元素 | `string \| ReactElement` | - | 是 |
| render | 自定义单元格渲染函数 | `(value: any, index: number, record: object) => ReactNode` | - | 否 |
| placeholder | 字段值为空时的占位内容 | `any` | - | 否 |
| children | 自定义单元格渲染（函数子组件），参数为 `(value, index, record)` | `(value, index, record) => ReactNode` | - | 否 |

### SheetAction Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 操作列渲染函数，参数为 `(record, index)` | `(record, index) => ReactNode` | - | 否 |

### SheetSelect Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onSelect | 单选回调 | `(checked: bool, index: number) => void` | - | 是 |
| onSelectAll | 全选回调 | `(checked: bool) => void` | - | 否 |
| onChange | 选中状态变更回调，参数为完整的 list（修改后的） | `(list: array) => void` | - | 否 |
| isDisabled | 判断行是否禁用选择 | `(record: object) => bool` | `() => false` | 否 |
| isRadio | 是否为单选模式 | `bool` | `false` | 否 |
| hasSelectTip | 是否显示全选提示 | `bool` | `false` | 否 |
| selectAllTip | 全选提示内容 | `ReactNode` | `'已选中所有'` | 否 |
| children | 子元素 | `any` | - | 否 |

### SheetBatchAction Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 批量操作按钮区域 | `any` | - | 否 |

### Sheet 静态方法

#### `Sheet.findTableDOM(ref)`
获取表格 DOM 元素。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| ref | Sheet 组件的 ref | `ReactRef` | 是 |

返回值：`HTMLTableElement`

## 示例

### 基础用法
```jsx
<Sheet list={[
  { id: 1, name: '小明', age: '10' },
  { id: 2, name: '小红', age: '15' },
  { id: 3, name: '小蓝', age: '20' }
]}>
  <SheetColumn field='id' name='ID' />
  <SheetColumn field='name' name='名字' />
  <SheetColumn field='age' name='年龄' />
</Sheet>
```

### 自定义列渲染
```jsx
<Sheet list={list}>
  <SheetColumn field='id' name='ID' />
  <SheetColumn field='name' name='名字'>
    {(name, index, record) => `我的名字叫${name}, ID是${record.id}`}
  </SheetColumn>
  <SheetColumn field='name' name='名字' render={(name, index, record) => `自定义: ${name}`} />
</Sheet>
```

### 带操作列
```jsx
<Sheet list={list}>
  <SheetColumn field='name' name='名字' />
  <SheetAction>
    {(record, index) => (
      <div>
        <Button onClick={() => alert(record.name)}>删除</Button>
      </div>
    )}
  </SheetAction>
</Sheet>
```

### 带选择框
```jsx
<Sheet list={list}>
  <SheetColumn field='name' name='名字' />
  <SheetSelect
    onSelect={(checked, index) => {
      // 处理选中逻辑，使用 _gm_select 字段标记选中状态
    }}
    onSelectAll={(checked) => {
      // 处理全选逻辑
    }}
    hasSelectTip
    selectAllTip={<div>全选提示信息</div>}
  />
  <SheetBatchAction>
    <Button>批量删除</Button>
  </SheetBatchAction>
</Sheet>
```

### 带分页
```jsx
<Sheet list={list}>
  <SheetColumn field='name' name='名字' />
  <Pagination
    data={{ count: 70, offset: 0, limit: 10 }}
    toPage={({ offset, limit }) => fetchData({ offset, limit })}
  />
</Sheet>
```

### 可展开行
```jsx
<Sheet
  list={list}
  expandedRowRender={(index) => (
    <div>展开行内容：{list[index].name}</div>
  )}
  onExpand={(index) => {
    // 切换展开状态，需要修改数据中 __gm_expanded 字段
  }}
  onExpandAll={() => {
    // 全部展开/收起
  }}
>
  <SheetColumn field='name' name='名字' />
</Sheet>
```

## 注意事项
- Sheet 组件已废弃，建议使用 Table 组件替代，使用时会输出控制台警告
- 使用 `SheetSelect` 时，约定数据列表中的 `_gm_select` 字段表示选中状态（bool 类型）
- `onChange` 和 `onSelect` 的区别：`onChange` 会修改整个 list 数据，`onSelect` 只返回 checked 和 index
- `SheetBatchAction` 必须配合 `SheetSelect` 使用才会显示
- `Pagination` 和 `PaginationText` 作为 Sheet 的子组件时会自动排列到表格下方
- `getTrProps` 返回的属性会传递到每一行的 `<tr>` 上，可用于自定义行样式或属性
