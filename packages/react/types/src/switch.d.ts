import { Component, CSSProperties, ReactNode } from 'react'

export interface SwitchProps {
  type?: string
  checked: boolean
  disabled?: boolean
  on?: ReactNode
  off?: ReactNode
  onChange?(checked: boolean): void
  className?: string
  style?: CSSProperties
}

interface SwitchState {
  checked: boolean
  labelWidth: number
  isReady: boolean
}

declare class Switch extends Component<SwitchProps, SwitchState> {
  static defaultProps: {
    type: string
    on: string
    off: string
    onChange(): void
  }

  static displayName: string

  readonly state: SwitchState
}
export default Switch
