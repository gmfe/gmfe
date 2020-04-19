import React, { Children, cloneElement, CSSProperties, FC, ReactElement } from 'react'
import classNames from 'classnames'

interface CarouselItemsProps {
  currentIndex: number
  transitionTime: number
}

const CarouselItems: FC<CarouselItemsProps> = ({ currentIndex, transitionTime, children }) => {
  const fadeTransitionStyle: CSSProperties = {
    transition: `all ${transitionTime}ms ease-in-out`,
  }

  return (
    <>
      {Children.map(children as ReactElement, (child, index) =>
        cloneElement(child, {
          style: Object.assign({}, child.props?.style, fadeTransitionStyle),
          className: classNames(
            'gm-carousel-fade-item',
            { 'gm-carousel-fade-item-active': currentIndex === index },
            child.props?.className
          ),
          key: index,
        })
      )}
    </>
  )
}

export default CarouselItems
