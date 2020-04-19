import { Component, HTMLAttributes } from 'react'

interface SortHeaderProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'asc' | 'desc'
}

declare class SortHeader extends Component<SortHeaderProps, void> {}
export default SortHeader
