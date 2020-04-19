import React, { Component, createRef } from 'react'
import { getLocale } from '@gmfe/locales'
import classNames from 'classnames'
import _ from 'lodash'

export interface LazyImgProps {
  src: string
  /* 默认图片 URL */
  placeholder?: string
  targetId: string
  delay?: number
  className?: string
}

interface LazyImgState {
  show: boolean
}

class LazyImg extends Component<LazyImgProps, LazyImgState> {
  static defaultProps = {
    delay: 100,
  }

  readonly state: LazyImgState = {
    show: false,
  }

  private _imgRef = createRef<HTMLImageElement>()
  private _targetDOM = window.document.getElementById(this.props.targetId)
  private _rectTargetDOM = this._targetDOM?.getBoundingClientRect()

  constructor(props: LazyImgProps) {
    super(props)
    if (!this._targetDOM) {
      console.error(getLocale(`未找到${props.targetId}的DOM元素`))
    }
  }

  componentDidMount() {
    this._targetDOM?.addEventListener('scroll', this._debounceDoLazy)
    this._doLazy()
  }

  componentWillUnmount() {
    this._targetDOM?.removeEventListener('scroll', this._debounceDoLazy)
  }

  private _doLazy = (): void => {
    if (!this._rectTargetDOM) {
      return
    }
    if (isElementOverViewport(this._imgRef.current!, this._rectTargetDOM)) {
      this.setState({ show: true })
    }
    this._targetDOM!.removeEventListener('scroll', this._debounceDoLazy)
  }

  private _debounceDoLazy = _.debounce(this._doLazy, this.props.delay)

  render() {
    const { className, src, placeholder, delay, targetId, ...rest } = this.props
    const { show } = this.state
    return (
      <img
        {...rest}
        ref={this._imgRef}
        alt=''
        className={classNames('lazy-img', className)}
        src={show && src ? src : placeholder}
      />
    )
  }
}
export default LazyImg

function isElementOverViewport(dom: Element, rectTargetDom: DOMRect): boolean {
  const rect = dom.getBoundingClientRect()
  return rect.bottom > rectTargetDom.top && rect.top < rectTargetDom.bottom
}
