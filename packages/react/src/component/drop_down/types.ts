import { CSSProperties, LiHTMLAttributes, ReactNode } from 'react'

interface DropdownProps {
  popup: ReactNode
  split?: boolean
  /* 非 split 有效 */
  right?: boolean
  /* split 生效 */
  cartClassName?: string
  className?: string
  style?: CSSProperties
}

interface DropdownItemProps extends LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
  disabled?: boolean
  onClick?(): void
}

export type { DropdownProps, DropdownItemProps }
