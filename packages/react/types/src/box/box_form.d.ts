import { FC, ReactElement } from 'react'
import { FormProps } from '../form'

export interface BoxFormProps extends FormProps {}

interface BoxFormFC extends FC<BoxFormProps> {
  More: ReactElement
}
declare const BoxForm: BoxFormFC
export default BoxForm
