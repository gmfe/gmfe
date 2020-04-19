import { ComponentType, FC } from 'react'

interface FixedColumnsTableXProps {
  fixed?: 'left' | 'right'
  [key: string]: unknown
}

interface PropsGeneric<Original extends FixedColumnsTableXProps> {}

declare function fixedColumnsTableXHOC<
  Original extends FixedColumnsTableXProps,
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props>
export default fixedColumnsTableXHOC
