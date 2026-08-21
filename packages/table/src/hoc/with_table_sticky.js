import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  useTableHeaderSticky,
  tableStickyPropTypes
} from '@gmfe/react'

const STICKY_PROP_KEYS = [
  'stickyId',
  'sticky',
  'defaultSticky',
  'onStickyChange',
  'showLocalSticky',
  'showGlobalSticky',
  'localStickyText',
  'globalStickyText',
  'stickyTop'
]

const BOX_TABLE_STICKY_CLASS = 'gm-box-table-with-sticky-table'
const BOX_PANEL_STICKY_CLASS = 'gm-box-panel-with-sticky-table'
const HEADER_STICKY_CLASS = 'gm-react-table-header-sticky'
const SUB_TABLE_CLASS = 'gm-react-sub-table'
const LINKED_BY_SUB_ATTR = 'data-gm-sticky-linked-by-sub'
const LINKED_BY_PARENT_ATTR = 'data-gm-sticky-linked-by-parent'
const NESTED_PARENT_HEADER_VAR = '--gm-table-nested-parent-header-height'

/**
 * 把吸顶 CSS 变量同步到上层 BoxTable / BoxPanel，使操作栏/面板标题也能 sticky。
 * （CSS 变量只向下继承，需写到共同祖先）
 */
function syncAncestorStickyVars(tableEl, stickyTopOffset) {
  if (!tableEl) return null
  const top = `${stickyTopOffset || 0}px`
  tableEl.style.setProperty('--gm-table-header-sticky-top', top)

  const boxTable = tableEl.closest('.gm-box-table')
  const boxPanel = tableEl.closest('.gm-box-panel')
  const container = boxTable || boxPanel
  if (!container) return null

  const stickyClass = boxTable ? BOX_TABLE_STICKY_CLASS : BOX_PANEL_STICKY_CLASS
  const actionSelector = boxTable
    ? ':scope > .gm-box-table-header'
    : ':scope > .gm-box-panel-header'

  container.classList.add(stickyClass)
  container.style.setProperty('--gm-table-header-sticky-top', top)

  const action = container.querySelector(actionSelector)
  const actionH = action
    ? Math.round(action.getBoundingClientRect().height)
    : 0
  const actionPx = `${actionH}px`
  container.style.setProperty('--gm-table-action-sticky-height', actionPx)
  tableEl.style.setProperty('--gm-table-action-sticky-height', actionPx)
  return container
}

function clearAncestorStickyVars(container) {
  if (!container) return
  container.classList.remove(BOX_TABLE_STICKY_CLASS, BOX_PANEL_STICKY_CLASS)
  container.style.removeProperty('--gm-table-header-sticky-top')
  container.style.removeProperty('--gm-table-action-sticky-height')
}

function findParentReactTable(subEl) {
  let el = subEl && subEl.parentElement
  while (el) {
    if (
      el.classList &&
      el.classList.contains('ReactTable') &&
      !el.classList.contains(SUB_TABLE_CLASS)
    ) {
      return el
    }
    el = el.parentElement
  }
  return null
}

/** 子表是否带 DIY（有表头设置齿轮），无分组则不联动吸顶 */
function isDiyCapableSubTable(subEl) {
  if (!subEl) return false
  return !!subEl.querySelector('.table-icon')
}

function ensureStickyTheadDom(dom) {
  if (!dom || !dom.classList.contains(HEADER_STICKY_CLASS)) return
  if (dom.querySelector(':scope > .gm-react-table-sticky-thead-wrap')) return

  const rtTable = dom.getElementsByClassName('rt-table')[0]
  if (!rtTable) return
  const thead = rtTable.getElementsByClassName('rt-thead')[0]
  if (!thead) return

  const wrap = document.createElement('div')
  wrap.className = 'gm-react-table-sticky-thead-wrap'
  rtTable.removeChild(thead)
  wrap.appendChild(thead)
  dom.insertBefore(wrap, rtTable)

  const sync = () => {
    wrap.scrollLeft = rtTable.scrollLeft
  }
  rtTable.addEventListener('scroll', sync)
  wrap._gmStickyScrollSync = sync
  wrap._gmStickyRtTable = rtTable
  sync()
}

function teardownStickyTheadDom(dom) {
  if (!dom) return
  const wrap = dom.querySelector(':scope > .gm-react-table-sticky-thead-wrap')
  if (!wrap) return
  const rtTable =
    wrap._gmStickyRtTable || dom.getElementsByClassName('rt-table')[0]
  const thead = wrap.getElementsByClassName('rt-thead')[0]
  if (wrap._gmStickyScrollSync && rtTable) {
    rtTable.removeEventListener('scroll', wrap._gmStickyScrollSync)
  }
  if (rtTable && thead) {
    rtTable.insertBefore(thead, rtTable.firstChild)
  }
  if (wrap.parentNode) {
    wrap.parentNode.removeChild(wrap)
  }
}

function getStickyTheadHeight(tableEl) {
  if (!tableEl) return 0
  const wrap = tableEl.querySelector(':scope > .gm-react-table-sticky-thead-wrap')
  if (wrap) return Math.round(wrap.getBoundingClientRect().height)
  const thead = tableEl.querySelector('.rt-thead')
  return thead ? Math.round(thead.getBoundingClientRect().height) : 0
}

/**
 * 子表吸顶 → 联动父表头；父表吸顶 → 联动有 DIY 的子表。
 * 返回本次联动到的父表（便于清理）。
 */
function syncNestedStickyLink(tableEl, stickyTopOffset) {
  if (!tableEl) return null

  const isSub = tableEl.classList.contains(SUB_TABLE_CLASS)

  if (isSub) {
    const parent = findParentReactTable(tableEl)
    if (!parent) {
      tableEl.style.setProperty(NESTED_PARENT_HEADER_VAR, '0px')
      return null
    }

    if (!parent.classList.contains(HEADER_STICKY_CLASS)) {
      parent.classList.add(HEADER_STICKY_CLASS)
      parent.setAttribute(LINKED_BY_SUB_ATTR, '1')
    }
    ensureStickyTheadDom(parent)

    // 父表也需要 Box 操作栏偏移
    syncAncestorStickyVars(parent, stickyTopOffset)

    const parentH = getStickyTheadHeight(parent)
    tableEl.style.setProperty(NESTED_PARENT_HEADER_VAR, `${parentH}px`)
    return parent.getAttribute(LINKED_BY_SUB_ATTR) === '1' ? parent : null
  }

  // 父表自身吸顶：联动已展开的 DIY 子表
  tableEl.querySelectorAll(`.${SUB_TABLE_CLASS}`).forEach(sub => {
    if (!isDiyCapableSubTable(sub)) return

    const hadSticky = sub.classList.contains(HEADER_STICKY_CLASS)
    if (!hadSticky) {
      sub.classList.add(HEADER_STICKY_CLASS)
      sub.setAttribute(LINKED_BY_PARENT_ATTR, '1')
    } else if (!sub.getAttribute(LINKED_BY_PARENT_ATTR)) {
      // 子表自己的 sticky，只同步高度变量
    } else {
      sub.setAttribute(LINKED_BY_PARENT_ATTR, '1')
    }

    ensureStickyTheadDom(sub)

    const parentH = getStickyTheadHeight(tableEl)
    sub.style.setProperty(NESTED_PARENT_HEADER_VAR, `${parentH}px`)
    sub.style.setProperty(
      '--gm-table-header-sticky-top',
      `${stickyTopOffset || 0}px`
    )
    const actionH = getComputedStyle(tableEl)
      .getPropertyValue('--gm-table-action-sticky-height')
      .trim()
    if (actionH) {
      sub.style.setProperty('--gm-table-action-sticky-height', actionH)
    }
  })

  tableEl.style.setProperty(NESTED_PARENT_HEADER_VAR, '0px')
  return null
}

function clearLinkedParent(parent) {
  if (!parent || parent.getAttribute(LINKED_BY_SUB_ATTR) !== '1') return
  const stickySubs = parent.querySelectorAll(
    `.${SUB_TABLE_CLASS}.${HEADER_STICKY_CLASS}`
  )
  if (stickySubs.length > 0) return
  teardownStickyTheadDom(parent)
  parent.classList.remove(HEADER_STICKY_CLASS)
  parent.removeAttribute(LINKED_BY_SUB_ATTR)
  parent.style.removeProperty('--gm-table-header-sticky-top')
  parent.style.removeProperty('--gm-table-action-sticky-height')
  parent.style.removeProperty(NESTED_PARENT_HEADER_VAR)
}

function clearLinkedSubs(parentTable) {
  if (!parentTable) return
  parentTable
    .querySelectorAll(`.${SUB_TABLE_CLASS}[${LINKED_BY_PARENT_ATTR}="1"]`)
    .forEach(sub => {
      teardownStickyTheadDom(sub)
      sub.classList.remove(HEADER_STICKY_CLASS)
      sub.removeAttribute(LINKED_BY_PARENT_ATTR)
      sub.style.removeProperty(NESTED_PARENT_HEADER_VAR)
      sub.style.removeProperty('--gm-table-header-sticky-top')
      sub.style.removeProperty('--gm-table-action-sticky-height')
    })
}

/**
 * 为 Table 注入表头 sticky class（控件在 DIY「可选字段」旁展示）
 */
function withTableSticky(Component, options) {
  const { configKey = 'tableConfig', stickyClassName } = options

  const Wrapped = props => {
    const stickyState = useTableHeaderSticky(props, configKey)
    const rest = { ...props }
    STICKY_PROP_KEYS.forEach(key => {
      delete rest[key]
    })

    const { className, style, ...tableProps } = rest
    const stickyStyle =
      stickyState.headerSticky
        ? {
            ...style,
            ['--gm-table-header-sticky-top']: `${stickyState.stickyTopOffset ||
              0}px`
          }
        : style

    useEffect(() => {
      if (!stickyState.headerSticky) return undefined

      const touchedBoxes = []
      const linkedParents = []
      let observer = null
      let timer = null

      const apply = () => {
        document.querySelectorAll(`.${stickyClassName}`).forEach(el => {
          const box = syncAncestorStickyVars(el, stickyState.stickyTopOffset)
          if (box && touchedBoxes.indexOf(box) === -1) touchedBoxes.push(box)

          const linked = syncNestedStickyLink(el, stickyState.stickyTopOffset)
          if (linked && linkedParents.indexOf(linked) === -1) {
            linkedParents.push(linked)
          }
        })
      }

      const scheduleApply = () => {
        if (timer) return
        timer = setTimeout(() => {
          timer = null
          apply()
        }, 50)
      }

      apply()
      window.addEventListener('resize', apply)

      // 展开行会延迟挂载子表，需观察 DOM 变化以补联动
      if (typeof MutationObserver !== 'undefined') {
        observer = new MutationObserver(scheduleApply)
        observer.observe(document.body, { childList: true, subtree: true })
      }

      return () => {
        window.removeEventListener('resize', apply)
        if (observer) observer.disconnect()
        if (timer) clearTimeout(timer)

        touchedBoxes.forEach(clearAncestorStickyVars)

        // 等 React 去掉本表 sticky class 后再清联动父表
        const parentsSnapshot = linkedParents.slice()
        setTimeout(() => {
          parentsSnapshot.forEach(clearLinkedParent)
          // 父表自身关闭时，清掉仅因父表联动的子表
          document
            .querySelectorAll(`.ReactTable.${HEADER_STICKY_CLASS}`)
            .forEach(table => {
              if (table.classList.contains(SUB_TABLE_CLASS)) return
              // 父表已不再 sticky 时清理
              if (!table.classList.contains(HEADER_STICKY_CLASS)) {
                clearLinkedSubs(table)
              }
            })
          document
            .querySelectorAll(`.${SUB_TABLE_CLASS}[${LINKED_BY_PARENT_ATTR}="1"]`)
            .forEach(sub => {
              const parent = findParentReactTable(sub)
              if (!parent || !parent.classList.contains(HEADER_STICKY_CLASS)) {
                teardownStickyTheadDom(sub)
                sub.classList.remove(HEADER_STICKY_CLASS)
                sub.removeAttribute(LINKED_BY_PARENT_ATTR)
                sub.style.removeProperty(NESTED_PARENT_HEADER_VAR)
              }
            })
        }, 0)
      }
    }, [
      stickyState.headerSticky,
      stickyState.stickyTopOffset,
      stickyClassName
    ])

    return (
      <Component
        {...tableProps}
        style={stickyStyle}
        className={classNames(className, {
          [stickyClassName]: stickyState.headerSticky,
          // 一键固定开启但本表显式关闭「是否固定」时，退出分页吸底
          'gm-table-sticky-opt-out':
            stickyState.globalSticky &&
            !stickyState.headerSticky &&
            stickyState.hasLocalOverride
        })}
      />
    )
  }

  Wrapped.displayName = `withTableSticky(${Component.displayName ||
    Component.name ||
    'Component'})`
  Wrapped.propTypes = {
    ...tableStickyPropTypes,
    ...(Component.propTypes || {})
  }
  Wrapped.defaultProps = Component.defaultProps

  return Wrapped
}

export default withTableSticky
export { STICKY_PROP_KEYS }
