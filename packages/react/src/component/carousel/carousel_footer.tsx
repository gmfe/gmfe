import React, { FC, useMemo } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

interface CarouselFooterProps {
  currentIndex: number
  count: number
  onSelect(index: number): void
  onCancelSelect(): void
}

const CarouselFooter: FC<CarouselFooterProps> = ({
  currentIndex,
  count,
  onSelect,
  onCancelSelect,
}) => {
  const countArray = useMemo(() => _.range(count), [count])
  return (
    <ul className='gm-carousel-fade-footer'>
      {countArray.map((_, index) => (
        <li
          key={index}
          className={classNames(
            { 'gm-carousel-fade-footer-li-hover': currentIndex === index },
            'gm-carousel-fade-footer-li'
          )}
          onMouseOver={() => onSelect(index)}
          onMouseLeave={onCancelSelect}
        />
      ))}
    </ul>
  )
}

export default CarouselFooter
