import { CSSProperties, FC, ReactNode } from 'react'

export interface FormItemProps {
  col?: 1 | 2 | 3
  disabledCol?: boolean
  label?: ReactNode
  tooltip?: ReactNode
  required?: boolean
  unLabelTop?: boolean
  validate?(): string
  error?: boolean
  help?: string
  labelWidth?: string
  colWidth?: string
  canValidate?: boolean
  className?: string
  style?: CSSProperties
}

declare const FormItem: FC<FormItemProps>
export default FormItem
