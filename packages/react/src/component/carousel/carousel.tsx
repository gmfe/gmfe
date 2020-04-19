import React, { Children, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Flex, FlexProps } from '../flex'
import classNames from 'classnames/index'
import CarouselItems from './carousel_items'
import CarouselFooter from './carousel_footer'

export interface CarouselProps extends FlexProps {
  /* 初始索引 */
  defaultIndex?: number
  /* 轮播时延 */
  delay?: number
  /* 切换时间 */
  transitionTime?: number
  onIndexChange?(currentIndex: number): void
  /* 鼠标悬浮 content 禁止轮播 */
  isStopByHoverContent?: boolean
}

const Carousel: FC<CarouselProps> = ({
  defaultIndex = 0,
  delay = 3000,
  transitionTime = 1000,
  onIndexChange,
  className,
  isStopByHoverContent = true,
  children,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)
  const timeRef = useRef<number>()

  const _children = useMemo(() => Children.toArray(children).filter((v) => v), [children])
  const _childCount = useMemo(() => Children.count(_children), [_children])

  const setTimeCurrentIndex = useCallback((): void => {
    setCurrentIndex((prevIndex) => {
      let index = prevIndex
      if (index === _childCount - 1) {
        index = 0
      } else {
        index++
      }
      return index
    })
  }, [_childCount])

  const startCarousel = useCallback(() => {
    window.clearInterval(timeRef.current)
    timeRef.current = window.setInterval(setTimeCurrentIndex, delay)
  }, [delay, setTimeCurrentIndex])

  const stopCarousel = useCallback(() => {
    window.clearInterval(timeRef.current)
    timeRef.current = undefined
  }, [])

  useEffect(() => {
    if (_childCount > 0) {
      startCarousel()
    }
  }, [_childCount, startCarousel])

  useEffect(() => {
    return () => {
      window.clearInterval(timeRef.current)
    }
  }, [])

  useEffect(() => {
    onIndexChange && onIndexChange(currentIndex)
  }, [onIndexChange, currentIndex])

  const handleSelect = useCallback(
    (index: number) => {
      stopCarousel()
      setCurrentIndex(index)
    },
    [stopCarousel]
  )

  const handleCancelSelect = useCallback(() => {
    startCarousel()
  }, [startCarousel])

  const handleStopCarousel = useCallback(() => {
    stopCarousel()
  }, [stopCarousel])

  return (
    <Flex
      {...rest}
      justifyCenter
      className={classNames('gm-carousel-fade', className)}
      onMouseOver={isStopByHoverContent ? handleStopCarousel : undefined}
      onMouseLeave={handleCancelSelect}
    >
      <CarouselItems currentIndex={currentIndex} transitionTime={transitionTime}>
        {_children}
      </CarouselItems>
      <CarouselFooter
        currentIndex={currentIndex}
        count={_childCount}
        onSelect={handleSelect}
        onCancelSelect={handleCancelSelect}
      />
    </Flex>
  )
}

export default Carousel
