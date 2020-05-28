import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Flex from '../flex'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useMemo } from 'react'

const Footer = ({ count, onSelect, onCancelSelect, currentIndex }) => {
  const _countArray = _.range(count)

  return (
    <ul className='gm-carousel-fade-footer'>
      {_.map(_countArray, (value, index) => {
        return (
          <li
            className={classNames(
              { 'gm-carousel-fade-footer-li-hover': currentIndex === index },
              'gm-carousel-fade-footer-li'
            )}
            key={index}
            onMouseOver={() => onSelect(index)}
            onMouseLeave={onCancelSelect}
          />
        )
      })}
    </ul>
  )
}

Footer.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancelSelect: PropTypes.func.isRequired
}

const Items = ({ transitionTime, currentIndex, children }) => {
  const fadeTransitionStyle = {
    transition: `all ${transitionTime}ms ease-in-out`
  }

  return (
    <>
      {React.Children.map(children, (thisArg, index) => {
        return React.cloneElement(thisArg, {
          style: Object.assign({}, thisArg.props.style, fadeTransitionStyle),
          className: classNames(
            'gm-carousel-fade-item',
            { 'gm-carousel-fade-item-active': currentIndex === index },
            thisArg.props.className
          ),
          key: index
        })
      })}
    </>
  )
}

Items.propTypes = {
  transitionTime: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired
}

const Carousel = props => {
  const {
    onIndexChange,
    className,
    transitionTime,
    defaultIndex,
    delay,
    children,
    isNeedAutoCarousel,
    ...rest
  } = props

  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const timerRef = useRef(null)

  const _children = useMemo(() => {
    return React.Children.toArray(children).filter(v => v)
  }, [children])

  const _childCount = useMemo(() => {
    return React.Children.count(_children)
  }, [_children])

  useEffect(() => {
    if (_childCount > 0) {
      startCarousel()
    }
  }, [_childCount])

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (onIndexChange && typeof onIndexChange === 'function') {
      onIndexChange(currentIndex)
    }
  }, [currentIndex, onIndexChange])

  const setTimerCurrentIndex = () => {
    setCurrentIndex(prevIndex => {
      let index = prevIndex

      if (index === _childCount - 1) {
        index = 0
      } else {
        index++
      }

      return index
    })
  }

  const startCarousel = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(setTimerCurrentIndex, delay)
  }

  const handleStopCarousel = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  const handleSelect = index => {
    handleStopCarousel()
    setCurrentIndex(index)
  }

  const handleCancelSelect = () => {
    startCarousel()
  }

  return (
    <Flex
      {...rest}
      justifyCenter
      className={classNames('gm-carousel-fade', className)}
      onMouseOver={isNeedAutoCarousel ? handleStopCarousel : undefined}
      onMouseLeave={handleCancelSelect}
    >
      <Items currentIndex={currentIndex} transitionTime={transitionTime}>
        {_children}
      </Items>

      <Footer
        count={_childCount}
        onSelect={handleSelect}
        onCancelSelect={handleCancelSelect}
        currentIndex={currentIndex}
      />
    </Flex>
  )
}

Carousel.propTypes = {
  defaultIndex: PropTypes.number,
  delay: PropTypes.number,
  transitionTime: PropTypes.number,
  /** 支持element元素 */
  children: PropTypes.arrayOf(PropTypes.element),
  onIndexChange: PropTypes.func,
  className: PropTypes.string,
  isNeedAutoCarousel: PropTypes.bool
}

Carousel.defaultProps = {
  defaultIndex: 0, // 设置初始索引
  delay: 3000, // 轮播时延
  transitionTime: 1000, // 切换时间（ms）
  isNeedAutoCarousel: true // 是否需要自动切换
}

export default Carousel
