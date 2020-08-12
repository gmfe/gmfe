import { ComponentClass, ComponentType, ReactNode } from 'react'

interface ExpandTableProps<Original extends { [key: string]: any }> {
  SubComponent(row: { original: Original; index: number }): ReactNode
  keyField: string
  expanded?: any[]
  onExpand(expanded: any[]): void
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function expandTableHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): ComponentClass<Props & ExpandTableProps<Original>>
export default expandTableHOC
