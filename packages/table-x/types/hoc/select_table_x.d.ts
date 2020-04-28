import { FC, ReactNode } from 'react'
import { TableXProps } from '../base/base'

type SelectType = 'checkbox' | 'radio'

interface SelectTableXProps<Original extends { [keys: string]: any }> {
  selected: any[]
  onSelect(selected: any[]): void
  batchActionBar?: ReactNode
  isSelectorDisable?(original: Original): boolean
  selectType?: SelectType
  fixedSelect?: boolean
}

declare function selectTableXHOC<Original>(
  Component: FC<TableXProps<Original>>
): FC<TableXProps<Original> & SelectTableXProps<Original>>
export default selectTableXHOC
