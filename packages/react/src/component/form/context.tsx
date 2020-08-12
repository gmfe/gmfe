import { createContext } from 'react'
import { FormBtnPosition } from './form_btn_position'

export interface FormContextOptions {
  labelWidth?: string
  disabledCol?: boolean
  inline?: boolean
  btnPosition?: FormBtnPosition
  colWidth?: string
  canValidate?: boolean
}

const formContext = createContext<Readonly<FormContextOptions>>({})

export default formContext
