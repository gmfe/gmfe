import { CSSProperties, FC } from 'react'

export interface FormBlockProps {
  col?: 1 | 2 | 3
  disabledCol?: boolean
  inline?: boolean
  className?: string
  style?: CSSProperties
}

declare const FormBlock: FC<FormBlockProps>
export default FormBlock
