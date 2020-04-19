import { FC, ReactNode, RefObject } from 'react'
import Form from './form'

export interface FormGroupProps {
  formRefs: RefObject<Form>[]
  onSubmit?(): void
  onSubmitValidated?(): void
  onCancel?(): void
  disabled?: boolean
  saveText: string
  actions: ReactNode
}

declare const FormGroup: FC<FormGroupProps>
export default FormGroup
