import { Component, CSSProperties } from 'react'

export interface LoadingChunkProps {
  loading?: boolean
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

declare class LoadingChunk extends Component<LoadingChunkProps, void> {
  static defaultProps: {
    size: number
    loading: boolean
  }
}

export default LoadingChunk
