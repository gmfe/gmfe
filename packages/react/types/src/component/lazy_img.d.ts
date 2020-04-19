import { Component } from 'react'

export interface LazyImgProps {
  src?: string
  placeholder?: string
  targetId: string
  delay?: number
  className?: string
}

interface LazyImgState {
  show: boolean
}

declare class LazyImg extends Component<LazyImgProps, LazyImgState> {
  static defaultProps: {
    delay: number
  }

  readonly state: LazyImgState
}
export default LazyImg
