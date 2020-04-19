import {
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefObject,
} from 'react'
import Popover from './popover'

export interface ToolTipProps {
  popup?: ReactNode
  right?: boolean
  top?: boolean
  center?: boolean
  showArrow?: boolean
  className?: string
  style?: CSSProperties
}

declare const ToolTip: ForwardRefExoticComponent<RefObject<
  ToolTipProps & Popover
>>
export default ToolTip
