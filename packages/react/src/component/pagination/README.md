# Pagination

## 简介
分页组件 - 提供多种分页模式，包括带总数的分页、不带总数的分页以及纯文本展示模式。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Pagination from '@gmfe/react/lib/pagination/pagination'
import PaginationV2 from '@gmfe/react/lib/pagination/pagination_v2'
import PaginationText from '@gmfe/react/lib/pagination/pagination_text'
```

## API

### Pagination Props
带 `toPage` 回调的分页组件，根据 data 中是否包含 count 自动判断显示模式。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 分页数据 | `{ count?: number, offset: number, limit: number }` | - | 是 |
| toPage | 翻页回调，参数为 `{offset, limit}`，可直接用于请求后台 | `({offset, limit}) => void` | - | 是 |
| nextDisabled | 下一页按钮禁用（仅在 data 无 count 时有效） | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| limitData | 自定义分页，默认空数组 | `array` | - | 否 |

### PaginationV2 Props
直接使用 `onChange` 回调的分页组件（一般通过 PaginationBox 使用）。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 分页数据，count 仅代表当前有多少条数据（非总数） | `{ count: number, offset: number, limit: number }` | - | 是 |
| onChange | 翻页回调，参数为 `{offset, limit}` | `({offset, limit}) => void` | - | 是 |
| showCount | 是否显示总数 | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### PaginationText Props
纯文本展示分页信息（已废弃）。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 分页数据 | `{ count?: number, offset: number, limit: number }` | - | 否 |

## 示例

### Pagination 带总数
```jsx
<Pagination
  data={{ count: 70, offset: 0, limit: 10 }}
  toPage={({ offset, limit }) => {
    fetchData({ offset, limit })
  }}
/>
```

### Pagination 不带总数
```jsx
<Pagination
  data={{ offset: 0, limit: 10 }}
  toPage={({ offset, limit }) => {
    fetchData({ offset, limit })
  }}
  nextDisabled={false}
/>
```

### PaginationV2
```jsx
<PaginationV2
  data={{ count: 70, offset: 0, limit: 10 }}
  onChange={({ offset, limit }) => {
    fetchData({ offset, limit })
  }}
  showCount
/>
```

## 注意事项
- `Pagination` 组件根据 `data.count` 是否存在自动切换显示模式：有 count 时显示总数，无 count 时不显示总数
- `PaginationV2` 一般不直接使用，而是通过 `PaginationBox` 组件使用
- `PaginationText` 已废弃，使用时会在控制台输出警告
- `PaginationV2` 中 `data.count` 是当前数据条数，而非传统意义上的总条数
- 分页规范参考：[分页规范文档](https://www.yuque.com/iyum9i/cudrs0/etfogz)
