import React, {
  Children,
  cloneElement,
  Component,
  ComponentElement,
  createRef,
  HTMLAttributes,
  ReactElement,
} from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import { createChainedFunction } from '@gm-common/tool'
import _ from 'lodash'
import { PopoverProps } from './types'
import { Popup, PopupRectOptions } from '../popup'
import EVENT_TYPE from '../../event_type'
import { LayoutRoot } from '../layout_root'
import { getElementPositionWithScroll, isContains } from './utils'

interface PopoverState {
  active: boolean
}

export default class Popover extends Component<PopoverProps, PopoverState> {
  static defaultProps = {
    type: 'focus',
  }

  readonly state: PopoverState = {
    active: false,
  }

  private _timer: number | undefined
  private _popupRef = createRef<Popup>()
  private _id = `${+new Date()}${Math.random()}`
  private _isUnmounted = false
  private _rect: PopupRectOptions | undefined

  componentDidMount() {
    const { type } = this.props
    if (type === 'click' || type === 'focus') {
      window.document.body.addEventListener('click', this._handleBodyClick)
    } else if (this.props.type === 'realFocus') {
      // 原生 blur 不能冒泡，focusout 才能冒泡
      window.document.body.addEventListener('focusout', this._handleBodyFocusOut)
    }

    window.addEventListener(EVENT_TYPE.MODAL_SCROLL, this._debounceHandleModalScroll)
    window.addEventListener(EVENT_TYPE.BROWSER_SCROLL, this._debounceHandleBrowserScroll)
    window.addEventListener(EVENT_TYPE.DRAWER_SCROLL, this._debounceHandleDrawerScroll)
    window.addEventListener(EVENT_TYPE.TABLE_SCROLL, this._debounceHandleTableScroll)
  }

  componentWillUnmount() {
    this._isUnmounted = true
    const { type } = this.props
    if (type === 'click' || type === 'focus') {
      window.document.body.removeEventListener('click', this._handleBodyClick)
    } else if (type === 'realFocus') {
      window.document.body.removeEventListener('focusout', this._handleBodyFocusOut)
    }

    LayoutRoot.removeComponentPopup(this._id)
    window.removeEventListener(EVENT_TYPE.MODAL_SCROLL, this._debounceHandleModalScroll)
    window.removeEventListener(EVENT_TYPE.BROWSER_SCROLL, this._debounceHandleBrowserScroll)
    window.removeEventListener(EVENT_TYPE.DRAWER_SCROLL, this._debounceHandleDrawerScroll)
    window.removeEventListener(EVENT_TYPE.TABLE_SCROLL, this._debounceHandleTableScroll)
  }

  componentDidUpdate() {
    this._doRenderPopup(this.state.active)
  }

  /* 注意，先调用这个，再处理业务的 onXXX。比如 date-picker */
  public apiDoSetActive = (active?: boolean): void => {
    this._setActive(!!active)
  }

  private _handleDrawerScroll = () => {
    if (this.state.active) {
      this._setActive(this.state.active)
    }
  }

  private _handleModalScroll = () => {
    if (this.state.active) {
      this._setActive(this.state.active)
    }
  }

  private _handleBrowserScroll = () => {
    if (this.state.active) {
      this._setActive(this.state.active)
    }
  }

  private _handleTableScroll = () => {
    if (this.state.active) {
      this._setActive(this.state.active)
    }
  }

  private _debounceHandleModalScroll = _.debounce(this._handleModalScroll, 200)

  private _debounceHandleBrowserScroll = _.debounce(this._handleBrowserScroll, 200)

  private _debounceHandleDrawerScroll = _.debounce(this._handleDrawerScroll, 200)

  private _debounceHandleTableScroll = _.debounce(this._handleTableScroll, 200)

  private _setActive = (active: boolean): void => {
    if (this._isUnmounted) {
      return
    }
    if (active) {
      // eslint-disable-next-line react/no-find-dom-node
      const dom = findDOMNode(this) as HTMLElement
      const { left, top } = getElementPositionWithScroll(dom as HTMLElement)
      this._rect = {
        left,
        top,
        height: dom.offsetHeight,
        width: dom.offsetWidth,
      }
    }
    this.setState({ active })
  }

  private _handleBodyClick = (event: MouseEvent): void => {
    this._doBodyClickAndFocusOut(event.target as HTMLElement)
  }

  private _handleBodyFocusOut = (event: FocusEvent): void => {
    this._doBodyClickAndFocusOut(event.relatedTarget as HTMLElement)
  }

  private _doBodyClickAndFocusOut = (target: HTMLElement): void => {
    const { active } = this.state
    // 没激活就没有必要判断了
    if (!active) {
      return
    }
    // type 为 focus 存在 由于时机问题，可能 _popupRef 还没出来，此时啥也不做
    if (!this._popupRef.current) {
      return
    }
    // eslint-disable-next-line react/no-find-dom-node
    const $this = findDOMNode(this)
    // eslint-disable-next-line react/no-find-dom-node
    const $popup = findDOMNode(this._popupRef.current)
    if (
      isContains(target, (node) => {
        return (
          node === $this ||
          node === $popup ||
          (node.classList && node.classList.contains('gm-popover-is-in-popup'))
        )
      })
    ) {
      return
    }
    this._setActive(false)
  }

  private _doRenderPopup = (active: boolean): void => {
    const {
      style,
      className,
      popup,
      type,
      top,
      right,
      center,
      offset,
      showArrow,
      arrowLeft,
      predictingHeight,
      pureContainer,
      isInPopup,
    } = this.props
    const disabled = this._getDisabled()
    if (active) {
      LayoutRoot.setComponentPopup(
        this._id,
        <Popup
          key={`popup_${this._id}`}
          ref={this._popupRef}
          onMouseEnter={!disabled && type === 'hover' ? this._handleMouseEnter : _.noop}
          onMouseLeave={!disabled && type === 'hover' ? this._handleMouseLeave : _.noop}
          rect={this._rect!}
          top={top}
          right={right}
          center={center}
          offset={offset}
          showArrow={showArrow}
          arrowLeft={arrowLeft}
          predictingHeight={predictingHeight}
          pureContainer={pureContainer}
          className={classNames(
            {
              'gm-popover-is-in-popup': isInPopup,
            },
            className
          )}
          style={style}
        >
          {_.isFunction(popup) ? popup() : popup}
        </Popup>
      )
    } else {
      LayoutRoot.removeComponentPopup(this._id)
    }
  }

  private _handleClick = (): void => {
    const { type } = this.props
    const active = type === 'click' ? !this.state.active : true
    this._setActive(active)
  }

  private _handleFocus = (): void => {
    this._setActive(true)
  }

  private _handleMouseEnter = (): void => {
    window.clearTimeout(this._timer)
    this._setActive(true)
  }

  private _handleMouseLeave = (): void => {
    window.clearTimeout(this._timer)
    this._timer = window.setTimeout(() => {
      this._setActive(false)
    }, 500)
  }

  private _getDisabled = (): boolean => {
    const { disabled, children } = this.props
    return disabled || (children as ReactElement).props?.disabled
  }

  render() {
    const { type, children } = this.props
    const { active } = this.state
    const child = Children.only(children) as ComponentElement<any, any>

    const p: HTMLAttributes<HTMLElement> = {}
    if (!this._getDisabled()) {
      if (type === 'click' || type === 'focus') {
        p.onClick = createChainedFunction(
          // @ts-ignore
          child.props.onClick,
          this._handleClick
        )
      } else if (type === 'realFocus') {
        p.onFocus = createChainedFunction(
          // @ts-ignore
          child.props.onFocus,
          this._handleFocus
        )
      } else if (type === 'hover') {
        p.onMouseEnter = createChainedFunction(
          // @ts-ignore
          child.props.onMouseEnter,
          this._handleMouseEnter
        )
        p.onMouseLeave = createChainedFunction(
          // @ts-ignore
          child.props.onMouseLeave,
          this._handleMouseLeave
        )
      }
    }
    return cloneElement(child, {
      ...p,
      className: classNames(child.props.className, {
        'gm-popover-active': active,
      }),
    })
  }
}
