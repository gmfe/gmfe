import { Component, CSSProperties, ReactNode } from 'react'

type ModalType = 'confirm' | 'info' | 'success' | 'warning'
type ModalSize = 'lg' | 'md' | 'sm'
type ModalAnimName =
  | boolean
  | 'fade-in-right'
  | 'fade-in-left'
  | 'fade-in-top'
  | 'fade-in-bottom'

interface ModalProps {
  show: boolean
  type?: ModalType
  onHide?(): void
  disableMaskClose?: boolean
  opacityMask?: boolean
  size?: ModalSize
  title?: string
  okBtnClassName?: string
  className?: string
  noContentPadding?: boolean
  noCloseBtn?: boolean
  style?: CSSProperties
  animName?: ModalAnimName
  onCancel?(): void
  onOk?(): void
}

interface ModalStaticOptions extends ModalProps {
  children: ReactNode
}

declare class Modal extends Component<ModalProps, void> {
  static defaultProps: {
    onHide(): void
    size: ModalSize
    disableMaskClose: boolean
    opacityMask: boolean
    noContentPadding: boolean
    noCloseBtn: boolean
    animName: boolean
  }

  static render(options: ModalStaticOptions): void
  static confirm(options: ModalStaticOptions): void
  static info(options: ModalStaticOptions): void
  static success(options: ModalStaticOptions): void
  static warning(options: ModalStaticOptions): void
  static hide(): void
}

export default Modal
export { ModalProps, ModalStaticOptions, ModalType, ModalSize, ModalAnimName }
