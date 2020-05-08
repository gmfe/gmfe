import { Component, AllHTMLAttributes } from 'react'

interface SortHeaderProps extends AllHTMLAttributes<HTMLSpanElement> {
  type?: 'asc' | 'desc'
}

declare class SortHeader extends Component<SortHeaderProps, void> {}
export default SortHeader
