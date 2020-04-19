import { Component } from 'react'

export interface EditableTextProps {
  content: string
  onOk?(): void
  onCancel?(): void
  disabled?: boolean
  className?: string
}

interface EditableTextState {
  editable: boolean
  value: string
}

declare class EditableText extends Component<
  EditableTextProps,
  EditableTextState
> {
  readonly state: EditableTextState
}
export default EditableText
