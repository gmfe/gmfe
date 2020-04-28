import { FC } from 'react'
import { TableXProps } from '../base/base'

declare function editTableXHOC<Original extends { [keys: string]: any }>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original>>
export default editTableXHOC
