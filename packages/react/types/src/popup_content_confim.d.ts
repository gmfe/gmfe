import { CSSProperties, FC } from 'react'

export interface PopupContentConfirmProps {
  type?: 'save' | 'delete'
  title?: string
  onCancel(): void
  onDelete?(): void
  onSave?(): void
  className?: string
  style?: CSSProperties
}

declare const PopupContentConfirm: FC<PopupContentConfirmProps>
export default PopupContentConfirm
