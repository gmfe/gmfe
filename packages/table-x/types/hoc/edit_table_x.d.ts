import { ComponentType, FC } from 'react'

interface PropsGeneric<Props extends { [key: string]: unknown }> {}

declare function editTableXHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props>
export default editTableXHOC
