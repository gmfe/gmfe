import { FC } from 'react'

interface SubTableXProps {
  subTableIndent?: number
}

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function subTableXHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props & SubTableXProps>
export default subTableXHOC
