import { CommonModalProps } from './types'
import Modal from './modal'

export default class RightSideModal {
  static render(props: Partial<CommonModalProps>): void {
    Modal.render({ ...props, className: 'gm-modal-right-side' })
  }

  static hide(): void {
    Modal.hide()
  }
}
