import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useTableHeaderSticky, tableStickyPropTypes } from '@gmfe/react'

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
const HEADER_STICKY_CLASS = 'gm-react-table-header-sticky'
const SUB_TABLE_CLASS = 'gm-react-sub-table'
const SELECT_CONTAINER_CLASS = 'gm-react-table-select'
const NESTED_PARENT_HEADER_VAR = '--gm-table-nested-parent-header-height'

/** 把吸顶 CSS 变量同步到表格自身、select 容器和 BoxTable。返回所有写过变量的节点，关掉时要全部清掉。 */
function syncBoxTableStickyVars(tableEl, stickyTopOffset) {
  if (!tableEl) return []
  const touched = []
  const mark = el => {
    if (el && touched.indexOf(el) === -1) touched.push(el)
  }
  const top = `${stickyTopOffset || 0}px`
  tableEl.style.setProperty('--gm-table-header-sticky-top', top)
  mark(tableEl)

  const select = tableEl.closest(`.${SELECT_CONTAINER_CLASS}`)
  if (select) {
    select.style.setProperty('--gm-table-header-sticky-top', top)
    mark(select)
  }

  const box = tableEl.closest('.gm-box-table')
  if (!box) return touched

  box.classList.add(BOX_STICKY_CLASS)
  mark(box)
  box.style.setProperty('--gm-table-header-sticky-top', top)

  const action = box.querySelector(':scope > .gm-box-table-header')
  const actionH = action ? Math.round(action.getBoundingClientRect().height) : 0
  const actionPx = `${actionH}px`
  box.style.setProperty('--gm-table-action-sticky-height', actionPx)
  tableEl.style.setProperty('--gm-table-action-sticky-height', actionPx)
  if (select) {
    select.style.setProperty('--gm-table-action-sticky-height', actionPx)
  }
  return touched
}

function clearBoxTableStickyVars(box) {
  if (!box) return
  // box 或 select 容器都可能被 push 进 touched
  box.classList.remove(BOX_STICKY_CLASS)
  box.style.removeProperty('--gm-table-header-sticky-top')
  box.style.removeProperty('--gm-table-action-sticky-height')
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

function getStickyTheadHeight(tableEl) {
  if (!tableEl) return 0
  const wrap = tableEl.querySelector(
    ':scope > .gm-react-table-sticky-thead-wrap'
  )
  if (wrap) return Math.round(wrap.getBoundingClientRect().height)
  const thead = tableEl.querySelector('.rt-thead')
  return thead ? Math.round(thead.getBoundingClientRect().height) : 0
}

/**
 * 嵌套子表吸顶时，把父表头高度写入 --gm-table-nested-parent-header-height，
 * 使子表头 sticky top = 导航 + 操作栏 + 父表头，避免与父表头叠在同一位置。
 */
function syncNestedParentHeaderHeights() {
  document
    .querySelectorAll(`.${SUB_TABLE_CLASS}.${HEADER_STICKY_CLASS}`)
    .forEach(sub => {
      const parent = findParentReactTable(sub)
      if (!parent || !parent.classList.contains(HEADER_STICKY_CLASS)) {
        sub.style.setProperty(NESTED_PARENT_HEADER_VAR, '0px')
        return
      }
      const parentH = getStickyTheadHeight(parent)
      sub.style.setProperty(NESTED_PARENT_HEADER_VAR, `${parentH}px`)

      // 继承父表的顶栏偏移（与父同属一个 BoxTable）
      const top = getComputedStyle(parent)
        .getPropertyValue('--gm-table-header-sticky-top')
        .trim()
      const actionH = getComputedStyle(parent)
        .getPropertyValue('--gm-table-action-sticky-height')
        .trim()
      if (top) sub.style.setProperty('--gm-table-header-sticky-top', top)
      if (actionH) {
        sub.style.setProperty('--gm-table-action-sticky-height', actionH)
      }
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
    const stickyStyle = stickyState.headerSticky
      ? {
          ...style,
          '--gm-table-header-sticky-top': `${stickyState.stickyTopOffset ||
            0}px`
        }
      : style

    useEffect(() => {
      if (!stickyState.headerSticky) return undefined

      const touched = []
      let observer = null
      let timer = null

      const apply = () => {
        document.querySelectorAll(`.${stickyClassName}`).forEach(el => {
          syncBoxTableStickyVars(el, stickyState.stickyTopOffset).forEach(
            node => {
              if (touched.indexOf(node) === -1) touched.push(node)
            }
          )
        })
        syncNestedParentHeaderHeights()
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

      // 展开行延迟挂载子表，需观察 DOM 以补算嵌套高度
      if (typeof MutationObserver !== 'undefined') {
        observer = new MutationObserver(scheduleApply)
        observer.observe(document.body, { childList: true, subtree: true })
      }

      return () => {
        window.removeEventListener('resize', apply)
        if (observer) observer.disconnect()
        if (timer) clearTimeout(timer)
        touched.forEach(clearBoxTableStickyVars)
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
