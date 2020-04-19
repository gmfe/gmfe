import { ChangeEvent, Component, CSSProperties, MouseEvent } from 'react'

export interface RadioProps<R> {
  checked?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement>): void
  value?: R
  disabled?: boolean
  inline?: boolean
  block?: boolean
  name?: string
  onClick?(event: MouseEvent<HTMLInputElement>): void
  className?: string
  style?: CSSProperties
}

declare class Radio<P> extends Component<RadioProps<P>, void> {
  static defaultProps: {
    onChange(): void
    onClick(): void
  }
}
export default Radio
