import { FC, ReactNode } from 'react'
import { TableXProps } from '../base/base'

interface ExpandTableXProps<Original extends { [key: string]: any }> {
  SubComponent: (original: Original) => ReactNode
  fixedExpand?: boolean
  expanded?: { [key: string]: boolean }
  onExpand?(expanded: { [key: string]: boolean }): void
}

declare function expandTableXHOC<Original>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & ExpandTableXProps<Original>>
export default expandTableXHOC
