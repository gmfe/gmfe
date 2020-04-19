import React, { Component, createRef, KeyboardEvent } from 'react'
import classNames from 'classnames'
import { DialogState, DialogProps } from './types'
import { getLocale } from '@gmfe/locales'
import _ from 'lodash'
import { warn } from '@gm-common/tool'
import { Modal, ModalProps } from '../modal'
import { Input } from '../input'
import { Button } from '../button'

class DialogComponent extends Component<DialogProps, DialogState> {
  static defaultProps = {
    title: getLocale('提示'),
    type: 'confirm',
    onCancel: _.noop,
    onOK: _.noop,
    size: 'md',
    cancelBtn: getLocale('取消'),
    OKBtn: getLocale('确定'),
  }

  readonly state: DialogState = {
    show: this.props.show,
    isLoading: false,
  }

  private _isMounted = false
  private _inputRef = createRef<HTMLInputElement>()

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<DialogProps>) {
    if ('show' in nextProps) {
      this.setState({ show: nextProps.show })
    }
  }

  componentDidMount() {
    if (this.props._from !== 'DialogStatics') {
      warn('Use Dialog Static instead of Component')
    }
  }

  componentWillUnmount() {
    this._isMounted = true
  }

  private _handleCancel = (): void => {
    const { onCancel } = this.props
    onCancel && onCancel()
    this.setState({ show: false })
  }

  private _handleOk = (): void => {
    const { onOK, type } = this.props
    if (!onOK) {
      return
    }
    const result = onOK(type === 'prompt' ? this._inputRef.current?.value : undefined)
    if (result === false) {
      return
    }
    this.setState({ isLoading: true })

    Promise.resolve(result)
      .then(() => {
        if (!this._isMounted) {
          this.setState({
            show: false,
            isLoading: false,
          })
        }
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  private _handleEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13) {
      this._handleOk()
    }
  }

  render() {
    const { isLoading, show } = this.state
    const {
      size,
      title,
      children,
      type,
      promptDefaultValue,
      promptPlaceholder,
      cancelBtn,
      OKBtn,
      disableMaskClose,
    } = this.props
    const modalProps: ModalProps = {
      show,
      onHide: this._handleCancel,
      disableMaskClose,
      title,
    }
    if (size !== 'md') {
      modalProps.size = size
    }
    return (
      <Modal {...modalProps} className={classNames('gm-dialog', { [`gm-dialog-${type}`]: type })}>
        <div>
          {children}
          {type === 'prompt' && (
            <Input
              autoFocus
              defaultValue={promptDefaultValue}
              placeholder={promptPlaceholder}
              ref={this._inputRef}
              style={{ display: 'block' }}
              onKeyDown={this._handleEnter}
            />
          )}
        </div>
        <div className='gm-gap-10' />
        <div className='text-right'>
          {type !== 'alert' && cancelBtn && !isLoading && (
            <Button onClick={this._handleCancel}>{cancelBtn}</Button>
          )}
          <div className='gm-gap-10' />
          {OKBtn && (
            <Button type='primary' onClick={this._handleOk} loading={isLoading}>
              {OKBtn}
            </Button>
          )}
        </div>
      </Modal>
    )
  }
}
export default DialogComponent
