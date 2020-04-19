import Modal from './modal'
import { CommonModalProps } from './types'

export default class CleanModal {
  static render(props: Partial<CommonModalProps>): void {
    Modal.render({ ...props, className: 'gm-modal-clean' })
  }

  static hide(): void {
    Modal.hide()
  }
}
