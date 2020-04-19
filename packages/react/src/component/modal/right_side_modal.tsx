import { CommonModalProps } from './types'
import Modal from './modal'
import { PropsWithChildren } from 'react'

export default class RightSideModal {
  static render(props: Partial<PropsWithChildren<CommonModalProps>>): void {
    Modal.render({ ...props, className: 'gm-modal-right-side' })
  }

  static hide(): void {
    Modal.hide()
  }
}
