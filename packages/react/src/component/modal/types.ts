type ModalSize = 'lg' | 'md' | 'sm'

interface CommonModalProps {
  show: boolean
  onHide?(): void
  disableMaskClose?: boolean
  size?: ModalSize
  title?: string
  okBtnClassName?: string
  noContentPadding?: boolean
}

export type { ModalSize, CommonModalProps }
