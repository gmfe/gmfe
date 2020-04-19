import Modal from './modal'
import { CommonModalProps } from './types'
import { PropsWithChildren } from 'react'

export default class CleanModal {
  static render(props: Partial<PropsWithChildren<CommonModalProps>>): void {
    Modal.render({ ...props, className: 'gm-modal-clean' })
  }

  static hide(): void {
    Modal.hide()
  }
}
