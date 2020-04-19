import {
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
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

declare const ToolTip: ForwardRefExoticComponent<
  ToolTipProps & RefAttributes<Popover>
>
export default ToolTip
