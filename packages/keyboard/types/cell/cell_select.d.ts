import { PropsWithChildren, ReactElement } from 'react'
import { SelectProps } from '@gmfe/react/types/src/select'

interface KeyboardCellSelectProps<P> extends SelectProps<P> {
  disabled?: boolean
  onKeyDown?(event): void
}

declare const KeyboardCellSelect: <P>(
  props: PropsWithChildren<KeyboardCellSelectProps<P>>
) => ReactElement
export default KeyboardCellSelect
