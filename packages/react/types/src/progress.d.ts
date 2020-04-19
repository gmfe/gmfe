import { Component } from 'react'

export interface ProgressBarProps {
  percentage: number
  text?: string
  status?: 'success' | 'exception'
  strokeWidth?: number
  textInside?: boolean
  textInsideFix?: 'left' | 'right' | 'center'
  showText?: boolean
  className?: string
  textColor?: string
  strokeColor?: string
  bgColor?: string
}

declare class ProgressBar extends Component<ProgressBarProps, void> {
  static defaultProps: {
    textInside: boolean
    showText: boolean
  }
}
export default ProgressBar
