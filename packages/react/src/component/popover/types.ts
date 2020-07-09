import { CSSProperties, ReactNode } from 'react'

type PopoverTrigger = 'focus' | 'click' | 'hover' | 'realFocus'
type PopupType = (() => ReactNode) | ReactNode

interface PopoverProps {
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
  arrowLeft?: string | number
  pureContainer?: boolean
  isInPopup?: boolean
  predictingHeight?: number
}

export type { PopupType, PopoverTrigger, PopoverProps }
