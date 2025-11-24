/**
 * @author: stanfer
 * @description: 粘性布局高阶组件，用于实现表格等组件的粘性头部效果
 * @createDate: 2025/11/24 10:05
 * @Version: 1.0
 **/
import React, { useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

// 常量配置
const CONSTANTS = {
  PADDING: {
    RT_THEAD: 10,
    BOX_TABLE_HEADER: 10,
    TABLE_X_THEAD: 8
  },
  Z_INDEX: {
    RT_THEAD: 10,
    STICKY_LAYOUT: 101
  },
  HEIGHT: {
    FULL_TAB: 40,
    TOP_NAV: 50,
    DEFAULT_MAX: '50%'
  }
}

// IntersectionObserver 配置
const OBSERVER_OPTIONS = {
  root: null, // 相对于浏览器视口
  rootMargin: '0px',
  threshold: 0 // 只要有一个像素进入/离开视口就触发
}

// 哨兵元素样式
const SENTINEL_STYLE = {
  position: 'absolute',
  left: '0',
  width: '100%',
  height: '1px',
  pointerEvents: 'none',
  backgroundColor: 'transparent'
}

/**
 * 计算最大高度
 * @param {number} heightSum - 高度总和
 * @param {number} fullTabCount - 全屏标签页数量
 * @returns {string} 计算后的最大高度值
 */
const calculateMaxHeight = (heightSum, fullTabCount = 0) => {
  const extraHeight =
    fullTabCount * CONSTANTS.HEIGHT.FULL_TAB + CONSTANTS.HEIGHT.TOP_NAV
  return `calc(100vh - ${heightSum + extraHeight}px)`
}

/**
 * 设置表格最大高度
 * @param {NodeList|Element[]} elements - 需要设置的元素列表
 * @param {number} heightSum - 高度总和
 * @param {number} fullTabCount - 全屏标签页数量
 */
const setElementsMaxHeight = (elements, heightSum, fullTabCount) => {
  const maxHeight = calculateMaxHeight(heightSum, fullTabCount)
  elements.forEach(el => {
    el.style.maxHeight = maxHeight
  })
}

/**
 * 计算粘性元素的总高度
 * @returns {{heightSum: number, tableRoot: Element|null, fullTabCount: number}}
 */
const calculateStickyHeight = () => {
  let heightSum = 0
  let tableRoot = null

  // 查询 DOM 元素
  const fullTab = document.querySelectorAll('.gm-framework-full-tabs')
  const commonStickyHeader = document.querySelectorAll('.common-sticky-header')
  const rtTheadHeader = document.querySelectorAll('.rt-thead')

  // 处理 rt-thead 元素
  rtTheadHeader.forEach(el => {
    el.style.position = 'sticky'
    el.style.top = '0'
    el.style.zIndex = CONSTANTS.Z_INDEX.RT_THEAD
    heightSum += el.offsetHeight + CONSTANTS.PADDING.RT_THEAD
  })

  // 处理 common-sticky-header 元素
  commonStickyHeader.forEach(item => {
    if (fullTab.length) {
      const currentSticky = document.querySelector('.common-sticky-layout')
      if (currentSticky) {
        currentSticky.style.zIndex = CONSTANTS.Z_INDEX.STICKY_LAYOUT
      }
    }

    if (item.className.includes('gm-box-table-header')) {
      heightSum += item.offsetHeight + CONSTANTS.PADDING.BOX_TABLE_HEADER
    }

    if (item.className.includes('gm-table-x-thead')) {
      heightSum += item.offsetHeight + CONSTANTS.PADDING.TABLE_X_THEAD
      tableRoot = item.parentElement?.parentElement || null
    }
  })

  return {
    heightSum,
    tableRoot,
    fullTabCount: fullTab.length
  }
}

/**
 * 处理顶部哨兵进入视口
 */
const handleTopSentinelEnter = currentStickyRef => {
  const { heightSum, tableRoot, fullTabCount } = calculateStickyHeight()

  // 设置 rt-table 元素的最大高度
  const rtTable = document.querySelectorAll('.rt-table')
  if (rtTable.length) {
    setElementsMaxHeight(rtTable, heightSum, fullTabCount)
  }

  // 设置 tableRoot 的最大高度
  if (tableRoot) {
    tableRoot.style.maxHeight = calculateMaxHeight(heightSum, fullTabCount)
  }
}

/**
 * 处理顶部哨兵离开视口
 */
const handleTopSentinelLeave = currentStickyRef => {
  if (currentStickyRef.current) {
    currentStickyRef.current.style.maxHeight = CONSTANTS.HEIGHT.DEFAULT_MAX
  }
}

function StickyLayout(Component) {
  const _StickyLayout = ({ sticky, ...rest }) => {
    const currentStickyRef = useRef(null)
    const topSentinelRef = useRef(null)
    const bottomSentinelRef = useRef(null)
    const observerRef = useRef(null)

    // 哨兵元素样式
    const topSentinelStyle = useMemo(
      () => ({ ...SENTINEL_STYLE, top: '0' }),
      []
    )
    const bottomSentinelStyle = useMemo(
      () => ({ ...SENTINEL_STYLE, bottom: '0' }),
      []
    )

    useEffect(() => {
      if (!sticky || !currentStickyRef.current) return undefined

      if (typeof window.IntersectionObserver === 'undefined') {
        return undefined
      }

      observerRef.current = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          const target = entry.target

          if (target === topSentinelRef.current) {
            if (entry.isIntersecting) {
              handleTopSentinelEnter(currentStickyRef)
            } else {
              handleTopSentinelLeave(currentStickyRef)
            }
          }
        })
      }, OBSERVER_OPTIONS)

      // 观察哨兵元素
      if (topSentinelRef.current) {
        observerRef.current.observe(topSentinelRef.current)
      }
      if (bottomSentinelRef.current) {
        observerRef.current.observe(bottomSentinelRef.current)
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, [sticky])

    if (!sticky) {
      return <Component {...rest} />
    }

    return (
      <div ref={currentStickyRef} className='common-sticky-layout'>
        <div
          ref={topSentinelRef}
          data-sentinel='topSentinel'
          style={topSentinelStyle}
        />
        <Component {...rest} />
        <div
          ref={bottomSentinelRef}
          data-sentinel='bottomSentinel'
          style={bottomSentinelStyle}
        />
      </div>
    )
  }

  _StickyLayout.defaultProps = {
    sticky: true
  }

  _StickyLayout.propTypes = {
    sticky: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  }

  return _StickyLayout
}

export default StickyLayout
