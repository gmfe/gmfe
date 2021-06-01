import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// 复杂了，请debug看dom位置。
function elementInViewport(top, dom, targetHeight, predictingHeight) {
  const buf = 5

  const rect = dom.getBoundingClientRect()
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight
  const domHeight = predictingHeight || rect.height

  if (top) {
    return {
      topInViewport: rect.top - domHeight - buf >= 0,
      bottomInViewport: null, // top 情况不用算，用不到
      left: rect.x
    }
  }

  return {
    topInViewport: rect.top - targetHeight - domHeight - buf >= 0,
    bottomInViewport: rect.top + domHeight + buf <= windowHeight,
    left: rect.x
  }
}

class Popup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      top: props.top,
      isModify: false
    }
  }

  componentDidMount() {
    const dom = findDOMNode(this.refPopup)

    let top = this.state.top

    const { topInViewport, bottomInViewport,left } = elementInViewport(
      top,
      dom,
      this.props.rect.height,
      this.props.predictingHeight
    )

    // 如果在上 且不够位置 就强制 bottom
    if (top && !topInViewport) {
      top = false
    }
    // 如果在下 且下不够位置 且上位置足够 就强制上
    else if (!top && !bottomInViewport && topInViewport) {
      top = true
    }

    this.setState({
      width: dom.offsetWidth,
      height: dom.offsetHeight,
      top,
      left
    })
  }

  componentDidUpdate() {
    const dom = findDOMNode(this.refPopup)
    if(dom.offsetWidth === this.state.width || this.state.isModify){
      return
    }
    this.setState({
      width: dom.offsetWidth,
      isModify: true
    })
  }

  renderTriggerArrow() {
    const { top, right, center, arrowLeft } = this.props

    const style = {}
    if (arrowLeft) {
      style.left = arrowLeft
    }

    return (
      <div
        className={classNames('gm-popup-arrow', {
          'gm-popup-arrow-top': top,
          'gm-popup-arrow-bottom': !top,
          'gm-popup-arrow-right': !center && right,
          'gm-popup-arrow-left': !center && !right,
          'gm-popup-arrow-center': center
        })}
        style={style}
      />
    )
  }

  render() {
    const {
      top,
      right,
      center,
      offset,
      showArrow,
      arrowLeft,
      pureContainer,
      children,
      rect,
      predictingHeight,
      className,
      style,
      ...rest
    } = this.props

    const { width, height, left } = this.state

    const sStyle = {
      top: rect.top + rect.height + (showArrow ? 5 : 1),
      minWidth: Math.max(rect.width, width)
    }

    if (center) {
      sStyle.left = rect.left + rect.width / 2 - width / 2 + offset
    } else if (right) {
      // sStyle.left = rect.left + rect.width - width + offset
      sStyle.right =
        document.documentElement.clientWidth - rect.left - rect.width - offset
    } else {
      sStyle.left = rect.left + offset
      const buf = 5
      let isless = document?.documentElement?.clientWidth - width - left - buf
      if(isless < 0){
        const maxWidthOffset = width + isless
        sStyle.maxWidth = `${maxWidthOffset}px`
        sStyle.minWidth = `${rect.width}px`
        sStyle.width = `${maxWidthOffset}px`
      }
    }

    if (this.state.top) {
      sStyle.top = rect.top - height - 2
    }

    return (
      <div
        ref={ref => (this.refPopup = ref)}
        tabIndex={0}
        {...rest}
        style={Object.assign(sStyle, style)}
        className={classNames(
          'gm-popup',
          {
            'gm-popup-pure': pureContainer
          },
          className
        )}
      >
        {showArrow && this.renderTriggerArrow()}
        {children}
      </div>
    )
  }
}

Popup.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  rect: PropTypes.object.isRequired,
  center: PropTypes.bool,
  top: PropTypes.bool,
  right: PropTypes.bool,
  offset: PropTypes.number,
  showArrow: PropTypes.bool, // 是否显示三角标
  arrowLeft: PropTypes.string,
  /** 预判高度。因为 popup 的宽高会是可变的，所以没法判断视窗内是否能放得下，于是有此。 */
  predictingHeight: PropTypes.number,
  /** 纯粹的，目前是没有背景色，没有阴影 */
  pureContainer: PropTypes.bool
}

Popup.defaultProps = {
  top: false,
  right: false,
  showArrow: false,
  offset: 0
}

export default Popup
