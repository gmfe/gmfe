import React, { Component, PropsWithChildren } from 'react'
import _ from 'lodash'
import { TipProps } from './types'
import { Flex } from '../flex'
import TipContent from './tip_content'
import { LayoutRoot } from '../layout_root'

export default class Tip extends Component<TipProps> {
  static defaultProps = {
    title: '',
    type: 'info',
    onClose: _.noop,
    time: 3000,
  }

  static tip(options: PropsWithChildren<Partial<TipProps>>): string {
    const id = +new Date() + '' + Math.random()
    const _onClose = options.onClose
    options.onClose = () => {
      LayoutRoot.removeComponentTip(id)
      if (_onClose) {
        _onClose()
      }
    }
    LayoutRoot.setComponentTip(id, <Tip {...options} />)
    return id
  }

  static success(options: PropsWithChildren<Partial<TipProps>> | string) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.type = 'success'
    return this.tip(options)
  }

  static info(options: PropsWithChildren<Partial<TipProps>> | string) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.type = 'info'
    return this.tip(options)
  }

  static warning(options: PropsWithChildren<Partial<TipProps>> | string) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.type = 'warning'
    return this.tip(options)
  }

  static danger(options: PropsWithChildren<Partial<TipProps>> | string) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.type = 'danger'
    return this.tip(options)
  }

  static clear(id: string): void {
    LayoutRoot.removeComponentTip(id)
  }

  static clearAll(): void {
    LayoutRoot.removeComponentTipAll()
  }

  private _timer: number | undefined
  private _hasClosed = false

  componentDidMount() {
    const { time } = this.props
    if (time) {
      this._timer = window.setTimeout(() => this._fadeOut(), time)
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this._timer)
  }

  private _handleClose = (): void => {
    this._fadeOut()
  }

  private _fadeOut(): void {
    if (!this._hasClosed) {
      this._hasClosed = true
      this.props.onClose()
    }
  }

  render() {
    const { title, type, children } = this.props
    return (
      <Flex justifyEnd>
        <TipContent title={title} type={type} onClose={this._handleClose}>
          {children}
        </TipContent>
      </Flex>
    )
  }
}
