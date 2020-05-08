import { FC, AllHTMLAttributes, MouseEvent } from 'react'

type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
type ButtonSize = 'large'
type ButtonHTMLType = 'submit' | 'button' | 'reset'

interface ButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType
  plain?: boolean
  size?: ButtonSize
  block?: boolean
  htmlType?: ButtonHTMLType
  loading?: boolean
  href?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

declare const Button: FC<ButtonProps>

export default Button
export { ButtonType, ButtonSize, ButtonHTMLType, ButtonProps }
