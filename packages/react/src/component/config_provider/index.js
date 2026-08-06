import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { PaginationConfigContext } from '../pagination/config_context'
import { bumpStickyLocalVersion } from '../table_sticky/sync'

/**
 * 全局组件配置。
 * - paginationConfig → 注入分页 Context（原 PaginationConfigProvider）
 * - tableConfig → Table / TableX / TableXVirtualized 共用（表头固定等）
 * - tableXConfig → 可选；不传则回退 tableConfig
 */
const ConfigContext = React.createContext(null)

/** 供 DIY 弹层在 popup() 时读取最新配置（避免 useContext 订阅导致弹层重挂载） */
let latestConfigValue = null
function getLatestConfig() {
  return latestConfigValue
}

const ConfigProvider = ({
  paginationConfig,
  tableConfig,
  tableXConfig,
  children
}) => {
  const configValue = useMemo(
    () => ({
      paginationConfig: paginationConfig || null,
      tableConfig: tableConfig || null,
      // 三类表格共用一份配置即可；仅在 TableX 需单独覆盖时再传 tableXConfig
      tableXConfig: tableXConfig || tableConfig || null,
      bumpStickyLocalVersion
    }),
    [paginationConfig, tableConfig, tableXConfig]
  )

  latestConfigValue = configValue

  const paginationValue = useMemo(() => {
    if (!paginationConfig) return null
    return {
      preferredLimit: paginationConfig.preferredLimit,
      limitData: paginationConfig.limitData,
      onLimitChange: paginationConfig.onLimitChange
    }
  }, [paginationConfig])

  return (
    <ConfigContext.Provider value={configValue}>
      <PaginationConfigContext.Provider value={paginationValue}>
        {children}
      </PaginationConfigContext.Provider>
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  /** 分页：preferredLimit / limitData / onLimitChange */
  paginationConfig: PropTypes.shape({
    preferredLimit: PropTypes.number,
    limitData: PropTypes.array,
    onLimitChange: PropTypes.func
  }),
  /** Table / TableX / TableXVirtualized 共用；表头固定等 */
  tableConfig: PropTypes.shape({
    stickyHeader: PropTypes.bool,
    onStickyHeaderChange: PropTypes.func,
    /** 表头吸顶 top 偏移（px） */
    stickyTop: PropTypes.number,
    /** 是否展示「是否固定」控件（DIY 弹层内），默认 true */
    showLocalSticky: PropTypes.bool,
    /** 是否展示「一键固定」控件（DIY 弹层内），默认 true */
    showGlobalSticky: PropTypes.bool
  }),
  /** 可选；仅 TableX 需与 Table 不同配置时传入，否则回退 tableConfig */
  tableXConfig: PropTypes.shape({
    stickyHeader: PropTypes.bool,
    onStickyHeaderChange: PropTypes.func,
    stickyTop: PropTypes.number,
    showLocalSticky: PropTypes.bool,
    showGlobalSticky: PropTypes.bool
  }),
  children: PropTypes.node
}

export { ConfigContext, ConfigProvider, getLatestConfig }
export default ConfigProvider
