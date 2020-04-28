import { FC } from 'react'
import { TableXProps } from '../base/base'

interface SubTableXProps {
  subTableIndent?: number
}

declare function subTableXHOC<Original extends { [key: string]: any }>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & SubTableXProps>

export default subTableXHOC
