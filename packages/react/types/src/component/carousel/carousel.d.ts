import {
  Component,
  ComponentType,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
} from 'react'

export interface CarouselProps {
  defaultIndex?: number
  delay?: number
  transitionTime?: number
  children: ReactElement<any, ComponentType>[]
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

  setCurrentIndex
  startCarousel
  handleStopCarousel
  handleSelect
  handleCancelSelect
  renderChildren
  renderFooterController
  render():
    | ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | ReactNodeArray
    | ReactPortal
    | boolean
    | null
    | undefined
}

export default Carousel
