import React, { Component, createRef, MouseEvent, PropsWithChildren } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { CommonModalProps } from './types'
import EVENT_TYPE from '../../event_type'
import { LayoutRoot } from '../layout_root'

export interface ModalProps extends CommonModalProps {
  opacityMask?: boolean
  className?: string
  noCloseBtn?: boolean
  onCancel?(): void
  onOk?(): void
}

class Modal extends Component<ModalProps> {
  static defaultProps = {
    onHide: _.noop,
    size: 'md',
  }

  static render(props: PropsWithChildren<Partial<ModalProps>>): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SHOW))
    const { show, onHide, ...rest } = props
    function handleHide(): void {
      Modal.hide()
      onHide && onHide()
    }
    LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, <Modal show onHide={handleHide} {...rest} />)
  }

  static hide(): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
    LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
  }

  private _modalRef = createRef<HTMLDivElement>()

  componentDidMount() {
    window.document.body.addEventListener('keydown', this._handleKeydown)
    if (this.props.show) {
      this._modalRef.current?.addEventListener('scroll', _.throttle(this._doScroll, 200))
    }
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('keydown', this._handleKeydown)
    this._modalRef.current?.removeEventListener('scroll', this._doScroll)
  }

  private _doScroll = (): void => {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SCROLL))
  }

  private _handleKeydown = (event: KeyboardEvent): void => {
    const { show, onHide } = this.props
    if (!show) {
      return
    }
    if (event.keyCode === 27) {
      onHide && onHide()
    }
  }

  private _handleMask = (event: MouseEvent<HTMLDivElement>): void => {
    if (
      !this.props.disableMaskClose &&
      (event.target as HTMLDivElement).classList.contains('gm-modal')
    ) {
      this._handleClose()
    }
  }

  private _handleClose = (): void => {
    const { onHide } = this.props
    onHide && onHide()
  }

  render() {
    const {
      show,
      title,
      size,
      children,
      style,
      noContentPadding,
      className,
      noCloseBtn,
      opacityMask,
    } = this.props
    if (!show) {
      return null
    }
    const inner = (
      <div
        key='modal-dialog'
        className={classNames('gm-modal-dialog', 'gm-modal-' + size, {
          in: show,
          'gm-modal-dialog-has-title': title,
          'gm-border': opacityMask,
          'gm-box-shadow-bottom': opacityMask,
        })}
        style={style}
      >
        {noCloseBtn || (
          <button type='button' className='close gm-modal-close' onClick={this._handleClose}>
            <span>×</span>
          </button>
        )}
        {title ? (
          <div className='gm-modal-title-wrap'>
            <div className='gm-modal-title'>{title}</div>
          </div>
        ) : null}
        <div
          className={classNames('gm-modal-content', {
            'gm-padding-0': noContentPadding,
          })}
        >
          {children}
        </div>
      </div>
    )

    return (
      <div>
        <div
          className={classNames('gm-modal-mask', {
            'gm-modal-mask-opacity': opacityMask,
          })}
        />
        <div
          ref={this._modalRef}
          className={classNames('gm-modal', className)}
          tabIndex={-1}
          onClick={this._handleMask}
        >
          {inner}
        </div>
      </div>
    )
  }
}
export default Modal
