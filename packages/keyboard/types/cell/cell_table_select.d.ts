import { TableSelectProps } from '@gmfe/react/types/src/table_select'
import { PropsWithChildren, ReactElement } from 'react'

interface KeyboardCellMoreSelect<P extends { [key: string]: unknown }>
  extends TableSelectProps<P> {
  disabled?: boolean
  onKeyDown?(event): void
}
declare const KeyboardCellMoreSelect: <P extends { [key: string]: unknown }>(
  props: PropsWithChildren<KeyboardCellMoreSelect<P>>
) => ReactElement
export default KeyboardCellMoreSelect
