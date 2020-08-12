import React, { Component, createRef, CSSProperties, MouseEvent, PropsWithChildren } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import EVENT_TYPE from '../../event_type'
import { LayoutRoot } from '../layout_root'

export interface DrawerProps {
  onHide?(): void
  className?: string
  style?: CSSProperties
  opacityMask?: boolean
}

class Drawer extends Component<DrawerProps> {
  static defaultProps = {
    onHide: _.noop,
  }

  static render(options: PropsWithChildren<DrawerProps>): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SHOW))
    LayoutRoot.setComponent(LayoutRoot.TYPE.DRAWER, <Drawer {...options} />)
  }

  static hide(): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
    LayoutRoot.removeComponent(LayoutRoot.TYPE.DRAWER)
  }

  private _drawerRef = createRef<HTMLDivElement>()

  componentDidMount() {
    window.document.body.addEventListener('keydown', this._handleKeyDown)
    this._drawerRef.current!.addEventListener('scroll', this._throttleDoScroll)
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('keydown', this._handleKeyDown)
    this._drawerRef.current!.removeEventListener('scroll', this._throttleDoScroll)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === 27) {
      const { onHide } = this.props
      onHide && onHide()
    }
  }

  private _handleMask = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement
    if (target.classList.contains('gm-drawer')) {
      const { onHide } = this.props
      onHide && onHide()
    }
  }

  private _doScroll = (): void => {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.DRAWER_SCROLL))
  }

  private _throttleDoScroll = _.throttle(this._doScroll, 200)

  render() {
    const { children, style, className, opacityMask } = this.props
    return (
      <div>
        <div
          className={classNames('gm-drawer-mask', {
            'gm-drawer-mask-opacity': opacityMask,
          })}
        />
        <div
          ref={this._drawerRef}
          className={classNames('gm-drawer', className)}
          tabIndex={-1}
          onClick={this._handleMask}
        >
          <div
            className={classNames('gm-drawer-content', {
              'gm-border': opacityMask,
              'gm-box-shadow-bottom': opacityMask,
            })}
            style={style}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Drawer
