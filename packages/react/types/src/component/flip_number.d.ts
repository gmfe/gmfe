import { Component } from 'react'

export interface FlipNumberProps {
  to: number
  from?: number
  delay?: number
  duration?: number
  easeFn?(percent: number): number
  individually?: boolean
  decimal?: number
  useGroup?: boolean
  className?: string
}

interface FlipNumberState {
  height: number
  heightList: number[]
}

declare class FlipNumber extends Component<FlipNumberProps, FlipNumberState> {
  static defaultProps: {
    from: number
    duration: number
    individually: boolean
    decimal: number
    useGroup: boolean
    ease(percent: number): number
  }

  readonly state: FlipNumberState
}
export default FlipNumber
