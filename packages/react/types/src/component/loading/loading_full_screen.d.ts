import { Component, CSSProperties } from 'react'

export interface LoadingFullScreenProps {
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

declare class LoadingFullScreen extends Component<
  LoadingFullScreenProps,
  void
> {
  static defaultProps: {
    size: number
  }
}
export default LoadingFullScreen
