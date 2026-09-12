import React, { useEffect } from 'react'
import { useTableHeaderSticky, tableStickyPropTypes } from '@gmfe/react'
import classNames from 'classnames'

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

const BOX_STICKY_CLASS = 'gm-box-table-with-sticky-table'
const SELECT_CONTAINER_CLASS = 'gm-table-x-select-container'
const BATCH_BAR_CONTAINER = 'gm-table-x-select-batch-action-bar-container'
const BATCH_STICKY_HEIGHT = '50px'

/**
 * 把吸顶 CSS 变量同步到共同祖先：
 * - BoxTable：操作栏 sticky；批量条盖住操作栏，表头只加 action 高度
 * - 无 BoxTable 时（如分单页自定义工具栏）：批量条变量写到 select 容器，
 *   并设置 batch 高度给表头，避免与批量条叠在同一 top
 */
function syncStickyAncestorVars(tableEl, stickyTopOffset) {
  if (!tableEl) return { box: null, select: null }
  const top = `${stickyTopOffset || 0}px`
  tableEl.style.setProperty('--gm-table-header-sticky-top', top)

  const select = tableEl.closest(`.${SELECT_CONTAINER_CLASS}`)
  if (select) {
    select.style.setProperty('--gm-table-header-sticky-top', top)
  }

  const box = tableEl.closest('.gm-box-table')
  let actionH = 0
  if (box) {
    box.classList.add(BOX_STICKY_CLASS)
    box.style.setProperty('--gm-table-header-sticky-top', top)

    const action = box.querySelector(':scope > .gm-box-table-header')
    actionH = action ? Math.round(action.getBoundingClientRect().height) : 0
    const actionPx = `${actionH}px`
    box.style.setProperty('--gm-table-action-sticky-height', actionPx)
    tableEl.style.setProperty('--gm-table-action-sticky-height', actionPx)
    if (select) {
      select.style.setProperty('--gm-table-action-sticky-height', actionPx)
    }
  }

  // 有 BoxTable 操作栏时，批量条盖住操作栏，表头不再加 batch 高度。
  // 无操作栏时（自定义工具栏），批量条本身占吸顶槽，需给表头预留 batch 高度。
  const hasBatch =
    select &&
    select.querySelector(`:scope > .${BATCH_BAR_CONTAINER}`)
  if (hasBatch && actionH === 0) {
    tableEl.style.setProperty(
      '--gm-table-batch-action-sticky-height',
      BATCH_STICKY_HEIGHT
    )
    select.style.setProperty(
      '--gm-table-batch-action-sticky-height',
      BATCH_STICKY_HEIGHT
    )
  } else {
    tableEl.style.removeProperty('--gm-table-batch-action-sticky-height')
    if (select) {
      select.style.removeProperty('--gm-table-batch-action-sticky-height')
    }
  }

  return { box, select }
}

function clearStickyAncestorVars(box, select) {
  if (box) {
    box.classList.remove(BOX_STICKY_CLASS)
    box.style.removeProperty('--gm-table-header-sticky-top')
    box.style.removeProperty('--gm-table-action-sticky-height')
  }
  if (select) {
    select.style.removeProperty('--gm-table-header-sticky-top')
    select.style.removeProperty('--gm-table-action-sticky-height')
    select.style.removeProperty('--gm-table-batch-action-sticky-height')
  }
}

/**
 * 为 TableX / TableXVirtualized 注入表头 sticky class
 * （控件在 DIY「可选字段」旁展示）
 */
function withTableSticky(Component, options) {
  const { stickyClassName } = options

  const Wrapped = props => {
    const stickyState = useTableHeaderSticky(props, 'tableXConfig')
    const rest = { ...props }
    STICKY_PROP_KEYS.forEach(key => {
      delete rest[key]
    })

    const { className, style, ...tableProps } = rest
    const stickyStyle = stickyState.headerSticky
      ? {
          ...style,
          '--gm-table-header-sticky-top': `${stickyState.stickyTopOffset ||
            0}px`
        }
      : style

    useEffect(() => {
      if (!stickyState.headerSticky) return undefined

      const touchedBoxes = []
      const touchedSelects = []
      let observer = null
      let timer = null

      const apply = () => {
        document.querySelectorAll(`.${stickyClassName}`).forEach(el => {
          const { box, select } = syncStickyAncestorVars(
            el,
            stickyState.stickyTopOffset
          )
          if (box && touchedBoxes.indexOf(box) === -1) touchedBoxes.push(box)
          if (select && touchedSelects.indexOf(select) === -1) {
            touchedSelects.push(select)
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

      // 勾选后批量条才挂载，需观察 DOM 以补算 batch 高度
      if (typeof MutationObserver !== 'undefined') {
        observer = new MutationObserver(scheduleApply)
        observer.observe(document.body, { childList: true, subtree: true })
      }

      return () => {
        window.removeEventListener('resize', apply)
        if (observer) observer.disconnect()
        if (timer) clearTimeout(timer)
        touchedBoxes.forEach(box => clearStickyAncestorVars(box, null))
        touchedSelects.forEach(select => clearStickyAncestorVars(null, select))
      }
    }, [stickyState.headerSticky, stickyState.stickyTopOffset, stickyClassName])

    return (
      <Component
        {...tableProps}
        style={stickyStyle}
        className={classNames(className, {
          [stickyClassName]: stickyState.headerSticky
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
