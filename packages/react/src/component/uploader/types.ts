import { ChangeEvent, CSSProperties, DragEvent } from 'react'

interface UploaderFile extends File {
  preview: string
}

interface UploaderProps {
  onUpload(
    files: UploaderFile[],
    event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ): void
  disabled?: boolean
  accept?: string
  multiple?: boolean
  className?: string
  style?: CSSProperties
}

export type { UploaderProps, UploaderFile }
