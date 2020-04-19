import { PaginationBaseResultOptions } from './base'
import { Component } from 'react'

export interface PaginationTextProps {
  data: PaginationBaseResultOptions
}

declare class PaginationText extends Component<PaginationTextProps, void> {
  static displayName: string
}

export default PaginationText
