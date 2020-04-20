import { Component, HTMLAttributes } from 'react'

export interface MaskProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number
}

declare class Mask extends Component<MaskProps, void> {
  static defaultProps: {
    opacity: number
  }
}
export default Mask
