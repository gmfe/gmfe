import { FC } from 'react'
import { DatePickerProps } from '@gmfe/react/types/src/date_picker'

interface KeyboardDatePickerProps extends DatePickerProps {
  disabled?: boolean
  onKeyDown?(event): void
}

declare const KeyboardDatePicker: FC<KeyboardDatePickerProps>
export default KeyboardDatePicker
