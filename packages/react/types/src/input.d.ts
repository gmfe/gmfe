import {
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
} from 'react'

declare const Input: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
>
export default Input
