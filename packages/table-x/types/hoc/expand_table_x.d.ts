import { ComponentType, FC, ReactNode } from 'react'

interface ExpandTableXProps<Original extends { [key: string]: unknown }> {
  SubComponent: (original: Original) => ReactNode
  fixedExpand?: boolean
  expanded?: { [key: string]: boolean }
  onExpand?(expanded: { [key: string]: boolean }): void
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function expandTableXHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & ExpandTableXProps<Original>>
export default expandTableXHOC
