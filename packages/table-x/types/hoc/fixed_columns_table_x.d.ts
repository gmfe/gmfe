import { FC } from 'react'

interface FixedColumnsTableXProps {
  fixed?: 'left' | 'right'
  [key: string]: any
}

interface PropsGeneric<Original extends FixedColumnsTableXProps> {}

declare function fixedColumnsTableXHOC<
  Original extends FixedColumnsTableXProps,
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props>
export default fixedColumnsTableXHOC
