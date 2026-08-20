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

      const touched = []
      const apply = () => {
        document.querySelectorAll(`.${stickyClassName}`).forEach(el => {
          const box = syncAncestorStickyVars(
            el,
            stickyState.stickyTopOffset
          )
          if (box && touched.indexOf(box) === -1) touched.push(box)
        })
      }

      apply()
      window.addEventListener('resize', apply)
      return () => {
        window.removeEventListener('resize', apply)
        touched.forEach(clearAncestorStickyVars)
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
