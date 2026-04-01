# @gmfe/business

## 简介

`@gmfe/business` 是 gmfe 组件库的业务组件包，提供分页管理相关的业务组件，封装了常见的分页数据请求模式，简化分页列表页面的开发。

## 安装

```bash
npm install @gmfe/business
```

## 使用

### ManagePaginationV2

```jsx
import React from 'react'
import { ManagePaginationV2 } from '@gmfe/business'
import { Table } from '@gmfe/table'

function UserList() {
  return (
    <ManagePaginationV2
      id="user-list"
      onRequest={async ({ offset, limit }) => {
        const res = await fetch(`/api/users?offset=${offset}&limit=${limit}`)
        const data = await res.json()
        return { data: data.list, count: data.total }
      }}
    >
      {({ data, loading }) => (
        <Table
          data={data || []}
          columns={columns}
          loading={loading}
        />
      )}
    </ManagePaginationV2>
  )
}
```

## API

### ManagePagination

分页管理组件（基础版本），自动管理分页请求和加载状态。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识，用于记住每页条数 | `string` | - | 否 |
| onRequest | 分页请求函数，接收 `{ offset, limit }` 参数，返回 `Promise<{ data: array, count: number }>` | `function` | - | 是 |
| children | 子内容，可以是元素或函数（接收 `{ data, loading }` 参数） | `ReactElement \| function` | - | 是 |
| defaultLimit | 默认每页条数 | `number` | `10` | 否 |

### ManagePaginationV2

分页管理组件 V2，支持禁用分页和自定义样式。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| id | 唯一标识，用于记住每页条数 | `string` | - | 否 |
| onRequest | 分页请求函数，接收 `{ offset, limit }` 参数，返回 `Promise<{ data: array, count: number }>` | `function` | - | 是 |
| children | 子内容，可以是元素或函数（接收 `{ data, loading }` 参数） | `ReactElement \| function` | - | 是 |
| defaultLimit | 默认每页条数 | `number` | `10` | 否 |
| disablePage | 是否禁用分页控制 | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 使用元素作为 children

```jsx
import React from 'react'
import { ManagePaginationV2 } from '@gmfe/business'
import { Table } from '@gmfe/table'

function OrderList() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  return (
    <ManagePaginationV2
      id="order-list"
      defaultLimit={20}
      onRequest={async ({ offset, limit }) => {
        setLoading(true)
        const res = await fetch(`/api/orders?offset=${offset}&limit=${limit}`)
        const json = await res.json()
        setData(json.list)
        setLoading(false)
        return { data: json.list, count: json.total }
      }}
    >
      <Table data={data} columns={columns} loading={loading} />
    </ManagePaginationV2>
  )
}
```

### 禁用分页

```jsx
<ManagePaginationV2
  id="simple-list"
  disablePage
  onRequest={async ({ limit }) => {
    const res = await fetch(`/api/items?limit=${limit}`)
    const json = await res.json()
    return { data: json.list, count: json.list.length }
  }}
>
  {({ data }) => <List data={data} />}
</ManagePaginationV2>
```

## 注意事项

- `onRequest` 必须返回包含 `data`（数组）和 `count`（总数）的对象。
- `children` 为函数时，会接收 `{ data, loading }` 参数，`data` 在首次请求前为 `undefined`。
- `id` 用于在 `localStorage` 中记住用户选择的每页条数，相同 `id` 的组件会共享设置。
- 推荐使用 `ManagePaginationV2` 替代 `ManagePagination`。
