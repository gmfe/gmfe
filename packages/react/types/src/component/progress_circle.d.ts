import { Component } from 'react'

export interface ProgressCircleProps {
  percentage: number
  text?: string
  showText?: boolean
  textPosition?: 'left' | 'center' | 'right'
  status?: 'success' | 'exception'
  size?: string | number
  lineWidth?: string | number
  progressColor?: string
  bgColor?: string
}

declare class ProgressCircle extends Component<ProgressCircleProps, void> {
  static defaultProps: {
    percentage: number
    status: 'success'
    showText: boolean
    textPosition: 'center'
    size: string
    lineWidth: string
    bgColor: string
  }

  get text(): string | null
}
export default ProgressCircle
