import { FC } from 'react'

interface EditTableOperationProps {
  onAddRow(): void
  onDeleteRow(): void
}

declare const EditTableOperation: FC<EditTableOperationProps>

interface EditContentInputNumberProps {
  onSave(value: number): void
  closePopup(): void
  initialVal?: number
  suffixText?: string
}

declare const EditContentInputNumber: FC<EditContentInputNumberProps>

interface EditContentInputProps {
  closePopup(): void
  onSave(value: string): void
  suffixText?: number | string
  initialVal?: string
}

declare const EditContentInput: FC<EditContentInputProps>

interface EditButtonProps {
  popupRender(closePopup: () => void): void
  right?: boolean
}

declare const EditButton: FC<EditButtonProps>
export {
  EditTableOperation,
  EditContentInputNumber,
  EditContentInput,
  EditButton,
}
