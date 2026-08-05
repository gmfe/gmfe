import React from 'react'

/**
 * 分页可选配置 Context。
 * 由 ConfigProvider 通过 paginationConfig 注入；
 * 优先级：组件 props > Provider > 组件内默认值
 */
const PaginationConfigContext = React.createContext(null)

export { PaginationConfigContext }
