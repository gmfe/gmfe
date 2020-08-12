import { CSSProperties } from 'react'

type ModalSize = 'lg' | 'md' | 'sm'

interface CommonModalProps {
  show: boolean
  onHide?(): void
  disableMaskClose?: boolean
  size?: ModalSize
  title?: string
  style?: CSSProperties
  okBtnClassName?: string
  noContentPadding?: boolean
}

export type { ModalSize, CommonModalProps }
