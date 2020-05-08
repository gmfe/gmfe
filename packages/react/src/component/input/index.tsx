import React, { forwardRef, AllHTMLAttributes } from 'react'
import classNames from 'classnames'

/** 没什么，就一个input，多了个类名 gm-input 用来和库配合做UI */
const Input = forwardRef<HTMLInputElement, AllHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
      <input
        ref={ref}
        {...rest}
        className={classNames('gm-input', className)}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
