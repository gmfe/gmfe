import { Component, CSSProperties, ReactNode } from 'react'

type PopoverTrigger = 'focus' | 'click' | 'hover' | 'realFocus'
type PopupType = (() => ReactNode) | ReactNode
type PopupAnim =
  | boolean
  | 'fade-in-right'
  | 'fade-in-left'
  | 'fade-in-top'
  | 'fade-in-bottom'
  | 'zoom-in'
  | 'zoom-in-top'
  | 'zoom-in-bottom'

export interface PopoverProps {
  type?: PopoverTrigger
  popup: PopupType
  disabled?: boolean
  className?: string
  style?: CSSProperties
  right?: boolean
  top?: boolean
  center?: boolean
  offset?: number
  showArrow?: boolean
  arrowLeft?: string
  pureContainer?: boolean
  isInPopup?: boolean
  animName?: PopupAnim
  predictingHeight?: number
}

interface PopoverState {
  active: boolean
}

declare class Popover extends Component<PopoverProps, PopoverState> {
  static defaultProps: {
    type: PopoverTrigger
    showArrow: boolean
    animName: boolean
    isInPopup: boolean
  }

  readonly state: PopoverState
  public apiDoSetActive(active: boolean): void
}
export default Popover
