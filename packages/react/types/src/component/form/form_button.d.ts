import { FC } from 'react'

export interface FormButtonProps {
  labelWidth?: string
  btnPosition?: 'center' | 'left' | 'right'
}

declare const FormButton: FC<FormButtonProps>
export default FormButton
