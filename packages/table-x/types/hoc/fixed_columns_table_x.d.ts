import { FC } from 'react'
import { TableXProps } from '../base/base'

interface FixedColumnsTableXProps {
  fixed?: 'left' | 'right'
}

declare function fixedColumnsTableXHOC<Original extends { [key: string]: any }>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & FixedColumnsTableXProps>
export default fixedColumnsTableXHOC
