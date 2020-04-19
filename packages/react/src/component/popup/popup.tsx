import React, { Component, createRef, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import elementInView from './element_in_viewport'

interface PopupRectOptions {
  width: number
  height: number
  top: number
  left: number
}

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  rect: PopupRectOptions
  center?: boolean
  top?: boolean
  right?: boolean
  offset?: number
  showArrow?: boolean
  arrowLeft?: string | number
  /* 预判高度，因为 popup 的宽高是可变的，所以没法判断视窗是否能放得下 */
  predictingHeight?: number
  /* 纯粹的，目前是没有背景色，没有阴影 */
  pureContainer?: boolean
}

interface PopupState {
  width: number
  height: number
  top: boolean
}

export default class Popup extends Component<PopupProps, PopupState> {
  static defaultProps = {
    top: false,
    right: false,
    showArrow: false,
    offset: 0,
  }

  readonly state: PopupState = {
    width: 0,
    height: 0,
    top: !!this.props.top,
  }

  private _popupRef = createRef<HTMLDivElement>()

  componentDidMount() {
    let { top } = this.state
    const { rect, predictingHeight } = this.props
    const dom = this._popupRef.current as HTMLDivElement
    const { topInViewport, bottomInViewport } = elementInView(
      top,
      dom,
      rect.height,
      predictingHeight
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
    })
  }

  private _renderTriggerArrow = (): ReactNode => {
    const { top, right, center, arrowLeft } = this.props
    const style: CSSProperties = {}
    if (arrowLeft) {
      style.left = arrowLeft
    }
    return (
      <div
        style={style}
        className={classNames('gm-popup-arrow', {
          'gm-popup-arrow-top': top,
          'gm-popup-arrow-bottom': !top,
          'gm-popup-arrow-right': !center && right,
          'gm-popup-arrow-left': !center && !right,
          'gm-popup-arrow-center': center,
        })}
      />
    )
  }

  render() {
    const {
      top,
      right,
      center,
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
    const offset = rest.offset as number
    const { width, height } = this.state
    const sStyle: CSSProperties = {
      top: rect.top + rect.height + (showArrow ? 5 : 1),
      minWidth: Math.max(rect.width, width),
    }

    if (center) {
      sStyle.left = rect.left + rect.width / 2 - width / 2 + offset
    } else if (right) {
      sStyle.right = document.documentElement.clientWidth - rect.left - rect.width - offset
    } else {
      sStyle.left = rect.left + offset
    }

    if (this.state.top) {
      sStyle.top = rect.top - height - 2
    }

    return (
      <div
        ref={this._popupRef}
        tabIndex={0}
        {...rest}
        style={Object.assign(sStyle, style)}
        className={classNames('gm-popup', { 'gm-popup-pure': pureContainer }, className)}
      >
        {showArrow && this._renderTriggerArrow()}
        {children}
      </div>
    )
  }
}

export type { PopupRectOptions, PopupProps }
