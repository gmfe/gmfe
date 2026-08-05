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

const BOX_STICKY_CLASS = 'gm-box-table-with-sticky-table'

/** 把吸顶 CSS 变量同步到上层 BoxTable，使操作栏也能 sticky */
function syncBoxTableStickyVars(tableEl, stickyTopOffset) {
  if (!tableEl) return null
  const box = tableEl.closest('.gm-box-table')
  const top = `${stickyTopOffset || 0}px`
  tableEl.style.setProperty('--gm-table-header-sticky-top', top)

  if (!box) return null

  box.classList.add(BOX_STICKY_CLASS)
  box.style.setProperty('--gm-table-header-sticky-top', top)

  const action = box.querySelector(':scope > .gm-box-table-header')
  const actionH = action
    ? Math.round(action.getBoundingClientRect().height)
    : 0
  const actionPx = `${actionH}px`
  box.style.setProperty('--gm-table-action-sticky-height', actionPx)
  tableEl.style.setProperty('--gm-table-action-sticky-height', actionPx)
  return box
}

function clearBoxTableStickyVars(box) {
  if (!box) return
  box.classList.remove(BOX_STICKY_CLASS)
  box.style.removeProperty('--gm-table-header-sticky-top')
  box.style.removeProperty('--gm-table-action-sticky-height')
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
          const box = syncBoxTableStickyVars(
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
        touched.forEach(clearBoxTableStickyVars)
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
