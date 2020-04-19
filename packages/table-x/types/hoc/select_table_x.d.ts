import { ComponentType, FC, ReactNode } from 'react'
import { TableXProps } from '../base/base'

type SelectType = 'checkbox' | 'radio'

interface SelectTableXProps<Original extends { [keys: string]: unknown }> {
  selected: unknown[]
  onSelect(selected: unknown[]): void
  batchActionBar?: ReactNode
  isSelectorDisable?(original: Original): boolean
  selectType?: SelectType
  fixedSelect?: boolean
}

interface PropsGeneric<Original extends { [key: string]: unknown }> {}

declare function selectTableXHOC<
  Original extends { [key: string]: unknown },
  Props extends PropsGeneric<Original>
>(Component: ComponentType<Props>): FC<Props & SelectTableXProps<Original>>
export default selectTableXHOC
