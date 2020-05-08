import { Component, AllHTMLAttributes } from 'react'

export interface MaskProps extends AllHTMLAttributes<HTMLDivElement> {
  opacity?: number
}

declare class Mask extends Component<MaskProps, void> {
  static defaultProps: {
    opacity: number
  }
}
export default Mask
