import React from 'react'
import PropTypes from 'prop-types'

/**
 * 分页可选配置（纯组件能力，不含业务/登录）。
 * 宿主可用 PaginationConfigProvider 注入 preferredLimit / limitData / onLimitChange。
 * 优先级：组件 props > Provider > 组件内默认值
 */
const PaginationConfigContext = React.createContext(null)

/**
 * @param {{
 *   preferredLimit?: number,
 *   limitData?: Array<{value:number,text:number|string}>,
 *   onLimitChange?: (limit: number) => void,
 *   children: React.ReactNode
 * }} props
 */
const PaginationConfigProvider = ({
  preferredLimit,
  limitData,
  onLimitChange,
  children
}) => {
  const value = {
    preferredLimit,
    limitData,
    onLimitChange
  }
  return (
    <PaginationConfigContext.Provider value={value}>
      {children}
    </PaginationConfigContext.Provider>
  )
}

PaginationConfigProvider.propTypes = {
  /** 对应业务侧 page_size */
  preferredLimit: PropTypes.number,
  /** 对应业务侧 page_size_options：[{ value, text }, ...] */
  limitData: PropTypes.array,
  /** 用户切换每页条数 */
  onLimitChange: PropTypes.func,
  children: PropTypes.node
}

export { PaginationConfigContext, PaginationConfigProvider }
