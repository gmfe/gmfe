import { ComponentType, FC } from 'react'

interface KeyboardTableProps {
  id: string
  onAddRow(): void
  onBeforeDispatch?(action: {
    actionName: string
    to: { columnKey: string; rowKey: number }
    from: { columnKey: string; rowKey: number }
  }): void
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function keyboardTableHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & KeyboardTableProps>
export default keyboardTableHOC
