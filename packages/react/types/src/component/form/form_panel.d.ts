import { FC, ReactNode } from 'react'

export interface FormPanelProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  showBorder?: boolean
}

interface FormPanelFC<P> extends FC<P> {
  More: FC
}

declare const FormPanel: FormPanelFC<FormPanelProps>
export default FormPanel
