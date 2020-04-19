import { Component, CSSProperties } from 'react'

export interface DropDownItemsProps {
  className?: string
  style?: CSSProperties
}

declare class DropDownItems extends Component<DropDownItemsProps, void> {}
export default DropDownItems
