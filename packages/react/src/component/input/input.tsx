import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

/** 没什么，就一个input，多了个类名 gm-input 用来和库配合做UI */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props
  return <input ref={ref} {...rest} className={classNames('gm-input', className)} />
})

Input.displayName = 'Input'

export default Input
