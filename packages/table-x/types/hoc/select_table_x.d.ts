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

interface PropsGeneric<Original extends { [key: string]: any }> {}

declare function selectTableXHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props & SelectTableXProps<Original>>
export default selectTableXHOC
