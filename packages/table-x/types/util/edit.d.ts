import { FC, ReactNode } from 'react'

interface EditButtonProps {
  popupRender(close: () => void): ReactNode
  right?: boolean
}

declare const EditButton: FC<EditButtonProps>

interface EditOperationProps {
  onAddRow?(): void
  onDeleteRow?(): void
}

declare const EditOperation: FC<EditOperationProps>

export { EditButton, EditOperation }
