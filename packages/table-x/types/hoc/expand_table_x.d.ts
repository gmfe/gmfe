import { FC, ReactNode } from 'react'

interface ExpandTableXProps<Original extends { [key: string]: any }> {
  SubComponent: (original: Original) => ReactNode
  fixedExpand?: boolean
  expanded?: { [key: string]: boolean }
  onExpand?(expanded: { [key: string]: boolean }): void
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function expandTableXHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props & ExpandTableXProps<Original>>
export default expandTableXHOC
