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
 * 历史「一键固定」挂在 body 上的 class。功能已下线，仅保留常量便于清理残留。
 * @deprecated
 */
const GLOBAL_STICKY_BODY_CLASS = 'gm-global-table-header-sticky'
/** 本表显式关闭「是否固定」时挂在表格上（历史兼容，分页吸底现仅看表头 sticky class） */
const STICKY_OPT_OUT_CLASS = 'gm-table-sticky-opt-out'

/** 清除 body 上历史「一键固定」class（功能已下线） */
function syncGlobalStickyBodyClass(enabled) {
  if (typeof document === 'undefined' || !document.body) return
  document.body.classList.toggle(GLOBAL_STICKY_BODY_CLASS, !!enabled)
}

/**
 * 同一业务页的查看/编辑表常有不同 diy id（*view / *edit / *_detail / *_edit），
 * 未显式传 stickyId 时去掉这些后缀，使吸顶偏好共用。
 */
function normalizeTableStickyId(id) {
  if (!id || typeof id !== 'string') return id
  return id.replace(/(_?(view|edit|detail))+$/i, '')
}

/** stickyId 优先；否则对 diy id 做归一化 */
function resolveTableStickyStorageId(stickyId, id) {
  if (stickyId) return stickyId
  const normalized = normalizeTableStickyId(id)
  return normalized || id
}

/**
 * 读取本地「是否固定」。先读归一化 key，再回退历史完整 diy id / 常见后缀并迁移。
 * @returns {{ value: boolean|undefined, hasOverride: boolean }}
 */
function readTableStickyLocal(storageId, legacyId) {
  if (!storageId) return { value: undefined, hasOverride: false }

  const candidates = []
  const push = key => {
    if (key && candidates.indexOf(key) === -1) candidates.push(key)
  }
  push(storageId)
  push(legacyId)
  ;['view', 'edit', 'detail', 'editedit'].forEach(suf => {
    push(storageId + suf)
    push(storageId + '_' + suf)
  })

  for (let i = 0; i < candidates.length; i++) {
    const cached = Storage.get(STORAGE_PREFIX + candidates[i])
    if (cached === true || cached === false) {
      if (candidates[i] !== storageId) {
        Storage.set(STORAGE_PREFIX + storageId, cached)
      }
      return { value: cached, hasOverride: true }
    }
  }
  return { value: undefined, hasOverride: false }
}

/**
 * 测算页面顶部固定/吸顶元素遮挡表头的高度。
 * 不依赖固定 class 名：扫描 body 直接子元素，取所有 position:fixed/sticky
 * 且贴近视口顶部的元素的最大 bottom。
 */
function measureStickyTopOffset() {
  if (typeof document === 'undefined') return 0

  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  let maxBottom = 0

  const consider = el => {
    const cs = window.getComputedStyle(el)
    if (cs.position !== 'fixed' && cs.position !== 'sticky') return
    if (cs.display === 'none' || cs.visibility === 'hidden') return
    const rect = el.getBoundingClientRect()
    if (rect.height < 1) return
    // 排除左侧菜单等窄栏，只认接近全宽的顶栏
    if (vw > 0 && rect.width < vw * 0.4) return
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
  // 3) 业务侧用 gm-position-fixed 挂的顶栏（如单据详情 HeaderActionFixed）
  document.querySelectorAll('.gm-position-fixed').forEach(consider)

  return Math.max(0, Math.round(maxBottom))
}

/**
 * @deprecated 「一键固定」已下线；保留空实现以免外部引用报错。
 */
function clearAllLocalHeaderSticky() {}

/**
 * 解析表格级「是否固定」（仅本表 localStorage，不再跟随全局一键固定）。
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
    stickyTop
  } = props

  // diy 的 id 可复用；未传 stickyId 时归一化 view/edit/detail 后缀以便同页共用
  const resolvedStickyId = resolveTableStickyStorageId(stickyId, id)
  const legacyStickyId = stickyId ? null : id

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
    const cached = readTableStickyLocal(resolvedStickyId, legacyStickyId)
    if (cached.hasOverride) {
      return { value: cached.value, hasOverride: true }
    }
    return { value: !!defaultSticky, hasOverride: false }
  }, [
    isLocalControlled,
    sticky,
    resolvedStickyId,
    legacyStickyId,
    defaultSticky
  ])

  const [localState, setLocalState] = useState(readLocal)
  const [measuredTop, setMeasuredTop] = useState(0)

  // 其它实例改写本地缓存后同步
  useEffect(() => {
    return subscribeStickyLocalVersion(() => {
      setLocalState(readLocal())
    })
  }, [readLocal])

  const localSticky = localState.value
  const hasLocalOverride = localState.hasOverride
  /** 仅本表「是否固定」，不再跟随全局 stickyHeader */
  const headerSticky = !!localSticky

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

  const localChecked = !!localSticky

  const canShowLocal = showLocalSticky !== false && !!resolvedStickyId
  /** 「一键固定」已下线 */
  const canShowGlobal = false
  const showControls = canShowLocal

  const texts = useMemo(
    () => ({
      local: localStickyText != null ? localStickyText : getLocale('是否固定'),
      global: getLocale('一键固定')
    }),
    [localStickyText]
  )

  return {
    stickyId: resolvedStickyId,
    headerSticky,
    localSticky,
    localChecked,
    /** @deprecated 恒为 false */
    globalSticky: false,
    /** @deprecated 恒为 false */
    globalChecked: false,
    hasLocalOverride,
    setLocalSticky,
    /** @deprecated no-op */
    onGlobalChange: () => {},
    canShowLocal,
    canShowGlobal,
    showControls,
    showToolbar: showControls,
    texts,
    stickyTopOffset
  }
}

/**
 * 表头固定 Checkbox 控件（放在 DIY「可选字段」旁）——仅「是否固定」
 */
const TableStickyControls = ({
  localChecked,
  setLocalSticky,
  canShowLocal,
  texts,
  className,
  style
}) => {
  if (!canShowLocal) return null

  // 阻止冒泡，避免 DIY Popover 被 body click / 冒泡逻辑关闭
  const stop = e => {
    e.stopPropagation()
  }

  return (
    <Flex
      alignCenter
      className={classNames('gm-table-sticky-controls', className)}
      style={style}
      onClick={stop}
      onMouseDown={stop}
    >
      <Checkbox
        inline
        checked={!!localChecked}
        onClick={stop}
        onChange={e => {
          stop(e)
          setLocalSticky(!!e.target.checked)
        }}
      >
        {texts.local}
        <ToolTip
          popup={
            <div
              className='gm-popover-is-in-popup'
              style={{ maxWidth: '280px', padding: '8px 4px' }}
              onClick={stop}
              onMouseDown={stop}
            >
              {getLocale(
                '开启后，当前列表的表头在纵向滚动时固定置顶、分页筛选固定于底部，仅对当前列表生效。'
              )}
            </div>
          }
        />
      </Checkbox>
    </Flex>
  )
}

TableStickyControls.propTypes = {
  localChecked: PropTypes.bool,
  /** @deprecated 忽略 */
  globalSticky: PropTypes.bool,
  /** @deprecated 忽略 */
  globalChecked: PropTypes.bool,
  setLocalSticky: PropTypes.func,
  /** @deprecated 忽略 */
  onGlobalChange: PropTypes.func,
  canShowLocal: PropTypes.bool,
  /** @deprecated 忽略 */
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
  /** @deprecated 「一键固定」已下线，传入无效 */
  showGlobalSticky: PropTypes.bool,
  localStickyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** @deprecated 「一键固定」已下线，传入无效 */
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
  normalizeTableStickyId,
  resolveTableStickyStorageId,
  readTableStickyLocal,
  syncGlobalStickyBodyClass,
  GLOBAL_STICKY_BODY_CLASS,
  STICKY_OPT_OUT_CLASS,
  STORAGE_PREFIX
}
