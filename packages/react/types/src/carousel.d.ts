import { Component, ComponentType, ReactElement } from 'react'

export interface CarouselProps {
  defaultIndex?: number
  delay?: number
  transitionTime?: number
  children: ReactElement<unknown, ComponentType>[]
  className?: string
}

interface CarouselState {
  currentIndex: number
}

declare class Carousel extends Component<CarouselProps, CarouselState> {
  static defaultProps: {
    defaultIndex: number
    delay: number
    transitionTime: number
  }

  readonly state: CarouselState
}
export default Carousel
