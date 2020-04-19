import React, { Component, CSSProperties, PropsWithChildren, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Loading from './loading'
import { LayoutRoot } from '../layout_root'
import EVENT_TYPE from '../../event_type'

export interface LoadingFullScreenProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

class LoadingFullScreen extends Component<LoadingFullScreenProps> {
  static defaultProps = {
    size: 50,
  }

  static render(props: PropsWithChildren<LoadingFullScreenProps>): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.FULL_LOADING_SHOW))
    LayoutRoot.setComponent(LayoutRoot.TYPE.FULLLOADING, <LoadingFullScreen {...props} />)

    const documentBody = window.document.body
    if (documentBody) {
      documentBody.classList.add('gm-loading-body-overflow')
    }
  }

  static hide(): void {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.FULL_LOADING_HIDE))
    LayoutRoot.removeComponent(LayoutRoot.TYPE.FULLLOADING)
    // LayoutRoot.setComponent(LayoutRoot.TYPE.FULLLOADING, null)

    const documentBody = window.document.body
    if (documentBody) {
      documentBody.classList.remove('gm-loading-body-overflow')
    }
  }

  render() {
    const { style, size, text, className, ...rest } = this.props

    const s = Object.assign({}, style, {
      width: size + 'px',
      height: size + 'px',
    })

    return (
      <div {...rest} className={classNames('gm-loading-full-screen', className)}>
        <Loading style={s} text={text} className='gm-loading-spinner' />
      </div>
    )
  }
}

export default LoadingFullScreen
