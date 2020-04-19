import { PropsWithChildren, ReactElement } from 'react'
import { MoreSelectProps } from '@gmfe/react/types/src/more_select'

interface KeyboardCellMoreSelectProps<P> extends MoreSelectProps<P> {
  disabled?: boolean
  onKeyDown?(event): void
}

declare const KeyboardCellMoreSelect: <P>(
  props: PropsWithChildren<KeyboardCellMoreSelectProps<P>>
) => ReactElement
export default KeyboardCellMoreSelect
