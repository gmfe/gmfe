import React, { Component, createRef } from 'react'
import { Flex } from '../flex'
import classNames from 'classnames'
import _ from 'lodash'

export interface PreviewModalProps {
  images: string[]
  thumbnails?: string[]
  index: number
  onHide(): void
}

interface PreviewModalState {
  previewImgIndex: number
  showScrollBtn: boolean
}

class PreviewModal extends Component<PreviewModalProps, PreviewModalState> {
  readonly state: PreviewModalState = {
    previewImgIndex: this.props.index,
    showScrollBtn: true,
  }

  private _timer: number | undefined
  private _thumbnails = createRef<HTMLDivElement>()

  componentDidMount() {
    // 如果没有滚动条，不显示左右按钮
    this._thumbnails.current!.offsetWidth === this._thumbnails.current!.scrollWidth &&
      this.setState({ showScrollBtn: false })

    window.document.body.addEventListener('keydown', this._handleKeyDown)
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('keydown', this._handleKeyDown)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === 37) {
      this._handlePrevious()
    } else if (event.keyCode === 39) {
      this._handleNext()
    }
  }

  private _handlePrevious = (): void => {
    const { thumbnails } = this.props
    const { previewImgIndex } = this.state
    if (previewImgIndex !== 0) {
      const index = previewImgIndex - 1
      this.setState({ previewImgIndex: index })
      if (thumbnails) {
        ;(this._thumbnails.current!.childNodes[index] as Element).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }

  private _handleScroll = (direction: 'left' | 'right'): void => {
    const num = direction === 'left' ? 1 : -1
    const initScrollLeft = this._thumbnails.current!.scrollLeft
    window.clearInterval(this._timer)
    const intervalScroll = (): void => {
      this._thumbnails.current!.scrollLeft += num * 60
      // 每次移动6张图片
      if (
        num * (this._thumbnails.current!.scrollLeft - initScrollLeft) >= 360 ||
        this._thumbnails.current!.scrollLeft - initScrollLeft === 0
      ) {
        window.clearInterval(this._timer)
      }
    }
    this._timer = window.setInterval(intervalScroll.bind(this), 50)
  }

  private _handleScrollRight = (): void => {
    this._handleScroll('right')
  }

  private _handlePreview = (index: number): void => {
    this.setState({ previewImgIndex: index })
  }

  private _handleScrollLeft = (): void => {
    this._handleScroll('left')
  }

  private _handleNext = (): void => {
    const { images, thumbnails } = this.props
    const { previewImgIndex } = this.state
    if (previewImgIndex !== images.length - 1) {
      const index = previewImgIndex + 1
      this.setState({ previewImgIndex: index })
      if (thumbnails) {
        ;(this._thumbnails.current!.childNodes[index] as Element).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }

  render() {
    const { thumbnails, images, onHide } = this.props
    const { previewImgIndex, showScrollBtn } = this.state
    return (
      <Flex className='gm-image-preview-wrap'>
        <span className='gm-image-preview-btn-close' onClick={onHide}>
          ×
        </span>
        <Flex alignCenter className='gm-image-preview-btn-container'>
          <i
            className={classNames('glyphicon glyphicon-menu-left gm-image-preview-btn', {
              hidden: previewImgIndex === 0,
            })}
            onClick={this._handlePrevious}
          />
        </Flex>
        <Flex column className='gm-image-preview-content'>
          <Flex auto alignCenter className='gm-image-preview-wrap'>
            <img src={images[previewImgIndex]} alt='' className='gm-image-preview-img' />
          </Flex>
          {/* 缩略图列表高度：60px */}
          {thumbnails && thumbnails.length > 1 && (
            <Flex justifyCenter className='gm-image-preview-footer'>
              <Flex className='gm-image-preview-thumbnails-container'>
                {showScrollBtn && (
                  <i
                    className='glyphicon glyphicon-chevron-left gm-image-preview-thumbnails-btn'
                    onClick={this._handleScrollRight}
                  />
                )}
                <div className='gm-image-preview-thumbnails' ref={this._thumbnails}>
                  {_.map(thumbnails, (img, index) => (
                    <img
                      alt=''
                      key={index}
                      className={classNames('gm-image-preview-img', {
                        'gm-image-preview-focus': index === previewImgIndex,
                      })}
                      src={img}
                      onClick={() => this._handlePreview(index)}
                    />
                  ))}
                </div>
                {showScrollBtn && (
                  <i
                    className='glyphicon glyphicon-chevron-right gm-image-preview-thumbnails-btn'
                    onClick={this._handleScrollLeft}
                  />
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex alignCenter className='gm-image-preview-btn-container'>
          <i
            className={classNames('glyphicon glyphicon-menu-right gm-image-preview-btn', {
              hidden: previewImgIndex === images.length - 1,
            })}
            onClick={this._handleNext}
          />
        </Flex>
      </Flex>
    )
  }
}

export default PreviewModal
