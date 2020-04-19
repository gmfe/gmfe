import { ComponentClass, ComponentType, ReactNode } from 'react'

interface ExpandTableProps<Original extends { [key: string]: unknown }> {
  SubComponent(row: { original: Original; index: number }): ReactNode
  keyField: string
  expanded?: unknown[]
  onExpand(expanded: unknown[]): void
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function expandTableHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(
  Component: ComponentType<Props>
): ComponentClass<Props & ExpandTableProps<Original>>
export default expandTableHOC
