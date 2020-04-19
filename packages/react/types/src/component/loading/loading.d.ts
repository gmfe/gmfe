import { Component, CSSProperties } from 'react'

export interface LoadingProps {
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

declare class Loading extends Component<LoadingProps, void> {
  static defaultProps: {
    size: number
  }
}
export default Loading
