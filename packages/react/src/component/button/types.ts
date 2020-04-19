import { HTMLAttributes, MouseEvent } from 'react'

export type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
export type ButtonSize = 'large'
export type ButtonHTMLType = 'submit' | 'button' | 'reset'

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
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
