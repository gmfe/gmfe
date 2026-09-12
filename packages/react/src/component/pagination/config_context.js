import React from 'react'

/**
 * 分页可选配置 Context。
 * 由 ConfigProvider 通过 paginationConfig 注入；
 * 字段：preferredLimit / limitData / onLimitChange / persistLimit / limitScope
 * 条数优先级（persistLimit !== false 时）：Storage(id|scope) > preferredLimit > defaultLimit / data.limit
 * persistLimit === false 时跳过 Storage 读写。
 */
const PaginationConfigContext = React.createContext(null)

export { PaginationConfigContext }
