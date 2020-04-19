import { KeyboardEvent, FocusEvent, FC } from 'react'
import { InputNumberV2Props } from '@gmfe/react/types/src/input_number'

interface KeyboardCellInputProps extends InputNumberV2Props {
  onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void
  onFocus?(event: FocusEvent<HTMLInputElement>): void
}

declare const KeyboardCellInput: FC<KeyboardCellInputProps>
export default KeyboardCellInput
