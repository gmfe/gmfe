import { Component, CSSProperties } from 'react'

export interface FormProps {
  onSubmit?(): void
  onSubmitValidated?(): void
  inline?: boolean
  disabledCol?: boolean
  colWidth?: string
  labelWidth?: string
  hasButtonInGroup?: boolean
  className?: string
  style?: CSSProperties
  btnPosition: 'center' | 'left' | 'right'
}

interface FormState {
  canValidate: boolean
}

declare class Form extends Component<FormProps, FormState> {
  readonly state: FormState

  apiDoValidate
}
export default Form
