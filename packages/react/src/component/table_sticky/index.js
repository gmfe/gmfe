import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import { Checkbox } from '../checkbox'
import ToolTip from '../tool_tip'
import Storage from '../storage'
import { ConfigContext } from '../config_provider'
import { getLocale } from '@gmfe/locales'
import { bumpStickyLocalVersion, subscribeStickyLocalVersion } from './sync'

const STORAGE_PREFIX = 'table_header_sticky_'

/**
 * 测算页面顶部固定/吸顶元素遮挡表头的高度。
 * 不依赖固定 class 名：扫描 body 直接子元素，取所有 position:fixed/sticky
 * 且贴近视口顶部的元素的最大 bottom。
 */
function measureStickyTopOffset() {
  if (typeof document === 'undefined') return 0

  const vh = window.innerHeight || document.documentElement.clientHeight
  let maxBottom = 0

  const consider = el => {
    const cs = window.getComputedStyle(el)
    if (cs.position !== 'fixed' && cs.position !== 'sticky') return
    if (cs.display === 'none' || cs.visibility === 'hidden') return
    const rect = el.getBoundingClientRect()
    if (rect.height < 1) return
    // 只关心贴近视口顶端的栏（避免把页面中部的 sticky 元素算进来）
    if (rect.top > Math.min(160, vh * 0.3)) return
    if (rect.bottom > maxBottom) maxBottom = rect.bottom
  }

  // 1) body 直接子元素（框架顶栏通常在这一层）
  Array.from(document.body.children).forEach(consider)
  // 2) 框架内容区根（部分布局把顶栏嵌在内部）
  document
    .querySelectorAll(
      '.gm-framework-right-top-default-inner, .gm-framework-right-top, .gm-framework-full-tabs-list'
    )
    .forEach(consider)

  return Math.max(0, Math.round(maxBottom))
}

/** 清理所有「是否固定」本地缓存（一键固定开启时调用） */
function clearAllLocalHeaderSticky() {
  const fullPrefix = '_react-gm_' + STORAGE_PREFIX
  const toRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const fullKey = localStorage.key(i)
    if (fullKey && fullKey.startsWith(fullPrefix)) {
      toRemove.push(fullKey)
    }
  }
  toRemove.forEach(k => localStorage.removeItem(k))
}

/**
 * 解析表格级「是否固定」与全局「一键固定」。
 * 优先级：本地显式设置 > 全局一键固定。
 * @param {'tableConfig'|'tableXConfig'} configKey
 */
function useTableHeaderSticky(props, configKey = 'tableConfig') {
  const {
    stickyId,
    id,
    sticky,
    defaultSticky = false,
    onStickyChange,
    localStickyText,
    globalStickyText,
    stickyTop
  } = props

  // diy 的 id 可复用为 stickyId
  const resolvedStickyId = stickyId || id

  const config = useContext(ConfigContext)
  const globalCfg =
    (config && (config[configKey] || config.tableConfig)) || null

  // 控件展示开关：props 优先，否则回退 ConfigProvider.tableConfig
  const showLocalSticky =
    props.showLocalSticky !== undefined
      ? props.showLocalSticky
      : globalCfg && globalCfg.showLocalSticky !== undefined
        ? globalCfg.showLocalSticky
        : true
  const showGlobalSticky =
    props.showGlobalSticky !== undefined
      ? props.showGlobalSticky
      : globalCfg && globalCfg.showGlobalSticky !== undefined
        ? globalCfg.showGlobalSticky
        : true

  const globalSticky = !!(globalCfg && globalCfg.stickyHeader)
  const onGlobalChangeRaw = globalCfg && globalCfg.onStickyHeaderChange
  const configStickyTop =
    stickyTop != null
      ? stickyTop
      : globalCfg && globalCfg.stickyTop != null
        ? globalCfg.stickyTop
        : null

  const isLocalControlled = sticky !== undefined

  const readLocal = useCallback(() => {
    if (isLocalControlled) return { value: !!sticky, hasOverride: true }
    if (!resolvedStickyId) {
      return { value: !!defaultSticky, hasOverride: false }
    }
    const cached = Storage.get(STORAGE_PREFIX + resolvedStickyId)
    if (cached === true || cached === false) {
      return { value: cached, hasOverride: true }
    }
    return { value: !!defaultSticky, hasOverride: false }
  }, [isLocalControlled, sticky, resolvedStickyId, defaultSticky])

  const [localState, setLocalState] = useState(readLocal)
  const [measuredTop, setMeasuredTop] = useState(0)

  // 其它实例改写 / 一键固定清缓存后同步
  useEffect(() => {
    return subscribeStickyLocalVersion(() => {
      setLocalState(readLocal())
    })
  }, [readLocal])

  const localSticky = localState.value
  const hasLocalOverride = localState.hasOverride

  /**
   * 本地显式值优先；无本地覆盖时跟随全局。
   * 这样「一键固定」清缓存后全表跟随全局，同时允许单表再改本地且不影响全局。
   */
  const headerSticky = hasLocalOverride ? localSticky : globalSticky

  // 吸顶偏移：优先 props/config，否则自动测量顶部 fixed 栏
  useEffect(() => {
    if (!headerSticky) return undefined
    if (configStickyTop != null) {
      setMeasuredTop(Number(configStickyTop) || 0)
      return undefined
    }
    const update = () => setMeasuredTop(measureStickyTopOffset())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [headerSticky, configStickyTop])

  const stickyTopOffset =
    configStickyTop != null ? Number(configStickyTop) || 0 : measuredTop

  const setLocalSticky = useCallback(
    next => {
      const checked = !!next
      if (!isLocalControlled) {
        setLocalState({ value: checked, hasOverride: true })
        if (resolvedStickyId) {
          Storage.set(STORAGE_PREFIX + resolvedStickyId, checked)
        }
        bumpStickyLocalVersion()
      }
      onStickyChange && onStickyChange(checked)
    },
    [isLocalControlled, resolvedStickyId, onStickyChange]
  )

  /**
   * Checkbox 展示：有本地覆盖用本地值，否则镜像全局（一键固定后呈现全选）
   */
  const localChecked = hasLocalOverride ? localSticky : globalSticky

  /**
   * 当前组件 DIY 里「一键固定」的勾选展示（不改全局偏好）：
   * 取消「是否固定」时，本弹层内的「一键固定」同步显示为未勾选；
   * 其它表仍按真实 globalSticky 展示。
   */
  const globalChecked = globalSticky && localChecked

  const handleGlobalChange = useCallback(
    next => {
      const checked = !!next
      // 开启/关闭一键固定都清本地：开启后全表跟随勾选，关闭后全表取消勾选
      clearAllLocalHeaderSticky()
      bumpStickyLocalVersion()
      onGlobalChangeRaw && onGlobalChangeRaw(checked)
    },
    [onGlobalChangeRaw]
  )

  const canShowLocal = showLocalSticky !== false && !!resolvedStickyId
  const canShowGlobal =
    showGlobalSticky !== false &&
    typeof onGlobalChangeRaw === 'function' &&
    !!resolvedStickyId
  const showControls = canShowLocal || canShowGlobal

  const texts = useMemo(
    () => ({
      local: localStickyText != null ? localStickyText : getLocale('是否固定'),
      global: globalStickyText != null ? globalStickyText : getLocale('一键固定')
    }),
    [localStickyText, globalStickyText]
  )

  return {
    stickyId: resolvedStickyId,
    headerSticky,
    localSticky,
    localChecked,
    globalSticky,
    globalChecked,
    hasLocalOverride,
    setLocalSticky,
    onGlobalChange: handleGlobalChange,
    canShowLocal,
    canShowGlobal,
    showControls,
    showToolbar: showControls,
    texts,
    stickyTopOffset
  }
}

/**
 * 表头固定 Checkbox 控件（放在 DIY「可选字段」旁）
 */
const TableStickyControls = ({
  localChecked,
  globalSticky,
  globalChecked,
  setLocalSticky,
  onGlobalChange,
  canShowLocal,
  canShowGlobal,
  texts,
  className,
  style
}) => {
  if (!canShowLocal && !canShowGlobal) return null

  // 阻止冒泡，避免 DIY Popover 被 body click / 冒泡逻辑关闭
  const stop = e => {
    e.stopPropagation()
  }

  // 优先用组件级展示值；未传时回退真实全局（兼容旧调用）
  const globalShown =
    globalChecked !== undefined ? globalChecked : globalSticky

  return (
    <Flex
      alignCenter
      className={classNames('gm-table-sticky-controls', className)}
      style={style}
      onClick={stop}
      onMouseDown={stop}
    >
      {canShowLocal && (
        <Checkbox
          inline
          checked={!!localChecked}
          onClick={stop}
          onChange={e => {
            stop(e)
            setLocalSticky(!!e.target.checked)
          }}
          className='gm-margin-right-10'
        >
          {texts.local}
          <ToolTip
            popup={
              <div
                className='gm-popover-is-in-popup'
                style={{ maxWidth: '220px', padding: '8px 4px' }}
                onClick={stop}
                onMouseDown={stop}
              >
                {getLocale(
                  '开启后，当前列表的表头在纵向滚动时固定置顶，仅对当前列表生效。'
                )}
              </div>
            }
          />
        </Checkbox>
      )}
      {canShowGlobal && (
        <Checkbox
          inline
          checked={!!globalShown}
          onClick={stop}
          onChange={e => {
            stop(e)
            onGlobalChange && onGlobalChange(!!e.target.checked)
          }}
        >
          {texts.global}
          <ToolTip
            popup={
              <div
                className='gm-popover-is-in-popup'
                style={{ maxWidth: '220px', padding: '8px 4px' }}
                onClick={stop}
                onMouseDown={stop}
              >
                {getLocale(
                  '开启后，所有列表的表头都会固定置顶；关闭则会取消所有列表的表头固定。'
                )}
              </div>
            }
          />
        </Checkbox>
      )}
    </Flex>
  )
}

TableStickyControls.propTypes = {
  localChecked: PropTypes.bool,
  /** 真实全局一键固定状态 */
  globalSticky: PropTypes.bool,
  /**
   * 当前组件弹层内「一键固定」展示勾选（可与全局不一致）。
   * 取消是否固定时为 false，但不写回全局偏好。
   */
  globalChecked: PropTypes.bool,
  setLocalSticky: PropTypes.func,
  onGlobalChange: PropTypes.func,
  canShowLocal: PropTypes.bool,
  canShowGlobal: PropTypes.bool,
  texts: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
}

/** @deprecated 兼容旧名，内部已改为 Checkbox */
const TableStickyToolbar = TableStickyControls

/** 供 Table / TableX 复用的 sticky 相关 props */
const tableStickyPropTypes = {
  /** localStorage key；不传时回退 diy 的 id */
  stickyId: PropTypes.string,
  /** 受控：当前表是否固定 */
  sticky: PropTypes.bool,
  defaultSticky: PropTypes.bool,
  onStickyChange: PropTypes.func,
  /** 是否展示「是否固定」，默认 true */
  showLocalSticky: PropTypes.bool,
  /** 是否展示「一键固定」，默认 true（仍需 ConfigProvider 回调） */
  showGlobalSticky: PropTypes.bool,
  localStickyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  globalStickyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** 吸顶 top 偏移（px）；不传则自动测量顶部 fixed 栏 */
  stickyTop: PropTypes.number
}

export {
  useTableHeaderSticky,
  TableStickyControls,
  TableStickyToolbar,
  tableStickyPropTypes,
  clearAllLocalHeaderSticky,
  measureStickyTopOffset,
  STORAGE_PREFIX
}
