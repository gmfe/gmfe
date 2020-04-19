import { CSSProperties, FC, ReactNode } from 'react'

export interface DropDownProps {
  popup: ReactNode
  split?: boolean
  right?: boolean
  cartClassName?: string
  className?: string
  style?: CSSProperties
}

declare const DropDown: FC<DropDownProps>
export default DropDown
