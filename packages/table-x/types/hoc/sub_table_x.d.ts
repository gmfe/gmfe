import { ComponentType, FC } from 'react'

interface SubTableXProps {
  subTableIndent?: number
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function subTableXHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & SubTableXProps>
export default subTableXHOC
