import React, { CSSProperties, FC, useContext } from 'react'
import { FormBtnPosition } from './form_btn_position'
import formContext from './context'

export interface FormButtonProps {
  /* 默认由 Form 透传下来 */
  labelWidth?: string
  /* 默认由 Form 透传下来 */
  btnPosition?: FormBtnPosition
}

const FormButton: FC<FormButtonProps> = ({ labelWidth, btnPosition, children }) => {
  const context = useContext(formContext)
  labelWidth = labelWidth ?? context.labelWidth
  btnPosition = btnPosition ?? context.btnPosition
  const { inline } = context
  const style: CSSProperties = {
    marginLeft: btnPosition === 'left' && !inline && labelWidth ? labelWidth : 0,
  }
  const position = `text-${btnPosition}`

  return (
    <div style={style} className={position}>
      {children}
    </div>
  )
}

export default FormButton
