import { Component, CSSProperties } from 'react'

export interface DropDownItemProps {
  active?: boolean
  disabled?: boolean
  onClick?(): void
  className?: string
  style?: CSSProperties
}

declare class DropDownItem extends Component<DropDownItemProps, void> {}
export default DropDownItem
