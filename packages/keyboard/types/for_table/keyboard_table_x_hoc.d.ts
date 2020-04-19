import { ComponentType, FC } from 'react'

interface KeyboardTableXProps {
  id: string
  onAddRow(): void
  onBeforeDispatch(action: {
    actionName: string
    from: { columnKey: string; rowKey: number }
    to: { columnKey: string; rowKey: number }
  }): void
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function keyboardTableXHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & KeyboardTableXProps>
export default keyboardTableXHOC
